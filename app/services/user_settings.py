"""Persistence and routing for account preferences and BYOK credentials."""
from __future__ import annotations

import hashlib
import json
import time
from datetime import UTC, datetime

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.api_providers import get_provider_manager
from app.core.config import get_settings
from app.core.key_vault import (
    KeyVaultError,
    decrypt_secret,
    encrypt_secret,
    last4,
    vault_configured,
)
from app.core.logging import get_logger
from app.models.settings import UserApiKey, UserSettings
from app.schemas.settings import ApiKeyInput, ApiKeyOut, DefaultSourceOut, ProviderOut, SettingsUpdate
from app.services.user_providers import (
    PROVIDER_SPECS,
    STATUS_CONNECTED,
    STATUS_INVALID,
    STATUS_RATE_LIMITED,
    STATUS_REQUIRES_VERIFICATION,
    STATUS_UNAVAILABLE,
    ProviderCredentials,
    ProviderQuote,
    ProviderRequestError,
    ValidationResult,
    fetch_quotes,
    get_spec,
    validate_credentials,
)

logger = get_logger(__name__)

DEFAULT_LANDING_PAGE = "globe"
DEFAULT_ASSET_CLASS = "all"
DEFAULT_REFRESH_SECONDS = 15
DEFAULT_TIME_ZONE = "UTC"
DEFAULT_TIME_FORMAT = "24h"
DEFAULT_SOURCE_PREFERENCE = "auto"

_QUOTE_CACHE: dict[str, tuple[float, dict[str, ProviderQuote]]] = {}
_LAST_USED_WRITE: dict[str, float] = {}
_LAST_USED_INTERVAL = 60.0
# A provider that just answered 429 is left alone for a minute so the shared
# feed can carry the page instead of us hammering it on every poll.
_RATE_LIMIT_COOLDOWN = 60.0


