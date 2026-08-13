"""FRED (Federal Reserve Economic Data) provider for bonds.

Fetches treasury yields and economic indicators.
Uses the FRED API (https://fred.stlouisfed.org/) when an API key is configured,
and falls back to FRED's public `fredgraph.csv` download, which needs no key, so
bond data is always live rather than blank.
"""
from __future__ import annotations

import asyncio
from datetime import datetime, UTC
from typing import Dict, List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Major treasury yields and economic indicators
DEFAULT_BONDS = [
    "US01M",
    "US03M",
    "US06M",
    "US01Y",
    "US02Y",
    "US03Y",
    "US05Y",
    "US07Y",
    "US10Y",
    "US20Y",
    "US30Y",
    "FEDFUNDS",
    "US10Y2Y",
    "US10Y3M",
    "TIPS05Y",
    "TIPS10Y",
    "TIPS20Y",
    "TIPS30Y",
    "AAA",
    "BAA",
    "SOFR",
    "PRIME",
    "MORTGAGE30Y",
    "MORTGAGE15Y",
    "CORP",
    "HY",
    "CORP_AAA",
    "CORP_AA",
    "CORP_A",
    "CORP_BBB",
]

FRED_SERIES_MAP: Dict[str, str] = {
    "US01M": "DGS1MO",
    "US03M": "DGS3MO",
    "US06M": "DGS6MO",
    "US01Y": "DGS1",
    "US02Y": "DGS2",
    "US03Y": "DGS3",
    "US05Y": "DGS5",
    "US07Y": "DGS7",
    "US10Y": "DGS10",
    "US20Y": "DGS20",
    "US30Y": "DGS30",
    "FEDFUNDS": "DFF",
    "US10Y2Y": "T10Y2Y",
    "US10Y3M": "T10Y3M",
    "TIPS05Y": "DFII5",
    "TIPS10Y": "DFII10",
    "TIPS20Y": "DFII20",
    "TIPS30Y": "DFII30",
    "AAA": "AAA",
    "BAA": "BAA",
    "SOFR": "SOFR",
    "PRIME": "DPRIME",
    "MORTGAGE30Y": "MORTGAGE30US",
    "MORTGAGE15Y": "MORTGAGE15US",
    "CORP": "BAMLC0A0CMEY",
    "HY": "BAMLH0A0HYM2EY",
    "CORP_AAA": "BAMLC0A1CAAAEY",
    "CORP_AA": "BAMLC0A2CAAEY",
    "CORP_A": "BAMLC0A3CAEY",
    "CORP_BBB": "BAMLC0A4CBBBEY",
}

