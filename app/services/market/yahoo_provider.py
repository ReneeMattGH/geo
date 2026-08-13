"""Yahoo Finance chart provider for public market snapshots.

Used as a no-key fallback for equities/ETFs, forex and commodities, and as the
primary source for index levels, which Alpaca's stock snapshot API does not
expose directly.
"""
from __future__ import annotations

import asyncio
from datetime import UTC, datetime
from typing import Dict, List, Optional
from urllib.parse import quote

import httpx

from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)


DEFAULT_INDICES: Dict[str, str] = {
    "SPX": "^GSPC",
    "NDX": "^NDX",
    "DJI": "^DJI",
    "RUT": "^RUT",
    "DAX": "^GDAXI",
    "FTSE": "^FTSE",
    "CAC": "^FCHI",
    "STOXX50": "^STOXX50E",
    "NKY": "^N225",
    "HSI": "^HSI",
    "SSEC": "000001.SS",
    "SENSEX": "^BSESN",
    "NIFTY": "^NSEI",
    "ASX200": "^AXJO",
    "TSX": "^GSPTSE",
    "IBOV": "^BVSP",
    "MEXBOL": "^MXX",
    "KOSPI": "^KS11",
    "TWSE": "^TWII",
    "STI": "^STI",
    "JKSE": "^JKSE",
    "KLSE": "^KLSE",
    "TA35": "^TA125.TA",
    "IBEX": "^IBEX",
    "SMI": "^SSMI",
}

INDEX_NAMES: Dict[str, str] = {
    "SPX": "S&P 500",
    "NDX": "Nasdaq 100",
    "DJI": "Dow Jones Industrial Average",
    "RUT": "Russell 2000",
    "DAX": "DAX 40",
    "FTSE": "FTSE 100",
    "CAC": "CAC 40",
    "STOXX50": "EURO STOXX 50",
    "NKY": "Nikkei 225",
    "HSI": "Hang Seng",
    "SSEC": "SSE Composite",
    "SENSEX": "BSE Sensex",
    "NIFTY": "Nifty 50",
    "ASX200": "S&P/ASX 200",
    "TSX": "S&P/TSX Composite",
    "IBOV": "Ibovespa",
    "MEXBOL": "IPC Mexico",
    "KOSPI": "KOSPI",
    "TWSE": "Taiwan Weighted Index",
    "STI": "Straits Times Index",
    "JKSE": "Jakarta Composite",
    "KLSE": "FTSE Bursa Malaysia KLCI",
    "TA35": "TA-125",
    "IBEX": "IBEX 35",
    "SMI": "Swiss Market Index",
}

# Continuous front-month futures / spot proxies for the commodity universe.
COMMODITY_SYMBOLS: Dict[str, str] = {
    "XAUUSD": "GC=F",
    "XAGUSD": "SI=F",
    "PLATINUM": "PL=F",
    "PALLADIUM": "PA=F",
    "COPPER": "HG=F",
    "WTI": "CL=F",
    "BRENT": "BZ=F",
    "NATGAS": "NG=F",
    "HEATINGOIL": "HO=F",
    "CORN": "ZC=F",
    "WHEAT": "ZW=F",
    "SOYBEANS": "ZS=F",
    "COFFEE": "KC=F",
    "SUGAR": "SB=F",
    "COTTON": "CT=F",
    "COCOA": "CC=F",
    "ORANGEJUICE": "OJ=F",
    "LEANHOGS": "HE=F",
    "LIVECATTLE": "LE=F",
    "FEEDERCATTLE": "GF=F",
    "OATS": "ZO=F",
    "ROUGH_RICE": "ZR=F",
    "SOYMEAL": "ZM=F",
    "SOYOIL": "ZL=F",
    "LUMBER": "LBR=F",
}