class ApiKeyValidationError(RuntimeError):
    def __init__(self, status: str, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


class ApiKeyNotFound(LookupError):
    pass


def _now() -> datetime:
    return datetime.now(UTC)


# ── Settings ──────────────────────────────────────────────────────────────────

async def get_settings_row(db: AsyncSession, email: str) -> UserSettings:
    row = await db.get(UserSettings, email)
    if row is None:
        row = UserSettings(user_email=email)
        db.add(row)
        await db.flush()
    return row


async def get_settings_optional(db: AsyncSession, email: str) -> UserSettings | None:
    return await db.get(UserSettings, email)


async def update_settings_row(
    db: AsyncSession, email: str, payload: SettingsUpdate
) -> UserSettings:
    row = await get_settings_row(db, email)
    changes = payload.model_dump(exclude_unset=True, exclude_none=True)
    for key, value in changes.items():
        setattr(row, key, value)
    if changes:
        row.updated_at = _now()
        if "data_source_preference" in changes:
            _invalidate_user_cache(email)
    await db.flush()
    return row


async def reset_settings_row(db: AsyncSession, email: str) -> UserSettings:
    row = await get_settings_row(db, email)
    row.default_landing_page = DEFAULT_LANDING_PAGE
    row.default_asset_class = DEFAULT_ASSET_CLASS
    row.refresh_interval_seconds = DEFAULT_REFRESH_SECONDS
    row.time_zone = DEFAULT_TIME_ZONE
    row.time_format = DEFAULT_TIME_FORMAT
    row.data_source_preference = DEFAULT_SOURCE_PREFERENCE
    row.updated_at = _now()
    _invalidate_user_cache(email)
    await db.flush()
    return row


# ── Credentials ───────────────────────────────────────────────────────────────

def _credentials_from_row(row: UserApiKey) -> ProviderCredentials:
    extra: dict[str, str] = {}
    if row.encrypted_extra:
        extra = json.loads(
            decrypt_secret(row.encrypted_extra, user_email=row.user_email, provider=row.provider)
        )
    companion = ""
    if row.encrypted_secret:
        companion = decrypt_secret(
            row.encrypted_secret, user_email=row.user_email, provider=row.provider
        )
    plain_key = decrypt_secret(
        row.encrypted_key, user_email=row.user_email, provider=row.provider
    )
    return ProviderCredentials(api_key=plain_key, api_secret=companion, extra=extra)


def _credentials_from_input(payload: ApiKeyInput) -> ProviderCredentials:
    companion = (payload.api_secret or "").strip()
    return ProviderCredentials(
        api_key=payload.api_key.strip(),
        api_secret=companion,
        extra={k: str(v).strip() for k, v in (payload.extra or {}).items()},
    )


def to_api_key_out(row: UserApiKey, message: str | None = None) -> ApiKeyOut:
    spec = get_spec(row.provider)
    return ApiKeyOut(
        provider=row.provider,
        provider_name=spec.name if spec else row.provider.title(),
        masked_key=f"••••{row.key_last4}" if row.key_last4 else "••••",
        status=row.status,
        capabilities=list(spec.capabilities) if spec else [],
        is_preferred=bool(row.is_preferred),
        last_validated_at=row.last_validated_at,
        last_used_at=row.last_used_at,
        created_at=row.created_at,
        message=message if message is not None else row.last_error,
    )


async def list_api_keys(db: AsyncSession, email: str) -> list[UserApiKey]:
    result = await db.execute(
        select(UserApiKey)
        .where(UserApiKey.user_email == email)
        .order_by(UserApiKey.is_preferred.desc(), UserApiKey.created_at.asc())
    )
    return list(result.scalars().all())


async def get_api_key(
    db: AsyncSession, email: str, provider: str
) -> UserApiKey | None:
    result = await db.execute(
        select(UserApiKey).where(
            UserApiKey.user_email == email,
            UserApiKey.provider == provider.strip().lower(),
        )
    )
    return result.scalar_one_or_none()


async def validate_candidate(payload: ApiKeyInput) -> ValidationResult:
    return await validate_credentials(payload.provider, _credentials_from_input(payload))


async def upsert_api_key(
    db: AsyncSession, email: str, payload: ApiKeyInput
) -> tuple[UserApiKey, str]:
    """Validate, encrypt, and store a credential set (one per account/provider)."""
    if not vault_configured():
        raise ApiKeyValidationError(
            STATUS_UNAVAILABLE,
            "Credential storage is not configured on this server.",
        )

    validation = await validate_candidate(payload)
    if not validation.valid:
        raise ApiKeyValidationError(validation.status, validation.message)

    creds = _credentials_from_input(payload)
    row = await get_api_key(db, email, payload.provider)
    encrypted_key = encrypt_secret(creds.api_key, user_email=email, provider=payload.provider)
    encrypted_secret = (
        encrypt_secret(creds.api_secret, user_email=email, provider=payload.provider)
        if creds.api_secret else None
    )
    encrypted_extra = (
        encrypt_secret(json.dumps(creds.extra), user_email=email, provider=payload.provider)
        if creds.extra else None
    )

    if row is None:
        row = UserApiKey(
            user_email=email,
            provider=payload.provider,
            encrypted_key=encrypted_key,
            is_preferred=False,
        )
        db.add(row)
    row.encrypted_key = encrypted_key
    row.encrypted_secret = encrypted_secret
    row.encrypted_extra = encrypted_extra
    row.key_last4 = last4(creds.api_key)
    row.status = STATUS_CONNECTED
    row.last_error = None
    row.last_validated_at = _now()
    row.updated_at = _now()
    await db.flush()
    _invalidate_user_cache(email)
    return row, validation.message


async def delete_api_key(db: AsyncSession, email: str, provider: str) -> None:
    row = await get_api_key(db, email, provider)
    if row is None:
        raise ApiKeyNotFound(provider)
    await db.delete(row)
    await db.flush()
    _invalidate_user_cache(email)


async def test_api_key(
    db: AsyncSession, email: str, provider: str
) -> tuple[UserApiKey, ValidationResult]:
    row = await get_api_key(db, email, provider)
    if row is None:
        raise ApiKeyNotFound(provider)
    try:
        creds = _credentials_from_row(row)
    except (KeyVaultError, ValueError, json.JSONDecodeError):
        row.status = STATUS_UNAVAILABLE
        row.last_error = "Stored credential could not be decrypted."
        row.updated_at = _now()
        await db.flush()
        return row, ValidationResult(STATUS_UNAVAILABLE, row.last_error)

    result = await validate_credentials(row.provider, creds)
    row.status = result.status
    row.last_error = None if result.valid else result.message
    row.last_validated_at = _now()
    row.updated_at = _now()
    await db.flush()
    return row, result


async def set_key_preference(
    db: AsyncSession, email: str, provider: str, preferred: bool
) -> UserApiKey:
    row = await get_api_key(db, email, provider)
    if row is None:
        raise ApiKeyNotFound(provider)
    row.is_preferred = preferred
    row.updated_at = _now()
    await db.flush()
    _invalidate_user_cache(email)
    return row


# ── Catalogue ────────────────────────────────────────────────────────────────

def provider_catalogue() -> list[ProviderOut]:
    return [
        ProviderOut(
            id=spec.id,
            name=spec.name,
            description=spec.description,
            docs_url=spec.docs_url,
            capabilities=list(spec.capabilities),
            fields=[
                {
                    "key": f.key,
                    "label": f.label,
                    "required": f.required,
                    "secret": f.secret,
                    "placeholder": f.placeholder,
                    "help": f.help,
                    "options": list(f.options),
                }
                for f in spec.fields
            ],
        )
        for spec in PROVIDER_SPECS.values()
    ]


def default_source_statuses() -> list[DefaultSourceOut]:
    """Owner-configured sources, reported exactly as the server sees them."""
    manager = get_provider_manager()
    settings = get_settings()
    polygon_configured = bool(
        settings.polygon_api_key
        and not settings.polygon_api_key.lower().startswith(("your_", "xxx", "placeholder"))
    )
    entries = [
        ("Finnhub", manager.get_status("finnhub")),
        ("Twelve Data", manager.get_status("twelvedata")),
        ("Alpha Vantage", manager.get_status("alphavantage")),
        ("FRED", manager.get_status("fred")),
        ("Alpaca", manager.get_status("alpaca")),
        ("CoinGecko", manager.get_status("coingecko")),
    ]
    out = [
        DefaultSourceOut(
            name=name,
            status="connected" if status and status.active else "not_configured",
            detail=status.message if status else "No status available.",
        )
        for name, status in entries
    ]
    out.append(DefaultSourceOut(
        name="Polygon.io",
        status="connected" if polygon_configured else "not_configured",
        detail="Configured on the server." if polygon_configured
        else "No POLYGON_API_KEY configured; not used by default.",
    ))
    out.append(DefaultSourceOut(
        name="Yahoo Finance",
        status="connected",
        detail="Keyless fallback used for equities and indices.",
    ))
    out.append(DefaultSourceOut(
        name="Binance",
        status="connected",
        detail="Keyless public feed used for crypto.",
    ))
    return out


def encryption_available() -> bool:
    return vault_configured()


# ── Routing ──────────────────────────────────────────────────────────────────

def _asset_class_for(symbol: str) -> str:
    try:
        from app.config.asset_universe import get_asset_universe

        asset = get_asset_universe().get_asset(symbol)
        if asset is not None:
            return asset.asset_class
    except Exception:
        pass
    if symbol in {"BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "AVAX", "MATIC", "DOT", "LTC", "LINK"}:
        return "crypto"
    if len(symbol) == 6 and symbol.isalpha() and symbol[:3] in {
        "EUR", "GBP", "USD", "JPY", "CHF", "CAD", "AUD", "NZD",
    }:
        return "forex"
    return "stocks"


def _cache_key(email: str, provider: str, symbols: list[str]) -> str:
    digest = hashlib.sha256(email.encode("utf-8")).hexdigest()[:16]
    return f"{digest}|{provider}|{','.join(sorted(symbols))}"


def _invalidate_user_cache(email: str) -> None:
    digest = hashlib.sha256(email.encode("utf-8")).hexdigest()[:16]
    for key in [k for k in _QUOTE_CACHE if k.startswith(f"{digest}|")]:
        _QUOTE_CACHE.pop(key, None)


def _prune_cache() -> None:
    if len(_QUOTE_CACHE) <= 500:
        return
    ttl = max(5, get_settings().user_key_quote_cache_ttl)
    cutoff = time.monotonic() - ttl
    for key in [k for k, (stamp, _) in _QUOTE_CACHE.items() if stamp < cutoff]:
        _QUOTE_CACHE.pop(key, None)


async def _record_status(
    db: AsyncSession, email: str, provider: str, status: str, message: str
) -> None:
    await db.execute(
        update(UserApiKey)
        .where(UserApiKey.user_email == email, UserApiKey.provider == provider)
        .values(status=status, last_error=message[:300], updated_at=_now())
    )


async def _record_success(db: AsyncSession, email: str, provider: str) -> None:
    cache_id = f"{email}|{provider}"
    now_monotonic = time.monotonic()
    if now_monotonic - _LAST_USED_WRITE.get(cache_id, 0.0) < _LAST_USED_INTERVAL:
        return
    _LAST_USED_WRITE[cache_id] = now_monotonic
    await db.execute(
        update(UserApiKey)
        .where(UserApiKey.user_email == email, UserApiKey.provider == provider)
        .values(status=STATUS_CONNECTED, last_error=None, last_used_at=_now(), updated_at=_now())
    )


async def get_user_quote_overlay(
    db: AsyncSession, email: str | None, symbols: list[str]
) -> tuple[dict[str, ProviderQuote], str | None]:
    """Overlay quotes fetched with the account's own keys.

    Returns (quotes_by_symbol, provider_label). An empty dict means the caller
    should keep serving the shared GeoTrade feed, which is also the fallback
    whenever a user credential is rejected, rate limited, or unreachable.
    """
    if not email or not symbols or not vault_configured():
        return {}, None

    settings_row = await get_settings_optional(db, email)
    preference = settings_row.data_source_preference if settings_row else DEFAULT_SOURCE_PREFERENCE
    if preference == "geotrade":
        return {}, None

    keys = await list_api_keys(db, email)
    if preference == "user":
        keys = [k for k in keys if k.is_preferred]
    if not keys:
        return {}, None

    wanted = {s.strip().upper() for s in symbols if s.strip()}
    overlay: dict[str, ProviderQuote] = {}
    used: list[str] = []
    ttl = max(5, get_settings().user_key_quote_cache_ttl)
    now = time.monotonic()

    for key in keys:
        spec = get_spec(key.provider)
        if spec is None:
            continue
        if key.status in (STATUS_INVALID, STATUS_REQUIRES_VERIFICATION):
            continue
        if key.status == STATUS_RATE_LIMITED and key.updated_at is not None:
            updated = key.updated_at
            if updated.tzinfo is None:  # SQLite (tests) returns naive timestamps
                updated = updated.replace(tzinfo=UTC)
            if (datetime.now(UTC) - updated).total_seconds() < _RATE_LIMIT_COOLDOWN:
                continue
        supported = [
            s for s in wanted
            if _asset_class_for(s) in spec.quote_asset_classes
        ]
        if not supported:
            continue

        cache_id = _cache_key(email, key.provider, supported)
        cached = _QUOTE_CACHE.get(cache_id)
        if cached and now - cached[0] < ttl:
            overlay.update({s: q for s, q in cached[1].items() if s in wanted})
            if any(q.source for q in cached[1].values()):
                used.append(spec.name)
            continue

        try:
            creds = _credentials_from_row(key)
        except (KeyVaultError, ValueError, json.JSONDecodeError):
            await _record_status(
                db, email, key.provider, STATUS_UNAVAILABLE,
                "Stored credential could not be decrypted.",
            )
            continue

        try:
            result = await fetch_quotes(key.provider, creds, supported)
        except ProviderRequestError as exc:
            await _record_status(db, email, key.provider, exc.status, exc.message)
            logger.warning(
                "user_provider_fetch_failed",
                provider=key.provider, status=exc.status,
            )
            continue
        except Exception as exc:  # defensive: a provider bug must not break the feed
            await _record_status(
                db, email, key.provider, STATUS_UNAVAILABLE,
                "Provider request failed.",
            )
            logger.warning(
                "user_provider_fetch_error", provider=key.provider, error=type(exc).__name__
            )
            continue

        fresh = {q.symbol: q for q in result.quotes if q.symbol in wanted and q.price > 0}
        if fresh:
            _prune_cache()
            _QUOTE_CACHE[cache_id] = (now, fresh)
            overlay.update(fresh)
            used.append(spec.name)
            await _record_success(db, email, key.provider)

    return overlay, (", ".join(dict.fromkeys(used)) if used else None)
