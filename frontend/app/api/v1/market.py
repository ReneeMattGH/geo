"""Market data endpoints.

Endpoints:
    GET /market/prices          — latest prices from DB
    GET /market/live            — real-time prices from Finnhub cache (no DB)
    GET /market/live/{symbol}   — single symbol live quote
    GET /market/history/{symbol} — historical OHLCV from DB
    POST /market/refresh        — trigger on-demand poll from Finnhub
    
    # New unified market endpoints
    GET /markets/all            — all asset classes from unified service
    GET /markets/stocks         — stock prices from Alpaca
    GET /markets/crypto         — crypto prices from CoinGecko
    GET /markets/forex          — forex rates from Twelve Data
    GET /markets/commodities    — commodity prices
    GET /markets/bonds          — treasury yields from FRED
"""
from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.pipelines.market_feeds import get_feed_manager, FINNHUB_SYMBOL_MAP
from app.repositories.market_repo import MarketDataRepository

from app.services.market_engine import get_market_engine

# Import new unified market service
from app.services.market import (
    get_all_markets as get_all_markets_data,
    get_stocks,
    get_crypto,
    get_forex,
    get_commodities,
    get_bonds,
    get_by_asset_class,
)

router = APIRouter(prefix="/market", tags=["market"])


@router.get("/all")
async def get_all_markets(
    refresh: bool = Query(default=False, description="Force refresh from source APIs"),
) -> List[Dict[str, Any]]:
    """Return ALL assets across ALL markets with real-time prices and AI signals.
    
    This is the complete market data engine endpoint.
    """
    engine = get_market_engine()
    return await engine.get_all_market_data(refresh=refresh)


