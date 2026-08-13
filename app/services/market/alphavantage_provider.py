"""Alpha Vantage provider for forex and commodities.

Alpha Vantage is used as a backup when Twelve Data is rate-limited.
"""
from __future__ import annotations

from datetime import datetime, UTC
from typing import List

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Forex pairs supported by Alpha Vantage
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

# Commodities supported by Alpha Vantage
DEFAULT_COMMODITIES = [
    "XAU/USD",  # Gold
    "XAG/USD",  # Silver
    "WTI",      # Crude Oil
    "BRENT",    # Brent Oil
]


class AlphaVantageProvider(BaseMarketProvider):
    """Alpha Vantage provider for forex and commodities."""

    name = "alphavantage"
    asset_class = "forex"

    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.alphavantage_api_key
        self.base_url = "https://www.alphavantage.co/query"

        if not self.api_key:
            logger.warning(
                "Alpha Vantage API not configured - backup unavailable",
                missing_key="ALPHAVANTAGE_API_KEY"
            )

    def is_configured(self) -> bool:
        return bool(self.api_key)

    def get_default_symbols(self) -> List[str]:
        return DEFAULT_FOREX_PAIRS

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch forex prices from Alpha Vantage."""
        if not self.is_configured():
            return []

        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)

        async with httpx.AsyncClient(timeout=10.0) as client:
            for symbol in symbols:
                try:
                    # Parse symbol (e.g., "EUR/USD" -> from=EUR, to=USD)
                    if "/" in symbol:
                        from_curr, to_curr = symbol.split("/", 1)
                    else:
                        continue

                    params = {
                        "function": "CURRENCY_EXCHANGE_RATE",
                        "from_currency": from_curr,
                        "to_currency": to_curr,
                        "apikey": self.api_key
                    }

                    resp = await client.get(self.base_url, params=params)
                    resp.raise_for_status()
                    data = resp.json()

                    # Parse Alpha Vantage response
                    rate_data = data.get("Realtime Currency Exchange Rate", {})
                    if not rate_data:
                        logger.warning(f"Alpha Vantage: No data for {symbol}")
                        continue

                    price = float(rate_data.get("5. Exchange Rate", 0))
                    if price == 0:
                        continue

                    results.append(MarketDataPoint(
                        symbol=symbol,
                        asset_class="forex",
                        price=price,
                        change=0,  # Alpha Vantage doesn't provide change in this endpoint
                        timestamp=timestamp,
                        source="alphavantage",
                        volume=0.0,
                        high_24h=price,
                        low_24h=price,
                        open_24h=price
                    ))

                    # Alpha Vantage has a rate limit of 5 calls per minute for free tier
                    # Add delay to avoid rate limiting
                    import asyncio
                    await asyncio.sleep(12)

                except Exception as e:
                    logger.warning(f"Alpha Vantage error for {symbol}: {e}")
                    continue

        return results


class AlphaVantageCommoditiesProvider(BaseMarketProvider):
    """Alpha Vantage provider for commodities."""

    name = "alphavantage"
    asset_class = "commodities"

    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.api_key = self.settings.alphavantage_api_key
        self.base_url = "https://www.alphavantage.co/query"

        if not self.api_key:
            logger.warning(
                "Alpha Vantage API not configured - commodities backup unavailable",
                missing_key="ALPHAVANTAGE_API_KEY"
            )

    def is_configured(self) -> bool:
        return bool(self.api_key)

    def get_default_symbols(self) -> List[str]:
        return DEFAULT_COMMODITIES

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch commodity prices from Alpha Vantage."""
        if not self.is_configured():
            return []

        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)

        async with httpx.AsyncClient(timeout=10.0) as client:
            for symbol in symbols:
                try:
                    # Map symbols to Alpha Vantage functions
                    if symbol == "XAU/USD":
                        params = {
                            "function": "COMMODITY_EXCHANGE_RATE",
                            "from_currency": "XAU",
                            "to_currency": "USD",
                            "apikey": self.api_key
                        }
                    elif symbol == "XAG/USD":
                        params = {
                            "function": "COMMODITY_EXCHANGE_RATE",
                            "from_currency": "XAG",
                            "to_currency": "USD",
                            "apikey": self.api_key
                        }
                    elif symbol in ["WTI", "BRENT"]:
                        params = {
                            "function": "GLOBAL_QUOTE",
                            "symbol": symbol,
                            "apikey": self.api_key
                        }
                    else:
                        continue

                    resp = await client.get(self.base_url, params=params)
                    resp.raise_for_status()
                    data = resp.json()

                    # Parse response based on function type
                    if "COMMODITY_EXCHANGE_RATE" in params.get("function", ""):
                        rate_data = data.get("data", {})
                        if not rate_data:
                            continue
                        price = float(rate_data.get("5. Exchange Rate", 0))
                    else:
                        quote_data = data.get("Global Quote", {})
                        if not quote_data:
                            continue
                        price = float(quote_data.get("05. price", 0))

                    if price == 0:
                        continue

                    results.append(MarketDataPoint(
                        symbol=symbol,
                        asset_class="commodities",
                        price=price,
                        change=0,
                        timestamp=timestamp,
                        source="alphavantage",
                        volume=0.0,
                        high_24h=price,
                        low_24h=price,
                        open_24h=price
                    ))

                    # Alpha Vantage rate limit
                    import asyncio
                    await asyncio.sleep(12)

                except Exception as e:
                    logger.warning(f"Alpha Vantage commodities error for {symbol}: {e}")
                    continue

        return results
