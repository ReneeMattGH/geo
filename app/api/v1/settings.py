"""Account settings and user-supplied data provider credentials.

The email supplied in ``X-User-Email`` is the same identity the portfolio and
trade log already use, so every row here is scoped to that address. Credentials
are encrypted before they touch the database and are never echoed back: reads
return a masked hint only.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.identity import require_user_email
from app.schemas.settings import (
    ApiKeyInput,
    ApiKeyListResponse,
    ApiKeyMutationResponse,
    ApiKeyOut,
    KeyPreferenceRequest,
    ProvidersResponse,
    SettingsResetResponse,
    SettingsResponse,
    SettingsUpdate,
    ValidateKeyRequest,
    ValidateKeyResponse,
)
from app.services import user_settings as svc
from app.services.user_providers import (
    STATUS_INVALID,
    STATUS_RATE_LIMITED,
    STATUS_REQUIRES_VERIFICATION,
    STATUS_UNAVAILABLE,
)

router = APIRouter(prefix="/settings", tags=["settings"])

_VALIDATION_HTTP_STATUS = {
    STATUS_INVALID: status.HTTP_400_BAD_REQUEST,
    STATUS_REQUIRES_VERIFICATION: status.HTTP_400_BAD_REQUEST,
    STATUS_RATE_LIMITED: status.HTTP_429_TOO_MANY_REQUESTS,
    STATUS_UNAVAILABLE: status.HTTP_503_SERVICE_UNAVAILABLE,
}


def _settings_response(row) -> SettingsResponse:
    return SettingsResponse(
        email=row.user_email,
        profile_name=row.profile_name,
        default_landing_page=row.default_landing_page,
        default_asset_class=row.default_asset_class,
        refresh_interval_seconds=row.refresh_interval_seconds,
        time_zone=row.time_zone,
        time_format=row.time_format,
        data_source_preference=row.data_source_preference,
        created_at=row.created_at,
        updated_at=row.updated_at,
        encryption_available=svc.encryption_available(),
    )


def _default_settings_response(email: str) -> SettingsResponse:
    return SettingsResponse(
        email=email,
        profile_name=None,
        default_landing_page=svc.DEFAULT_LANDING_PAGE,
        default_asset_class=svc.DEFAULT_ASSET_CLASS,
        refresh_interval_seconds=svc.DEFAULT_REFRESH_SECONDS,
        time_zone=svc.DEFAULT_TIME_ZONE,
        time_format=svc.DEFAULT_TIME_FORMAT,
        data_source_preference=svc.DEFAULT_SOURCE_PREFERENCE,
        created_at=None,
        updated_at=None,
        encryption_available=svc.encryption_available(),
    )


def _validation_error(exc: svc.ApiKeyValidationError) -> HTTPException:
    code = _VALIDATION_HTTP_STATUS.get(exc.status, status.HTTP_400_BAD_REQUEST)
    return HTTPException(status_code=code, detail=exc.message)


# ── Preferences ───────────────────────────────────────────────────────────────

@router.get("", response_model=SettingsResponse)
async def read_settings(
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> SettingsResponse:
    row = await svc.get_settings_optional(db, email)
    return _settings_response(row) if row else _default_settings_response(email)


@router.put("", response_model=SettingsResponse)
async def update_settings(
    payload: SettingsUpdate,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> SettingsResponse:
    row = await svc.update_settings_row(db, email, payload)
    return _settings_response(row)


@router.post("/reset", response_model=SettingsResetResponse)
async def reset_settings(
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> SettingsResetResponse:
    """Restore preference defaults. Profile name and saved keys are untouched."""
    row = await svc.reset_settings_row(db, email)
    return SettingsResetResponse(
        **_settings_response(row).model_dump(),
        message="Preferences restored to defaults.",
    )


# ── Provider catalogue ────────────────────────────────────────────────────────

@router.get("/providers", response_model=ProvidersResponse)
async def list_providers(
    email: str = Depends(require_user_email),
) -> ProvidersResponse:
    """Supported BYOK providers plus the status of the server's own sources."""
    return ProvidersResponse(
        providers=svc.provider_catalogue(),
        default_sources=svc.default_source_statuses(),
        encryption_available=svc.encryption_available(),
    )


