"""Email identity resolution for per-user settings.

GeoTrade's existing identity is the email registered through the waitlist and
used as the key for saved portfolios and the trade log. Settings and BYOK follow
the same model: the caller supplies the identity in ``X-User-Email`` and every
query is scoped to it. There is no cross-user read path.
"""
from __future__ import annotations

from typing import Annotated

from fastapi import Header, HTTPException
from pydantic import EmailStr, TypeAdapter, ValidationError

_email_adapter = TypeAdapter(EmailStr)


def normalise_email(value: str) -> str | None:
    try:
        return str(_email_adapter.validate_python(value.strip().lower()))
    except (ValidationError, ValueError, AttributeError):
        return None


async def optional_user_email(
    x_user_email: Annotated[str | None, Header(alias="X-User-Email")] = None,
) -> str | None:
    """Return a valid email when supplied, otherwise None (public endpoints)."""
    if not x_user_email:
        return None
    return normalise_email(x_user_email)


async def require_user_email(
    x_user_email: Annotated[str | None, Header(alias="X-User-Email")] = None,
) -> str:
    """Require a valid email identity for account-scoped endpoints."""
    if not x_user_email:
        raise HTTPException(status_code=401, detail="Identify this account with X-User-Email.")
    email = normalise_email(x_user_email)
    if email is None:
        raise HTTPException(status_code=401, detail="A valid account email is required.")
    return email
