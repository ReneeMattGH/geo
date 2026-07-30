"""Market data module.

Provides unified access to market data from multiple providers.
"""
from __future__ import annotations

from app.services.market.base_provider import MarketDataPoint, BaseMarketProvider
from app.services.market.alpaca_provider import AlpacaProvider, get_alpaca_provider
from app.services.market.coingecko_provider import CoinGeckoProvider, get_coingecko_provider
from app.services.market.forex_provider import ForexProvider, get_forex_provider
from app.services.market.commodities_provider import CommoditiesProvider, get_commodities_provider
from app.services.market.fred_provider import FREDProvider, get_fred_provider
from app.services.market.demo_provider import DemoProvider, get_demo_provider
from app.services.market.market_service import (
    UnifiedMarketService,
    get_unified_market_service,
    get_all_markets,
    get_by_asset_class,
    get_stocks,
    get_crypto,
    get_forex,
    get_commodities,
    get_bonds,
)
from app.services.market.ws_broadcaster import (
    MarketDataBroadcaster,
    get_market_broadcaster,
    start_market_broadcasting,
    stop_market_broadcasting,
)

__all__ = [
    # Base
    "MarketDataPoint",
    "BaseMarketProvider",
    # Providers
    "AlpacaProvider",
    "CoinGeckoProvider",
    "ForexProvider",
    "CommoditiesProvider",
    "FREDProvider",
    "DemoProvider",
    "get_alpaca_provider",
    "get_coingecko_provider",
    "get_forex_provider",
    "get_commodities_provider",
    "get_fred_provider",
    "get_demo_provider",
    # Service
    "UnifiedMarketService",
    "get_unified_market_service",
    "get_all_markets",
    "get_by_asset_class",
    "get_stocks",
    "get_crypto",
    "get_forex",
    "get_commodities",
    "get_bonds",
    # WebSocket
    "MarketDataBroadcaster",
    "get_market_broadcaster",
    "start_market_broadcasting",
    "stop_market_broadcasting",
]
