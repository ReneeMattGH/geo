"""CoinGecko market data provider for cryptocurrency.

Fetches real-time prices for top cryptocurrencies.
Uses CoinGecko API (https://www.coingecko.com/)
"""
from __future__ import annotations

from datetime import datetime, UTC
from typing import Dict, List, Optional

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.base_provider import BaseMarketProvider, MarketDataPoint

logger = get_logger(__name__)

# Top 50 cryptocurrencies by market cap
DEFAULT_CRYPTO = [
    "bitcoin", "ethereum", "binancecoin", "solana", "ripple", "cardano", "dogecoin",
    "avalanche-2", "matic-network", "polkadot", "litecoin", "chainlink", "uniswap",
    "cosmos", "ethereum-classic", "stellar", "algorand", "vechain", "filecoin", "aave",
    "tron", "near", "aptos", "quant-network", "the-graph", "fantom", "tezos",
    "eos", "flow", "decentraland", "axie-infinity", "sandbox", "elrond", "hedera-hashgraph",
    "internet-computer", "zcash", "maker", "neo", "klay-token", "theta-token",
    "iota", "kucoin-shares", "synthetix", "curve-dao-token", "basic-attention-token",
    "enjincoin", "chiliz", "loopring", "1inch", "pancakeswap-token"
]

# Symbol mapping for common display symbols
SYMBOL_MAP: Dict[str, str] = {
    "bitcoin": "BTC",
    "ethereum": "ETH",
    "binancecoin": "BNB",
    "solana": "SOL",
    "ripple": "XRP",
    "cardano": "ADA",
    "dogecoin": "DOGE",
    "avalanche-2": "AVAX",
    "matic-network": "MATIC",
    "polkadot": "DOT",
    "litecoin": "LTC",
    "chainlink": "LINK",
    "uniswap": "UNI",
    "cosmos": "ATOM",
    "ethereum-classic": "ETC",
    "stellar": "XLM",
    "algorand": "ALGO",
    "vechain": "VET",
    "filecoin": "FIL",
    "aave": "AAVE",
    "tron": "TRX",
    "near": "NEAR",
    "aptos": "APT",
}


