"""FRED (Federal Reserve Economic Data) provider for bonds.

Fetches treasury yields and economic indicators.
Uses FRED API (https://fred.stlouisfed.org/)
"""
from __future__ import annotations

from datetime import datetime, UTC
from typing import Dict, List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Major treasury yields and economic indicators
DEFAULT_BONDS = [
    "DGS1MO",   # 1-Month Treasury Constant Maturity Rate
    "DGS3MO",   # 3-Month Treasury Constant Maturity Rate
    "DGS6MO",   # 6-Month Treasury Constant Maturity Rate
    "DGS1",     # 1-Year Treasury Constant Maturity Rate
    "DGS2",     # 2-Year Treasury Constant Maturity Rate
    "DGS5",     # 5-Year Treasury Constant Maturity Rate
    "DGS10",    # 10-Year Treasury Constant Maturity Rate
    "DGS30",    # 30-Year Treasury Constant Maturity Rate
    "DFF",      # Federal Funds Effective Rate
    "T10Y2Y",   # 10-Year Treasury Constant Maturity Minus 2-Year
]

# Human-readable names for bonds
BOND_NAMES: Dict[str, str] = {
    "DGS1MO": "US 1-Month Treasury",
    "DGS3MO": "US 3-Month Treasury",
    "DGS6MO": "US 6-Month Treasury",
    "DGS1": "US 1-Year Treasury",
    "DGS2": "US 2-Year Treasury",
    "DGS5": "US 5-Year Treasury",
    "DGS10": "US 10-Year Treasury",
    "DGS30": "US 30-Year Treasury",
    "DFF": "Federal Funds Rate",
    "T10Y2Y": "10Y-2Y Treasury Spread",
}


class FREDProvider(BaseMarketProvider):
    """FRED provider for treasury yields and bond data."""
    
    name = "fred"
    asset_class = "bonds"
    
    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.fred_api_key
        self.base_url = "https://api.stlouisfed.org/fred"
        self.is_configured = bool(self.api_key)
        
        if not self.is_configured:
            logger.warning(
                "FRED API not configured - bond data unavailable",
                missing_key="FRED_API_KEY"
            )
    
    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch treasury yields from FRED.
        
        Args:
            symbols: List of FRED series IDs (e.g., "DGS10", "DGS2")
        
        Returns:
            List of MarketDataPoint objects
        """
        if not self.is_configured:
            logger.warning("No FRED API key configured. Returning unavailable status.")
            return [MarketDataPoint.unavailable(sym, "bonds", self.name) for sym in symbols]
        
        results = []
        
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                # FRED API recommends fetching series one at a time for latest data
                for symbol in symbols:
                    try:
                        dp = await self._fetch_series(client, symbol)
                        if dp:
                            results.append(dp)
                        else:
                            results.append(MarketDataPoint.unavailable(symbol, "bonds", self.name))
                    except Exception as e:
                        logger.error(f"Error fetching FRED series {symbol}: {e}")
                        results.append(MarketDataPoint.unavailable(symbol, "bonds", self.name))
                        
        except Exception as e:
            logger.error(f"Error fetching bond data from FRED: {e}")
            # Return unavailable for all symbols
            return [MarketDataPoint.unavailable(sym, "bonds", self.name) for sym in symbols]
        
        self._update_cache(results)
        return results
    
    async def _fetch_series(self, client: httpx.AsyncClient, series_id: str) -> Optional[MarketDataPoint]:
        """Fetch a single FRED series."""
        try:
            url = f"{self.base_url}/series/observations"
            params = {
                "series_id": series_id,
                "api_key": self.api_key,
                "file_type": "json",
                "sort_order": "desc",  # Latest first
                "limit": 2  # Current and previous for change calc
            }
            
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
            
            observations = data.get("observations", [])
            if len(observations) < 1:
                logger.warning(f"No observations for FRED series {series_id}")
                return None
            
            # Get current and previous values
            current = observations[0]
            current_value = self._parse_value(current.get("value"))
            
            if current_value is None:
                logger.warning(f"Invalid value for FRED series {series_id}")
                return None
            
            # Calculate change
            change = 0.0
            if len(observations) > 1:
                prev_value = self._parse_value(observations[1].get("value"))
                if prev_value and prev_value > 0:
                    change = ((current_value - prev_value) / prev_value) * 100
            
            # Parse date for timestamp
            date_str = current.get("date", "")
            try:
                dt = datetime.strptime(date_str, "%Y-%m-%d")
                timestamp = int(dt.timestamp() * 1000)
            except:
                timestamp = int(datetime.now(UTC).timestamp() * 1000)
            
            return MarketDataPoint(
                symbol=series_id,
                asset_class="bonds",
                price=current_value,
                change=round(change, 4),
                timestamp=timestamp,
                source=self.name,
                volume=0.0,  # Not applicable for yields
                high_24h=current_value,  # Same as price for daily data
                low_24h=current_value,
                open_24h=current_value,
            )
            
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 429:
                logger.warning("FRED rate limit hit")
            elif e.response.status_code == 400:
                logger.error(f"Invalid FRED series ID: {series_id}")
            else:
                logger.error(f"FRED API HTTP error {e.response.status_code}: {e.response.text}")
            return None
        except Exception as e:
            logger.error(f"Error parsing FRED series {series_id}: {e}")
            return None
    
    def _parse_value(self, value: str) -> Optional[float]:
        """Parse FRED value string to float."""
        if value is None or value == "." or value == "":
            return None
        try:
            return float(value)
        except (ValueError, TypeError):
            return None
    
    def get_default_symbols(self) -> List[str]:
        """Return default bond symbols."""
        return DEFAULT_BONDS.copy()
    
    def get_bond_symbols(self) -> List[str]:
        """Return bond symbols - alias for get_default_symbols."""
        return self.get_default_symbols()
    
    def get_bond_name(self, symbol: str) -> str:
        """Get human-readable name for a bond symbol."""
        return BOND_NAMES.get(symbol, symbol)


# Singleton factory
_fred_provider: Optional[FREDProvider] = None


def get_fred_provider() -> FREDProvider:
    """Get FRED provider singleton."""
    global _fred_provider
    if _fred_provider is None:
        _fred_provider = FREDProvider()
    return _fred_provider
