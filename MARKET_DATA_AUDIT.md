# GeoTrade Market Data Audit Report

**Date**: 2026-08-10
**Branch**: fix-realtime-market-apis

---

## Provider Status

| Provider | Market | Status | Notes |
|----------|--------|--------|-------|
| CoinGecko | Crypto | WORKING | 50/50 assets, no API key needed |
| Twelve Data | Forex | WORKING | 23/23 pairs, free-tier rate limiting handled |
| Alpha Vantage | Forex (backup) | WORKING | Fills gaps when Twelve Data is rate-limited |
| exchangerate-api | Forex (last resort) | WORKING | Keyless daily reference rates |
| FRED | Bonds | WORKING | 10/10 yields, keyed API + CSV fallback |
| Finnhub | Stocks/ETFs (gap-filler) | WORKING | Per-symbol quotes, key rotation fixed |
| Alpaca | Stocks/ETFs/Crypto | FAILED | 401 Unauthorized - API keys expired |
| Yahoo Finance | Indices/Commodities | FAILED | Unreachable from this network |

## Market-by-Market Status

### Crypto (CoinGecko)
- **Assets tested**: 50 (top 50 by market cap)
- **Assets working**: 50
- **Assets unavailable**: 0
- **Sample**: BTC $64,984 (+0.20%), ETH $1,918 (+0.10%)
- **Refresh interval**: 10s TTL
- **Data status**: LIVE
- **Known limitations**: Free API has 10-30 req/min rate limit; 60s cache prevents excessive calls

### Stocks (Alpaca -> Yahoo -> Finnhub)
- **Assets tested**: 50 (top 50 US equities)
- **Assets working**: 50 (all via Finnhub backfill)
- **Assets unavailable**: 0
- **Sample**: AAPL $313.33, MSFT $499.99, GOOGL $354.30
- **Primary provider**: Alpaca (FAILED - 401 Unauthorized)
- **Backfill provider**: Finnhub (WORKING)
- **Refresh interval**: 20s TTL
- **Data status**: LIVE (Finnhub provides real-time US quotes)
- **Known limitations**: Alpaca keys need renewal; Finnhub free tier = 60 req/min

### ETFs (Alpaca -> Yahoo -> Finnhub)
- **Assets tested**: 20
- **Primary provider**: Alpaca (FAILED - 401)
- **Backfill**: Finnhub (WORKING)
- **Refresh interval**: 20s TTL
- **Known limitations**: Same as stocks

### Forex (Twelve Data -> Alpha Vantage -> exchangerate-api)
- **Assets tested**: 23 currency pairs
- **Assets working**: 23
- **Assets unavailable**: 0
- **Sample**: EUR/USD 1.1554, GBP/USD 1.3485, USD/JPY 158.26
- **Refresh interval**: 15s TTL
- **Data status**: LIVE
- **Known limitations**: Twelve Data free tier = 8 credits/min; Alpha Vantage = 25 req/day

### Commodities (Twelve Data spot metals -> Yahoo futures)
- **Assets configured**: 15
- **Spot metals (Twelve Data)**: 4 (Gold, Silver, Platinum, Palladium)
- **Futures (Yahoo)**: 11 (WTI, Brent, NatGas, Corn, Wheat, etc.)
- **Current status**: Twelve Data rate-limited; Yahoo unreachable
- **Refresh interval**: 15s TTL
- **Known limitations**: Yahoo network access required for futures prices

### Equity Indices (Yahoo)
- **Assets configured**: 13 global indices
- **Current status**: Yahoo unreachable from this network
- **Refresh interval**: 15s TTL
- **Data status**: DELAYED (Yahoo provides 15-min delayed data when available)
- **Known limitations**: No alternative index provider configured

### Bonds (FRED)
- **Assets tested**: 10 (US Treasury yields + Fed Funds + 10Y-2Y spread)
- **Assets working**: 10
- **Assets unavailable**: 0
- **Sample**: US10Y 4.69%, US02Y 4.25%, US30Y 5.22%, FEDFUNDS 3.63%
- **Refresh interval**: 60s TTL
- **Data status**: DELAYED (FRED publishes daily)
- **Known limitations**: Daily data only, no intraday yields

## What Was Broken

