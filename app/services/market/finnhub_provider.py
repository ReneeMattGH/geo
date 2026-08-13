"""Finnhub market data provider for US equities and ETFs.

Finnhub's free tier serves real-time US quotes at 60 requests/minute with one
request per symbol, so it is used to fill gaps left by the batch providers
rather than as a bulk source.
"""
from __future__ import annotations

import asyncio
import time
from datetime import UTC, datetime
from typing import List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)


class FinnhubProvider(BaseMarketProvider):
    """Per-symbol quote provider for stocks and ETFs."""

    name = "finnhub"
    asset_class = "stocks"

    BASE_URL = "https://finnhub.io/api/v1"
    MAX_CONCURRENCY = 5
    # Free tier allows 60 calls/minute per key.
    CALLS_PER_MINUTE = 55
    RATE_WINDOW = 60.0

    PLACEHOLDER_PATTERNS = ("your_", "xxx", "placeholder", "change_me", "todo")

    def __init__(self) -> None:
        super().__init__()
        settings = get_settings()
        self._keys = [
            key
            for key in (settings.finnhub_api_key, settings.finnhub_api_key_2)
            if key and not any(key.lower().startswith(p) for p in self.PLACEHOLDER_PATTERNS)
        ]
        self.is_configured = bool(self._keys)
        self._key_index = 0
        # Rolling window of request timestamps used to stay under the quota.
        self._recent_calls: List[float] = []

        if not self.is_configured:
            logger.info(
                "Finnhub API key not set - equity gap-filling disabled",
                missing_key="FINNHUB_API_KEY",
            )

    @property
    def budget(self) -> int:
        """Requests still available in the current rolling minute."""
        cutoff = time.monotonic() - self.RATE_WINDOW
        self._recent_calls = [t for t in self._recent_calls if t > cutoff]
        allowance = self.CALLS_PER_MINUTE * max(len(self._keys), 1)
        return max(0, allowance - len(self._recent_calls))

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch quotes for the given symbols, tagged as stocks."""
        return await self.fetch_symbols(symbols, "stocks")

    async def fetch_symbols(
        self,
        symbols: List[str],
        asset_class: str,
    ) -> List[MarketDataPoint]:
        """Fetch quotes and tag rows with the requested asset class."""
        if not symbols or not self.is_configured:
            return []

        budget = self.budget
        capped = symbols[:budget]
        if len(capped) < len(symbols):
            logger.warning(
                f"Finnhub: pricing {len(capped)} of {len(symbols)} {asset_class} "
                f"symbols - only {budget} requests left in this minute"
            )
        if not capped:
            return []

        self._recent_calls.extend([time.monotonic()] * len(capped))

        semaphore = asyncio.Semaphore(self.MAX_CONCURRENCY)
        async with httpx.AsyncClient(timeout=10.0) as client:
            results = await asyncio.gather(
                *(self._fetch_one(client, semaphore, sym, asset_class) for sym in capped),
                return_exceptions=True,
            )

        points = [r for r in results if isinstance(r, MarketDataPoint)]
        for symbol, result in zip(capped, results):
            if isinstance(result, Exception):
                logger.warning(f"Finnhub fetch failed for {symbol}: {result}")

        self._update_cache(points)
        return points

    async def _fetch_one(
        self,
        client: httpx.AsyncClient,
        semaphore: asyncio.Semaphore,
        symbol: str,
        asset_class: str,
    ) -> Optional[MarketDataPoint]:
        async with semaphore:
            resp = await client.get(
                f"{self.BASE_URL}/quote",
                params={"symbol": symbol, "token": self._next_key()},
            )
            if resp.status_code == 429:
                logger.warning(f"Finnhub rate limit hit for {symbol}")
                return None
            resp.raise_for_status()
            data = resp.json()

        price = float(data.get("c") or 0)
        if price <= 0:
            return None

        market_time = data.get("t")
        timestamp = (
            int(market_time * 1000)
            if isinstance(market_time, (int, float)) and market_time
            else int(datetime.now(UTC).timestamp() * 1000)
        )

        return MarketDataPoint(
            symbol=symbol,
            asset_class=asset_class,
            price=price,
            change=round(float(data.get("dp") or 0), 4),
            timestamp=timestamp,
            source=self.name,
            volume=0.0,  # Not returned by the quote endpoint
            high_24h=float(data.get("h") or 0),
            low_24h=float(data.get("l") or 0),
            open_24h=float(data.get("o") or 0),
            name=symbol,
        )

    def _next_key(self) -> str:
        """Round-robin across configured keys to spread the rate limit."""
        key = self._keys[self._key_index % len(self._keys)]
        self._key_index += 1
        return key

    def get_default_symbols(self) -> List[str]:
        """Finnhub has no universe of its own; it prices whatever it is asked for."""
        return []


# Singleton factory
_finnhub_provider: Optional[FinnhubProvider] = None


def get_finnhub_provider() -> FinnhubProvider:
    """Get Finnhub provider singleton."""
    global _finnhub_provider
    if _finnhub_provider is None:
        _finnhub_provider = FinnhubProvider()
    return _finnhub_provider
