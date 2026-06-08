# GeoTrade Tech Flow: News → NLP → ML

## 1. News Ingestion (How News Is Pulled)

### Sources & Adapters

News is fetched via pluggable adapters in `app/pipelines/ingestion_adapters.py`:

| Adapter | Technology | Purpose |
|---------|------------|---------|
| RSSAdapter | feedparser + httpx | RSS/Atom feeds |
| WebScrapingAdapter | HTML scraping + regex | Sites without RSS (geopolitical keyword filter) |
| FileAdapter | JSONL file | Testing/seeding |

### Active Sources (RSS)

`DEFAULT_ADAPTERS` includes 17 RSS feeds:

- **Global:** Reuters World, BBC World, NYT World, Economist, CNBC, Bloomberg, Defense One, Janes
- **Middle East:** Al Jazeera
- **Europe:** FT Markets, Guardian, Deutsche Welle
- **Asia Pacific:** South China Morning Post
- **Americas:** EIA
- **Africa:** BBC Africa
- **Latin America:** BBC Latin America
- **Energy:** OilPrice

### Flow

```
Celery Beat (every 60s)
    ↓
run_news_ingestion (ingestion_tasks.py)
    ↓
For each adapter: adapter.fetch() → list[RawArticle]
    ↓
IngestionService.process_articles()
    ├── 1. Dedup by content_hash (SHA256 of title|body|url)
    ├── 2. Fuzzy title dedup (rapidfuzz ≥85% vs last 6h)
    ├── 3. NLP processing (inline)
    └── 4. EventRepository.create() → Event in DB
```

### Note on Config

`config/data_sources.yaml` defines GDELT, NewsAPI.ai, and RSS feeds, but the ingestion pipeline uses the hardcoded `DEFAULT_ADAPTERS`. GDELT is only used for the globe endpoint (event markers), not for ingestion.

---

## 2. NLP Pipeline

### Location

`app/pipelines/nlp_pipeline.py` — invoked inside `IngestionService.process_articles()` for each new article.

### Components

| Component | Library | Purpose |
|-----------|---------|---------|
| Zero-shot classification | transformers (DistilRoBERTa) | Event type: normal, tension, escalation or 11 detailed categories |
| Sentiment | VADER | Compound score -1 to 1 |
| Severity | Heuristic | Combines classification weight, sentiment, confidence |
| Entity extraction | spaCy (en_core_web_sm) | GPE, ORG, PERSON, NORP, FAC, LOC, EVENT |
| Geo risk vector | Keyword matching | Region weights: middle_east, europe, asia_pacific, americas, africa |
| Commodity/sector exposure | Keyword matching | Commodities (oil, gas, gold, wheat, etc.) and sectors |
| Embeddings | sentence-transformers (all-MiniLM-L6-v2) | 384-dim vectors for clustering |
| Clustering | HDBSCAN | Event clustering (min_cluster_size=3) |

### Output (NLPResult)

Stored on each Event:

- `classification`, `sentiment_score`, `severity_score`
- `entities`, `geo_risk_vector`, `commodity_exposure`, `sector_exposure`
- `embedding`

---

## 3. ML Engine (Market Impact Model)

### Location

`app/pipelines/market_model.py`

### Models

| Model | Purpose | Training Data |
|-------|---------|---------------|
| LightGBM / XGBoost | 24h volatility spike probability | yfinance: SPY, ^VIX, USO (5 years) |
| Ridge regression | Directional bias (-1 to 1) | Same data |
| Fallback | GradientBoostingClassifier if LightGBM/XGBoost unavailable | Same data |

### Features (FEATURE_SCHEMA)

- **GTI:** gti_value, gti_delta_1h, gti_confidence
- **Market:** realized_vol, return_1d, return_5d, sector_gti_weight
- **Shocks:** oil_shock, regime_vix_proxy
- **Technicals (Finnhub):** rsi_14, macd_signal_diff, bb_pct_b

### Outputs