1. **Finnhub placeholder key in rotation**: `FINNHUB_API_KEY_2` was set to `your_second_finnhub_key_for_rotation`, causing 401 errors on every other request
2. **DemoProvider lying about sources**: Reported `source="coingecko"`, `"alpaca"`, `"fred"` instead of `"demo"`
3. **Missing data normalization fields**: No `market_cap`, `currency`, or `data_status` in the canonical schema
4. **No data freshness classification**: All data labeled "ok" with no distinction between live, delayed, or stale
5. **Commodities missing human-readable names**: Displayed raw symbols (XAUUSD) instead of names (Gold)
6. **Forex pairs missing names**: No readable pair names (Euro / US Dollar)
7. **Alpaca using `datetime.now()` as timestamp**: Provider timestamps were ignored
8. **Alpaca crypto using bid price only**: Should prefer trade price
9. **TradingCharts initializing with hardcoded signal data**: Component started with `FALLBACK_SIGNALS` instead of empty state
10. **CoinGecko not capturing market_cap**: Available from API but not stored

## What Was Fixed

1. **Finnhub**: Filters placeholder API keys (patterns: `your_`, `xxx`, `placeholder`, `change_me`, `todo`)
2. **DemoProvider**: All source labels changed to `"demo"`
3. **MarketDataPoint schema**: Added `market_cap`, `currency`, `data_status` fields with `to_dict()` serialization
4. **Data freshness**: `data_status` field with values: `live`, `delayed`, `stale`, `unavailable`
   - FRED bonds: `delayed` (daily data)
   - Yahoo data: `delayed` (15-min delay)
   - Cached/last-good data: `stale`
   - Provider failures: `unavailable`
5. **Commodity names**: Added `COMMODITY_NAMES` dictionary for all 15 commodities
6. **Forex pair names**: Added `CURRENCY_NAMES` and `_pair_name()` to generate "Euro / US Dollar" etc.
7. **Alpaca timestamps**: Uses actual trade/quote timestamps via `_parse_alpaca_ts()`
8. **Alpaca crypto**: Prefers trade price (`latestTrade.p`), falls back to mid-quote, then daily close
9. **TradingCharts**: Initializes with empty array and `loading=true`, no hardcoded data
10. **CoinGecko market_cap**: Now captured from `coin.market_cap` API field
11. **Frontend**: `dataStatusLabel()` and `dataStatusColor()` helpers; PortfolioTracker shows DELAYED/STALE badges

## Tests Performed

- 30 unit tests passing (15 new + 8 existing market service + 7 existing Yahoo provider)
- Live provider health check against all 8 providers
- Full unified market service pipeline test
- TypeScript type check: 0 errors
- Data flow verification: Provider -> UnifiedMarketService -> API endpoint -> Frontend hooks

## Remaining Provider Limitations

| Issue | Impact | Resolution |
|-------|--------|------------|
| Alpaca 401 Unauthorized | Stocks/ETFs/Crypto from Alpaca unavailable | Renew API keys at alpaca.markets |
| Yahoo Finance unreachable | Indices and commodity futures unavailable | Network/firewall issue; code handles gracefully |
| Twelve Data rate limiting | 8 credits/min shared between Forex and Commodities | Cooldown + rotation implemented; consider paid tier |
| Alpha Vantage daily limit | 25 requests/day | Used sparingly as backup only |

## Architecture Health

- **Backend**: All 7 market endpoints respond correctly; multi-provider fallback chain working
- **Frontend**: React Query polling at 15s; `isPriced()` filters unavailable assets; `data_status` displayed
- **AI Signals**: Consume validated market data from the unified service (not mock data)
- **Portfolio**: Uses `useMarketsByClass()` hook feeding from the same unified service
- **WebSocket**: `MarketDataBroadcaster` pushes all-markets data every 3s to connected clients
- **Caching**: Per-class TTL caching (10-60s) with `asyncio.Lock` preventing concurrent stampedes
- **Error handling**: 401, 429, timeout handled with fallback chains and circuit breakers

## Refresh Intervals

| Asset Class | Backend TTL | Frontend Poll | Effective |
|-------------|------------|---------------|-----------|
| Crypto | 10s | 15s | ~15s |
| Stocks | 20s | 15s | ~20s |
| ETFs | 20s | 15s | ~20s |
| Forex | 15s | 15s | ~15s |
| Commodities | 15s | 15s | ~15s |
| Bonds | 60s | 15s | ~60s |
| Indices | 15s | 15s | ~15s |
