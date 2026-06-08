"""Commodities data service — fetches real-time commodity prices.

Uses Twelve Data or Alpha Vantage for Metals, Energy, and Agriculture.
"""
from __future__ import annotations

import asyncio
from datetime import datetime, UTC
from typing import Any, Dict, List

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.config.asset_universe import ASSET_UNIVERSE

logger = get_logger(__name__)

class CommoditiesService:
    """Service to handle all Commodities market data requests."""
    
    def __init__(self) -> None:
        self.settings = get_settings()
        self.api_key = self.settings.twelvedata_api_key or self.settings.alphavantage_api_key
        self.base_url = "https://api.twelvedata.com" if self.settings.twelvedata_api_key else "https://www.alphavantage.co/query"

    async def fetch_latest_quotes(self, symbols: List[str] | None = None) -> List[Dict[str, Any]]:
        """Fetch the latest quotes for the given Commodity symbols."""
        if not symbols:
            symbols = [a["symbol"] for a in ASSET_UNIVERSE["commodities"]]
        
        if not self.api_key:
            logger.warning("No Commodities API key configured (TwelveData or AlphaVantage). Returning empty.")
            return []

        results = []
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                if "twelvedata" in self.base_url:
                    sym_str = ",".join(symbols)
                    resp = await client.get(f"{self.base_url}/quote", params={
                        "symbol": sym_str,
                        "apikey": self.api_key
                    })
                    resp.raise_for_status()
                    data = resp.json()
                    
                    if len(symbols) == 1:
                        data = {symbols[0]: data}
                    
                    for sym, quote in data.items():
                        if "price" in quote:
                            results.append(self._normalize_twelvedata(sym, quote))
                else:
                    # Alpha Vantage - Commodities use different functions
                    for sym in symbols:
                        # Map internal symbol to Alpha Vantage commodity functions
                        # Example: Gold uses GLOBAL_QUOTE for GC=F (ETF proxy GLD might be better for free tier)
                        resp = await client.get(self.base_url, params={
                            "function": "GLOBAL_QUOTE",
                            "symbol": sym, # Assuming symbols like GC=F or XAUUSD work
                            "apikey": self.api_key
                        })
                        resp.raise_for_status()
                        data = resp.json()
                        if "Global Quote" in data:
                            results.append(self._normalize_alphavantage(sym, data["Global Quote"]))
        except Exception as e:
            logger.error(f"Error fetching Commodities quotes: {e}")
            return []

        return results

    def _normalize_twelvedata(self, symbol: str, quote: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "symbol": symbol,
            "market": "commodities",
            "price": float(quote.get("close") or quote.get("price") or 0),
            "change_24h": float(quote.get("percent_change") or 0),
            "high_24h": float(quote.get("high") or 0),
            "low_24h": float(quote.get("low") or 0),
            "volume": float(quote.get("volume") or 0),
            "timestamp": datetime.now(UTC).isoformat()
        }

    def _normalize_alphavantage(self, symbol: str, quote: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "symbol": symbol,
            "market": "commodities",
            "price": float(quote.get("05. price") or 0),
            "change_24h": float(quote.get("10. change percent")[:-1] or 0),
            "high_24h": float(quote.get("03. high") or 0),
            "low_24h": float(quote.get("04. low") or 0),
            "volume": float(quote.get("06. volume") or 0),
            "timestamp": datetime.now(UTC).isoformat()
        }

_commodities_service: CommoditiesService | None = None

def get_commodities_service() -> CommoditiesService:
    global _commodities_service
    if _commodities_service is None:
        _commodities_service = CommoditiesService()
    return _commodities_service
