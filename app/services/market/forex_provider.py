"""Forex market data provider using Twelve Data.

Fetches real-time FX rates for major currency pairs.
Uses Twelve Data API (https://twelvedata.com/)
"""
from __future__ import annotations

import time
from datetime import datetime, UTC
from typing import List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

CURRENCY_NAMES = {
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "CHF": "Swiss Franc",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "NZD": "New Zealand Dollar",
}

# Top 10 Forex pairs by volume
DEFAULT_FOREX_PAIRS = [
    "EURUSD",
    "GBPUSD",
    "USDJPY",
    "USDCHF",
    "USDCAD",
    "AUDUSD",
    "NZDUSD",
    "EURGBP",
    "EURJPY",
    "EURAUD",
    "EURCHF",
    "EURCAD",
    "GBPJPY",
    "GBPCHF",
    "GBPAUD",
    "GBPCAD",
    "AUDJPY",
    "AUDNZD",
    "AUDCAD",
    "NZDJPY",
    "NZDCAD",
    "CADJPY",
    "CHFJPY",
    "EURNZD",
    "AUDCHF",
    "NZDCHF",
    "CADCHF",
    "EURSEK",
    "EURNOK",
    "USDSEK",
    "USDNOK",
    "USDMXN",
    "USDSGD",
    "USDHKD",
    "USDCNH",
]


