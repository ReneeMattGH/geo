"""Settings, credential storage, and provider-routing tests."""
from __future__ import annotations

import pytest
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.key_vault import (
    KeyVaultError,
    KeyVaultNotConfigured,
    decrypt_secret,
    encrypt_secret,
    last4,
)
from app.models.settings import UserApiKey
from app.services import user_settings as svc
from app.services.user_providers import (
    STATUS_CONNECTED,
    STATUS_INVALID,
    STATUS_RATE_LIMITED,
    ProviderQuote,
    ProviderRequestError,
    ValidationResult,
)

MASTER_KEY = "unit-test-master-key-0123456789abcdef"
EMAIL = "settings-owner@example.com"
OTHER_EMAIL = "someone-else@example.com"
HEADERS = {"X-User-Email": EMAIL}


@pytest.fixture(autouse=True)
def vault_key(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("USER_API_KEY_ENCRYPTION_KEY", MASTER_KEY)
    get_settings.cache_clear()
    svc._QUOTE_CACHE.clear()
    svc._LAST_USED_WRITE.clear()
    yield
    get_settings.cache_clear()


def connected() -> ValidationResult:
    return ValidationResult(STATUS_CONNECTED, "Connection verified with a live quote.")


async def _connected(provider: str, credentials) -> ValidationResult:
    return connected()


async def _add_finnhub_key(db: AsyncSession, email: str = EMAIL, api_key: str = "fh-secret-abcd") -> UserApiKey:
    from app.schemas.settings import ApiKeyInput

    payload = ApiKeyInput(provider="finnhub", api_key=api_key)
    row, _ = await svc.upsert_api_key(db, email, payload)
    return row


# ── Encryption ────────────────────────────────────────────────────────────────

class TestKeyVault:
    def test_round_trip(self) -> None:
        ciphertext = encrypt_secret("super-secret-key", user_email=EMAIL, provider="finnhub")
        assert ciphertext != "super-secret-key"
        assert decrypt_secret(ciphertext, user_email=EMAIL, provider="finnhub") == "super-secret-key"

    def test_ciphertext_is_bound_to_owner_and_provider(self) -> None:
        ciphertext = encrypt_secret("super-secret-key", user_email=EMAIL, provider="finnhub")
        with pytest.raises(KeyVaultError):
            decrypt_secret(ciphertext, user_email=OTHER_EMAIL, provider="finnhub")
        with pytest.raises(KeyVaultError):
            decrypt_secret(ciphertext, user_email=EMAIL, provider="twelvedata")

    def test_tampered_ciphertext_is_rejected(self) -> None:
        ciphertext = encrypt_secret("super-secret-key", user_email=EMAIL, provider="finnhub")
        tampered = ciphertext[:-4] + ("AAAA" if not ciphertext.endswith("AAAA") else "BBBB")
        with pytest.raises(KeyVaultError):
            decrypt_secret(tampered, user_email=EMAIL, provider="finnhub")

    def test_missing_master_key_disables_the_vault(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("USER_API_KEY_ENCRYPTION_KEY", "")
        get_settings.cache_clear()
        with pytest.raises(KeyVaultNotConfigured):
            encrypt_secret("super-secret-key", user_email=EMAIL, provider="finnhub")

    def test_last4_only_returns_a_hint(self) -> None:
        assert last4("abcdefgh") == "efgh"
        assert last4("abc") == ""


# ── Preferences ───────────────────────────────────────────────────────────────

@pytest.mark.asyncio
class TestSettingsEndpoints:
    async def test_requires_identity(self, async_client: AsyncClient) -> None:
        assert (await async_client.get("/settings")).status_code == 401
        bad = await async_client.get("/settings", headers={"X-User-Email": "not-an-email"})
        assert bad.status_code == 401

    async def test_defaults_without_a_saved_row(self, async_client: AsyncClient) -> None:
        resp = await async_client.get("/settings", headers=HEADERS)
        assert resp.status_code == 200
        data = resp.json()
        assert data["email"] == EMAIL
        assert data["default_landing_page"] == "globe"
        assert data["data_source_preference"] == "auto"
        assert data["created_at"] is None
        assert data["encryption_available"] is True

    async def test_update_persists_and_is_scoped_to_the_account(
        self, async_client: AsyncClient
    ) -> None:
        payload = {
            "profile_name": " Renee ",
            "default_landing_page": "portfolio",
            "default_asset_class": "crypto",
            "refresh_interval_seconds": 30,
            "time_zone": "Europe/London",
            "time_format": "12h",
            "data_source_preference": "user",
        }
        resp = await async_client.put("/settings", headers=HEADERS, json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["profile_name"] == "Renee"
        assert data["default_landing_page"] == "portfolio"
        assert data["refresh_interval_seconds"] == 30

        again = await async_client.get("/settings", headers=HEADERS)
        assert again.json()["default_asset_class"] == "crypto"

        other = await async_client.get("/settings", headers={"X-User-Email": OTHER_EMAIL})
        assert other.json()["default_landing_page"] == "globe"

    async def test_rejects_unknown_time_zone(self, async_client: AsyncClient) -> None:
        resp = await async_client.put(
            "/settings", headers=HEADERS, json={"time_zone": "Mars/Olympus"}
        )
        assert resp.status_code == 422

    async def test_reset_restores_preferences_but_keeps_profile(
        self, async_client: AsyncClient
    ) -> None:
        await async_client.put(
            "/settings",
            headers=HEADERS,
            json={"profile_name": "Renee", "default_landing_page": "charts"},
        )
        resp = await async_client.post("/settings/reset", headers=HEADERS)
        assert resp.status_code == 200
        data = resp.json()
        assert data["default_landing_page"] == "globe"
        assert data["profile_name"] == "Renee"
        assert data["message"]


# ── Provider catalogue ────────────────────────────────────────────────────────

@pytest.mark.asyncio
class TestProviderCatalogue:
    async def test_lists_supported_providers_and_default_sources(
        self, async_client: AsyncClient
    ) -> None:
        resp = await async_client.get("/settings/providers", headers=HEADERS)
        assert resp.status_code == 200
        data = resp.json()
        ids = {p["id"] for p in data["providers"]}
        assert {"finnhub", "twelvedata", "alphavantage", "fred", "alpaca", "coingecko", "polygon"} <= ids
        assert data["encryption_available"] is True
        assert data["default_sources"]
        assert {s["status"] for s in data["default_sources"]} <= {"connected", "not_configured"}
        alpaca = next(p for p in data["providers"] if p["id"] == "alpaca")
        assert [f["key"] for f in alpaca["fields"]] == ["api_key", "api_secret"]


# ── Key management ────────────────────────────────────────────────────────────

@pytest.mark.asyncio
class TestApiKeyEndpoints:
    async def test_add_validates_encrypts_and_masks(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        plaintext = "finnhub-very-secret-key"

        resp = await async_client.post(
            "/settings/api-keys",
            headers=HEADERS,
            json={"provider": "finnhub", "api_key": plaintext},
        )
        assert resp.status_code == 200
        body = resp.json()
        assert plaintext not in resp.text
        assert body["api_key"]["masked_key"] == f"••••{plaintext[-4:]}"
        assert body["api_key"]["status"] == STATUS_CONNECTED

        row = (await test_db_session.execute(select(UserApiKey))).scalar_one()
        assert row.encrypted_key != plaintext
        assert plaintext not in row.encrypted_key
        assert decrypt_secret(row.encrypted_key, user_email=EMAIL, provider="finnhub") == plaintext

        listing = await async_client.get("/settings/api-keys", headers=HEADERS)
        assert plaintext not in listing.text
        assert listing.json()["api_keys"][0]["masked_key"].endswith(plaintext[-4:])

    async def test_invalid_key_is_rejected_and_not_stored(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(
            svc, "validate_credentials",
            _invalid("Finnhub rejected this key."),
        )
        plaintext = "bad-key-should-not-appear"
        resp = await async_client.post(
            "/settings/api-keys",
            headers=HEADERS,
            json={"provider": "finnhub", "api_key": plaintext},
        )
        assert resp.status_code == 400
        assert plaintext not in resp.text
        rows = (await test_db_session.execute(select(UserApiKey))).scalars().all()
        assert rows == []

    async def test_validate_endpoint_does_not_save(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        resp = await async_client.post(
            "/settings/api-keys/validate",
            json={"provider": "finnhub", "api_key": "some-key-1234"},
        )
        assert resp.status_code == 200
        assert resp.json() == {
            "provider": "finnhub",
            "valid": True,
            "status": STATUS_CONNECTED,
            "message": connected().message,
        }
        rows = (await test_db_session.execute(select(UserApiKey))).scalars().all()
        assert rows == []

    async def test_update_replaces_the_single_row(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        first = await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "first-key-1111"},
        )
        first_id = (await test_db_session.execute(select(UserApiKey))).scalar_one().id

        second = await async_client.put(
            "/settings/api-keys/finnhub", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "second-key-2222"},
        )
        assert first.status_code == second.status_code == 200
        rows = (await test_db_session.execute(select(UserApiKey))).scalars().all()
        assert len(rows) == 1
        assert rows[0].id == first_id
        assert rows[0].key_last4 == "2222"
        assert second.json()["api_key"]["masked_key"] == "••••2222"

    async def test_provider_requiring_a_secret_rejects_partial_input(
        self, async_client: AsyncClient
    ) -> None:
        resp = await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "alpaca", "api_key": "PK1234567890"},
        )
        assert resp.status_code == 422

    async def test_unknown_provider_is_rejected(self, async_client: AsyncClient) -> None:
        resp = await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "my-bank", "api_key": "1234"},
        )
        assert resp.status_code == 422

    async def test_test_connection_updates_status(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "key-to-test-9999"},
        )

        monkeypatch.setattr(svc, "validate_credentials", _invalid("Finnhub rejected this key."))
        resp = await async_client.post("/settings/api-keys/finnhub/test", headers=HEADERS)
        assert resp.status_code == 200
        assert resp.json()["api_key"]["status"] == STATUS_INVALID

        missing = await async_client.post("/settings/api-keys/fred/test", headers=HEADERS)
        assert missing.status_code == 404

    async def test_delete_removes_the_encrypted_record(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "delete-me-4321"},
        )
        resp = await async_client.delete("/settings/api-keys/finnhub", headers=HEADERS)
        assert resp.status_code == 200
        assert "default providers" in resp.json()["message"].lower()
        rows = (await test_db_session.execute(select(UserApiKey))).scalars().all()
        assert rows == []
        again = await async_client.delete("/settings/api-keys/finnhub", headers=HEADERS)
        assert again.status_code == 404

    async def test_keys_are_isolated_between_accounts(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "owner-key-0000"},
        )

        other_headers = {"X-User-Email": OTHER_EMAIL}
        listing = await async_client.get("/settings/api-keys", headers=other_headers)
        assert listing.json()["api_keys"] == []
        assert (await async_client.post(
            "/settings/api-keys/finnhub/test", headers=other_headers
        )).status_code == 404
        assert (await async_client.delete(
            "/settings/api-keys/finnhub", headers=other_headers
        )).status_code == 404

        still_there = await async_client.get("/settings/api-keys", headers=HEADERS)
        assert len(still_there.json()["api_keys"]) == 1

    async def test_preferred_toggle_changes_routing_inputs(
        self, async_client: AsyncClient, test_db_session: AsyncSession,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "pref-key-7777"},
        )
        resp = await async_client.post(
            "/settings/api-keys/finnhub/prefer", headers=HEADERS, json={"preferred": True}
        )
        assert resp.status_code == 200
        assert resp.json()["api_key"]["is_preferred"] is True

    async def test_save_is_unavailable_without_a_master_key(
        self, async_client: AsyncClient, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        monkeypatch.setenv("USER_API_KEY_ENCRYPTION_KEY", "")
        get_settings.cache_clear()
        resp = await async_client.post(
            "/settings/api-keys", headers=HEADERS,
            json={"provider": "finnhub", "api_key": "1234"},
        )
        assert resp.status_code == 503
        listing = await async_client.get("/settings/api-keys", headers=HEADERS)
        assert listing.json()["encryption_available"] is False


# ── Routing ───────────────────────────────────────────────────────────────────

def _quote(symbol: str = "AAPL") -> ProviderQuote:
    return ProviderQuote(
        symbol=symbol, asset_class="stocks", price=191.25, change=1.4,
        high=192.0, low=188.0, open=189.0, timestamp=1_700_000_000_000,
        source="finnhub:user",
    )


async def _fetch_ok(provider, creds, symbols):
    return type("R", (), {"quotes": [_quote(s) for s in symbols]})()


@pytest.mark.asyncio
class TestUserQuoteRouting:
    async def _save_key(self, db: AsyncSession, monkeypatch, email: str = EMAIL) -> None:
        monkeypatch.setattr(svc, "validate_credentials", _connected)
        await _add_finnhub_key(db, email)

    async def test_overlay_uses_saved_key(
        self, test_db_session: AsyncSession, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        await self._save_key(test_db_session, monkeypatch)
        monkeypatch.setattr(svc, "fetch_quotes", _fetch_ok)

        quotes, label = await svc.get_user_quote_overlay(test_db_session, EMAIL, ["AAPL"])
        assert set(quotes) == {"AAPL"}
        assert quotes["AAPL"].price == 191.25
        assert label == "Finnhub"

    async def test_geotrade_preference_skips_user_keys(
        self, test_db_session: AsyncSession, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        await self._save_key(test_db_session, monkeypatch)
        await svc.update_settings_row(
            test_db_session, EMAIL, _prefs(data_source_preference="geotrade")
        )
        monkeypatch.setattr(svc, "fetch_quotes", _fetch_ok)
        quotes, label = await svc.get_user_quote_overlay(test_db_session, EMAIL, ["AAPL"])
        assert quotes == {} and label is None

    async def test_user_preference_only_uses_preferred_keys(
        self, test_db_session: AsyncSession, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        await self._save_key(test_db_session, monkeypatch)
        await svc.update_settings_row(
            test_db_session, EMAIL, _prefs(data_source_preference="user")
        )
        monkeypatch.setattr(svc, "fetch_quotes", _fetch_ok)

        quotes, _ = await svc.get_user_quote_overlay(test_db_session, EMAIL, ["AAPL"])
        assert quotes == {}

        await svc.set_key_preference(test_db_session, EMAIL, "finnhub", True)
        quotes, label = await svc.get_user_quote_overlay(test_db_session, EMAIL, ["AAPL"])
        assert quotes and label == "Finnhub"

    async def test_rate_limit_marks_status_and_falls_back(
        self, test_db_session: AsyncSession, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        await self._save_key(test_db_session, monkeypatch)

        async def limited(provider, creds, symbols):
            raise ProviderRequestError(STATUS_RATE_LIMITED, "Finnhub rate limit reached.")

        monkeypatch.setattr(svc, "fetch_quotes", limited)
        quotes, label = await svc.get_user_quote_overlay(test_db_session, EMAIL, ["AAPL"])
        assert quotes == {} and label is None

        stored = await test_db_session.execute(
            select(UserApiKey.status).where(
                UserApiKey.user_email == EMAIL, UserApiKey.provider == "finnhub"
            )
        )
        assert stored.scalar_one() == STATUS_RATE_LIMITED

    async def test_anonymous_and_unsupported_assets_are_untouched(
        self, test_db_session: AsyncSession, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        await self._save_key(test_db_session, monkeypatch)
        calls: list[list[str]] = []

        async def record(provider, creds, symbols):
            calls.append(symbols)
            return await _fetch_ok(provider, creds, symbols)

        monkeypatch.setattr(svc, "fetch_quotes", record)
        assert await svc.get_user_quote_overlay(test_db_session, None, ["AAPL"]) == ({}, None)
        # Finnhub cannot quote crypto, so it must not be called for it.
        assert await svc.get_user_quote_overlay(test_db_session, EMAIL, ["BTC"]) == ({}, None)
        assert calls == []


@pytest.mark.asyncio
class TestLiveMarketOverlay:
    async def test_market_live_uses_the_users_provider(
        self, async_client: AsyncClient, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        async def overlay(db, email, symbols):
            assert email == EMAIL
            return ({"AAPL": _quote("AAPL")}, "Finnhub")

        monkeypatch.setattr("app.api.v1.market.get_user_quote_overlay", overlay)
        resp = await async_client.get("/market/live?symbols=AAPL", headers=HEADERS)
        assert resp.status_code == 200
        body = resp.json()
        assert body["user_key_provider"] == "Finnhub"
        row = next(p for p in body["prices"] if p["symbol"] == "AAPL")
        assert row["source"] == "finnhub:user"
        assert row["price"] == 191.25

    async def test_market_live_without_identity_keeps_the_shared_feed(
        self, async_client: AsyncClient, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        called = False

        async def overlay(db, email, symbols):
            nonlocal called
            called = True
            return {}, None

        monkeypatch.setattr("app.api.v1.market.get_user_quote_overlay", overlay)
        resp = await async_client.get("/market/live")
        assert resp.status_code == 200
        assert called is False
        assert resp.json()["user_key_provider"] is None

    async def test_markets_by_class_overlays_supported_symbols(
        self, async_client: AsyncClient, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        async def market():
            return {
                "timestamp": 0,
                "count": 2,
                "asset_class": "stocks",
                "data": [
                    {
                        "symbol": "AAPL", "asset_class": "stocks", "price": 100.0,
                        "change": 0.1, "source": "yahoo", "name": "Apple",
                        "status": "ok", "data_status": "live",
                    },
                    {
                        "symbol": "MSFT", "asset_class": "stocks", "price": 250.0,
                        "change": 0.2, "source": "yahoo", "name": "Microsoft",
                        "status": "ok", "data_status": "live",
                    },
                ],
            }

        async def overlay(db, email, symbols):
            assert email == EMAIL
            assert "AAPL" in symbols and "MSFT" in symbols
            return ({"AAPL": _quote("AAPL")}, "Finnhub")

        monkeypatch.setattr("app.api.v1.market.get_stocks", market)
        monkeypatch.setattr("app.api.v1.market.get_user_quote_overlay", overlay)
        resp = await async_client.get("/market/markets/stocks", headers=HEADERS)
        assert resp.status_code == 200
        body = resp.json()
        assert body["user_key_provider"] == "Finnhub"

        rows = {row["symbol"]: row for row in body["data"]}
        assert rows["AAPL"]["price"] == 191.25
        assert rows["AAPL"]["change"] == 1.4
        assert rows["AAPL"]["source"] == "finnhub:user"
        assert rows["AAPL"]["high_24h"] == 192.0
        assert rows["AAPL"]["data_status"] == "live"
        # A symbol the user's provider does not return keeps the shared quote.
        assert rows["MSFT"]["price"] == 250.0
        assert rows["MSFT"]["source"] == "yahoo"

    async def test_markets_by_class_without_identity_skips_user_keys(
        self, async_client: AsyncClient, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        async def market():
            return {
                "timestamp": 0, "count": 1, "asset_class": "stocks",
                "data": [{
                    "symbol": "AAPL", "asset_class": "stocks", "price": 100.0,
                    "change": 0.1, "source": "yahoo", "name": "Apple",
                    "status": "ok", "data_status": "live",
                }],
            }

        called = False

        async def overlay(db, email, symbols):
            nonlocal called
            called = True
            return {}, None

        monkeypatch.setattr("app.api.v1.market.get_stocks", market)
        monkeypatch.setattr("app.api.v1.market.get_user_quote_overlay", overlay)
        resp = await async_client.get("/market/markets/stocks")
        assert resp.status_code == 200
        assert called is False
        assert resp.json()["data"][0]["price"] == 100.0


def _invalid(message: str):
    async def check(provider, credentials):
        return ValidationResult(STATUS_INVALID, message)
    return check


def _prefs(**overrides):
    from app.schemas.settings import SettingsUpdate

    return SettingsUpdate(**overrides)