- `vol_spike_prob_24h`
- `directional_bias` (-1 to 1)
- `sector_stress`, `uncertainty_score`
- `recommendation` (Buy/Sell/Hold, rule-based)

---

## 4. End-to-End Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         GEOTRADE DATA FLOW                                        │
└─────────────────────────────────────────────────────────────────────────────────┘

  NEWS SOURCES                    MARKET DATA                 GDELT (globe only)
  RSS / Scraper                   Finnhub / Binance
        │                               │
        ▼                               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  CELERY BEAT                                                                      │
│  • News ingestion: 60s    • Market data: 30s    • GTI: 5 min    • Signals: 5 min  │
└─────────────────────────────────────────────────────────────────────────────────┘
        │                               │
        ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│  run_news_ingestion  │         │  ingest_market_data  │
│  adapter.fetch()     │         │  MarketFeedManager   │
└──────────┬──────────┘         └──────────┬──────────┘
           │                                │
           ▼                                │
┌─────────────────────┐                    │
│  IngestionService    │                    │
│  • Dedup (hash +     │                    │
│    fuzzy title)      │                    │
│  • NLP pipeline ────┼────────────────────┤
└──────────┬──────────┘                    │
           │                                │
           ▼                                │
┌─────────────────────┐                    │
│  Event (DB)          │◄───────────────────┘
│  classification,     │
│  sentiment,          │
│  severity, geo_vec   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐         ┌─────────────────────┐
│  compute_gti_all_    │         │  compute_all_signals │
│  regions (5 min)     │         │  (5 min)             │
└──────────┬──────────┘         └──────────┬──────────┘
           │                                │
           ▼                                ▼
┌─────────────────────┐         ┌─────────────────────────────────────────────┐
│  GTI ENGINE          │         │  MarketSignalService                         │
│  • Exponential decay │         │  • GTI + market data + Finnhub indicators    │
│  • Event contribs    │         │  • MarketImpactModel.predict()               │
│  • 72h window       │         │  • MarketSignal → DB                         │
│  • 6 regions        │         │  • TradingSignalGenerator (enhanced signals)  │
└──────────┬──────────┘         └─────────────────────┬───────────────────────┘
           │                                          │
           ▼                                          ▼
┌─────────────────────┐                    ┌─────────────────────┐
│  GTI Snapshot (DB)  │                    │  MarketSignal (DB)   │
└─────────────────────┘                    └─────────────────────┘
           │                                          │
           └──────────────────┬───────────────────────┘
                              ▼
                   ┌─────────────────────┐
                   │  API / WebSocket     │
                   │  /gti/current        │
                   │  /signals/assets     │
                   │  /simulate/scenario  │
                   └─────────────────────┘
```

---

## 5. GTI Engine (News → Index)

**Location:** `app/pipelines/gti_engine.py`

**Formula:**

```
gti(t) = gti(t-1) * exp(-λ * Δt_hours) + Σ weighted_event_contributions(t)
λ ≈ 0.05/hour (half-life ~14h)
Event contribution = severity × sentiment_factor × region_weight × recency_factor
```

**Parameters:**

- **Window:** 72h
- **Regions:** global, middle_east, europe, asia_pacific, americas, africa

---

## 6. Summary

| Stage | What Happens |
|-------|--------------|
| 1. News pull | Celery every 60s → RSS/scraper adapters → RawArticle list |
| 2. Dedup | Content hash + fuzzy title (6h window) |
| 3. NLP | DistilRoBERTa, VADER, spaCy, embeddings, HDBSCAN → Event with classification, sentiment, severity, entities, geo vector |
| 4. GTI | Celery every 5 min → GTI engine uses events (72h) → GTI snapshots per region |
| 5. ML | Celery every 5 min → GTI + market data + Finnhub indicators → LightGBM/Ridge → vol spike prob, directional bias, Buy/Sell/Hold |
| 6. Output | API endpoints and WebSocket broadcast |

**The flow is:** News → Events (NLP) → GTI → ML features → Trading signals.
