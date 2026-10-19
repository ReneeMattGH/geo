"""Add enhanced AI signals fields to market_signals table.

Revision ID: 0006
Revises: 0005
Create Date: 2026-03-22
"""
from __future__ import annotations

from alembic import op

revision = "0006"
down_revision = "0005"
branch_labels = None
depends_on = None

# column name → SQL type
_COLUMNS: list[tuple[str, str]] = [
    ("confidence", "FLOAT"),
    ("bullish_strength", "FLOAT"),
    ("bearish_strength", "FLOAT"),
    ("volatility", "VARCHAR(16)"),
    ("triggering_event", "TEXT"),
    ("entry", "FLOAT"),
    ("stop_loss", "FLOAT"),
    ("target", "FLOAT"),
    ("risk_reward", "FLOAT"),
    ("atr", "FLOAT"),
    ("max_position", "FLOAT"),
    ("reasoning", "TEXT"),
]


def upgrade() -> None:
    # IF NOT EXISTS keeps this idempotent: alembic/env.py bootstraps the schema
    # with Base.metadata.create_all(), which on a fresh database already creates
    # these columns from the ORM model before any migration runs.
    for name, sql_type in _COLUMNS:
        op.execute(
            f"ALTER TABLE market_signals ADD COLUMN IF NOT EXISTS {name} {sql_type};"
        )


def downgrade() -> None:
    for name, _ in reversed(_COLUMNS):
        op.execute(f"ALTER TABLE market_signals DROP COLUMN IF EXISTS {name};")