COMMODITY_NAMES: Dict[str, str] = {
    "XAUUSD": "Gold",
    "XAGUSD": "Silver",
    "PLATINUM": "Platinum",
    "PALLADIUM": "Palladium",
    "COPPER": "Copper",
    "WTI": "WTI Crude Oil",
    "BRENT": "Brent Crude Oil",
    "NATGAS": "Natural Gas",
    "HEATINGOIL": "Heating Oil",
    "CORN": "Corn",
    "WHEAT": "Wheat",
    "SOYBEANS": "Soybeans",
    "COFFEE": "Coffee",
    "SUGAR": "Sugar",
    "COTTON": "Cotton",
    "COCOA": "Cocoa",
    "ORANGEJUICE": "Orange Juice",
    "LEANHOGS": "Lean Hogs",
    "LIVECATTLE": "Live Cattle",
    "FEEDERCATTLE": "Feeder Cattle",
    "OATS": "Oats",
    "ROUGH_RICE": "Rough Rice",
    "SOYMEAL": "Soybean Meal",
    "SOYOIL": "Soybean Oil",
    "LUMBER": "Lumber",
}

CURRENCY_NAMES: Dict[str, str] = {
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "CHF": "Swiss Franc",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "NZD": "New Zealand Dollar",
}


class YahooProvider(BaseMarketProvider):
    """Fetch delayed/live public market snapshots from Yahoo Finance.

    Yahoo's public chart API is one request per symbol and throttles bursts with
    HTTP 429, so requests are paced process-wide, retried with backoff, and
    served from a short-lived snapshot cache when the upstream pushes back.
    """

    name = "yahoo"
    asset_class = "indices"

    # Pacing: at most MAX_CONCURRENCY in flight and one request per MIN_INTERVAL.
    MAX_CONCURRENCY = 4
    MIN_INTERVAL = 0.12
    RETRY_BACKOFF = (0.8, 2.0)
    # A snapshot may be reused for this long when the upstream is unavailable.
    SNAPSHOT_TTL = 900.0
    # Symbols per batch-quote request; Yahoo accepts long lists but keep URLs sane.
    BATCH_SIZE = 40
    # After the batch endpoint fails, don't retry it for this long.
    BATCH_COOLDOWN = 60.0
    # Circuit breaker: after this many consecutive failures, stop calling Yahoo
    # entirely for a while instead of retrying every symbol into a throttle.
    FAILURE_THRESHOLD = 12
    BREAKER_COOLDOWN = 45.0

    def __init__(self) -> None:
        super().__init__()
        self.base_url = "https://query1.finance.yahoo.com/v8/finance/chart"
        self.quote_url = "https://query1.finance.yahoo.com/v7/finance/quote"
        self.crumb_url = "https://query1.finance.yahoo.com/v1/test/getcrumb"
        self._gate: Optional[asyncio.Semaphore] = None
        self._pace_lock: Optional[asyncio.Lock] = None
        self._next_slot = 0.0
        # provider_symbol -> (monotonic fetched_at, data point)
        self._snapshots: Dict[str, tuple[float, MarketDataPoint]] = {}
        self._crumb: Optional[str] = None
        self._batch_blocked_until = 0.0
        self._consecutive_failures = 0
        self._blocked_until = 0.0

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch index levels for the default BaseMarketProvider contract."""
        return await self.fetch_symbols(symbols, "indices")

    async def fetch_symbols(
        self,
        symbols: List[str],
        asset_class: str,
        symbol_map: Optional[Dict[str, str]] = None,
        display_names: Optional[Dict[str, str]] = None,
    ) -> List[MarketDataPoint]:
        """Fetch symbols and tag the returned rows with the requested asset class."""
        if not symbols:
            return []

        mapping = symbol_map or {}
        names = display_names or {}
        points: Dict[str, MarketDataPoint] = {}

        async with httpx.AsyncClient(
            timeout=10.0, headers=self._headers(), follow_redirects=True
        ) as client:
            # One batched quote request per BATCH_SIZE symbols covers the common
            # case; the per-symbol chart API is reserved for whatever it misses.
            batched = await self._fetch_batched(client, symbols, mapping, asset_class, names)
            points.update(batched)

            remaining = [s for s in symbols if s not in points]
            if remaining:
                logger.info(
                    f"Yahoo: {len(remaining)}/{len(symbols)} {asset_class} symbols "
                    "not in batch response, falling back to chart API"
                )
                tasks = [
                    self._fetch_one(
                        client,
                        symbol,
                        mapping.get(symbol, symbol),
                        asset_class,
                        names.get(symbol),
                    )
                    for symbol in remaining
                ]
                try:
                    # A public endpoint can throttle an entire region. Bound the
                    # chart fallback so one provider cannot hold the aggregate API
                    # open while later providers have usable quotes.
                    results = await asyncio.wait_for(
                        asyncio.gather(*tasks, return_exceptions=True),
                        timeout=15.0,
                    )
                except TimeoutError:
                    logger.warning(
                        f"Yahoo chart fallback timed out for {asset_class}; "
                        "returning cached/unavailable rows"
                    )
                    results = [None] * len(remaining)
                for symbol, result in zip(remaining, results):
                    if isinstance(result, MarketDataPoint):
                        points[symbol] = result
                    else:
                        logger.warning(f"Yahoo fetch failed for {symbol}: {result}")
                        points[symbol] = (
                            self._snapshot(mapping.get(symbol, symbol), asset_class, symbol)
                            or self._unavailable(symbol, asset_class, names.get(symbol))
                        )

        ordered = [
            points.get(symbol) or self._unavailable(symbol, asset_class, names.get(symbol))
            for symbol in symbols
        ]
        self._update_cache(ordered)
        return ordered

    async def _fetch_batched(
        self,
        client: httpx.AsyncClient,
        symbols: List[str],
        mapping: Dict[str, str],
        asset_class: str,
        names: Dict[str, str],
    ) -> Dict[str, MarketDataPoint]:
        """Fetch as many symbols as possible through Yahoo's batch quote API."""
        loop = asyncio.get_running_loop()
        if loop.time() < self._batch_blocked_until:
            return {}

        crumb = await self._get_crumb(client)
        if crumb is None:
            self._batch_blocked_until = loop.time() + self.BATCH_COOLDOWN
            return {}

        # Yahoo keys the response by provider symbol; keep the reverse mapping.
        provider_to_display: Dict[str, str] = {}
        for symbol in symbols:
            provider_to_display.setdefault(mapping.get(symbol, symbol), symbol)

        provider_symbols = list(provider_to_display)
        found: Dict[str, MarketDataPoint] = {}

        for start in range(0, len(provider_symbols), self.BATCH_SIZE):
            chunk = provider_symbols[start:start + self.BATCH_SIZE]
            async with self._gate_for_loop():
                await self._pace()
                try:
                    # The client carries the consent cookie set while fetching
                    # the crumb, so no per-request cookie override is needed.
                    resp = await client.get(
                        self.quote_url,
                        params={"symbols": ",".join(chunk), "crumb": crumb},
                    )
                    resp.raise_for_status()
                    rows = resp.json().get("quoteResponse", {}).get("result") or []
                except Exception as e:
                    logger.warning(f"Yahoo batch quote failed: {e}")
                    # Crumbs expire; drop it so the next cycle re-authenticates.
                    self._crumb = None
                    self._batch_blocked_until = loop.time() + self.BATCH_COOLDOWN
                    break

            for row in rows:
                provider_symbol = row.get("symbol")
                display = provider_to_display.get(provider_symbol)
                if display is None:
                    continue
                point = self._parse_quote_row(
                    row, display, asset_class, names.get(display)
                )
                if point is None:
                    continue
                found[display] = point
                self._snapshots[provider_symbol] = (loop.time(), point)

        return found

    def _parse_quote_row(
        self,
        row: dict,
        symbol: str,
        asset_class: str,
        display_name: Optional[str],
    ) -> Optional[MarketDataPoint]:
        """Convert one v7 quote row into a MarketDataPoint."""
        price = self._first_number(
            row.get("regularMarketPrice"),
            row.get("postMarketPrice"),
            row.get("preMarketPrice"),
            row.get("regularMarketPreviousClose"),
        )
        if price <= 0:
            return None

        change = row.get("regularMarketChangePercent")
        if not isinstance(change, (int, float)):
            previous_close = self._first_number(row.get("regularMarketPreviousClose"))
            change = ((price - previous_close) / previous_close * 100) if previous_close else 0.0

        market_time = row.get("regularMarketTime")
        timestamp = (
            int(market_time * 1000)
            if isinstance(market_time, (int, float))
            else int(datetime.now(UTC).timestamp() * 1000)
        )

        return MarketDataPoint(
            symbol=symbol,
            asset_class=asset_class,
            price=price,
            change=round(float(change), 4),
            timestamp=timestamp,
            source=self.name,
            volume=self._first_number(row.get("regularMarketVolume")),
            high_24h=self._first_number(row.get("regularMarketDayHigh")),
            low_24h=self._first_number(row.get("regularMarketDayLow")),
            open_24h=self._first_number(
                row.get("regularMarketOpen"), row.get("regularMarketPreviousClose")
            ),
            name=display_name or row.get("shortName") or row.get("longName") or symbol,
            data_status="delayed",
        )

    async def _get_crumb(self, client: httpx.AsyncClient) -> Optional[str]:
        """Fetch (and cache) the cookie + crumb pair the quote API requires."""
        if self._crumb:
            return self._crumb

        async with self._gate_for_loop():
            await self._pace()
            try:
                # Priming request just sets the consent cookie; its status is
                # irrelevant (Yahoo answers 404 with a valid Set-Cookie).
                await client.get("https://fc.yahoo.com")

                resp = await client.get(self.crumb_url)
                resp.raise_for_status()
                crumb = resp.text.strip()
            except Exception as e:
                logger.warning(f"Yahoo crumb request failed: {e}")
                return None

        if not crumb or "<" in crumb or len(crumb) > 64:
            logger.warning("Yahoo returned an unusable crumb")
            return None

        self._crumb = crumb
        return crumb

    async def fetch_forex(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch FX pairs (EURUSD style) using Yahoo's `<PAIR>=X` tickers."""
        return await self.fetch_symbols(
            symbols,
            "forex",
            self.get_forex_symbol_map(symbols),
            self.get_forex_names(symbols),
        )

    async def fetch_commodities(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch commodities using Yahoo's front-month futures tickers."""
        supported = [s for s in symbols if s.upper() in COMMODITY_SYMBOLS]
        return await self.fetch_symbols(
            supported,
            "commodities",
            COMMODITY_SYMBOLS,
            COMMODITY_NAMES,
        )

    async def _fetch_one(
        self,
        client: httpx.AsyncClient,
        symbol: str,
        provider_symbol: str,
        asset_class: str,
        display_name: Optional[str] = None,
    ) -> MarketDataPoint:
        payload = await self._request(client, provider_symbol)
        if payload is None:
            snapshot = self._snapshot(provider_symbol, asset_class, symbol)
            return snapshot or self._unavailable(symbol, asset_class, display_name)

        point = self._parse(payload, symbol, provider_symbol, asset_class, display_name)
        if point.status == "ok":
            self._snapshots[provider_symbol] = (
                asyncio.get_running_loop().time(),
                point,
            )
            return point
        return self._snapshot(provider_symbol, asset_class, symbol) or point

    async def _request(
        self,
        client: httpx.AsyncClient,
        provider_symbol: str,
    ) -> Optional[dict]:
        """Issue one paced chart request, retrying past transient throttling."""
        if self._breaker_open():
            return None

        url = f"{self.base_url}/{quote(provider_symbol, safe='')}"
        params = {"range": "1d", "interval": "1m", "includePrePost": "true"}

        for attempt in range(len(self.RETRY_BACKOFF) + 1):
            async with self._gate_for_loop():
                await self._pace()
                try:
                    resp = await client.get(url, params=params)
                    resp.raise_for_status()
                    self._record_success()
                    return resp.json()
                except httpx.HTTPStatusError as e:
                    retryable = e.response.status_code in (429, 502, 503)
                    self._record_failure()
                    if not retryable or attempt == len(self.RETRY_BACKOFF):
                        logger.warning(
                            f"Yahoo request failed for {provider_symbol}: "
                            f"{e.response.status_code}"
                        )
                        return None
                except Exception as e:
                    self._record_failure()
                    if attempt == len(self.RETRY_BACKOFF):
                        logger.warning(f"Yahoo request failed for {provider_symbol}: {e}")
                        return None

            if self._breaker_open():
                return None

            # Back off outside the gate so other symbols keep making progress.
            await asyncio.sleep(self.RETRY_BACKOFF[attempt])

        return None

    def _breaker_open(self) -> bool:
        """True while Yahoo is being given a rest after repeated failures."""
        try:
            return asyncio.get_running_loop().time() < self._blocked_until
        except RuntimeError:
            return False

    def _record_success(self) -> None:
        self._consecutive_failures = 0

    def _record_failure(self) -> None:
        self._consecutive_failures += 1
        if self._consecutive_failures < self.FAILURE_THRESHOLD:
            return
        try:
            self._blocked_until = asyncio.get_running_loop().time() + self.BREAKER_COOLDOWN
        except RuntimeError:
            return
        self._consecutive_failures = 0
        logger.warning(
            f"Yahoo returned {self.FAILURE_THRESHOLD} consecutive failures - "
            f"pausing requests for {self.BREAKER_COOLDOWN:.0f}s"
        )

    def _gate_for_loop(self) -> asyncio.Semaphore:
        """Lazily build the concurrency gate on the running event loop."""
        if self._gate is None:
            self._gate = asyncio.Semaphore(self.MAX_CONCURRENCY)
        return self._gate

    async def _pace(self) -> None:
        """Space request starts by at least MIN_INTERVAL seconds."""
        if self._pace_lock is None:
            self._pace_lock = asyncio.Lock()
        async with self._pace_lock:
            loop = asyncio.get_running_loop()
            now = loop.time()
            wait = self._next_slot - now
            self._next_slot = max(now, self._next_slot) + self.MIN_INTERVAL
        if wait > 0:
            await asyncio.sleep(wait)

    def _snapshot(
        self,
        provider_symbol: str,
        asset_class: str,
        symbol: Optional[str] = None,
    ) -> Optional[MarketDataPoint]:
        """Return the last good reading for a symbol while it is still usable."""
        entry = self._snapshots.get(provider_symbol)
        if entry is None:
            return None
        try:
            age = asyncio.get_running_loop().time() - entry[0]
        except RuntimeError:
            return None
        if age > self.SNAPSHOT_TTL:
            return None

        cached = entry[1]
        return MarketDataPoint(
            symbol=symbol or cached.symbol,
            asset_class=asset_class,
            price=cached.price,
            change=cached.change,
            timestamp=cached.timestamp,
            source=f"{self.name}:cached",
            volume=cached.volume,
            high_24h=cached.high_24h,
            low_24h=cached.low_24h,
            open_24h=cached.open_24h,
            name=cached.name,
            data_status="stale",
        )

    def _parse(
        self,
        payload: dict,
        symbol: str,
        provider_symbol: str,
        asset_class: str,
        display_name: Optional[str] = None,
    ) -> MarketDataPoint:
        """Convert a Yahoo chart payload into a MarketDataPoint."""
        try:
            result = (payload.get("chart", {}).get("result") or [None])[0]
            if not result:
                return self._unavailable(symbol, asset_class, display_name)

            meta = result.get("meta", {})
            quote_rows = (result.get("indicators", {}).get("quote") or [{}])[0]
            timestamps = result.get("timestamp") or []

            price = self._first_number(
                meta.get("regularMarketPrice"),
                self._last_number((result.get("indicators", {}).get("quote") or [{}])[0].get("close")),
                meta.get("previousClose"),
                meta.get("chartPreviousClose"),
            )
            if price <= 0:
                return self._unavailable(symbol, asset_class, display_name)

            previous_close = self._first_number(
                meta.get("previousClose"),
                meta.get("chartPreviousClose"),
            )
            change = ((price - previous_close) / previous_close * 100) if previous_close else 0.0

            market_time = meta.get("regularMarketTime")
            timestamp = int(market_time * 1000) if isinstance(market_time, int) else (
                int(timestamps[-1] * 1000) if timestamps else int(datetime.now(UTC).timestamp() * 1000)
            )

            return MarketDataPoint(
                symbol=symbol,
                asset_class=asset_class,
                price=price,
                change=round(change, 4),
                timestamp=timestamp,
                source=self.name,
                volume=self._last_number(quote_rows.get("volume")),
                high_24h=self._max_number(quote_rows.get("high")),
                low_24h=self._min_number(quote_rows.get("low")),
                open_24h=self._first_number(
                    quote_rows.get("open", [0])[0] if quote_rows.get("open") else 0,
                    meta.get("regularMarketPreviousClose"),
                    previous_close,
                ),
                name=display_name or meta.get("shortName") or meta.get("longName") or symbol,
                data_status="delayed",
            )
        except Exception as e:
            logger.warning(f"Yahoo parse failed for {provider_symbol}: {e}")
            return self._unavailable(symbol, asset_class, display_name)

    def get_default_symbols(self) -> List[str]:
        """Return default index symbols."""
        return list(DEFAULT_INDICES.keys())

    def get_index_symbols(self) -> List[str]:
        """Return default index symbols."""
        return self.get_default_symbols()

    def get_index_symbol_map(self) -> Dict[str, str]:
        """Return display symbol to Yahoo symbol mapping."""
        return DEFAULT_INDICES.copy()

    def get_index_names(self) -> Dict[str, str]:
        """Return display symbol to human-readable index name."""
        return INDEX_NAMES.copy()

    def get_forex_symbol_map(self, symbols: List[str]) -> Dict[str, str]:
        """Map EURUSD-style pairs to Yahoo's `EURUSD=X` tickers."""
        return {sym: f"{sym.replace('/', '').upper()}=X" for sym in symbols}

    def get_forex_names(self, symbols: List[str]) -> Dict[str, str]:
        """Build readable FX names such as `Euro / US Dollar`."""
        names: Dict[str, str] = {}
        for sym in symbols:
            clean = sym.replace("/", "").upper()
            if len(clean) != 6:
                continue
            base, quote_ccy = clean[:3], clean[3:]
            names[sym] = (
                f"{CURRENCY_NAMES.get(base, base)} / {CURRENCY_NAMES.get(quote_ccy, quote_ccy)}"
            )
        return names

    def supports_commodity(self, symbol: str) -> bool:
        """Return True when the commodity has a Yahoo futures proxy."""
        return symbol.upper() in COMMODITY_SYMBOLS

    def _unavailable(
        self,
        symbol: str,
        asset_class: str,
        display_name: Optional[str] = None,
    ) -> MarketDataPoint:
        point = MarketDataPoint.unavailable(symbol, asset_class, self.name)
        point.name = display_name or symbol
        return point

    def _headers(self) -> Dict[str, str]:
        """Yahoo rejects requests without a browser-like User-Agent."""
        return {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
            ),
            "Accept": "application/json",
        }

    def _first_number(self, *values: object) -> float:
        for value in values:
            if value is None:
                continue
            try:
                number = float(value)
            except (TypeError, ValueError):
                continue
            if number > 0:
                return number
        return 0.0

    def _last_number(self, values: object) -> float:
        if not isinstance(values, list):
            return self._first_number(values)
        for value in reversed(values):
            number = self._first_number(value)
            if number > 0:
                return number
        return 0.0

    def _max_number(self, values: object) -> float:
        if not isinstance(values, list):
            return self._first_number(values)
        numbers = [float(v) for v in values if isinstance(v, (int, float)) and v > 0]
        return max(numbers) if numbers else 0.0

    def _min_number(self, values: object) -> float:
        if not isinstance(values, list):
            return self._first_number(values)
        numbers = [float(v) for v in values if isinstance(v, (int, float)) and v > 0]
        return min(numbers) if numbers else 0.0


_yahoo_provider: Optional[YahooProvider] = None


def get_yahoo_provider() -> YahooProvider:
    """Get Yahoo provider singleton."""
    global _yahoo_provider
    if _yahoo_provider is None:
        _yahoo_provider = YahooProvider()
    return _yahoo_provider
