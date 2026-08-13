"""Alpaca market data provider.

Fetches real-time prices for US stocks and cryptocurrencies.
Uses Alpaca Markets API (https://alpaca.markets/)
"""
from __future__ import annotations

from datetime import datetime, UTC
from typing import List, Optional
from urllib.parse import urljoin

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Top 50 US stocks by liquidity/market cap
DEFAULT_STOCKS = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "AVGO", "TSM",
    "V", "JPM", "WMT", "UNH", "MA", "XOM", "HD", "PG", "JNJ", "BAC",
    "COST", "ABBV", "NFLX", "KO", "CRM", "PEP", "TMO", "ADBE", "WFC", "CSCO",
    "MRK", "TMUS", "AMD", "ACN", "DIS", "ABT", "GE", "CAT", "VZ", "DHR",
    "TXN", "NEE", "PM", "IBM", "AMGN", "UBER", "BMY", "PFE", "CMCSA", "COP",
    "LMT", "RTX", "NOC", "GD", "CVX", "GS", "BA",
]

# Liquid ETFs used by the portfolio and market browser.
DEFAULT_ETFS = [
    "SPY", "QQQ", "DIA", "IWM", "VTI", "VOO", "VEA", "VWO", "EEM", "GLD",
    "SLV", "TLT", "HYG", "LQD", "XLE", "XLF", "XLK", "XLV", "XLI", "ITA",
    "XLP", "XLU", "XLB", "XLC", "XBI", "SMH", "SOXX", "ARKK", "VNQ", "IYR",
    "EFA", "FXI", "KWEB", "EWJ", "EWG", "USO", "UNG",
]

# Top 20 cryptocurrencies
DEFAULT_CRYPTO = [
    "BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "AVAX", "MATIC", "DOT",
    "LTC", "LINK", "UNI", "ATOM", "ETC", "XLM", "ALGO", "VET", "FIL", "AAVE"
]


