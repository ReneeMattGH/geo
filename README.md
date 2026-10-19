# GeoTrade

Geopolitical market-stress intelligence: news is ingested, scored into a
Geopolitical Tension Index (GTI) with exponential decay, and mapped onto asset-level
volatility and directional-bias signals across stocks, crypto, FX, commodities,
bonds, ETFs and indices.

- **Backend** — FastAPI + SQLAlchemy 2 (async) + Celery + TimescaleDB/Postgres + Redis
- **Frontend** — React 19 + Vite 7 + TypeScript, deck.gl / three.js / maplibre-gl
- **Repo layout** — `app/` API, `frontend/` SPA, `alembic/` migrations, `infra/docker/` images

> ⚠️ **Not financial advice.** Every signal is a model output with a labelled
> confidence, and the execution endpoints are paper-only by default.

---

## Runs with zero configuration

Clone, install, start — no API keys required. Everything has a working keyless
default:

| Data | Keyless source | With a key |
|---|---|---|
| Crypto prices | CoinGecko public API | — |
| FX rates | ECB reference rates / keyless FX feed | Twelve Data (`TWELVEDATA_API_KEY`) |
| Bond yields & spreads | FRED public CSV | FRED API (`FRED_API_KEY`) |
| Stocks / ETFs / indices / commodities | **synthetic demo feed** | Finnhub / Alpaca / Yahoo |
| News | public RSS wires | NewsAPI (`NEWSAPI_KEY`) |

When no market-data key is configured, the app serves a seeded random walk anchored
to realistic instrument levels so the UI is coherent instead of erroring. Those rows
are tagged `source: "synthetic"` and `data_status: "synthetic"`, and the UI renders
them as **DEMO** rather than a live quote. Set `MARKET_DATA_LIVE_ONLY=true` to
disable that fallback and fail loudly instead of showing generated prices.

ML/NLP extras (torch, transformers, spaCy, sentence-transformers) are **optional**.
They are imported behind `try/except ImportError`, so the API boots and serves
without them; the impact model then returns a bounded heuristic instead of a fitted
model, labelled as such.

---

## Local quick start (Docker)

```bash
cp .env.example .env       # make up does this for you if .env is missing
make up                    # Postgres/Timescale, Redis, API, worker, beat
make migrate               # alembic upgrade head (idempotent)
make seed                  # optional: sample events + GTI snapshot
```

API: <http://localhost:8000/docs> · health: `curl localhost:8000/health`

```bash
cd frontend && npm ci && npm run dev   # SPA on :5173, talks to :8000
```

## Local without Docker

Requires Postgres, Redis, and Python 3.11+.

```bash
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt        # slim, pinned; no torch
pip install -e ".[dev]"                # + pytest, ruff
export DATABASE_URL="postgresql+asyncpg://geotrade:geotrade_secret@localhost:5432/geotrade"
export DATABASE_SYNC_URL="postgresql+psycopg2://geotrade:geotrade_secret@localhost:5432/geotrade"
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

`make test` runs the suite (189 backend tests, SQLite in-memory — no services
needed). `make check` additionally runs the secret scan, lint, and the frontend
lint/test/build.

---

## Deploy

`render.yaml` is a complete one-click stack: four services and two managed data
stores.

| Resource | Role | Notes |
|---|---|---|
| `geotrade-api` | FastAPI web service | Docker runtime, `./start.sh`, health check `/health` |
| `geotrade-worker` | Celery worker | `ingestion,nlp,gti,market,default` queues |
| `geotrade-beat` | Celery beat | schedules ingestion + GTI recomputation |
| `geotrade-web` | Static frontend | `npm run build` in `frontend/`, serves `frontend/dist` with SPA fallback |
| `geotrade-db` | Postgres | migrations apply automatically on boot |
| `geotrade-redis` | Key/Value | broker + cache, internal network only |

### Recommended: everything on Render

Vercel cannot host this backend — the API needs a long-lived process for its
market-feed poll loop, the WebSocket broadcaster and Celery beat, none of which fit
serverless functions. So Render always hosts the API, and the only real question is
where the bundle is served. Keeping it on Render means one account, one pipeline, and
no build-time coupling between the two.

1. Render → **New → Blueprint** → select this repo. All six resources are parsed from
   `render.yaml`; review and create.
2. Fill the `sync: false` secrets in the dashboard. Every one is optional — leave the
   provider keys blank for a demo deployment that serves labelled synthetic data.
   `FRONTEND_URL` can stay blank: CORS already accepts any `*.onrender.com` origin.
3. Open the `geotrade-web` URL once both builds finish. The frontend resolves the API
   base itself (`frontend/src/shared/api/client.ts`), so no `VITE_API_URL` is needed
   unless you rename `geotrade-api` or give it a custom domain.

Keep every resource in **one region** — the services reach Postgres and Redis over
Render's internal network. Render's managed Postgres has no TimescaleDB extension;
the migrations detect that and create ordinary tables (you lose hypertable
compression/retention, nothing else). Need real hypertables → use Crunchy Data or a
Timescale-enabled Postgres and point `DATABASE_URL` at it.

The API starts **one** uvicorn worker by default: each process runs its own
market-feed poll loop and WebSocket broadcaster, so raise `WEB_CONCURRENCY` only if
your provider rate limits scale with it.

### Alternative: Render API + Vercel frontend

Only worth it if you want Vercel's edge CDN or per-branch preview deploys for the
frontend. `frontend/vercel.json` sets framework `vite`, build `npm run build`, output
`dist`, SPA rewrites and security headers. If you use this path, delete or ignore the
`geotrade-web` service in `render.yaml` so you do not have two copies live.

1. Vercel → **New Project** → import this repo → Root Directory = `frontend`.
2. Environment variables — these are **build-time**: Vite inlines `VITE_*` into the
   bundle, so setting them only at runtime does nothing.
   - `VITE_API_URL=https://geotrade-api.onrender.com/api/v1` (include `/api/v1`)
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — only if you use the Supabase
     waitlist path; with them absent the waitlist posts through the backend instead.
