"""Application configuration via pydantic-settings."""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import AliasChoices, Field, SecretStr, ValidationInfo, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_env: Literal["development", "staging", "production"] = Field(
        default="development",
        validation_alias=AliasChoices("APP_ENV", "ENV"),
    )
    app_version: str = "0.2.0"
    api_v1_str: str = "/api/v1"
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"
    secret_key: SecretStr = Field(default="change-me-in-production")
    frontend_url: str = ""

    @field_validator("app_env", mode="before")
    @classmethod
    def _normalise_app_env(cls, v: object) -> object:
        return v.strip().lower() if isinstance(v, str) else v

    # Database
    database_url: str = "postgresql+asyncpg://geotrade:geotrade_secret@localhost:5432/geotrade"
    database_sync_url: str = ""
    db_pool_size: int = 10
    db_max_overflow: int = 20
    db_pool_timeout: int = 30

    @field_validator("database_url", mode="before")
    @classmethod
    def _force_async_driver(cls, v: object) -> object:
        """Point the async engine at asyncpg and use its TLS argument names.

        Managed Postgres providers (Render, Neon, Supabase) hand out bare
        ``postgres://`` / ``postgresql://`` URLs carrying ``?sslmode=require``.
        Two problems follow: SQLAlchemy resolves that scheme to the synchronous
        psycopg2 driver ("the asyncio extension requires an async driver"), and
        asyncpg has no ``sslmode`` keyword — only ``ssl`` — so the leftover
        parameter would be sent to the server as a runtime setting and fail.
        """
        if not isinstance(v, str) or not v:
            return v

        if v.startswith(("postgres://", "postgresql://")):
            scheme, _, rest = v.partition("://")
            v = f"postgresql+asyncpg://{rest}"

        prefix, sep, query = v.partition("?")
        if sep:
            pairs = [p for p in query.split("&") if p]
            renamed = [
                ("ssl" + p[len("sslmode"):]) if p.startswith("sslmode=") else p
                for p in pairs
            ]
            v = prefix + "?" + "&".join(renamed) if renamed else prefix
        return v

    @field_validator("database_sync_url", mode="before")
    @classmethod
    def _default_sync_url(cls, v: object, info: ValidationInfo) -> object:
        """Derive the psycopg2 URL used by Alembic when it is not set explicitly.

        libpq wants ``sslmode`` where asyncpg wants ``ssl``, so the parameter is
        renamed back for the synchronous URL that ``database_url`` was rewritten
        for.
        """
        def as_psycopg2(url: str) -> str:
            for driver in ("postgresql+asyncpg://", "postgresql://", "postgres://"):
                if url.startswith(driver):
                    url = "postgresql+psycopg2://" + url[len(driver):]
                    break

            prefix, sep, query = url.partition("?")
            if not sep:
                return url
            pairs = [
                ("sslmode=" + p[len("ssl="):]) if p.startswith("ssl=") else p
                for p in query.split("&") if p
            ]
            return f"{prefix}?{'&'.join(pairs)}" if pairs else prefix

        if isinstance(v, str) and v:
            return as_psycopg2(v)

        async_url = info.data.get("database_url", "")
        if isinstance(async_url, str) and async_url:
            return as_psycopg2(async_url)
        return "postgresql+psycopg2://geotrade:geotrade_secret@localhost:5432/geotrade"

    # Redis
    redis_url: str = "redis://localhost:6379/0"
    redis_cache_ttl_seconds: int = 60

    # Celery
    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = "redis://localhost:6379/2"

    # Rate limiting
    rate_limit_default: str = "100/minute"
    rate_limit_simulation: str = "10/minute"

    # Model artifacts
    model_artifacts_dir: Path = Path("./model_artifacts")

    # NLP
    nlp_model_name: str = "cross-encoder/nli-distilroberta-base"
    sentence_transformer_model: str = "all-MiniLM-L6-v2"
    spacy_model: str = "en_core_web_sm"

    # GTI
    gti_decay_lambda: float = 0.05  # per-hour decay constant
    gti_version: str = "1.0.0"

    # Pipeline
    pipeline_version: str = "1.0.0"

    # Telemetry
    otel_exporter_otlp_endpoint: str = "http://localhost:4317"
    otel_service_name: str = "geotrade"
    enable_otel: bool = False

    # Alert webhooks
    discord_webhook_url: str = ""
    slack_webhook_url: str = ""

    # External data APIs
    finnhub_api_key: str = ""
    finnhub_api_key_2: str = ""   # second key for round-robin rotation (doubles rate limit)
    twelvedata_api_key: str = ""
    polygon_api_key: str = ""
    alphavantage_api_key: str = ""
    newsapi_key: str = ""
    fred_api_key: str = ""
    openrouter_api_key: str = ""

    # CoinGecko (free, no key required for basic usage)
    coingecko_base_url: str = "https://api.coingecko.com/api/v3"

    # Market data mode
    market_data_live_only: bool = False  # True => disable synthetic fallback

    # Alpaca Markets broker (read from environment — never hardcode)
    alpaca_api_key: str = ""
    alpaca_secret_key: str = ""
    alpaca_base_url: str = "https://paper-api.alpaca.markets"
    alpaca_data_url: str = "https://data.alpaca.markets"
    alpaca_paper: bool = True  # True = paper trading; set False only for live

    # OANDA v20 Practice API (paper forex trading)
    oanda_api_key: str = ""
    oanda_account_id: str = ""
    oanda_environment: Literal["practice", "live"] = "practice"

    # CCXT secondary exchange (e.g. binance, kraken, coinbase)
    ccxt_exchange: str = "binance"  # exchange id recognised by ccxt
    ccxt_api_key: str = ""
    ccxt_secret: str = ""
    ccxt_sandbox: bool = True  # True = testnet / sandbox mode

    # Paper trading ingestion schedule (seconds between price fetches)
    paper_trading_fetch_interval: int = 30

    # Supabase (waitlist) — use service_role key for server-side inserts (bypasses RLS)
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    @field_validator("model_artifacts_dir", mode="before")
    @classmethod
    def create_artifacts_dir(cls, v: str | Path) -> Path:
        path = Path(v)
        path.mkdir(parents=True, exist_ok=True)
        return path

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
