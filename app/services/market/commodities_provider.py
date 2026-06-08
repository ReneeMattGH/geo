"""Commodities market data provider.

Fetches real-time prices for Gold, Silver, Oil and other commodities.
Uses Twelve Data API or Alpha Vantage as fallback.
"""
from __future__ import annotations

from datetime import datetime, UTC
from typing import List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Major commodities to track
DEFAULT_COMMODITIES = [
    "XAU/USD",  # Gold
    "XAG/USD",  # Silver
    "WTI",      # West Texas Intermediate Oil
    "BRENT",    # Brent Crude Oil
    "NATGAS",   # Natural Gas
]

# Symbol mapping for different APIs
SYMBOL_MAP = {
    "XAU/USD": {"twelvedata": "XAU/USD", "alphavantage": "GC=F"},
    "XAG/USD": {"twelvedata": "XAG/USD", "alphavantage": "SI=F"},
    "WTI": {"twelvedata": "WTI", "alphavantage": "CL=F"},
    "BRENT": {"twelvedata": "BRENT", "alphavantage": "BZ=F"},
    "NATGAS": {"twelvedata": "NATGAS", "alphavantage": "NG=F"},
}


class CommoditiesProvider(BaseMarketProvider):
    """Provider for commodities market data."""
    
    name = "twelvedata"
    asset_class = "commodities"
    
    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.twelvedata_api_key
        self.backup_key = self.settings.alphavantage_api_key
        
        self.base_url = "https://api.twelvedata.com"
        self.backup_url = "https://www.alphavantage.co/query"
        
        if not self.api_key and not self.backup_key:
            logger.warning(
                "No commodities API keys configured - commodities unavailable",
                missing_keys=["TWELVEDATA_API_KEY", "ALPHAVANTAGE_API_KEY"]
            )
    
    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch commodity prices."""
        # Try Twelve Data first
        if self.api_key:
            results = await self._fetch_from_twelvedata(symbols)
            # Check if we got valid data, otherwise try backup
            if not all(r.price > 0 for r in results):
                logger.warning("Some commodities unavailable from Twelve Data, trying backup...")
        
        # Try Alpha Vantage as backup
        if self.backup_key:
            results = await self._fetch_from_alphavantage(symbols)
        
        # If no keys, return unavailable
        if not self.api_key and not self.backup_key:
            logger.warning("No API keys configured for commodities.")
            return [MarketDataPoint.unavailable(sym, "commodities", self.name) for sym in symbols]
        
        self._update_cache(results)
        return results
    
    async def _fetch_from_twelvedata(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch from Twelve Data API."""
        results = []
        
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                # Map to Twelve Data symbols
                td_symbols = [SYMBOL_MAP.get(s, {}).get("twelvedata", s) for s in symbols]
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
                    logger.error(f"Twelve Data commodities error: {data.get('message')}")
                    return [MarketDataPoint.unavailable(sym, "commodities", self.name) for sym in symbols]
                
                # Parse results
                for symbol in symbols:
                    td_sym = SYMBOL_MAP.get(symbol, {}).get("twelvedata", symbol)
                    
                    if td_sym in data:
                        quote = data[td_sym]
                        parsed = self._parse_twelvedata_quote(symbol, quote)
                        if parsed:
                            results.append(parsed)
                        else:
                            results.append(MarketDataPoint.unavailable(symbol, "commodities", self.name))
                    else:
                        results.append(MarketDataPoint.unavailable(symbol, "commodities", self.name))
                        
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
            )
        except Exception as e:
            logger.error(f"Error parsing commodity quote for {symbol}: {e}")
            return None
    
    async def _fetch_from_alphavantage(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch from Alpha Vantage as backup."""
        results = []
        
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                for symbol in symbols:
                    av_sym = SYMBOL_MAP.get(symbol, {}).get("alphavantage", symbol)
                    
                    params = {
                        "function": "GLOBAL_QUOTE",
                        "symbol": av_sym,
                        "apikey": self.backup_key
                    }
                    
                    resp = await client.get(self.backup_url, params=params)
                    resp.raise_for_status()
                    data = resp.json()
                    
                    if "Global Quote" in data:
                        quote = data["Global Quote"]
                        parsed = self._parse_alphavantage_quote(symbol, quote)
                        if parsed:
                            results.append(parsed)
                        else:
                            results.append(MarketDataPoint.unavailable(symbol, "commodities", self.name))
                    else:
                        results.append(MarketDataPoint.unavailable(symbol, "commodities", self.name))
                        
        except Exception as e:
            logger.error(f"Error fetching commodities from Alpha Vantage: {e}")
            # Fill remaining with unavailable
            remaining = [sym for sym in symbols if sym not in [r.symbol for r in results]]
            results.extend([MarketDataPoint.unavailable(sym, "commodities", "alphavantage") for sym in remaining])
        
        return results
    
    def _parse_alphavantage_quote(self, symbol: str, quote: dict) -> Optional[MarketDataPoint]:
        """Parse Alpha Vantage Global Quote."""
        try:
            price = float(quote.get("05. price", 0))
            if price == 0:
                return None
            
            change_pct = quote.get("10. change percent", "0%")
            change = float(change_pct.replace("%", "")) if change_pct else 0
            
            timestamp = int(datetime.now(UTC).timestamp() * 1000)
            
            return MarketDataPoint(
                symbol=symbol,
                asset_class="commodities",
                price=price,
                change=round(change, 4),
                timestamp=timestamp,
                source="alphavantage",
                volume=float(quote.get("06. volume", 0)),
                high_24h=float(quote.get("03. high", 0)),
                low_24h=float(quote.get("04. low", 0)),
                open_24h=float(quote.get("02. open", 0)),
            )
        except Exception as e:
            logger.error(f"Error parsing Alpha Vantage quote for {symbol}: {e}")
            return None
    
    def get_default_symbols(self) -> List[str]:
        """Return default commodity symbols."""
        return DEFAULT_COMMODITIES.copy()


# Singleton factory
_commodities_provider: Optional[CommoditiesProvider] = None


def get_commodities_provider() -> CommoditiesProvider:
    """Get Commodities provider singleton."""
    global _commodities_provider
    if _commodities_provider is None:
        _commodities_provider = CommoditiesProvider()
    return _commodities_provider
