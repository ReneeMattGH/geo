"""Create trading analytics schema + Timescale optimizations.

Revision ID: b7c8d9e0f1a2
Revises: a1b2c3d4e5f6
Create Date: 2026-03-11 00:00:00.000000
"""
from __future__ import annotations

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "b7c8d9e0f1a2"
down_revision: str | None = "a1b2c3d4e5f6"
branch_labels: str | tuple[str, ...] | None = None
depends_on: str | tuple[str, ...] | None = None


def upgrade() -> None:
    """Create core entities and TimescaleDB optimization policies."""
    # Skip TimescaleDB extension for local development - create basic tables only
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS assets (
            id          SERIAL PRIMARY KEY,
            symbol      TEXT NOT NULL UNIQUE,
            asset_type  TEXT NOT NULL,
            description TEXT,
            base_ccy    TEXT,
            created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        """
    )

    op.execute(
        """
        CREATE TABLE IF NOT EXISTS prices (
            asset_id    INT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
            ts          TIMESTAMPTZ NOT NULL,
            open        NUMERIC,
            high        NUMERIC,
            low         NUMERIC,
            close       NUMERIC,
            volume      NUMERIC,
            source      TEXT,
            PRIMARY KEY (asset_id, ts)
        );
        """
    )

    op.execute(
        """
        CREATE TABLE IF NOT EXISTS news_events (
            id               BIGSERIAL PRIMARY KEY,
            source           TEXT,
            url              TEXT,
            published_at     TIMESTAMPTZ,
            raw_title        TEXT,
            raw_body         TEXT,
            language         TEXT,
            region           TEXT,
            sentiment_score  NUMERIC,
            severity_score   NUMERIC,
            metadata         JSONB,
            created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        """
    )

    op.execute(
        """
        CREATE TABLE IF NOT EXISTS gti_series (
            ts               TIMESTAMPTZ NOT NULL,
            gti_value        NUMERIC NOT NULL,
            metadata         JSONB,
            PRIMARY KEY (ts)
        );
        """
    )

    op.execute(
        """
        CREATE TABLE IF NOT EXISTS predictions (
            id               BIGSERIAL PRIMARY KEY,
            asset_id         INT REFERENCES assets(id) ON DELETE CASCADE,
            ts               TIMESTAMPTZ NOT NULL,
            horizon          INTERVAL NOT NULL,
            model_type       TEXT NOT NULL,
            predicted_return NUMERIC,
            predicted_vol    NUMERIC,
            risk_score       NUMERIC,
            confidence       NUMERIC,
            metadata         JSONB,
            created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        """
    )

    # Skip TimescaleDB-specific features for local development
    # Composite indexes for latest-N per-asset read patterns
    op.execute("CREATE INDEX IF NOT EXISTS idx_prices_asset_ts_desc ON prices (asset_id, ts DESC);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_predictions_asset_ts_desc ON predictions (asset_id, ts DESC);")
    op.execute("CREATE INDEX IF NOT EXISTS idx_news_events_published_at_desc ON news_events (published_at DESC);")


def downgrade() -> None:
    """Partial downgrade for schema elements created here."""
    op.execute("DROP MATERIALIZED VIEW IF EXISTS features_gti_1d;")
    op.execute("DROP MATERIALIZED VIEW IF EXISTS features_prices_1d;")
    op.execute("DROP TABLE IF EXISTS predictions;")
    op.execute("DROP TABLE IF EXISTS gti_series;")
    op.execute("DROP TABLE IF EXISTS news_events;")
    op.execute("DROP TABLE IF EXISTS prices;")
    op.execute("DROP TABLE IF EXISTS assets;")
