"""Per-user settings and encrypted provider credentials."""
from __future__ import annotations

import uuid
from datetime import UTC, datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


def _utcnow() -> datetime:
    return datetime.now(UTC)


class UserSettings(Base):
    """Preferences for one email-registered account.

    The email is the identity key used by the rest of the app (portfolio cart,
    trade log), so it is the primary key here too rather than a fabricated
    account table.
    """

    __tablename__ = "user_settings"

    user_email = Column(String(255), primary_key=True)
    profile_name = Column(String(100), nullable=True)
    default_landing_page = Column(String(32), nullable=False, default="globe")
    default_asset_class = Column(String(32), nullable=False, default="all")
    refresh_interval_seconds = Column(Integer, nullable=False, default=15)
    time_zone = Column(String(64), nullable=False, default="UTC")
    time_format = Column(String(8), nullable=False, default="24h")
    # auto | geotrade | user — controls whether BYOK credentials are used.
    data_source_preference = Column(String(16), nullable=False, default="auto")
    created_at = Column(DateTime(timezone=True), nullable=False, default=_utcnow)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=_utcnow, onupdate=_utcnow
    )


class UserApiKey(Base):
    """One encrypted credential set per (account, provider).

    Only ciphertext and a four-character display hint are persisted. The full
    key is never written to the database, logs, or API responses.
    """

    __tablename__ = "user_api_keys"
    __table_args__ = (
        UniqueConstraint("user_email", "provider", name="uq_user_api_key_provider"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_email = Column(String(255), nullable=False, index=True)
    provider = Column(String(32), nullable=False)
    encrypted_key = Column(Text, nullable=False)
    encrypted_secret = Column(Text, nullable=True)
    encrypted_extra = Column(Text, nullable=True)
    key_last4 = Column(String(4), nullable=False, default="")
    is_preferred = Column(Boolean, nullable=False, default=False)
    # connected | invalid | rate_limited | unavailable | requires_verification
    status = Column(String(24), nullable=False, default="connected")
    last_error = Column(String(300), nullable=True)
    last_validated_at = Column(DateTime(timezone=True), nullable=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=_utcnow)
    updated_at = Column(
        DateTime(timezone=True), nullable=False, default=_utcnow, onupdate=_utcnow
    )