class ForexProvider(BaseMarketProvider):
    """Twelve Data provider for forex market data."""

    name = "twelvedata"
    asset_class = "forex"

    # Twelve Data's free tier has per-minute and daily credit limits. When the
    # daily limit is hit, stop calling for a longer period to avoid wasting
    # requests and let the backfill (Alpha Vantage / reference rates) handle it.
    RATE_LIMIT_COOLDOWN = 300.0

    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.twelvedata_api_key
        self.backup_key = self.settings.alphavantage_api_key
        self.base_url = "https://api.twelvedata.com"
        self.backup_url = "https://www.alphavantage.co/query"
        # Keyless daily reference rates; last resort so the FX list is never empty.
        self.reference_url = "https://open.er-api.com/v6/latest/USD"
        self._blocked_until = 0.0

        if not self.api_key:
            logger.warning(
                "Twelve Data API not configured - forex unavailable",
                missing_key="TWELVEDATA_API_KEY"
            )

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch forex rates from Twelve Data."""
        results: List[MarketDataPoint] = []

        if self.api_key and time.monotonic() >= self._blocked_until:
            results = await self._fetch_from_twelvedata(symbols)

        missing = [sym for sym in symbols if not self._has_valid_price(results, sym)]
        if missing and self.backup_key:
            logger.warning(f"Trying Alpha Vantage backup for {len(missing)} forex symbols")
            backup = await self._fetch_from_alphavantage(missing)
            results = [r for r in results if self._has_valid_price([r], r.symbol)]
            results.extend(backup)

        if not self.api_key and not self.backup_key:
            logger.warning("No forex API keys configured. Returning unavailable status.")
            return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]

        returned = {r.symbol for r in results}
        results.extend(
            MarketDataPoint.unavailable(sym, "forex", self.name)
            for sym in symbols
            if sym not in returned
        )

        self._update_cache(results)
        return results

    async def _fetch_from_twelvedata(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch forex rates from Twelve Data."""
        results: List[MarketDataPoint] = []

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                api_symbols = [self._to_twelvedata_symbol(sym) for sym in symbols]
                sym_str = ",".join(api_symbols)
                
                url = f"{self.base_url}/quote"
                params = {
                    "symbol": sym_str,
                    "apikey": self.api_key,
                    "interval": "1day"
                }
                
                resp = await client.get(url, params=params)
                resp.raise_for_status()
                data = resp.json()
                
                # Check for API errors
                if "status" in data and data["status"] == "error":
                    msg = data.get("message", "")
                    logger.error(f"Twelve Data API error: {msg}")
                    if data.get("code") == 429 or "run out" in msg.lower() or "credit" in msg.lower():
                        self._enter_cooldown()
                    return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]

                # Handle single symbol (returns dict) vs multiple symbols (returns dict of dicts)
                if len(symbols) == 1:
                    # Single symbol response
                    parsed = self._parse_quote(symbols[0], data)
                    if parsed:
                        results.append(parsed)
                    else:
                        results.append(MarketDataPoint.unavailable(symbols[0], "forex", self.name))
                else:
                    # Multiple symbols response
                    for symbol in symbols:
                        api_symbol = self._to_twelvedata_symbol(symbol)
                        if api_symbol in data:
                            parsed = self._parse_quote(symbol, data[api_symbol])
                            if parsed:
                                results.append(parsed)
                            else:
                                results.append(MarketDataPoint.unavailable(symbol, "forex", self.name))
                        else:
                            logger.warning(f"No data returned for {symbol}")
                            results.append(MarketDataPoint.unavailable(symbol, "forex", self.name))
                            
        except httpx.HTTPStatusError as e:
            logger.error(f"Twelve Data API HTTP error: {e.response.status_code} - {e.response.text}")
            if e.response.status_code == 429:
                self._enter_cooldown()
            return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]
        except Exception as e:
            logger.error(f"Error fetching forex prices from Twelve Data: {e}")
            return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]
        return results

    async def _fetch_from_alphavantage(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch forex rates from Alpha Vantage as backup."""
        results: List[MarketDataPoint] = []
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                for symbol in symbols:
                    clean = self._display_symbol(symbol)
                    if len(clean) != 6:
                        results.append(MarketDataPoint.unavailable(clean, "forex", "alphavantage"))
                        continue
                    resp = await client.get(
                        self.backup_url,
                        params={
                            "function": "CURRENCY_EXCHANGE_RATE",
                            "from_currency": clean[:3],
                            "to_currency": clean[3:],
                            "apikey": self.backup_key,
                        },
                    )
                    resp.raise_for_status()
                    data = resp.json()
                    quote = data.get("Realtime Currency Exchange Rate")
                    if quote:
                        price = float(quote.get("5. Exchange Rate") or 0)
                        results.append(
                            MarketDataPoint(
                                symbol=clean,
                                asset_class="forex",
                                price=price,
                                change=0.0,
                                timestamp=int(datetime.now(UTC).timestamp() * 1000),
                                source="alphavantage",
                                high_24h=price,
                                low_24h=price,
                                open_24h=price,
                            )
                        )
                    else:
                        results.append(MarketDataPoint.unavailable(clean, "forex", "alphavantage"))
        except Exception as e:
            logger.error(f"Error fetching forex prices from Alpha Vantage: {e}")
            returned = {r.symbol for r in results}
            results.extend(
                MarketDataPoint.unavailable(self._display_symbol(sym), "forex", "alphavantage")
                for sym in symbols
                if self._display_symbol(sym) not in returned
            )
        return results
    
    def _parse_quote(self, symbol: str, quote: dict) -> Optional[MarketDataPoint]:
        """Parse a Twelve Data quote into MarketDataPoint."""
        try:
            # Check if quote contains price data
            price = quote.get("close") or quote.get("price")
            if price is None:
                logger.warning(f"No price data for {symbol}")
                return None
            
            price = float(price)
            
            # Calculate change percentage
            change = 0.0
            if "percent_change" in quote:
                change = float(quote.get("percent_change", 0))
            elif "change" in quote and "previous_close" in quote:
                prev = float(quote.get("previous_close", 0))
                if prev > 0:
                    change = (float(quote.get("change", 0)) / prev) * 100
            
            # Parse timestamp
            ts_str = quote.get("timestamp") or quote.get("datetime")
            if ts_str:
                try:
                    if isinstance(ts_str, int):
                        timestamp = ts_str * 1000  # Convert seconds to ms
                    else:
                        # Try parsing ISO format
                        dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
                        timestamp = int(dt.timestamp() * 1000)
                except:
                    timestamp = int(datetime.now(UTC).timestamp() * 1000)
            else:
                timestamp = int(datetime.now(UTC).timestamp() * 1000)
            
            return MarketDataPoint(
                symbol=symbol,
                asset_class="forex",
                price=price,
                change=round(change, 4),
                timestamp=timestamp,
                source=self.name,
                volume=float(quote.get("volume", 0)),
                high_24h=float(quote.get("high", 0)),
                low_24h=float(quote.get("low", 0)),
                open_24h=float(quote.get("open", 0)),
                name=self._pair_name(symbol),
            )
        except Exception as e:
            logger.error(f"Error parsing quote for {symbol}: {e}")
            return None
    
    def get_default_symbols(self) -> List[str]:
        """Return default forex pairs."""
        return DEFAULT_FOREX_PAIRS.copy()

    def _to_twelvedata_symbol(self, symbol: str) -> str:
        """Convert EURUSD display symbols to Twelve Data's EUR/USD format."""
        clean = self._display_symbol(symbol)
        return symbol if "/" in symbol else f"{clean[:3]}/{clean[3:]}"

    def _display_symbol(self, symbol: str) -> str:
        """Normalize forex symbols to the frontend display format."""
        return symbol.replace("/", "").upper()

    def _has_valid_price(self, results: List[MarketDataPoint], symbol: str) -> bool:
        display = self._display_symbol(symbol)
        return any(r.symbol == display and r.price > 0 and r.status == "ok" for r in results)

    def _pair_name(self, symbol: str) -> str:
        clean = self._display_symbol(symbol)
        if len(clean) != 6:
            return symbol
        base, quote_ccy = clean[:3], clean[3:]
        return f"{CURRENCY_NAMES.get(base, base)} / {CURRENCY_NAMES.get(quote_ccy, quote_ccy)}"

    async def fetch_reference_rates(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Derive pairs from a keyless USD reference table.

        These are daily reference rates rather than intraday quotes, so they are
        only used once every live source has failed — better a correct daily rate
        than an empty FX table. The `source` field makes the provenance visible.
        """
        if not symbols:
            return []

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(self.reference_url)
                resp.raise_for_status()
                payload = resp.json()
        except Exception as e:
            logger.warning(f"Reference FX rates unavailable: {e}")
            return []

        rates = payload.get("rates") or {}
        if not rates:
            return []
        rates["USD"] = 1.0

        updated = payload.get("time_last_update_unix")
        timestamp = (
            int(updated * 1000)
            if isinstance(updated, (int, float))
            else int(datetime.now(UTC).timestamp() * 1000)
        )

        results: List[MarketDataPoint] = []
        for symbol in symbols:
            clean = self._display_symbol(symbol)
            if len(clean) != 6:
                continue
            base, quote_ccy = rates.get(clean[:3]), rates.get(clean[3:])
            if not base or not quote_ccy:
                continue
            # Table is quoted per USD, so BASE/QUOTE = rate(QUOTE) / rate(BASE).
            price = quote_ccy / base
            if price <= 0:
                continue
            results.append(
                MarketDataPoint(
                    symbol=clean,
                    asset_class="forex",
                    price=round(price, 6),
                    change=0.0,  # Reference table carries no previous close
                    timestamp=timestamp,
                    source="exchangerate-api",
                    high_24h=0.0,
                    low_24h=0.0,
                    open_24h=0.0,
                )
            )

        return results

    def _enter_cooldown(self) -> None:
        """Pause Twelve Data calls until its rate-limit window rolls over."""
        self._blocked_until = time.monotonic() + self.RATE_LIMIT_COOLDOWN
        logger.warning(
            f"Twelve Data rate limited - pausing forex calls for {self.RATE_LIMIT_COOLDOWN:.0f}s"
        )


# Singleton factory
_forex_provider: Optional[ForexProvider] = None


def get_forex_provider() -> ForexProvider:
    """Get Forex provider singleton."""
    global _forex_provider
    if _forex_provider is None:
        _forex_provider = ForexProvider()
    return _forex_provider
