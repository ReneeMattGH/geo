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
    GET /markets/etfs           — ETF prices
    GET /markets/indices        — equity index levels
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
    get_etfs,
    get_indices,
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


@router.get("/markets/etfs", tags=["markets"])
async def markets_etfs() -> Dict[str, Any]:
    """Get ETF market data."""
    return await get_etfs()


@router.get("/markets/indices", tags=["markets"])
async def markets_indices() -> Dict[str, Any]:
    """Get equity index market data."""
    return await get_indices()


@router.get("/markets/news-ticker", tags=["markets"])
async def markets_news_ticker() -> Dict[str, Any]:
    """Generate a live news ticker from real-time market signals.

    Returns headlines sorted by market impact (biggest movers first),
    covering all asset classes with AI analysis context.
    """
    from app.services.market.market_service import get_unified_market_service
    from app.config.asset_universe import get_asset_universe
    from datetime import timezone

    service = get_unified_market_service()
    universe = get_asset_universe()
    cached = service.get_all_cached()
    data = cached.get("data", {})

    headlines: List[Dict[str, Any]] = []
    now = datetime.now(UTC)

    category_labels = {
        "stocks": "Equities", "crypto": "Crypto", "forex": "FX",
        "commodities": "Commodities", "bonds": "Bonds",
        "etfs": "ETFs", "indices": "Indices",
    }

    for sym, dp in data.items():
        if not isinstance(dp, dict):
            dp_dict = dp.to_dict() if hasattr(dp, "to_dict") else {"symbol": sym}
        else:
            dp_dict = dp
        price = dp_dict.get("price", 0) if isinstance(dp_dict, dict) else getattr(dp, "price", 0)
        change = dp_dict.get("change", 0) if isinstance(dp_dict, dict) else getattr(dp, "change", 0)
        source = dp_dict.get("source", "") if isinstance(dp_dict, dict) else getattr(dp, "source", "")
        asset_class = dp_dict.get("asset_class", "") if isinstance(dp_dict, dict) else getattr(dp, "asset_class", "")
        name = dp_dict.get("name", sym) if isinstance(dp_dict, dict) else getattr(dp, "name", sym)

        if not price or price <= 0:
            continue

        asset_def = universe.get_asset(sym)
        display_name = asset_def.name if asset_def else name or sym
        cat_label = category_labels.get(asset_class, asset_class.title())

        # Compute implied deviation when provider reports no change.
        # Only use assets with explicitly set base prices (not the 100.0 default).
        # Cap at ±10% so long-term drifts don't swamp the ticker with false ALERTs.
        if change == 0.0 and asset_def and asset_def.base_price > 0 and asset_def.base_price != 100.0:
            raw = ((price - asset_def.base_price) / asset_def.base_price) * 100
            change = round(max(-10.0, min(10.0, raw)), 2)

        abs_change = abs(change)

        if abs_change >= 0.01:
            icon = "▲" if change > 0 else "▼"
            if asset_class == "bonds":
                sentiment = "hawkish" if change > 0 else "dovish"
            else:
                sentiment = "bullish" if change > 0 else "bearish"

            if abs_change >= 3.0:
                urgency = "ALERT"
                headline = f"{icon} {sym} {change:+.1f}% · {display_name}"
            elif abs_change >= 1.5:
                urgency = "BREAKING"
                headline = f"{icon} {sym} {change:+.2f}% · {display_name}"
            elif abs_change >= 0.5:
                urgency = "UPDATE"
                headline = f"{icon} {sym} {change:+.2f}% · {display_name}"
            else:
                urgency = "MARKET"
                headline = f"{sym} {change:+.2f}% · {display_name}"

            headlines.append({
                "id": f"mkt-{sym}",
                "headline": headline,
                "symbol": sym,
                "category": cat_label,
                "asset_class": asset_class,
                "change_pct": round(change, 2),
                "abs_change": round(abs_change, 2),
                "price": price,
                "urgency": urgency,
                "sentiment": sentiment,
                "source": source.split(":")[0],
                "ts": now.isoformat(),
            })

    headlines.sort(key=lambda h: h["abs_change"], reverse=True)

    return {
        "headlines": headlines[:60],
        "count": len(headlines),
        "generated_at": now.isoformat(),
    }


@router.get("/markets/{asset_class}", tags=["markets"])
async def markets_by_class(asset_class: str) -> Dict[str, Any]:
    """Get market data for a specific asset class.
    
    Args:
        asset_class: One of: stocks, crypto, forex, commodities, bonds, etfs, indices
        
    Returns:
        Market data for the specified asset class
    """
    return await get_by_asset_class(asset_class)