# Human-readable names for bonds
BOND_NAMES: Dict[str, str] = {
    "US01M": "US 1-Month Treasury",
    "US03M": "US 3-Month Treasury",
    "US06M": "US 6-Month Treasury",
    "US01Y": "US 1-Year Treasury",
    "US02Y": "US 2-Year Treasury",
    "US03Y": "US 3-Year Treasury",
    "US05Y": "US 5-Year Treasury",
    "US07Y": "US 7-Year Treasury",
    "US10Y": "US 10-Year Treasury",
    "US20Y": "US 20-Year Treasury",
    "US30Y": "US 30-Year Treasury",
    "FEDFUNDS": "Federal Funds Rate",
    "US10Y2Y": "10Y-2Y Treasury Spread",
    "US10Y3M": "10Y-3M Treasury Spread",
    "TIPS05Y": "US 5-Year TIPS",
    "TIPS10Y": "US 10-Year TIPS",
    "TIPS20Y": "US 20-Year TIPS",
    "TIPS30Y": "US 30-Year TIPS",
    "AAA": "Moody's Seasoned AAA Corporate Bond Yield",
    "BAA": "Moody's Seasoned BAA Corporate Bond Yield",
    "SOFR": "Secured Overnight Financing Rate",
    "PRIME": "US Bank Prime Loan Rate",
    "MORTGAGE30Y": "US 30-Year Fixed Mortgage Rate",
    "MORTGAGE15Y": "US 15-Year Fixed Mortgage Rate",
    "CORP": "ICE BofA US Corporate Effective Yield",
    "HY": "ICE BofA US High Yield Effective Yield",
    "CORP_AAA": "ICE BofA AAA US Corporate Effective Yield",
    "CORP_AA": "ICE BofA AA US Corporate Effective Yield",
    "CORP_A": "ICE BofA A US Corporate Effective Yield",
    "CORP_BBB": "ICE BofA BBB US Corporate Effective Yield",
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
        self.csv_url = "https://fred.stlouisfed.org/graph/fredgraph.csv"
        self.is_configured = bool(self.api_key)

        if not self.is_configured:
            logger.info(
                "FRED API key not set - using the public fredgraph.csv feed for bonds",
                missing_key="FRED_API_KEY"
            )

    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch treasury yields from FRED.

        Args:
            symbols: List of bond aliases (e.g., "US10Y") or FRED series IDs

        Returns:
            List of MarketDataPoint objects
        """
        results = []

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                semaphore = asyncio.Semaphore(6)
                fetched = await asyncio.gather(
                    *(self._fetch_one(client, semaphore, symbol) for symbol in symbols),
                    return_exceptions=True,
                )
                for symbol, dp in zip(symbols, fetched):
                    if isinstance(dp, MarketDataPoint):
                        results.append(dp)
                    else:
                        if isinstance(dp, Exception):
                            logger.error(f"Error fetching FRED series {symbol}: {dp}")
                        results.append(self._unavailable(symbol))

        except Exception as e:
            logger.error(f"Error fetching bond data from FRED: {e}")
            # Return unavailable for all symbols
            return [self._unavailable(sym) for sym in symbols]

        self._update_cache(results)
        return results

    async def _fetch_one(
        self,
        client: httpx.AsyncClient,
        semaphore: asyncio.Semaphore,
        symbol: str,
    ) -> Optional[MarketDataPoint]:
        """Fetch one series, preferring the keyed API and falling back to CSV."""
        async with semaphore:
            dp: Optional[MarketDataPoint] = None
            if self.is_configured:
                dp = await self._fetch_series(client, symbol)
            if dp is None:
                dp = await self._fetch_series_csv(client, symbol)
            return dp

    async def _fetch_series(self, client: httpx.AsyncClient, series_id: str) -> Optional[MarketDataPoint]:
        """Fetch a single FRED series."""
        try:
            display_symbol = series_id.upper()
            fred_series_id = FRED_SERIES_MAP.get(display_symbol, display_symbol)
            url = f"{self.base_url}/series/observations"
            params = {
                "series_id": fred_series_id,
                "api_key": self.api_key,
                "file_type": "json",
                "sort_order": "desc",  # Latest first
                "limit": 10,  # Extra rows so holiday gaps ('.') can be skipped
            }
            
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
            
            observations = data.get("observations", [])
            if len(observations) < 1:
                logger.warning(f"No observations for FRED series {series_id}")
                return None
            
            # Latest observation first; scan back for the newest usable value
            # (FRED reports holidays/weekends as ".").
            values = [
                (obs.get("date", ""), self._parse_value(obs.get("value")))
                for obs in observations
            ]
            usable = [(date, value) for date, value in values if value is not None]
            if not usable:
                logger.warning(f"Invalid value for FRED series {series_id}")
                return None

            date_str, current_value = usable[0]
            prev_value = usable[1][1] if len(usable) > 1 else None

            return self._build_point(display_symbol, current_value, prev_value, date_str, self.name)

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

    async def _fetch_series_csv(
        self,
        client: httpx.AsyncClient,
        series_id: str,
    ) -> Optional[MarketDataPoint]:
        """Fetch a series from FRED's public CSV download (no API key required)."""
        display_symbol = series_id.upper()
        fred_series_id = FRED_SERIES_MAP.get(display_symbol, display_symbol)

        try:
            resp = await client.get(self.csv_url, params={"id": fred_series_id})
            resp.raise_for_status()

            rows = [line for line in resp.text.strip().splitlines() if line.strip()]
            if len(rows) < 2:
                logger.warning(f"No CSV observations for FRED series {fred_series_id}")
                return None

            # Rows are oldest-first: `observation_date,SERIES_ID`.
            usable: List[tuple[str, float]] = []
            for line in reversed(rows[1:]):
                date_str, _, raw_value = line.partition(",")
                value = self._parse_value(raw_value.strip())
                if value is not None:
                    usable.append((date_str.strip(), value))
                if len(usable) == 2:
                    break

            if not usable:
                logger.warning(f"No usable CSV values for FRED series {fred_series_id}")
                return None

            date_str, current_value = usable[0]
            prev_value = usable[1][1] if len(usable) > 1 else None

            return self._build_point(
                display_symbol, current_value, prev_value, date_str, "fred:csv"
            )

        except Exception as e:
            logger.error(f"Error fetching FRED CSV series {fred_series_id}: {e}")
            return None

    def _build_point(
        self,
        display_symbol: str,
        current_value: float,
        prev_value: Optional[float],
        date_str: str,
        source: str,
    ) -> MarketDataPoint:
        """Build a bond MarketDataPoint from two consecutive observations."""
        change = 0.0
        if prev_value:
            change = ((current_value - prev_value) / abs(prev_value)) * 100

        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=UTC)
            timestamp = int(dt.timestamp() * 1000)
        except (ValueError, TypeError):
            timestamp = int(datetime.now(UTC).timestamp() * 1000)

        return MarketDataPoint(
            symbol=display_symbol,
            asset_class="bonds",
            price=current_value,
            change=round(change, 4),
            timestamp=timestamp,
            source=source,
            volume=0.0,
            high_24h=current_value,
            low_24h=current_value,
            open_24h=prev_value if prev_value else current_value,
            name=self.get_bond_name(display_symbol),
            data_status="delayed",
        )

    def _unavailable(self, symbol: str) -> MarketDataPoint:
        point = MarketDataPoint.unavailable(symbol.upper(), "bonds", self.name)
        point.name = self.get_bond_name(symbol.upper())
        return point

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
        display_symbol = symbol.upper()
        for alias, series_id in FRED_SERIES_MAP.items():
            if display_symbol == series_id:
                display_symbol = alias
                break
        return BOND_NAMES.get(display_symbol, symbol)


# Singleton factory
_fred_provider: Optional[FREDProvider] = None


def get_fred_provider() -> FREDProvider:
    """Get FRED provider singleton."""
    global _fred_provider
    if _fred_provider is None:
        _fred_provider = FREDProvider()
    return _fred_provider
