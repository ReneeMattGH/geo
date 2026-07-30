"""Forex market data provider using Twelve Data.

Fetches real-time FX rates for major currency pairs.
Uses Twelve Data API (https://twelvedata.com/)
"""
from __future__ import annotations

from datetime import datetime, UTC
from typing import List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Top 10 Forex pairs by volume
DEFAULT_FOREX_PAIRS = [
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "USD/CHF",
    "USD/CAD",
    "AUD/USD",
    "NZD/USD",
    "EUR/GBP",
    "EUR/JPY",
    "GBP/JPY"
]


class ForexProvider(BaseMarketProvider):
    """Twelve Data provider for forex market data."""
    
    name = "twelvedata"
    asset_class = "forex"
    
    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.twelvedata_api_key
        self.base_url = "https://api.twelvedata.com"
        
        if not self.api_key:
            logger.warning(
                "Twelve Data API not configured - forex unavailable",
                missing_key="TWELVEDATA_API_KEY"
            )
    
    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch forex rates from Twelve Data."""
        if not self.api_key:
            logger.warning("No Twelve Data API key. Returning unavailable status.")
            return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]
        
        results = []
        
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                # Twelve Data accepts comma-separated symbols
                # Format: EUR/USD,GBP/USD,etc
                sym_str = ",".join(symbols)
                
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
                    logger.error(f"Twelve Data API error: {data.get('message', 'Unknown error')}")
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
                        if symbol in data:
                            parsed = self._parse_quote(symbol, data[symbol])
                            if parsed:
                                results.append(parsed)
                            else:
                                results.append(MarketDataPoint.unavailable(symbol, "forex", self.name))
                        else:
                            logger.warning(f"No data returned for {symbol}")
                            results.append(MarketDataPoint.unavailable(symbol, "forex", self.name))
                            
        except httpx.HTTPStatusError as e:
            logger.error(f"Twelve Data API HTTP error: {e.response.status_code} - {e.response.text}")
            return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]
        except Exception as e:
            logger.error(f"Error fetching forex prices from Twelve Data: {e}")
            return [MarketDataPoint.unavailable(sym, "forex", self.name) for sym in symbols]
        
        self._update_cache(results)
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
            )
        except Exception as e:
            logger.error(f"Error parsing quote for {symbol}: {e}")
            return None
    
    def get_default_symbols(self) -> List[str]:
        """Return default forex pairs."""
        return DEFAULT_FOREX_PAIRS.copy()


# Singleton factory
_forex_provider: Optional[ForexProvider] = None


def get_forex_provider() -> ForexProvider:
    """Get Forex provider singleton."""
    global _forex_provider
    if _forex_provider is None:
        _forex_provider = ForexProvider()
    return _forex_provider
