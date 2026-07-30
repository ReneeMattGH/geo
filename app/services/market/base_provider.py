"""Base provider for market data.

Defines the unified interface and data format for all market data providers.
"""
from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime, UTC
from typing import Any, Dict, List, Optional

from app.core.logging import get_logger

logger = get_logger(__name__)


@dataclass
class MarketDataPoint:
    """Unified market data format for all asset classes.
    
    All providers must return data in this format.
    """
    symbol: str
    asset_class: str  # "stocks", "crypto", "forex", "commodities"
    price: float
    change: float  # 24h change as percentage
    timestamp: int  # Unix timestamp in milliseconds
    source: str  # Provider name
    
    # Optional fields
    volume: float = 0.0
    high_24h: float = 0.0
    low_24h: float = 0.0
    open_24h: float = 0.0
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        return {
            "symbol": self.symbol,
            "asset_class": self.asset_class,
            "price": self.price,
            "change": self.change,
            "timestamp": self.timestamp,
            "source": self.source,
            "volume": self.volume,
            "high_24h": self.high_24h,
            "low_24h": self.low_24h,
            "open_24h": self.open_24h,
        }
    
    @classmethod
    def unavailable(cls, symbol: str, asset_class: str, source: str) -> "MarketDataPoint":
        """Create an unavailable data point."""
        return cls(
            symbol=symbol,
            asset_class=asset_class,
            price=0.0,
            change=0.0,
            timestamp=int(datetime.now(UTC).timestamp() * 1000),
            source=source,
        )


class BaseMarketProvider(ABC):
    """Abstract base class for all market data providers."""
    
    name: str = "base"
    asset_class: str = "unknown"
    
    def __init__(self) -> None:
        self._cache: Dict[str, MarketDataPoint] = {}
        self._last_update: Optional[datetime] = None
    
    @abstractmethod
    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch prices for the given symbols.
        
        Args:
            symbols: List of asset symbols to fetch
            
        Returns:
            List of MarketDataPoint objects
        """
        pass
    
    async def get_all_prices(self) -> List[MarketDataPoint]:
        """Fetch prices for all supported symbols.
        
        Returns:
            List of MarketDataPoint objects for default symbols
        """
        symbols = self.get_default_symbols()
        return await self.fetch_prices(symbols)
    
    @abstractmethod
    def get_default_symbols(self) -> List[str]:
        """Return the default list of symbols for this provider.
        
        Returns:
            List of symbol strings
        """
        pass
    
    def get_cached(self, symbol: str) -> Optional[MarketDataPoint]:
        """Get cached data for a symbol."""
        return self._cache.get(symbol)
    
    def get_all_cached(self) -> List[MarketDataPoint]:
        """Get all cached data points."""
        return list(self._cache.values())
    
    def _update_cache(self, data_points: List[MarketDataPoint]) -> None:
        """Update the cache with new data points."""
        for dp in data_points:
            self._cache[dp.symbol] = dp
        self._last_update = datetime.now(UTC)
    
    def _handle_error(self, symbol: str, error: Exception) -> MarketDataPoint:
        """Handle fetch error by returning unavailable status."""
        logger.error(f"Error fetching {symbol} from {self.name}: {error}")
        return MarketDataPoint.unavailable(symbol, self.asset_class, self.name)
