"""Unified Market Service.

Coordinates all market data providers and returns unified responses.
This is the core service for the market data module.
"""
from __future__ import annotations

import asyncio
from datetime import datetime, UTC
from typing import Dict, List, Optional, Any

from app.core.logging import get_logger
from app.services.market.base_provider import MarketDataPoint
from app.services.market.forex_provider import get_forex_provider, DEFAULT_FOREX_PAIRS
from app.services.market.commodities_provider import get_commodities_provider, DEFAULT_COMMODITIES
from app.services.market.fred_provider import get_fred_provider, DEFAULT_BONDS
from app.services.market.alphavantage_provider import AlphaVantageProvider, AlphaVantageCommoditiesProvider
from app.pipelines.market_feeds import RealMarketAdapter, FINNHUB_SYMBOL_MAP, BinanceCryptoAdapter

logger = get_logger(__name__)


class UnifiedMarketService:
    """Core service that coordinates all market data providers.

    Responsibilities:
    - Call all providers concurrently
    - Merge results into unified format
    - Provide filtered access by asset class
    - Handle errors gracefully
    """

    def __init__(self) -> None:
        self.finnhub = RealMarketAdapter()
        self.binance = BinanceCryptoAdapter()
        self.forex = get_forex_provider()
        self.forex_backup = AlphaVantageProvider()
        self.commodities = get_commodities_provider()
        self.commodities_backup = AlphaVantageCommoditiesProvider()
        self.fred = get_fred_provider()

        # In-memory cache for latest data
        self._cache: Dict[str, MarketDataPoint] = {}
        self._last_update: Optional[datetime] = None

    async def get_all_markets(self) -> Dict[str, Any]:
        """Fetch all market data from all providers.

        Returns:
            Unified response with all asset classes
        """
        logger.info("Fetching all market data")

        # Fetch all providers concurrently
        tasks = [
            self._fetch_stocks(),
            self._fetch_crypto(),
            self._fetch_forex(),
            self._fetch_commodities(),
            self._fetch_bonds(),
            self._fetch_etfs(),
            self._fetch_indices(),
        ]

        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Process results
        all_data = {
            "stocks": [],
            "crypto": [],
            "forex": [],
            "commodities": [],
            "bonds": [],
            "etfs": [],
            "indices": [],
        }

        # Stocks
        if isinstance(results[0], list):
            all_data["stocks"] = [s.to_dict() for s in results[0]]
        else:
            logger.error(f"Stocks fetch error: {results[0]}")
            all_data["stocks"] = [{"symbol": s, "status": "unavailable", "source": "alpaca"} for s in DEFAULT_STOCKS[:10]]

        # Crypto (from CoinGecko)
        if isinstance(results[1], list):
            all_data["crypto"] = [c.to_dict() for c in results[1]]
        else:
            logger.error(f"Crypto fetch error: {results[1]}")
            all_data["crypto"] = [{"symbol": c, "status": "unavailable", "source": "coingecko"} for c in self.coingecko.get_default_symbols()[:10]]

        # Forex
        if isinstance(results[2], list):
            all_data["forex"] = [f.to_dict() for f in results[2]]
        else:
            logger.error(f"Forex fetch error: {results[2]}")
            all_data["forex"] = [{"symbol": f, "status": "unavailable", "source": "twelvedata"} for f in DEFAULT_FOREX_PAIRS]

        # Commodities
        if isinstance(results[3], list):
            all_data["commodities"] = [c.to_dict() for c in results[3]]
        else:
            logger.error(f"Commodities fetch error: {results[3]}")
            all_data["commodities"] = [{"symbol": c, "status": "unavailable", "source": "twelvedata"} for c in DEFAULT_COMMODITIES]

        # Bonds
        if isinstance(results[4], list):
            all_data["bonds"] = [b.to_dict() for b in results[4]]
        else:
            logger.error(f"Bonds fetch error: {results[4]}")
            all_data["bonds"] = [{"symbol": b, "status": "unavailable", "source": "fred"} for b in DEFAULT_BONDS]

        # ETFs
        if isinstance(results[5], list):
            all_data["etfs"] = [e.to_dict() for e in results[5]]
        else:
            logger.error(f"ETFs fetch error: {results[5]}")
            all_data["etfs"] = []

        # Indices
        if isinstance(results[6], list):
            all_data["indices"] = [i.to_dict() for i in results[6]]
        else:
            logger.error(f"Indices fetch error: {results[6]}")
            all_data["indices"] = []

        # Update cache
        for asset_class, items in all_data.items():
            for item in items:
                if "symbol" in item and "price" in item:
                    # Reconstruct MarketDataPoint for caching
                    self._cache[item["symbol"]] = MarketDataPoint(
                        symbol=item["symbol"],
                        asset_class=asset_class,
                        price=item.get("price", 0),
                        change=item.get("change", 0),
                        timestamp=item.get("timestamp", 0),
                        source=item.get("source", "unknown"),
                        volume=item.get("volume", 0),
                        high_24h=item.get("high_24h", 0),
                        low_24h=item.get("low_24h", 0),
                        open_24h=item.get("open_24h", 0),
                    )

        self._last_update = datetime.now(UTC)

        return {
            "timestamp": int(datetime.now(UTC).timestamp() * 1000),
            "count": sum(len(v) for v in all_data.values()),
            "data": all_data
        }

    async def get_by_asset_class(self, asset_class: str) -> Dict[str, Any]:
        """Get market data for a specific asset class.

        Args:
            asset_class: One of "stocks", "crypto", "forex", "commodities"

        Returns:
            Market data for the specified asset class
        """
        asset_class = asset_class.lower()

        if asset_class == "stocks":
            data = await self._fetch_stocks()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        elif asset_class == "crypto":
            data = await self._fetch_crypto()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        elif asset_class == "forex":
            data = await self._fetch_forex()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        elif asset_class == "commodities":
            data = await self._fetch_commodities()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        elif asset_class == "bonds":
            data = await self._fetch_bonds()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        elif asset_class == "indices":
            data = await self._fetch_indices()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        elif asset_class == "etfs":
            data = await self._fetch_etfs()
            return {
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "count": len(data),
                "data": [d.to_dict() for d in data]
            }

        else:
            return {
                "error": f"Unknown asset class: {asset_class}",
                "valid_classes": ["stocks", "crypto", "forex", "commodities", "bonds", "indices", "etfs"]
            }

    async def _fetch_stocks(self) -> List[MarketDataPoint]:
        """Fetch stock prices from Finnhub."""
        try:
            # Get top stock symbols from Finnhub symbol map (reduced to avoid rate limits)
            stock_symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "JPM", "V", "WMT"]

            # Use Finnhub adapter
            ticks = await self.finnhub.fetch_latest(stock_symbols)

            # Convert MarketTick to MarketDataPoint
            results = []
            for tick in ticks:
                dp = MarketDataPoint(
                    symbol=tick.symbol,
                    asset_class=tick.asset_class,
                    price=tick.close,
                    change=tick.change_pct() if tick.change_pct else 0,
                    timestamp=int(tick.ts.timestamp() * 1000),
                    source="finnhub",
                    volume=tick.volume,
                    high_24h=tick.high,
                    low_24h=tick.low,
                    open_24h=tick.open
                )
                results.append(dp)

            if not results:
                logger.warning("Finnhub returned no stock data")
                return [MarketDataPoint.unavailable(sym, "stocks", "finnhub") for sym in stock_symbols[:5]]

            return results
        except Exception as e:
            logger.warning(f"Stocks fetch failed: {e}")
            return []

    async def _fetch_crypto(self) -> List[MarketDataPoint]:
        """Fetch crypto prices from Binance (no rate limits)."""
        try:
            # Use Binance symbols
            symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]

            # Use Binance adapter
            ticks = await self.binance.fetch_latest(symbols)

            # Convert MarketTick to MarketDataPoint
            results = []
            for tick in ticks:
                # Convert symbol back to standard format
                symbol = tick.symbol.replace("USDT", "")
                dp = MarketDataPoint(
                    symbol=symbol,
                    asset_class="crypto",
                    price=tick.close,
                    change=0,  # Binance doesn't provide change in this endpoint
                    timestamp=int(tick.ts.timestamp() * 1000),
                    source="binance",
                    volume=tick.volume,
                    high_24h=tick.high,
                    low_24h=tick.low,
                    open_24h=tick.open
                )
                results.append(dp)

            if not results:
                logger.warning("Binance returned no crypto data")
                return [MarketDataPoint.unavailable(sym, "crypto", "binance") for sym in ["BTC", "ETH", "SOL"]]

            return results
        except Exception as e:
            logger.warning(f"Crypto fetch failed: {e}")
            return []

    async def _fetch_forex(self) -> List[MarketDataPoint]:
        """Fetch forex rates from Twelve Data with Alpha Vantage backup."""
        try:
            symbols = self.forex.get_default_symbols()
            results = await self.forex.fetch_prices(symbols)

            # Check if all results have zero price (rate limit)
            if all(r.price == 0 for r in results):
                logger.warning("Twelve Data rate limited, trying Alpha Vantage backup")
                if self.forex_backup.is_configured():
                    results = await self.forex_backup.fetch_prices(symbols)
                    if results:
                        return results
                logger.warning("Forex returned zero prices (rate limit), returning unavailable")
                return [MarketDataPoint.unavailable(sym, "forex", "unavailable") for sym in symbols]
            return results
        except Exception as e:
            logger.warning(f"Forex fetch failed: {e}")
            return []

    async def _fetch_commodities(self) -> List[MarketDataPoint]:
        """Fetch commodity prices from Twelve Data with Alpha Vantage backup."""
        try:
            symbols = self.commodities.get_default_symbols()
            results = await self.commodities.fetch_prices(symbols)

            # Check if all results have zero price (rate limit)
            if all(r.price == 0 for r in results):
                logger.warning("Twelve Data rate limited, trying Alpha Vantage backup")
                if self.commodities_backup.is_configured():
                    results = await self.commodities_backup.fetch_prices(symbols)
                    if results:
                        return results
                logger.warning("Commodities returned zero prices (rate limit), returning unavailable")
                return [MarketDataPoint.unavailable(sym, "commodities", "unavailable") for sym in symbols]
            return results
        except Exception as e:
            logger.warning(f"Commodities fetch failed: {e}")
            return []

    async def _fetch_bonds(self) -> List[MarketDataPoint]:
        """Fetch bond yields from FRED."""
        try:
            symbols = self.fred.get_default_symbols()
            results = await self.fred.fetch_prices(symbols)
            # Check if all results have zero price (API failure)
            if all(r.price == 0 for r in results):
                logger.warning("FRED returned zero prices, returning unavailable")
                return [MarketDataPoint.unavailable(sym, "bonds", "fred") for sym in symbols]
            return results
        except Exception as e:
            logger.warning(f"Bonds fetch failed: {e}")
            return []

    async def _fetch_etfs(self) -> List[MarketDataPoint]:
        """Fetch ETF prices from Finnhub."""
        try:
            # Get ETF symbols from Finnhub symbol map
            etf_symbols = ["SPY", "QQQ", "GLD", "SLV", "USO", "UNG", "WEAT", "TLT", "TIP", "HYG", "LQD", "XLE", "XLF", "XLK", "XLV", "XLI", "ITA", "EEM"]

            # Use Finnhub adapter
            ticks = await self.finnhub.fetch_latest(etf_symbols)

            # Convert MarketTick to MarketDataPoint
            results = []
            for tick in ticks:
                dp = MarketDataPoint(
                    symbol=tick.symbol,
                    asset_class="etfs",
                    price=tick.close,
                    change=tick.change_pct() if tick.change_pct else 0,
                    timestamp=int(tick.ts.timestamp() * 1000),
                    source="finnhub",
                    volume=tick.volume,
                    high_24h=tick.high,
                    low_24h=tick.low,
                    open_24h=tick.open
                )
                results.append(dp)

            return results
        except Exception as e:
            logger.warning(f"ETFs fetch failed: {e}")
            return []

    async def _fetch_indices(self) -> List[MarketDataPoint]:
        """Fetch equity indices from Finnhub (via ETF proxies)."""
        try:
            # Get index symbols from Finnhub symbol map
            index_symbols = ["^GSPC", "^IXIC", "DJI", "DAX", "NKY", "HSI", "FTSE", "CAC", "SSEC", "ASX200", "IBEX", "FTSEMIB"]

            # Use Finnhub adapter
            ticks = await self.finnhub.fetch_latest(index_symbols)

            # Convert MarketTick to MarketDataPoint
            results = []
            for tick in ticks:
                dp = MarketDataPoint(
                    symbol=tick.symbol,
                    asset_class="indices",
                    price=tick.close,
                    change=tick.change_pct() if tick.change_pct else 0,
                    timestamp=int(tick.ts.timestamp() * 1000),
                    source="finnhub",
                    volume=tick.volume,
                    high_24h=tick.high,
                    low_24h=tick.low,
                    open_24h=tick.open
                )
                results.append(dp)

            return results
        except Exception as e:
            logger.warning(f"Indices fetch failed: {e}")
            return []

    def get_cached(self, symbol: str) -> Optional[MarketDataPoint]:
        """Get cached data for a symbol."""
        return self._cache.get(symbol)

    def get_all_cached(self) -> Dict[str, Any]:
        """Get all cached market data."""
        return {
            "timestamp": int(datetime.now(UTC).timestamp() * 1000) if self._last_update else 0,
            "count": len(self._cache),
            "data": {sym: dp.to_dict() for sym, dp in self._cache.items()}
        }

    def get_status(self) -> Dict[str, Any]:
        """Get service status."""
        return {
            "last_update": self._last_update.isoformat() if self._last_update else None,
            "cached_symbols": len(self._cache),
            "providers": {
                "finnhub": self.finnhub.name,
                "binance": self.binance.name,
                "forex": self.forex.name,
                "commodities": self.commodities.name,
                "fred": self.fred.name,
            }
        }


# Singleton factory
_market_service: Optional[UnifiedMarketService] = None


def get_unified_market_service() -> UnifiedMarketService:
    """Get Unified Market Service singleton."""
    global _market_service
    if _market_service is None:
        _market_service = UnifiedMarketService()
    return _market_service


# Convenience functions for API endpoints
async def get_all_markets() -> Dict[str, Any]:
    """Fetch all market data."""
    service = get_unified_market_service()
    return await service.get_all_markets()


async def get_by_asset_class(asset_class: str) -> Dict[str, Any]:
    """Get market data by asset class."""
    service = get_unified_market_service()
    return await service.get_by_asset_class(asset_class)


async def get_stocks() -> Dict[str, Any]:
    """Get stock market data."""
    return await get_by_asset_class("stocks")


async def get_crypto() -> Dict[str, Any]:
    """Get crypto market data."""
    return await get_by_asset_class("crypto")


async def get_forex() -> Dict[str, Any]:
    """Get forex market data."""
    return await get_by_asset_class("forex")


async def get_commodities() -> Dict[str, Any]:
    """Get commodities market data."""
    return await get_by_asset_class("commodities")


async def get_bonds() -> Dict[str, Any]:
    """Get bond market data."""
    return await get_by_asset_class("bonds")