class CoinGeckoProvider(BaseMarketProvider):
    """CoinGecko provider for cryptocurrency market data."""
    
    name = "coingecko"
    asset_class = "crypto"
    
    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.base_url = self.settings.coingecko_base_url
        self.is_configured = True  # CoinGecko doesn't require API key for basic usage
        self._cache_ttl_seconds = 300  # Cache for 5 minutes to avoid rate limits (free tier is very strict)
    
    async def fetch_prices(self, symbols: List[str]) -> List[MarketDataPoint]:
        """Fetch crypto prices from CoinGecko.

        Args:
            symbols: List of CoinGecko IDs (e.g., "bitcoin", "ethereum")
                    or display symbols (e.g., "BTC", "ETH")

        Returns:
            List of MarketDataPoint objects
        """
        logger.info(f"[CoinGecko] fetch_prices called with {len(symbols)} symbols: {symbols}")

        # Check if cache is fresh enough to avoid rate limiting
        if self._last_update:
            cache_age = (datetime.now(UTC) - self._last_update).total_seconds()
            if cache_age < self._cache_ttl_seconds:
                logger.info(f"[CoinGecko] Using cached data (age: {cache_age:.1f}s, TTL: {self._cache_ttl_seconds}s)")
                cached_results = self.get_all_cached()
                if cached_results:
                    return cached_results

        results = []

        try:
            # Convert symbols to CoinGecko IDs if needed
            cg_ids = self._to_coingecko_ids(symbols)

            # CoinGecko API has rate limits, fetch in batches of 5 with delay to avoid 429 errors
            batch_size = 5
            for i in range(0, len(cg_ids), batch_size):
                batch = cg_ids[i:i + batch_size]
                logger.info(f"[CoinGecko] Fetching batch {i//batch_size + 1}: {len(batch)} IDs")
                batch_results = await self._fetch_batch(batch)
                results.extend(batch_results)
                # Add delay between batches to avoid rate limiting
                if i + batch_size < len(cg_ids):
                    logger.info(f"[CoinGecko] Waiting 2 seconds before next batch...")
                    import asyncio
                    await asyncio.sleep(2)

        except Exception as e:
            logger.error(f"Error fetching crypto prices from CoinGecko: {e}")
            # Return cached data if available, otherwise unavailable
            cached_results = self.get_all_cached()
            if cached_results:
                logger.info(f"[CoinGecko] Returning cached data due to error")
                return cached_results
            # Return unavailable for all symbols
            return [MarketDataPoint.unavailable(sym, "crypto", self.name) for sym in symbols]

        logger.info(f"[CoinGecko] fetch_prices complete: {len(results)} results from {len(symbols)} requested symbols")
        self._update_cache(results)
        return results
    
    async def _fetch_batch(self, cg_ids: List[str]) -> List[MarketDataPoint]:
        """Fetch a batch of crypto prices from CoinGecko."""
        results = []
        
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                ids_param = ",".join(cg_ids)
                logger.info(f"[CoinGecko] Fetching batch: {ids_param}")
                
                url = f"{self.base_url}/coins/markets"
                params = {
                    "vs_currency": "usd",
                    "ids": ids_param,
                    "order": "market_cap_desc",
                    "sparkline": "false",
                    "price_change_percentage": "24h"
                }
                
                resp = await client.get(url, params=params)
                
                # Handle rate limiting
                if resp.status_code == 429:
                    logger.warning("CoinGecko rate limit hit - waiting before retry")
                    import asyncio
                    await asyncio.sleep(1)
                    resp = await client.get(url, params=params)
                
                resp.raise_for_status()
                data = resp.json()
                logger.info(f"[CoinGecko] API returned {len(data)} coins for {len(cg_ids)} requested IDs")
                
                # Parse each coin data
                for coin in data:
                    try:
                        dp = self._parse_coin(coin)
                        if dp:
                            logger.info(f"[CoinGecko] Parsed: symbol={dp.symbol}, price={dp.price}, source={dp.source}")
                            results.append(dp)
                        else:
                            logger.warning(f"[CoinGecko] Parsed coin returned None: {coin.get('id')}")
                    except Exception as e:
                        logger.error(f"Error parsing coin data: {e}")
                        
        except httpx.HTTPStatusError as e:
            logger.error(f"CoinGecko API HTTP error: {e.response.status_code} - {e.response.text}")
        except Exception as e:
            logger.error(f"Error fetching crypto batch from CoinGecko: {e}")
        
        # Add unavailable for any missing symbols
        found_ids = {r.symbol.lower() for r in results}
        for cg_id in cg_ids:
            display_sym = SYMBOL_MAP.get(cg_id, cg_id.upper())
            if display_sym.lower() not in found_ids and cg_id not in found_ids:
                logger.warning(f"[CoinGecko] Adding unavailable for: {display_sym} (ID: {cg_id})")
                results.append(MarketDataPoint.unavailable(display_sym, "crypto", self.name))
        
        logger.info(f"[CoinGecko] Batch complete: {len(results)} results from {len(cg_ids)} requested")
        return results
    
    def _parse_coin(self, coin: dict) -> Optional[MarketDataPoint]:
        """Parse CoinGecko coin data into MarketDataPoint."""
        try:
            cg_id = coin.get("id", "")
            symbol = coin.get("symbol", "").upper()
            
            # Use mapped symbol if available
            display_symbol = SYMBOL_MAP.get(cg_id, symbol)
            
            raw_price = coin.get("current_price", 0) or 0
            price = float(raw_price)
            
            logger.info(f"[CoinGecko] Parsing: cg_id={cg_id}, symbol={symbol}, display_symbol={display_symbol}, raw_price={raw_price}, price={price}")
            
            if price == 0:
                logger.warning(f"[CoinGecko] Price is zero for: {cg_id} - skipping")
                return None
            
            # Get 24h change percentage
            change = coin.get("price_change_percentage_24h", 0) or 0
            
            # CoinGecko returns timestamp in ms
            timestamp = int(datetime.now(UTC).timestamp() * 1000)
            
            return MarketDataPoint(
                symbol=display_symbol,
                asset_class="crypto",
                price=price,
                change=round(change, 2),
                timestamp=timestamp,
                source=self.name,
                volume=float(coin.get("total_volume", 0) or 0),
                high_24h=float(coin.get("high_24h", 0) or 0),
                low_24h=float(coin.get("low_24h", 0) or 0),
                open_24h=0.0,  # CoinGecko doesn't provide open price directly
            )
        except Exception as e:
            logger.error(f"Error parsing coin data: {e}")
            return None
    
    def _to_coingecko_ids(self, symbols: List[str]) -> List[str]:
        """Convert display symbols to CoinGecko IDs."""
        # Reverse mapping
        reverse_map = {v.lower(): k for k, v in SYMBOL_MAP.items()}
        
        cg_ids = []
        for sym in symbols:
            sym_lower = sym.lower()
            if sym_lower in reverse_map:
                cg_id = reverse_map[sym_lower]
                cg_ids.append(cg_id)
                logger.info(f"[CoinGecko] Symbol conversion: {sym} -> {cg_id} (via SYMBOL_MAP)")
            elif sym_lower in DEFAULT_CRYPTO:
                cg_ids.append(sym_lower)
                logger.info(f"[CoinGecko] Symbol conversion: {sym} -> {sym_lower} (in DEFAULT_CRYPTO)")
            else:
                # Assume it's already a CoinGecko ID
                cg_ids.append(sym_lower)
                logger.info(f"[CoinGecko] Symbol conversion: {sym} -> {sym_lower} (assumed CoinGecko ID)")
        
        logger.info(f"[CoinGecko] Converted {len(symbols)} symbols to {len(cg_ids)} CoinGecko IDs: {cg_ids}")
        return cg_ids
    
    def get_default_symbols(self) -> List[str]:
        """Return default cryptocurrency symbols."""
        # Return display symbols - limited to top 5 to avoid CoinGecko rate limits
        return [SYMBOL_MAP.get(cg_id, cg_id.upper()) for cg_id in DEFAULT_CRYPTO[:5]]
    
    def get_crypto_symbols(self) -> List[str]:
        """Return crypto symbols - alias for get_default_symbols."""
        return self.get_default_symbols()


# Singleton factory
_coingecko_provider: Optional[CoinGeckoProvider] = None


def get_coingecko_provider() -> CoinGeckoProvider:
    """Get CoinGecko provider singleton."""
    global _coingecko_provider
    if _coingecko_provider is None:
        _coingecko_provider = CoinGeckoProvider()
    return _coingecko_provider