class AlpacaProvider(BaseMarketProvider):
    """Alpaca provider for stocks and crypto market data."""
    
    name = "alpaca"
    
    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        
        # Get API keys from settings (using correct field names from config.py)
        self.api_key = self.settings.alpaca_api_key
        self.api_secret = self.settings.alpaca_secret_key
        
        # Use configured URLs or defaults
        self.base_url = self._normalize_data_url(
            self.settings.alpaca_data_url or "https://data.alpaca.markets"
        )
        
        # Check if properly configured
        self.is_configured = bool(self.api_key and self.api_secret)
        self.use_paper = not self.is_configured
        
        if not self.is_configured:
            missing_fields = []
            if not self.api_key:
                missing_fields.append("ALPACA_API_KEY")
            if not self.api_secret:
                missing_fields.append("ALPACA_SECRET_KEY")
            logger.warning(
                "Alpaca API not configured - stocks/ETFs unavailable",
                missing_fields=missing_fields,
            )
    
    def _get_headers(self) -> dict:
        """Get API authentication headers."""
        if not self.is_configured:
            return {}
        return {
            "APCA-API-KEY-ID": self.api_key or "",
            "APCA-API-SECRET-KEY": self.api_secret or "",
        }
    
    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch prices for stocks and crypto from Alpaca."""
        # Return unavailable if not configured
        if not self.is_configured:
            logger.warning(f"Alpaca not configured, returning unavailable for {len(symbols)} symbols")
            return [MarketDataPoint.unavailable(sym, "stocks" if sym in DEFAULT_STOCKS else "crypto", self.name) for sym in symbols]
        
        results = []
        
        # Separate stocks/ETFs and crypto.
        stocks = [s for s in symbols if not self._is_crypto(s)]
        crypto = [s for s in symbols if s in DEFAULT_CRYPTO or self._is_crypto(s)]
        
        # Fetch stocks
        if stocks:
            stock_results = await self._fetch_equity_prices(stocks, "stocks")
            results.extend(stock_results)
        
        # Fetch crypto
        if crypto:
            crypto_results = await self._fetch_crypto_prices(crypto)
            results.extend(crypto_results)
        
        self._update_cache(results)
        return results
    
    async def _fetch_stock_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch US stock prices from Alpaca."""
        return await self._fetch_equity_prices(symbols, "stocks")

    async def fetch_etf_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch ETF prices from Alpaca's stock snapshot endpoint."""
        if not self.is_configured:
            logger.warning(f"Alpaca not configured, returning unavailable for {len(symbols)} ETFs")
            return [MarketDataPoint.unavailable(sym, "etfs", self.name) for sym in symbols]

        results = await self._fetch_equity_prices(symbols, "etfs")
        self._update_cache(results)
        return results

    async def _fetch_equity_prices(
        self,
        symbols: List[str],
        asset_class: str,
    ) -> List[MarketDataPoint]:
        """Fetch US stocks/ETFs from Alpaca."""
        results = []
        url = urljoin(f"{self.base_url}/", "stocks/snapshots")
        
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                # Alpaca accepts comma-separated symbols
                sym_str = ",".join(symbols)
                
                params = {"symbols": sym_str}
                headers = self._get_headers()
                
                resp = await client.get(url, params=params, headers=headers)
                resp.raise_for_status()
                data = resp.json()
                
                snapshots = data.get("snapshots", {})
                for symbol, snapshot in snapshots.items():
                    try:
                        daily = snapshot.get("dailyBar", {})
                        prev = snapshot.get("prevDailyBar", {})
                        latest = snapshot.get("latestQuote", {})
                        trade = snapshot.get("latestTrade", {})
                        
                        price = float(trade.get("p", 0)) if trade else 0
                        if not price and latest:
                            bid = float(latest.get("bp", 0) or 0)
                            ask = float(latest.get("ap", 0) or 0)
                            price = (bid + ask) / 2 if bid and ask else ask or bid
                        if not price and daily:
                            price = float(daily.get("c", 0))
                        
                        prev_close = float(prev.get("c", 0)) if prev else 0
                        change = ((price - prev_close) / prev_close * 100) if prev_close else 0

                        timestamp = self._parse_alpaca_ts(
                            trade.get("t") if trade else None,
                            latest.get("t") if latest else None,
                        )

                        dp = MarketDataPoint(
                            symbol=symbol,
                            asset_class=asset_class,
                            price=price,
                            change=round(change, 2),
                            timestamp=timestamp,
                            source=self.name,
                            volume=float(daily.get("v", 0)) if daily else 0,
                            high_24h=float(daily.get("h", 0)) if daily else 0,
                            low_24h=float(daily.get("l", 0)) if daily else 0,
                            open_24h=float(daily.get("o", 0)) if daily else 0,
                        )
                        results.append(dp)
                    except Exception as e:
                        logger.error(f"Error parsing stock data for {symbol}: {e}")
                        results.append(self._handle_error(symbol, e))

                returned = {r.symbol for r in results}
                for symbol in symbols:
                    if symbol not in returned:
                        results.append(MarketDataPoint.unavailable(symbol, asset_class, self.name))
                        
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                logger.error("Alpaca API keys are invalid (401) — disabling Alpaca provider")
                self.is_configured = False
            else:
                logger.error(f"Alpaca HTTP error {e.response.status_code}: {e}")
            for sym in symbols:
                results.append(MarketDataPoint.unavailable(sym, asset_class, self.name))
        except Exception as e:
            logger.error(f"Error fetching stock prices from Alpaca: {e}")
            for sym in symbols:
                results.append(MarketDataPoint.unavailable(sym, asset_class, self.name))

        return results
    
    async def _fetch_crypto_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch crypto prices from Alpaca."""
        results = []
        url = f"{self.base_url}/crypto/us/snapshots"
        
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                # Alpaca crypto symbols are like BTC/USD
                alpaca_symbols = [f"{s}/USD" if "/" not in s else s for s in symbols]
                sym_str = ",".join(alpaca_symbols)
                
                params = {"symbols": sym_str}
                headers = self._get_headers()
                
                resp = await client.get(url, params=params, headers=headers)
                resp.raise_for_status()
                data = resp.json()
                
                snapshots = data.get("snapshots", {})
                for symbol, snapshot in snapshots.items():
                    try:
                        # Clean symbol (remove /USD)
                        clean_sym = symbol.replace("/USD", "").replace("/USDT", "")
                        
                        daily = snapshot.get("dailyBar", {})
                        prev = snapshot.get("prevDailyBar", {})
                        latest = snapshot.get("latestQuote", {})
                        trade = snapshot.get("latestTrade", {})

                        price = float(trade.get("p", 0)) if trade else 0
                        if not price and latest:
                            bid = float(latest.get("bp", 0) or 0)
                            ask = float(latest.get("ap", 0) or 0)
                            price = (bid + ask) / 2 if bid and ask else ask or bid
                        if not price and daily:
                            price = float(daily.get("c", 0))

                        prev_close = float(prev.get("c", 0)) if prev else 0
                        change = ((price - prev_close) / prev_close * 100) if prev_close else 0

                        timestamp = self._parse_alpaca_ts(
                            trade.get("t") if trade else None,
                            latest.get("t") if latest else None,
                        )
                        
                        dp = MarketDataPoint(
                            symbol=clean_sym,
                            asset_class="crypto",
                            price=price,
                            change=round(change, 2),
                            timestamp=timestamp,
                            source=self.name,
                            volume=float(daily.get("v", 0)) if daily else 0,
                            high_24h=float(daily.get("h", 0)) if daily else 0,
                            low_24h=float(daily.get("l", 0)) if daily else 0,
                            open_24h=float(daily.get("o", 0)) if daily else 0,
                        )
                        results.append(dp)
                    except Exception as e:
                        logger.error(f"Error parsing crypto data for {symbol}: {e}")
                        results.append(self._handle_error(symbol.replace("/USD", ""), e))
                        
        except Exception as e:
            logger.error(f"Error fetching crypto prices from Alpaca: {e}")
            # Return unavailable for all
            for sym in symbols:
                results.append(MarketDataPoint.unavailable(sym, "crypto", self.name))
        
        return results
    
    def _is_crypto(self, symbol: str) -> bool:
        """Check if symbol is likely a cryptocurrency."""
        clean = symbol.replace("/USD", "").replace("USD", "")
        return symbol in DEFAULT_CRYPTO or clean in DEFAULT_CRYPTO

    @staticmethod
    def _parse_alpaca_ts(*candidates: object) -> int:
        """Extract a millisecond timestamp from Alpaca's ISO-8601 strings."""
        for ts in candidates:
            if not isinstance(ts, str) or not ts:
                continue
            try:
                dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
                return int(dt.timestamp() * 1000)
            except (ValueError, TypeError):
                continue
        return int(datetime.now(UTC).timestamp() * 1000)

    def _normalize_data_url(self, url: str) -> str:
        """Ensure Alpaca market data URLs include the v2 API prefix."""
        clean = url.rstrip("/")
        return clean if clean.endswith("/v2") else f"{clean}/v2"
    
    def get_default_symbols(self) -> List[str]:
        """Return default stocks and crypto symbols."""
        return DEFAULT_STOCKS + DEFAULT_CRYPTO
    
    def get_stock_symbols(self) -> List[str]:
        """Return default stock symbols."""
        return DEFAULT_STOCKS.copy()

    def get_etf_symbols(self) -> List[str]:
        """Return default ETF symbols."""
        return DEFAULT_ETFS.copy()
    
    def get_crypto_symbols(self) -> List[str]:
        """Return default crypto symbols."""
        return DEFAULT_CRYPTO.copy()


# Singleton factory
_alpaca_provider: Optional[AlpacaProvider] = None


def get_alpaca_provider() -> AlpacaProvider:
    """Get Alpaca provider singleton."""
    global _alpaca_provider
    if _alpaca_provider is None:
        _alpaca_provider = AlpacaProvider()
    return _alpaca_provider
