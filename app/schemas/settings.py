"""Schemas for account settings and user-supplied provider keys."""
from __future__ import annotations

from datetime import datetime
from typing import Literal
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from pydantic import BaseModel, Field, field_validator, model_validator

from app.services.user_providers import PROVIDER_IDS, get_spec

LandingPage = Literal["landing", "globe", "map", "charts", "portfolio"]
AssetClassPreference = Literal[
    "all", "stocks", "crypto", "forex", "commodities", "bonds", "etfs", "indices"
]
TimeFormat = Literal["12h", "24h"]
DataSourcePreference = Literal["auto", "geotrade", "user"]


class SettingsUpdate(BaseModel):
    profile_name: str | None = Field(default=None, max_length=100)
    default_landing_page: LandingPage | None = None
    default_asset_class: AssetClassPreference | None = None
    refresh_interval_seconds: int | None = Field(default=None, ge=5, le=300)
    time_zone: str | None = Field(default=None, max_length=64)
    time_format: TimeFormat | None = None
    data_source_preference: DataSourcePreference | None = None

    @field_validator("profile_name")
    @classmethod
    def _clean_name(cls, value: str | None) -> str | None:
        return value.strip() if isinstance(value, str) else value

    @field_validator("time_zone")
    @classmethod
    def _valid_zone(cls, value: str | None) -> str | None:
        if value is None:
            return value
        try:
            ZoneInfo(value)
        except ZoneInfoNotFoundError as exc:
            raise ValueError("Unknown time zone") from exc
        return value


class SettingsResponse(BaseModel):
    email: str
    profile_name: str | None
    default_landing_page: LandingPage
    default_asset_class: AssetClassPreference
    refresh_interval_seconds: int
    time_zone: str
    time_format: TimeFormat
    data_source_preference: DataSourcePreference
    created_at: datetime | None
    updated_at: datetime | None
    encryption_available: bool


class SettingsResetResponse(SettingsResponse):
    message: str


class ProviderFieldOut(BaseModel):
    key: str
    label: str
    required: bool
    secret: bool
    placeholder: str
    help: str
    options: list[str]


class ProviderOut(BaseModel):
    id: str
    name: str
    description: str
    docs_url: str
    capabilities: list[str]
    fields: list[ProviderFieldOut]


class DefaultSourceOut(BaseModel):
    name: str
    status: Literal["connected", "not_configured"]
    detail: str


class ProvidersResponse(BaseModel):
    providers: list[ProviderOut]
    default_sources: list[DefaultSourceOut]
    encryption_available: bool


class ApiKeyInput(BaseModel):
    provider: str
    api_key: str = Field(min_length=4, max_length=512)
    api_secret: str | None = Field(default=None, max_length=512)
    extra: dict[str, str] = Field(default_factory=dict)

    @field_validator("api_key", "api_secret")
    @classmethod
    def _trim(cls, value: str | None) -> str | None:
        return value.strip() if isinstance(value, str) else value

    @field_validator("provider")
    @classmethod
    def _supported(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in PROVIDER_IDS:
            raise ValueError("Unsupported provider")
        return normalized

    @model_validator(mode="after")
    def _fields_match_provider(self) -> "ApiKeyInput":
        spec = get_spec(self.provider)
        assert spec is not None
        allowed = {f.key for f in spec.fields}
        if "api_secret" in allowed and not (self.api_secret or "").strip():
            raise ValueError("This provider also requires an API secret")
        if self.extra:
            unknown = set(self.extra) - (allowed - {"api_key", "api_secret"})
            if unknown:
                raise ValueError(f"Unsupported configuration fields: {', '.join(sorted(unknown))}")
            if any(len(str(v)) > 512 for v in self.extra.values()):
                raise ValueError("Configuration value is too long")
        if self.provider == "coingecko":
            plan = (self.extra.get("plan") or "demo").lower()
            if plan not in ("demo", "pro"):
                raise ValueError("CoinGecko plan must be demo or pro")
            self.extra["plan"] = plan
        return self


class ValidateKeyRequest(ApiKeyInput):
    pass


class ValidateKeyResponse(BaseModel):
    provider: str
    valid: bool
    status: str
    message: str


class ApiKeyOut(BaseModel):
    provider: str
    provider_name: str
    masked_key: str
    status: str
    capabilities: list[str]
    is_preferred: bool
    last_validated_at: datetime | None
    last_used_at: datetime | None
    created_at: datetime | None
    message: str | None = None


class ApiKeyListResponse(BaseModel):
    api_keys: list[ApiKeyOut]
    encryption_available: bool


class ApiKeyMutationResponse(BaseModel):
    api_key: ApiKeyOut
    message: str


class KeyPreferenceRequest(BaseModel):
    preferred: bool
