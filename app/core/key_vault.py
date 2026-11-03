"""Authenticated encryption for user-supplied provider credentials.

Keys live in the database only as AES-256-GCM ciphertext. The master key comes
from ``USER_API_KEY_ENCRYPTION_KEY`` and never leaves the server. Each value gets
a fresh 96-bit nonce, and the owning account + provider are bound in as
associated data so a ciphertext copied to another row or user fails to decrypt.
"""
from __future__ import annotations

import base64
import hashlib
import os
from cryptography.exceptions import InvalidTag
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

from app.core.config import get_settings

_NONCE_BYTES = 12
_MIN_SECRET_CHARS = 32


class KeyVaultError(RuntimeError):
    """Raised when the vault is unavailable or a ciphertext cannot be opened."""


class KeyVaultNotConfigured(KeyVaultError):
    """Raised when no master key has been configured on the server."""


def _master_key() -> bytes:
    raw = get_settings().user_api_key_encryption_key.get_secret_value().strip()
    if not raw:
        raise KeyVaultNotConfigured(
            "USER_API_KEY_ENCRYPTION_KEY is not set; user API keys are disabled."
        )

    # Accept a 64-char hex key, a base64-encoded 32-byte key, or a strong
    # passphrase (>= 32 chars) that is stretched into a 32-byte key.
    if len(raw) == 64:
        try:
            return bytes.fromhex(raw)
        except ValueError:
            pass
    try:
        decoded = base64.b64decode(raw, validate=True)
        if len(decoded) == 32:
            return decoded
    except (ValueError, TypeError):
        pass
    if len(raw) < _MIN_SECRET_CHARS:
        raise KeyVaultNotConfigured(
            f"USER_API_KEY_ENCRYPTION_KEY must be at least {_MIN_SECRET_CHARS} characters."
        )
    return hashlib.sha256(raw.encode("utf-8")).digest()


def vault_configured() -> bool:
    try:
        _master_key()
        return True
    except KeyVaultError:
        return False


def _associated_data(user_email: str, provider: str) -> bytes:
    return f"{user_email.strip().lower()}|{provider.strip().lower()}".encode("utf-8")


def encrypt_secret(value: str, *, user_email: str, provider: str) -> str:
    """Encrypt one credential value and return a URL-safe base64 token."""
    if not value:
        raise ValueError("value must not be empty")
    nonce = os.urandom(_NONCE_BYTES)
    ciphertext = AESGCM(_master_key()).encrypt(
        nonce, value.encode("utf-8"), _associated_data(user_email, provider)
    )
    return base64.urlsafe_b64encode(nonce + ciphertext).decode("ascii")


def decrypt_secret(token: str, *, user_email: str, provider: str) -> str:
    """Decrypt a token produced by :func:`encrypt_secret`.

    Raises :class:`KeyVaultError` when the token was tampered with or belongs to
    a different account/provider.
    """
    try:
        raw = base64.urlsafe_b64decode(token.encode("ascii"))
    except (ValueError, UnicodeError) as exc:
        raise KeyVaultError("stored credential is not readable") from exc
    if len(raw) <= _NONCE_BYTES:
        raise KeyVaultError("stored credential is not readable")

    nonce, ciphertext = raw[:_NONCE_BYTES], raw[_NONCE_BYTES:]
    try:
        plaintext = AESGCM(_master_key()).decrypt(
            nonce, ciphertext, _associated_data(user_email, provider)
        )
    except InvalidTag as exc:
        raise KeyVaultError("stored credential could not be decrypted") from exc
    return plaintext.decode("utf-8")


def last4(value: str) -> str:
    return value[-4:] if len(value) > 4 else ""