# ── Key management ────────────────────────────────────────────────────────────

@router.get("/api-keys", response_model=ApiKeyListResponse)
async def list_keys(
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyListResponse:
    rows = await svc.list_api_keys(db, email)
    return ApiKeyListResponse(
        api_keys=[svc.to_api_key_out(row) for row in rows],
        encryption_available=svc.encryption_available(),
    )


@router.post("/api-keys/validate", response_model=ValidateKeyResponse)
async def validate_key(payload: ValidateKeyRequest) -> ValidateKeyResponse:
    """Check a credential set against the provider without saving it."""
    result = await svc.validate_candidate(payload)
    return ValidateKeyResponse(
        provider=payload.provider,
        valid=result.valid,
        status=result.status,
        message=result.message,
    )


@router.post("/api-keys", response_model=ApiKeyMutationResponse)
async def create_key(
    payload: ApiKeyInput,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyMutationResponse:
    """Validate, encrypt, and save a key (one credential set per provider)."""
    try:
        row, message = await svc.upsert_api_key(db, email, payload)
    except svc.ApiKeyValidationError as exc:
        raise _validation_error(exc) from exc
    return ApiKeyMutationResponse(
        api_key=svc.to_api_key_out(row),
        message=message or "Key saved.",
    )


@router.put("/api-keys/{provider}", response_model=ApiKeyMutationResponse)
async def replace_key(
    provider: str,
    payload: ApiKeyInput,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyMutationResponse:
    if payload.provider != provider.strip().lower():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Provider in the path and body must match.",
        )
    try:
        row, message = await svc.upsert_api_key(db, email, payload)
    except svc.ApiKeyValidationError as exc:
        raise _validation_error(exc) from exc
    return ApiKeyMutationResponse(
        api_key=svc.to_api_key_out(row),
        message=message or "Key updated.",
    )


@router.delete("/api-keys/{provider}", response_model=ApiKeyMutationResponse)
async def remove_key(
    provider: str,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyMutationResponse:
    row = await svc.get_api_key(db, email, provider)
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No key saved for this provider.")
    snapshot = svc.to_api_key_out(row, message="")
    await svc.delete_api_key(db, email, provider)
    return ApiKeyMutationResponse(
        api_key=snapshot,
        message="Key removed. GeoTrade default providers are used again.",
    )


@router.post("/api-keys/{provider}/test", response_model=ApiKeyMutationResponse)
async def test_key(
    provider: str,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyMutationResponse:
    try:
        row, result = await svc.test_api_key(db, email, provider)
    except svc.ApiKeyNotFound as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No key saved for this provider.",
        ) from exc
    return ApiKeyMutationResponse(
        api_key=svc.to_api_key_out(row),
        message=result.message,
    )


@router.post("/api-keys/{provider}/prefer", response_model=ApiKeyMutationResponse)
async def set_preferred_key(
    provider: str,
    payload: KeyPreferenceRequest,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyMutationResponse:
    """Control which saved keys routing may use for this account."""
    try:
        row = await svc.set_key_preference(db, email, provider, payload.preferred)
    except svc.ApiKeyNotFound as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No key saved for this provider.",
        ) from exc
    message = "Preferred source enabled." if payload.preferred else "Preferred source disabled."
    return ApiKeyMutationResponse(api_key=svc.to_api_key_out(row), message=message)


@router.get("/api-keys/{provider}", response_model=ApiKeyOut)
async def read_key(
    provider: str,
    email: str = Depends(require_user_email),
    db: AsyncSession = Depends(get_db),
) -> ApiKeyOut:
    row = await svc.get_api_key(db, email, provider)
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No key saved for this provider.")
    return svc.to_api_key_out(row)
