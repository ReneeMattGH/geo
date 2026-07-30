# GeoTrade — Engineering Milestones Log
> Append-only. Add new entries at the bottom. Each entry = a major milestone reached.

---

## MILESTONE 1 — API Recovery + Live Data Verified
**Date:** 2026-03-16T16:43 UTC
**Branch:** `feat/signals-v2-live-events-prices`

### What Happened
The API container was crash-looping due to `--log-config /dev/null` in the Dockerfile uvicorn CMD.
On macOS/Linux, `/dev/null` is a valid empty device but uvicorn's `logging.config.fileConfig()` rejects
empty files. Fixed by removing the `--log-config /dev/null` flag entirely.

**Fix:** `infra/docker/Dockerfile` line 27 — removed `--log-config /dev/null`

### Result
- `geotrade_api` container: healthy ✅
- Alembic migrations ran successfully: all 5 migration steps completed ✅
- GTI endpoint (`/api/v1/gti/current`) returning live data ✅
- Market live endpoint (`/api/v1/market/live`) returning Finnhub prices ✅
- Signals V2 endpoint (`/api/v1/signals/v2/all`) returning 36 asset signals ✅

---

## MILESTONE 2 — Market Freeze Snapshot & Investor Demo Portfolio Created
**Date:** 2026-03-16T16:43 UTC
**Branch:** `feat/signals-v2-live-events-prices`

### What Was Done
Defined a focused 11-asset universe for investor demonstration:

**Commodities (5):**
- XAUUSD — Gold @ $458.05 → BUY (83.8% conf)
- XAGUSD — Silver @ $28.91 → BUY (71.9% conf)
- WTI — Crude Oil @ $117.86 → BUY (76.6% conf)
- NATGAS — Nat Gas @ $12.22 → BUY (56.1% conf)
- BTCUSD — Bitcoin @ $73,640.18 → HOLD (55.8% conf)

**Defense Stocks (6):**
- RTX — Raytheon @ $205.22 → BUY (88.8% conf) ← highest confidence
- ITA — Defense ETF @ $231.31 → BUY (84.5% conf)
- LMT — Lockheed @ $642.28 → BUY (80.4% conf)
- NOC — Northrop @ $450.11 → BUY (76.3% conf)
- GD — General Dynamics @ $284.44 → BUY (74.3% conf)
- BA — Boeing @ $180.47 → BUY (71.5% conf)

**Triggering Event:** Iran-Israel Escalation — Missile Exchanges Reported (severity 92%)

### Data Sources Verified
- Finnhub API: confirmed live with timestamps 16:41–16:43 UTC on all ETF/equity prices
- Binance Public REST: confirmed BTC at $73,640.18 (+3.06% 24h)
- GeoTrade Signal Engine `/api/v1/signals/v2/all`: 36 signals, 11 matched our universe

### Documents Created
- `trading/SNAPSHOT_2026-03-16.md` — frozen prices + verified data sources
- `trading/PAPER_TRADES.md` — $100,000 hypothetical portfolio, 9 trades documented
- `trading/OUTCOME_LOG.md` — template to fill at investor meeting (~04:43 UTC, 17 Mar)
- `trading/README.md` — folder overview and investor story narrative

### Key Numbers for Investor Meeting
- $100,000 paper portfolio deployed
- 9/10 signals: BUY (1 HOLD)
- Average confidence: 75.1%
- Total downside risk if all stops hit: ~$2,500 (2.5%)
- Weighted R:R across all trades: 2.0
- Primary thesis: Middle East military escalation → safe-haven + defense demand surge
- Secondary thesis: US-China trade tariffs → energy supply re-routing → NatGas bid

---

*Next milestone: Record outcomes at investor meeting. Prove the trail.*
