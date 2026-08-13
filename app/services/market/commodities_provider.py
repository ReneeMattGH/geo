"""Commodities market data provider.

Fetches real-time prices for Gold, Silver, Oil and other commodities.
Twelve Data quotes the spot metals; the rest are priced by the unified
service's futures fallback (see TWELVEDATA_SUPPORTED).
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

# Major commodities to track
DEFAULT_COMMODITIES = [
    "XAUUSD",      # Gold
    "XAGUSD",      # Silver
    "PLATINUM",    # Platinum
    "PALLADIUM",   # Palladium
    "COPPER",      # Copper
    "WTI",         # West Texas Intermediate Oil
    "BRENT",       # Brent Crude Oil
    "NATGAS",      # Natural Gas
    "HEATINGOIL",  # Heating Oil
    "CORN",
    "WHEAT",
    "SOYBEANS",
    "COFFEE",
    "SUGAR",
    "COTTON",
    "COCOA",
    "ORANGEJUICE",
    "LEANHOGS",
    "LIVECATTLE",
    "FEEDERCATTLE",
    "OATS",
    "ROUGH_RICE",
    "SOYMEAL",
    "SOYOIL",
    "LUMBER",
]

# Twelve Data only quotes the spot metals reliably. Its plain futures tickers
# resolve to unrelated equities on some plans (e.g. "WTI" is W&T Offshore, a ~$3
# stock, not crude oil), so everything else is sourced from the futures fallback.
TWELVEDATA_SUPPORTED = {"XAUUSD", "XAGUSD", "PLATINUM", "PALLADIUM"}

# Display symbol -> Twelve Data symbol (spot metals only)
SYMBOL_MAP = {
    "XAUUSD": "XAU/USD",
    "XAGUSD": "XAG/USD",
    "PLATINUM": "XPT/USD",
    "PALLADIUM": "XPD/USD",
}

COMMODITY_NAMES = {
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


class CommoditiesProvider(BaseMarketProvider):
    """Provider for commodities market data."""

    name = "twelvedata"
    asset_class = "commodities"

    # Twelve Data's free tier has per-minute and daily credit limits. When the
    # daily limit is hit, stop for a longer period and let Yahoo futures handle it.
    RATE_LIMIT_COOLDOWN = 300.0
    # Symbols per request once the free-tier limit has been observed. The window
    # then rotates so the whole universe refreshes over consecutive cycles.
    THROTTLED_BATCH_SIZE = 8

    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.twelvedata_api_key

        self.base_url = "https://api.twelvedata.com"
        self._blocked_until = 0.0
        # Set once the plan's per-minute credit limit has been hit.
        self._batch_size: Optional[int] = None
        self._rotation_offset = 0

        if not self.api_key:
            logger.warning(
                "Twelve Data not configured - commodities rely on the futures fallback",
                missing_key="TWELVEDATA_API_KEY",
            )

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch commodity prices."""
        results: List[MarketDataPoint] = []

        quotable = [s for s in symbols if self._display_symbol(s) in TWELVEDATA_SUPPORTED]

        if quotable and self.api_key and time.monotonic() >= self._blocked_until:
            requested = self._next_window(quotable)
            results = await self._fetch_from_twelvedata(requested)
            # Symbols outside this window keep their most recent live reading.
            results.extend(
                cached
                for sym in symbols
                if sym not in requested
                and (cached := self.get_cached(self._display_symbol(sym))) is not None
                and cached.price > 0
                and cached.status == "ok"
            )

        # Alpha Vantage is deliberately not used here: its GLOBAL_QUOTE endpoint
        # returns an empty body for futures tickers (GC=F, CL=F, ...) and spends
        # a slot from a 25-request daily quota doing it.

        if not self.api_key:
            logger.warning("No Twelve Data key configured for commodities.")
            return [MarketDataPoint.unavailable(sym, "commodities", self.name) for sym in symbols]

        returned = {r.symbol for r in results}
        results.extend(
            MarketDataPoint.unavailable(self._display_symbol(sym), "commodities", self.name)
            for sym in symbols
            if self._display_symbol(sym) not in returned
        )
        
        self._update_cache(results)
        return results
    
    async def _fetch_from_twelvedata(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch from Twelve Data API."""
        results = []
        
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                # Map to Twelve Data symbols
                td_symbols = [SYMBOL_MAP.get(self._display_symbol(s), s) for s in symbols]
                sym_str = ",".join(td_symbols)
                
                url = f"{self.base_url}/quote"
                params = {
                    "symbol": sym_str,
                    "apikey": self.api_key,
                    "interval": "1day"
                }
                
                resp = await client.get(url, params=params)
                resp.raise_for_status()
                data = resp.json()
                
                # Check for errors
                if "status" in data and data["status"] == "error":
                    msg = data.get("message", "")
                    logger.error(f"Twelve Data commodities error: {msg}")
                    if data.get("code") == 429 or "run out" in msg.lower() or "credit" in msg.lower():
                        self._enter_cooldown()
                    return [MarketDataPoint.unavailable(sym, "commodities", self.name) for sym in symbols]
                
                if len(symbols) == 1 and "symbol" in data:
                    data = {td_symbols[0]: data}

                for symbol in symbols:
                    display_symbol = self._display_symbol(symbol)
                    td_sym = SYMBOL_MAP.get(display_symbol, symbol)
                    
                    if td_sym in data:
                        quote = data[td_sym]
                        parsed = self._parse_twelvedata_quote(display_symbol, quote)
                        if parsed:
                            results.append(parsed)
                        else:
                            results.append(MarketDataPoint.unavailable(symbol, "commodities", self.name))
                    else:
                        results.append(MarketDataPoint.unavailable(symbol, "commodities", self.name))
                        
        except httpx.HTTPStatusError as e:
            logger.error(f"Twelve Data commodities HTTP error: {e.response.status_code}")
            if e.response.status_code == 429:
                self._enter_cooldown()
            return [MarketDataPoint.unavailable(sym, "commodities", self.name) for sym in symbols]
        except Exception as e:
            logger.error(f"Error fetching commodities from Twelve Data: {e}")
            return [MarketDataPoint.unavailable(sym, "commodities", self.name) for sym in symbols]

        return results
    
    def _parse_twelvedata_quote(self, symbol: str, quote: dict) -> Optional[MarketDataPoint]:
        """Parse Twelve Data quote for commodity."""
        try:
            price = quote.get("close") or quote.get("price")
            if price is None:
                return None
            
            price = float(price)
            change = float(quote.get("percent_change", 0))
            
            ts_str = quote.get("timestamp") or quote.get("datetime")
            if ts_str:
                try:
                    if isinstance(ts_str, int):
                        timestamp = ts_str * 1000
                    else:
                        dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
                        timestamp = int(dt.timestamp() * 1000)
                except:
                    timestamp = int(datetime.now(UTC).timestamp() * 1000)
            else:
                timestamp = int(datetime.now(UTC).timestamp() * 1000)
            
            return MarketDataPoint(
                symbol=symbol,
                asset_class="commodities",
                price=price,
                change=round(change, 4),
                timestamp=timestamp,
                source=self.name,
                volume=float(quote.get("volume", 0)),
                high_24h=float(quote.get("high", 0)),
                low_24h=float(quote.get("low", 0)),
                open_24h=float(quote.get("open", 0)),
                name=COMMODITY_NAMES.get(symbol, symbol),
            )
        except Exception as e:
            logger.error(f"Error parsing commodity quote for {symbol}: {e}")
            return None
    
    def get_default_symbols(self) -> List[str]:
        """Return default commodity symbols."""
        return DEFAULT_COMMODITIES.copy()

    def _display_symbol(self, symbol: str) -> str:
        """Normalize commodity display symbols."""
        return symbol.replace("/", "").upper()

    def _has_valid_price(self, results: List[MarketDataPoint], symbol: str) -> bool:
        display = self._display_symbol(symbol)
        return any(r.symbol == display and r.price > 0 and r.status == "ok" for r in results)

    def _next_window(self, symbols: List[str]) -> List[str]:
        """Pick the slice of symbols to price this cycle.

        Full plans request everything at once. Once the free-tier credit limit
        has been seen, requests shrink to a rotating window so the whole
        universe still refreshes over a few cycles instead of always failing.
        """
        if self._batch_size is None or self._batch_size >= len(symbols):
            return list(symbols)

        size = self._batch_size
        start = self._rotation_offset % len(symbols)
        window = (symbols + symbols)[start:start + size]
        self._rotation_offset = (start + size) % len(symbols)
        return window

    def _enter_cooldown(self) -> None:
        """Pause Twelve Data calls until its rate-limit window rolls over."""
        self._blocked_until = time.monotonic() + self.RATE_LIMIT_COOLDOWN
        if self._batch_size is None:
            self._batch_size = self.THROTTLED_BATCH_SIZE
            logger.warning(
                f"Twelve Data credit limit reached - switching commodities to "
                f"rotating batches of {self._batch_size}"
            )
        logger.warning(
            f"Twelve Data rate limited - pausing commodity calls for {self.RATE_LIMIT_COOLDOWN:.0f}s"
        )


# Singleton factory
_commodities_provider: Optional[CommoditiesProvider] = None


def get_commodities_provider() -> CommoditiesProvider:
    """Get Commodities provider singleton."""
    global _commodities_provider
    if _commodities_provider is None:
        _commodities_provider = CommoditiesProvider()
    return _commodities_provider