3. Deploy, then set Render's `FRONTEND_URL` to the exact Vercel origin and redeploy
   the API.

Never put a secret in a `VITE_` variable — it ships to every browser.

### Verify a deployment

```bash
curl -s https://geotrade-api.onrender.com/health
curl -s https://geotrade-api.onrender.com/api/v1/market/markets/all | head -c 400
curl -s https://geotrade-api.onrender.com/api/v1/gti/current
```

`/market/markets/all` should return all seven asset classes with non-zero prices.
Each row carries `source` and `data_status`; `synthetic`/`DEMO` means demo data.

Latency is bounded by design: one asset class may stall upstream for 25 s
(`CLASS_FETCH_TIMEOUT_SECONDS`) before the service serves cached or demo rows, and
requests after the first are answered from cache while a background task refreshes
the expired class. A cold keyless boot measured 11.6-16.2 s for the first
`/markets/all` (the spread is upstream rate-limiting, not this app), then ~2 ms, and
`/health` stayed under 30 ms throughout — the fetch never blocks the event loop. The
`worker` process also polls, so on a warm deploy even the first API request is served
from cache.

---

## Configuration

`.env.example` documents every variable. The essentials:

| Variable | Default | Purpose |
|---|---|---|
| `SECRET_KEY` | `change-me-in-production` | **set a real value in production** |
| `DATABASE_URL` / `DATABASE_SYNC_URL` | localhost | async app URL + psycopg2 URL for Alembic |
| `REDIS_URL`, `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND` | localhost | cache + queues |
| `FRONTEND_URL` | empty | exact browser origin for CORS |
| `MARKET_DATA_LIVE_ONLY` | `false` | `true` disables synthetic demo prices |
| `FINNHUB_API_KEY` (+`_2`) | empty | stocks/ETF quotes; second key doubles quota |
| `TWELVEDATA_API_KEY`, `ALPHAVANTAGE_API_KEY`, `FRED_API_KEY` | empty | FX, commodities, rates |
| `NEWSAPI_KEY` | empty | headline ingestion beyond RSS |
| `OPENROUTER_API_KEY` | empty | LLM narrative layer; blank = rule-based text |
| `ALPACA_*`, `OANDA_*`, `CCXT_*` | paper/sandbox | broker access, paper by default |
| `SUPABASE_URL` / `_ANON_KEY` / `_SERVICE_ROLE_KEY` | empty | waitlist storage |
| `ENABLE_OTEL` | `false` | OTLP traces/metrics |
| `DISCORD_WEBHOOK_URL` / `SLACK_WEBHOOK_URL` | empty | alert delivery |

Optional ML extras: `pip install -r requirements-ml.txt` (or `pip install -e ".[ml]"`).
Only needed for transformer sentiment and the fitted LightGBM/XGBoost models.

---

## API surface

Both `/health`-style root paths and `/api/v1/...` are mounted.

