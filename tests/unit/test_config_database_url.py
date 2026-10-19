"""DATABASE_URL normalisation for managed Postgres providers.

Render, Neon and Supabase all hand out bare ``postgres://`` URLs with
``?sslmode=require``. Without normalisation the async engine resolves to the
synchronous psycopg2 driver and fails on the first query, and asyncpg rejects the
leftover ``sslmode`` keyword.
"""
from __future__ import annotations

import pytest

from app.core.config import Settings

RENDER_URL = "postgres://geo:pw@dpg-x.render.com:5432/geotrade?sslmode=require"


def test_bare_postgres_url_is_rewritten_for_asyncpg() -> None:
    settings = Settings(DATABASE_URL=RENDER_URL)
    assert settings.database_url.startswith("postgresql+asyncpg://")


def test_sslmode_is_renamed_to_ssl_for_asyncpg() -> None:
    settings = Settings(DATABASE_URL=RENDER_URL)
    assert "ssl=require" in settings.database_url
    assert "sslmode=" not in settings.database_url


def test_sync_url_defaults_to_psycopg2_with_libpq_sslmode() -> None:
    settings = Settings(DATABASE_URL=RENDER_URL)
    assert settings.database_sync_url.startswith("postgresql+psycopg2://")
    assert "sslmode=require" in settings.database_sync_url
    assert "ssl=" not in settings.database_sync_url


def test_already_async_url_is_left_alone() -> None:
    url = "postgresql+asyncpg://u:p@localhost:5432/db"
    assert Settings(DATABASE_URL=url).database_url == url


def test_explicit_sync_url_still_wins() -> None:
    settings = Settings(
        DATABASE_URL=RENDER_URL,
        DATABASE_SYNC_URL="postgresql+psycopg2://other:pw@backup:5432/geotrade",
    )
    assert "backup:5432" in settings.database_sync_url


@pytest.mark.parametrize("raw", ["ENV=production", "APP_ENV=production"])
def test_env_and_app_env_both_select_production(raw: str) -> None:
    key, _, value = raw.partition("=")
    assert Settings(**{key: value}).app_env == value