@router.get("/prices")
async def get_latest_prices(
    symbols: str | None = Query(default=None, description="Comma-separated symbols"),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Get latest market prices for tracked assets."""
    repo = MarketDataRepository(db)
    rows = await repo.get_latest_per_symbol()

    if symbols:
        symbol_set = {s.strip().upper() for s in symbols.split(",")}
        rows = [r for r in rows if r.symbol in symbol_set]

    return {
        "prices": [
            {
                "symbol": r.symbol,
                "asset_class": r.asset_class,
                "region": r.region,
                "ts": r.ts.isoformat() if r.ts else None,
                "open": r.open,
                "high": r.high,
                "low": r.low,
                "close": r.close,
                "volume": r.volume,
                "realized_vol": r.realized_vol,
                "return_1d": r.return_1d,
                "return_5d": r.return_5d,
            }
            for r in rows
        ],
        "count": len(rows),
    }


@router.get("/live")
async def get_live_prices(
    symbols: str | None = Query(default=None, description="Comma-separated symbols; omit for all"),
) -> dict:
    """Return real-time prices from the live feed cache.

    This endpoint reads from the in-memory MarketFeedManager cache that is
    refreshed every 30 seconds. No DB call is made.
    Source field indicates the upstream adapter (finnhub / binance:ws / binance:rest).
    """
    mgr  = get_feed_manager()
    all_ticks = mgr.get_all()

    if symbols:
        sym_set = {s.strip().upper() for s in symbols.split(",")}
        all_ticks = [t for t in all_ticks if t.symbol in sym_set]

    data = [t.to_ws_dict() for t in all_ticks]
    data.sort(key=lambda d: d["symbol"])

    return {
        "prices":      data,
        "count":       len(data),
        "data_source": "live_feed_manager",
        "data_as_of":  datetime.now(UTC).isoformat(),
    }


@router.get("/live/{symbol}")
async def get_live_price_single(symbol: str) -> dict:
    """Return the latest real-time quote for a single symbol."""
    mgr  = get_feed_manager()
    tick = mgr.get_latest(symbol.upper())

    if tick is None:
        # Try fetching on demand if not yet in cache
        from app.pipelines.market_feeds import _build_default_adapter
        adapter = _build_default_adapter()
        ticks   = await adapter.fetch_latest([symbol.upper()])
        tick    = ticks[0] if ticks else None

    if tick is None:
        meta = FINNHUB_SYMBOL_MAP.get(symbol.upper(), {})
        return {
            "symbol":  symbol.upper(),
            "price":   meta.get("base", 0),
            "source":  "not_found",
            "message": f"No live data for {symbol}. Is it in the tracked symbol list?",
        }

    return {"symbol": tick.symbol, **tick.to_ws_dict()}


@router.post("/refresh")
async def trigger_market_refresh() -> dict:
    """Trigger an immediate poll from the Finnhub API (bypasses 30s timer)."""
    mgr = get_feed_manager()
    await mgr._poll_once()
    return {
        "status":      "ok",
        "symbols_cached": len(mgr._cache),
        "data_as_of":  datetime.now(UTC).isoformat(),
    }


@router.get("/history/{symbol}")
async def get_price_history(
    symbol: str,
    start: datetime = Query(
        default_factory=lambda: datetime.now(UTC) - timedelta(days=7),
    ),
    end: datetime = Query(default_factory=lambda: datetime.now(UTC)),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Get historical OHLCV data for a symbol."""
    if start.tzinfo is None:
        start = start.replace(tzinfo=UTC)
    if end.tzinfo is None:
        end = end.replace(tzinfo=UTC)

    repo = MarketDataRepository(db)
    rows = await repo.get_history(symbol=symbol.upper(), start=start, end=end)

    return {
        "symbol": symbol.upper(),
        "data": [
            {
                "ts": r.ts.isoformat(),
                "open": r.open,
                "high": r.high,
                "low": r.low,
                "close": r.close,
                "volume": r.volume,
                "realized_vol": r.realized_vol,
            }
            for r in rows
        ],
        "count": len(rows),
    }


# =============================================================================
# NEW UNIFIED MARKET ENDPOINTS
# =============================================================================

@router.get("/markets/all", tags=["markets"])
async def markets_all() -> Dict[str, Any]:
    """Get all market data across all asset classes.
    
    Returns unified data from:
    - Stocks (Alpaca) - top 50 US equities
    - Crypto (CoinGecko) - top 50 cryptocurrencies
    - Forex (Twelve Data) - 10 major pairs
    - Commodities (Twelve Data) - Gold, Silver, Oil, etc.
    - Bonds (FRED) - Treasury yields
    """
    return await get_all_markets_data()


@router.get("/markets/stocks", tags=["markets"])
async def markets_stocks() -> Dict[str, Any]:
    """Get stock market data from Alpaca.
    
    Returns top 50 US equities with real-time prices.
    """
    return await get_stocks()


@router.get("/markets/crypto", tags=["markets"])
async def markets_crypto() -> Dict[str, Any]:
    """Get cryptocurrency market data from CoinGecko.
    
    Returns top 50 cryptocurrencies with real-time prices.
    """
    return await get_crypto()


@router.get("/markets/forex", tags=["markets"])
async def markets_forex() -> Dict[str, Any]:
    """Get forex market data from Twelve Data.
    
    Returns 10 major currency pairs.
    """
    return await get_forex()


@router.get("/markets/commodities", tags=["markets"])
async def markets_commodities() -> Dict[str, Any]:
    """Get commodities market data.
    
    Returns Gold, Silver, Oil, Brent, Natural Gas.
    """
    return await get_commodities()


@router.get("/markets/bonds", tags=["markets"])
async def markets_bonds() -> Dict[str, Any]:
    """Get bond market data from FRED.
    
    Returns US Treasury yields (1M, 3M, 6M, 1Y, 2Y, 5Y, 10Y, 30Y).
    """
    return await get_bonds()


@router.get("/markets/{asset_class}", tags=["markets"])
async def markets_by_class(asset_class: str) -> Dict[str, Any]:
    """Get market data for a specific asset class.
    
    Args:
        asset_class: One of: stocks, crypto, forex, commodities, bonds
        
    Returns:
        Market data for the specified asset class
    """
    return await get_by_asset_class(asset_class)