| Endpoint | Description |
|---|---|
| `GET /health` | service + DB/Redis/market-feed status |
| `GET /api/v1/market/markets/all` | every asset class in one payload |
| `GET /api/v1/market/markets/{asset_class}` | one class (`stocks`, `crypto`, `forex`, `commodities`, `bonds`, `etfs`, `indices`) |
| `GET /api/v1/market/live/{symbol}` · `GET /api/v1/market/history/{symbol}` | single-asset quote and bars |
| `GET /api/v1/gti/current` · `/gti/history` | tension index and its series |
| `GET /api/v1/signals/assets` · `/signals/enhanced` | per-asset stress signals |
| `POST /api/v1/simulate/scenario` | project a custom shock |
| `POST /api/v1/portfolio/evaluate` · `/portfolio/risk` · `/portfolio/pnl` | Monte-Carlo portfolio stress |
| `POST /api/v1/alerts/subscribe` | webhook alerts |
| `WS /api/v1/ws?channels=market,gti` | streaming updates (`market`, `gti`, `signals`, `events`, `alerts`, `all`) |

---

## Tests and CI

- `pytest tests/` — 189 tests (unit, integration against in-process ASGI + SQLite,
  contract, load helpers). `make test-unit`, `make test-integration`.
- `cd frontend && npm run test` (Vitest) and `npm run e2e` (Playwright, needs a
  running stack).
- `make secrets` — `scripts/check_secrets.py` fails the build on provider-key
  patterns in tracked files.
- `.github/workflows/ci.yml` runs secret scan → `ruff check` → pytest → frontend
  lint/test/build on every push and PR.

Lint rules target mistakes that break the running app (syntax, undefined names,
unused imports, bugbear checks). React style rules the codebase predates report as
warnings so `npm run lint` stays usable.

---

## Known limitations

Read these before pointing real users at a deployment.

1. **No authentication boundary.** Portfolio and execution routes identify a user by
   an email/identifier passed in the request — there is no verified session, so any
   caller can read or write another identifier's portfolio. Do not store real holdings
   or enable live execution until an auth dependency guards those routers.
2. **Execution safety.** `/portfolio/execute` is intended for paper accounts. Keep
   `ALPACA_PAPER=true`, `CCXT_SANDBOX=true`, `OANDA_ENVIRONMENT=practice` and gate
   live trading behind an explicit approval flow.
3. **Rate limiting is coarse.** Only SlowAPI's global default (`RATE_LIMIT_DEFAULT`,
   100/minute per IP) is applied. `rate_limit_simulation` exists in config but no
   route decorator uses it, so simulate/backtest/execute share the general budget —
   add per-route `@limiter.limit(...)` and quotas before opening to the public.
4. **Health checks are shallow.** `/health` reports DB/Redis/market-feed liveness but
   not worker depth or model freshness.
5. **GTI needs the pipeline, and the globe disagrees with it until then.**
   `/gti/current` returns the latest stored snapshot; without the beat-scheduled
   ingestion worker running it reads `0.0` with no drivers. Meanwhile `/globe/countries`
   serves a demo baseline (`global_gti = 55.0` with per-country jitter), so the top of
   the globe and the status bar show two different numbers on a fresh deploy. Wire the
   globe to the same computed value before treating either as a signal.
6. **Country click-through is illustrative.** The `/globe/country/{iso}/impact`
   fallback builds quotes, OHLCV candles, sector exposures and currency impacts from
   `random.uniform` and is not labelled as demo data the way the market board is.
7. **Test realism.** The suite runs on SQLite/mocks. Postgres/Redis parity checks are
   still TODO, as are strict schemas for the shared-simulation payload.

## Security: keys that were committed

Provider keys that appeared in earlier commits of this repo are **still readable in
its git history**. The working tree holds placeholders and `make secrets` prevents
recurrence, but scrubbing does not remove them from history, so each one was revoked
and reissued on 2026-10-19:

- `ALPACA_API_KEY` / `ALPACA_SECRET_KEY` (Alpaca dashboard → API keys → revoke)
- `FINNHUB_API_KEY`
- `TWELVEDATA_API_KEY`
- `ALPHAVANTAGE_API_KEY`
- `FRED_API_KEY`
- `NEWSAPI_KEY`

Set the new values in the Render environment (`.env` locally) — nothing else needs to
change. History rewriting is a separate, deliberate step (it changes the public repo
and breaks every existing clone) and was not performed here; the old values are dead,
but they remain visible to anyone who reads the log.

---

## Layout

```
app/                 FastAPI routes, services, pipelines, Celery tasks
app/services/market/ per-provider market data adapters
app/pipelines/       ingestion, NLP scoring, GTI engine, impact model, feeds
alembic/             migrations (idempotent; Timescale-aware, Postgres-safe)
frontend/            React SPA (features/, shared/)
infra/docker/        Dockerfile (multi-target: api, worker), nginx, initdb
scripts/             seed.py, check_secrets.py
trading/             paper-trading journals and outcome logs
flow.md              news → NLP → ML data flow
```
