"""Create user settings and encrypted BYOK credential tables.

Revision ID: 0007
Revises: 0006
Create Date: 2026-11-03
"""
from __future__ import annotations

from alembic import op

revision = "0007"
down_revision = "0006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # IF NOT EXISTS mirrors 0006: alembic/env.py creates ORM-declared tables on a
    # fresh database before migrations run, so these statements must be no-ops there.
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS user_settings (
            user_email VARCHAR(255) PRIMARY KEY,
            profile_name VARCHAR(100),
            default_landing_page VARCHAR(32) NOT NULL DEFAULT 'globe',
            default_asset_class VARCHAR(32) NOT NULL DEFAULT 'all',
            refresh_interval_seconds INTEGER NOT NULL DEFAULT 15,
            time_zone VARCHAR(64) NOT NULL DEFAULT 'UTC',
            time_format VARCHAR(8) NOT NULL DEFAULT '24h',
            data_source_preference VARCHAR(16) NOT NULL DEFAULT 'auto',
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        """
    )
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS user_api_keys (
            id UUID PRIMARY KEY,
            user_email VARCHAR(255) NOT NULL,
            provider VARCHAR(32) NOT NULL,
            encrypted_key TEXT NOT NULL,
            encrypted_secret TEXT,
            encrypted_extra TEXT,
            key_last4 VARCHAR(4) NOT NULL DEFAULT '',
            is_preferred BOOLEAN NOT NULL DEFAULT FALSE,
            status VARCHAR(24) NOT NULL DEFAULT 'connected',
            last_error VARCHAR(300),
            last_validated_at TIMESTAMPTZ,
            last_used_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        """
    )
    op.execute(
        "ALTER TABLE user_api_keys "
        "ADD COLUMN IF NOT EXISTS is_preferred BOOLEAN NOT NULL DEFAULT FALSE;"
    )
    op.execute(
        "CREATE INDEX IF NOT EXISTS ix_user_api_keys_user_email "
        "ON user_api_keys (user_email);"
    )
    op.execute(
        "CREATE UNIQUE INDEX IF NOT EXISTS uq_user_api_key_provider "
        "ON user_api_keys (user_email, provider);"
    )


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS user_api_keys;")
    op.execute("DROP TABLE IF EXISTS user_settings;")
