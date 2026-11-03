"""Catalogue, validation, and quote fetching for user-supplied provider keys.

Every validation here makes a real authenticated request to the provider — there
is no "looks plausible" shortcut, because a key that is accepted but does not
work would silently break market data later. Error messages are generated from
HTTP status/content and never include the submitted credential.
"""
from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import Any

import httpx

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.market.coingecko_provider import SYMBOL_MAP as COINGECKO_SYMBOL_MAP
from app.services.market.fred_provider import FRED_SERIES_MAP

logger = get_logger(__name__)

REQUEST_TIMEOUT = 10.0

# Statuses are shared with the frontend and the database.
STATUS_CONNECTED = "connected"
STATUS_INVALID = "invalid"
STATUS_RATE_LIMITED = "rate_limited"
STATUS_UNAVAILABLE = "unavailable"
STATUS_REQUIRES_VERIFICATION = "requires_verification"


@dataclass(frozen=True)
class ProviderField:
    key: str
    label: str
    required: bool = False
    secret: bool = False
    placeholder: str = ""
    help: str = ""
    options: tuple[str, ...] = ()


@dataclass(frozen=True)
class ProviderSpec:
    id: str
    name: str
    description: str
    docs_url: str
    env_var: str
    capabilities: tuple[str, ...]
    quote_asset_classes: tuple[str, ...]
    fields: tuple[ProviderField, ...]
    max_symbols_per_request: int = 20


@dataclass
class ProviderCredentials:
    api_key: str
    api_secret: str = ""
    extra: dict[str, str] = field(default_factory=dict)


@dataclass
class ProviderQuote:
    symbol: str
    asset_class: str
    price: float
    change: float
    high: float = 0.0
    low: float = 0.0
    open: float = 0.0
    volume: float = 0.0
    timestamp: int = 0
    source: str = ""


@dataclass
class ValidationResult:
    status: str
    message: str

    @property
    def valid(self) -> bool:
        return self.status == STATUS_CONNECTED


@dataclass
class QuoteFetchResult:
    quotes: list[ProviderQuote]
    status: str = STATUS_CONNECTED
    message: str = ""


class ProviderRequestError(RuntimeError):
    """Provider call failed in a way routing must surface (auth/rate limit)."""

    def __init__(self, status: str, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


PROVIDER_SPECS: dict[str, ProviderSpec] = {
    "finnhub": ProviderSpec(
        id="finnhub",
        name="Finnhub",
        description="Real-time US equity and ETF quotes. Free tier allows 60 requests per minute.",
        docs_url="https://finnhub.io/docs/api",
        env_var="FINNHUB_API_KEY",
        capabilities=("stocks", "etfs"),
        quote_asset_classes=("stocks", "etfs"),
        fields=(
            ProviderField(
                "api_key", "API key", required=True, secret=True,
                placeholder="c1234567890abcdef", help="Finnhub dashboard → API key.",
            ),
        ),
    ),
    "twelvedata": ProviderSpec(
        id="twelvedata",
        name="Twelve Data",
        description="Global equities, ETFs, forex, and crypto from one key. Free tier is credit-limited.",
        docs_url="https://twelvedata.com/docs",
        env_var="TWELVEDATA_API_KEY",
        capabilities=("stocks", "etfs", "forex", "crypto"),
        quote_asset_classes=("stocks", "etfs", "forex", "crypto"),
        fields=(
            ProviderField(
                "api_key", "API key", required=True, secret=True,
                placeholder="0123456789abcdef", help="Twelve Data dashboard → API key.",
            ),
        ),
    ),
    "alphavantage": ProviderSpec(
        id="alphavantage",
        name="Alpha Vantage",
        description="US equities, ETFs, and forex. The free tier is limited to 25 requests per day.",
        docs_url="https://www.alphavantage.co/documentation/",
        env_var="ALPHAVANTAGE_API_KEY",
        capabilities=("stocks", "etfs", "forex"),
        quote_asset_classes=("stocks", "etfs", "forex"),
        fields=(
            ProviderField(
                "api_key", "API key", required=True, secret=True,
                placeholder="ABCD1234EFGH5678", help="Alpha Vantage → Get your free API key.",
            ),
        ),
        max_symbols_per_request=10,
    ),
    "fred": ProviderSpec(
        id="fred",
        name="FRED",
        description="US Treasury yields and economic series from the Federal Reserve.",
        docs_url="https://fred.stlouisfed.org/docs/api/api_key.html",
        env_var="FRED_API_KEY",
        capabilities=("bonds", "macro"),
        quote_asset_classes=("bonds",),
        fields=(
            ProviderField(
                "api_key", "API key", required=True, secret=True,
                placeholder="abcdef0123456789abcdef0123456789",
                help="FRED account → My Account → API Keys.",
            ),
        ),
        max_symbols_per_request=10,
    ),
    "alpaca": ProviderSpec(
        id="alpaca",
        name="Alpaca",
        description="US equities and ETFs via Alpaca's market data API (IEX feed).",
        docs_url="https://docs.alpaca.markets/docs/market-data",
        env_var="ALPACA_API_KEY",
        capabilities=("stocks", "etfs"),
        quote_asset_classes=("stocks", "etfs"),
        fields=(
            ProviderField(
                "api_key", "API key ID", required=True, secret=True,
                placeholder="PKXXXXXXXXXXXXXXXX", help="Alpaca dashboard → API Keys.",
            ),
            ProviderField(
                "api_secret", "API secret", required=True, secret=True,
                placeholder="••••••••••••••••", help="Shown once when the key is created.",
            ),
        ),
    ),
    "coingecko": ProviderSpec(
        id="coingecko",
        name="CoinGecko",
        description="Cryptocurrency prices. Supports free Demo keys and paid Pro keys.",
        docs_url="https://docs.coingecko.com/",
        env_var="COINGECKO_API_KEY",
        capabilities=("crypto",),
        quote_asset_classes=("crypto",),
        fields=(
            ProviderField(
                "api_key", "API key", required=True, secret=True,
                placeholder="CG-xxxxxxxxxxxxxxxx", help="CoinGecko developer dashboard → API key.",
            ),
            ProviderField(
                "plan", "Plan", required=True, placeholder="demo", options=("demo", "pro"),
                help="Demo keys use api.coingecko.com; Pro keys use pro-api.coingecko.com.",
            ),
        ),
    ),
    "polygon": ProviderSpec(
        id="polygon",
        name="Polygon.io",
        description="US equities and ETF aggregates from Polygon's market data API.",
        docs_url="https://polygon.io/docs",
        env_var="POLYGON_API_KEY",
        capabilities=("stocks", "etfs"),
        quote_asset_classes=("stocks", "etfs"),
        fields=(
            ProviderField(
                "api_key", "API key", required=True, secret=True,
                placeholder="XXXXXXXXXXXXXXXXXXXXXXXX", help="Polygon dashboard → API Keys.",
            ),
        ),
    ),
}

PROVIDER_IDS = tuple(PROVIDER_SPECS)

# App crypto symbols → CoinGecko ids (inverse of the provider's display map).
_CRYPTO_IDS = {display.upper(): coin_id for coin_id, display in COINGECKO_SYMBOL_MAP.items()}
_CRYPTO_IDS.update({
    "BTC": "bitcoin", "ETH": "ethereum", "BNB": "binancecoin", "SOL": "solana",
    "XRP": "ripple", "ADA": "cardano", "DOGE": "dogecoin", "AVAX": "avalanche-2",
    "MATIC": "matic-network", "DOT": "polkadot", "LTC": "litecoin", "LINK": "chainlink",
})


def get_spec(provider: str) -> ProviderSpec | None:
    return PROVIDER_SPECS.get(provider.strip().lower())


def _client() -> httpx.AsyncClient:
    return httpx.AsyncClient(
        timeout=get_settings().user_key_validation_timeout,
        follow_redirects=True,
        headers={"User-Agent": "GeoTrade/0.2 (+https://geotrade-web.onrender.com)"},
    )


def _is_placeholder(value: str) -> bool:
    lowered = value.strip().lower()
    return not lowered or lowered.startswith(("your_", "xxx", "placeholder", "change_me", "todo", "••"))


def _pair(symbol: str) -> str:
    """EURUSD → EUR/USD. Twelve Data expects the slash for FX pairs."""
    return f"{symbol[:3]}/{symbol[3:]}" if len(symbol) == 6 else symbol


def _num(value: Any, default: float = 0.0) -> float:
    try:
        number = float(value)
        return number if number == number else default  # NaN guard
    except (TypeError, ValueError):
        return default


def _ts_ms() -> int:
    return int(datetime.now(UTC).timestamp() * 1000)


def _looks_like_auth_error(message: str) -> bool:
    text = message.lower()
    return any(
        token in text
        for token in ("invalid api", "apikey", "api key", "unauthor", "forbidden", "token")
    )


async def _get(
    client: httpx.AsyncClient, url: str, params: dict[str, Any] | None = None,
    headers: dict[str, str] | None = None,
) -> httpx.Response:
    try:
        return await client.get(url, params=params, headers=headers)
    except httpx.TimeoutException as exc:
        raise ProviderRequestError(STATUS_UNAVAILABLE, "Provider did not respond in time.") from exc
    except httpx.HTTPError as exc:
        raise ProviderRequestError(STATUS_UNAVAILABLE, "Could not reach the provider.") from exc


def _json(resp: httpx.Response) -> Any:
    """Parse a body that is expected to be JSON, tolerating HTML error pages."""
    try:
        return resp.json()
    except ValueError:
        return {}


# ── Validation ────────────────────────────────────────────────────────────────

async def validate_credentials(
    provider: str, credentials: ProviderCredentials
) -> ValidationResult:
    """Validate a credential set against the provider's real API."""
    spec = get_spec(provider)
    if spec is None:
        return ValidationResult(STATUS_INVALID, "Unsupported provider.")
    if _is_placeholder(credentials.api_key):
        return ValidationResult(STATUS_INVALID, "Enter an API key.")
    required_secret = any(f.key == "api_secret" and f.required for f in spec.fields)
    if required_secret and _is_placeholder(credentials.api_secret):
        return ValidationResult(STATUS_INVALID, "This provider also requires an API secret.")

    checker = {
        "finnhub": _validate_finnhub,
        "twelvedata": _validate_twelvedata,
        "alphavantage": _validate_alphavantage,
        "fred": _validate_fred,
        "alpaca": _validate_alpaca,
        "coingecko": _validate_coingecko,
        "polygon": _validate_polygon,
    }[spec.id]

    try:
        return await checker(credentials)
    except ProviderRequestError as exc:
        return ValidationResult(exc.status, exc.message)
    except Exception as exc:  # pragma: no cover - defensive: never leak a traceback/key
        logger.warning("provider_validation_error", provider=provider, error=type(exc).__name__)
        return ValidationResult(STATUS_UNAVAILABLE, "Could not validate the key right now.")


def _status_for_http(code: int) -> str:
    if code in (401, 403):
        return STATUS_INVALID
    if code == 429:
        return STATUS_RATE_LIMITED
    return STATUS_UNAVAILABLE


async def _validate_finnhub(creds: ProviderCredentials) -> ValidationResult:
    async with _client() as client:
        resp = await _get(
            client, "https://finnhub.io/api/v1/quote",
            params={"symbol": "AAPL", "token": creds.api_key},
        )
    if resp.status_code == 200:
        data = _json(resp)
        if isinstance(data, dict) and _num(data.get("c")):
            return ValidationResult(STATUS_CONNECTED, "Connection verified with a live quote.")
        if isinstance(data, dict) and data.get("error"):
            return ValidationResult(STATUS_INVALID, "Finnhub rejected this key.")
    if resp.status_code == 401 or resp.status_code == 403:
        return ValidationResult(STATUS_INVALID, "Finnhub rejected this key.")
    return ValidationResult(_status_for_http(resp.status_code), "Finnhub did not confirm the key.")


async def _validate_twelvedata(creds: ProviderCredentials) -> ValidationResult:
    async with _client() as client:
        resp = await _get(
            client, "https://api.twelvedata.com/quote",
            params={"symbol": "AAPL", "apikey": creds.api_key},
        )
    data = _json(resp)
    if resp.status_code == 200 and isinstance(data, dict) and data.get("symbol") and not data.get("code"):
        return ValidationResult(STATUS_CONNECTED, "Connection verified with a live quote.")
    code = int(data.get("code") or 0) if isinstance(data, dict) else 0
    message = str(data.get("message", "")) if isinstance(data, dict) else ""
    if code in (401, 403) or _looks_like_auth_error(message):
        return ValidationResult(STATUS_INVALID, "Twelve Data rejected this key.")
    if code == 429 or "limit" in message.lower():
        return ValidationResult(STATUS_RATE_LIMITED, "This key is temporarily rate limited.")
    return ValidationResult(_status_for_http(resp.status_code), "Twelve Data did not confirm the key.")


async def _validate_alphavantage(creds: ProviderCredentials) -> ValidationResult:
    async with _client() as client:
        resp = await _get(
            client, "https://www.alphavantage.co/query",
            params={
                "function": "GLOBAL_QUOTE", "symbol": "IBM", "apikey": creds.api_key,
            },
        )
    data = _json(resp)
    if isinstance(data, dict) and data.get("Global Quote"):
        return ValidationResult(STATUS_CONNECTED, "Connection verified with a live quote.")
    text = " ".join(
        str(data.get(key, "")) for key in ("Error Message", "Information", "Note")
    ) if isinstance(data, dict) else ""
    lowered = text.lower()
    if "invalid" in lowered or "api key" in lowered or "apikey" in lowered:
        return ValidationResult(STATUS_INVALID, "Alpha Vantage rejected this key.")
    if "rate limit" in lowered or "call frequency" in lowered or "24 hours" in lowered:
        return ValidationResult(STATUS_RATE_LIMITED, "This key is temporarily rate limited.")
    if "premium" in lowered:
        return ValidationResult(
            STATUS_REQUIRES_VERIFICATION, "This endpoint needs a premium Alpha Vantage plan."
        )
    return ValidationResult(_status_for_http(resp.status_code), "Alpha Vantage did not confirm the key.")


async def _validate_fred(creds: ProviderCredentials) -> ValidationResult:
    async with _client() as client:
        resp = await _get(
            client, "https://api.stlouisfed.org/fred/series",
            params={
                "series_id": "GDP", "api_key": creds.api_key, "file_type": "json",
            },
        )
    data = _json(resp)
    if resp.status_code == 200 and isinstance(data, dict) and data.get("seriess"):
        return ValidationResult(STATUS_CONNECTED, "Connection verified with a FRED series.")
    if resp.status_code in (400, 401, 403):
        return ValidationResult(STATUS_INVALID, "FRED rejected this key.")
    return ValidationResult(_status_for_http(resp.status_code), "FRED did not confirm the key.")


async def _validate_alpaca(creds: ProviderCredentials) -> ValidationResult:
    # Validated against the data API that quotes are actually read from, so a
    # paper-trading key and a live key are both accepted on their own merits.
    base = get_settings().alpaca_data_url.rstrip("/")
    async with _client() as client:
        resp = await _get(
            client, f"{base}/v2/stocks/snapshots",
            params={"symbols": "AAPL", "feed": "iex"},
            headers={
                "APCA-API-KEY-ID": creds.api_key,
                "APCA-API-SECRET-KEY": creds.api_secret,
            },
        )
    if resp.status_code == 200 and isinstance(_json(resp), dict):
        return ValidationResult(STATUS_CONNECTED, "Connection verified with a live quote.")
    if resp.status_code in (401, 403):
        return ValidationResult(STATUS_INVALID, "Alpaca rejected this key pair.")
    return ValidationResult(_status_for_http(resp.status_code), "Alpaca did not confirm the key.")


def _coingecko_base(creds: ProviderCredentials) -> tuple[str, dict[str, str]]:
    plan = (creds.extra.get("plan") or "demo").lower()
    if plan == "pro":
        return "https://pro-api.coingecko.com/api/v3", {"x-cg-pro-api-key": creds.api_key}
    return "https://api.coingecko.com/api/v3", {"x-cg-demo-api-key": creds.api_key}


async def _validate_coingecko(creds: ProviderCredentials) -> ValidationResult:
    base, headers = _coingecko_base(creds)
    async with _client() as client:
        resp = await _get(client, f"{base}/ping", headers=headers)
    if resp.status_code == 200:
        return ValidationResult(STATUS_CONNECTED, "Connection verified with CoinGecko.")
    if resp.status_code in (401, 403):
        return ValidationResult(STATUS_INVALID, "CoinGecko rejected this key for the selected plan.")
    if resp.status_code == 429:
        return ValidationResult(STATUS_RATE_LIMITED, "This key is temporarily rate limited.")
    return ValidationResult(_status_for_http(resp.status_code), "CoinGecko did not confirm the key.")


async def _validate_polygon(creds: ProviderCredentials) -> ValidationResult:
    async with _client() as client:
        resp = await _get(
            client, "https://api.polygon.io/v2/aggs/ticker/AAPL/prev",
            params={"adjusted": "true", "apiKey": creds.api_key},
        )
    if resp.status_code == 200:
        return ValidationResult(STATUS_CONNECTED, "Connection verified with a live aggregate.")
    if resp.status_code in (401, 403):
        return ValidationResult(STATUS_INVALID, "Polygon rejected this key.")
    return ValidationResult(_status_for_http(resp.status_code), "Polygon did not confirm the key.")


# ── Quote fetching ────────────────────────────────────────────────────────────

async def fetch_quotes(
    provider: str, credentials: ProviderCredentials, symbols: list[str]
) -> QuoteFetchResult:
    """Fetch normalized quotes, raising ProviderRequestError for auth/quota issues."""
    spec = get_spec(provider)
    if spec is None:
        return QuoteFetchResult([], STATUS_INVALID, "Unsupported provider.")

    wanted = [s.strip().upper() for s in symbols if s.strip()][: spec.max_symbols_per_request]
    if not wanted:
        return QuoteFetchResult([])

    fetcher = {
        "finnhub": _fetch_finnhub,
        "twelvedata": _fetch_twelvedata,
        "alphavantage": _fetch_alphavantage,
        "fred": _fetch_fred,
        "alpaca": _fetch_alpaca,
        "coingecko": _fetch_coingecko,
        "polygon": _fetch_polygon,
    }[spec.id]

    quotes = await fetcher(credentials, wanted)
    return QuoteFetchResult(quotes, STATUS_CONNECTED, "")


def _classify_symbols(symbols: list[str]) -> dict[str, str]:
    """Infer asset class for symbols without another lookup."""
    out: dict[str, str] = {}
    for symbol in symbols:
        if symbol in _CRYPTO_IDS:
            out[symbol] = "crypto"
        elif len(symbol) == 6 and symbol.isalpha() and symbol[:3] in {
            "EUR", "GBP", "USD", "JPY", "CHF", "CAD", "AUD", "NZD", "SEK", "NOK",
            "MXN", "SGD", "HKD", "CNH",
        }:
            out[symbol] = "forex"
        elif symbol in FRED_SERIES_MAP:
            out[symbol] = "bonds"
        else:
            out[symbol] = "stocks"
    return out


async def _fetch_finnhub(creds: ProviderCredentials, symbols: list[str]) -> list[ProviderQuote]:
    sem = asyncio.Semaphore(5)
    quotes: list[ProviderQuote] = []
    classes = _classify_symbols(symbols)
    async with _client() as client:
        async def one(symbol: str) -> ProviderQuote | None:
            async with sem:
                resp = await _get(
                    client, "https://finnhub.io/api/v1/quote",
                    params={"symbol": symbol, "token": creds.api_key},
                )
            if resp.status_code == 429:
                raise ProviderRequestError(STATUS_RATE_LIMITED, "Finnhub rate limit reached.")
            if resp.status_code in (401, 403):
                raise ProviderRequestError(STATUS_INVALID, "Finnhub rejected this key.")
            if resp.status_code != 200:
                return None
            data = _json(resp)
            price = _num(data.get("c")) if isinstance(data, dict) else 0.0
            if price <= 0:
                return None
            return ProviderQuote(
                symbol=symbol, asset_class=classes.get(symbol, "stocks"), price=price,
                change=_num(data.get("dp")), high=_num(data.get("h")),
                low=_num(data.get("l")), open=_num(data.get("o")),
                timestamp=_ts_ms(), source="finnhub:user",
            )

        for result in await asyncio.gather(*(one(s) for s in symbols), return_exceptions=True):
            if isinstance(result, ProviderRequestError):
                raise result
            if isinstance(result, ProviderQuote):
                quotes.append(result)
    return quotes


async def _fetch_twelvedata(creds: ProviderCredentials, symbols: list[str]) -> list[ProviderQuote]:
    app_ids = {_pair(s) if len(s) == 6 and s.isalpha() else s: s for s in symbols}
    request_symbols = ",".join(app_ids)
    async with _client() as client:
        resp = await _get(
            client, "https://api.twelvedata.com/quote",
            params={"symbol": request_symbols, "apikey": creds.api_key},
        )
    data = _json(resp)
    if isinstance(data, dict) and data.get("code") in (401, 403):
        raise ProviderRequestError(STATUS_INVALID, "Twelve Data rejected this key.")
    if isinstance(data, dict) and (data.get("code") == 429 or "limit" in str(data.get("message", "")).lower()):
        raise ProviderRequestError(STATUS_RATE_LIMITED, "Twelve Data rate limit reached.")

    rows: list[dict[str, Any]]
    if isinstance(data, dict) and "symbol" in data:
        rows = [data]
    elif isinstance(data, dict):
        rows = [v for v in data.values() if isinstance(v, dict) and "symbol" in v]
    else:
        rows = []

    classes = _classify_symbols(symbols)
    quotes: list[ProviderQuote] = []
    for row in rows:
        raw_symbol = str(row.get("symbol", ""))
        app_symbol = app_ids.get(raw_symbol, raw_symbol.replace("/", ""))
        price = _num(row.get("close") or row.get("price"))
        if price <= 0:
            continue
        quotes.append(ProviderQuote(
            symbol=app_symbol,
            asset_class=classes.get(app_symbol, "stocks"),
            price=price,
            change=_num(row.get("percent_change")),
            high=_num(row.get("high")), low=_num(row.get("low")),
            open=_num(row.get("open")), volume=_num(row.get("volume")),
            timestamp=_ts_ms(), source="twelvedata:user",
        ))
    return quotes


async def _fetch_alphavantage(
    creds: ProviderCredentials, symbols: list[str]
) -> list[ProviderQuote]:
    classes = _classify_symbols(symbols)
    quotes: list[ProviderQuote] = []
    sem = asyncio.Semaphore(2)

    async with _client() as client:
        async def one(symbol: str) -> ProviderQuote | None:
            async with sem:
                if classes.get(symbol) == "forex":
                    resp = await _get(client, "https://www.alphavantage.co/query", params={
                        "function": "CURRENCY_EXCHANGE_RATE",
                        "from_currency": symbol[:3], "to_currency": symbol[3:],
                        "apikey": creds.api_key,
                    })
                    data = _json(resp)
                    rate = data.get("Realtime Currency Exchange Rate", {}) if isinstance(data, dict) else {}
                    price = _num(rate.get("5. Exchange Rate"))
                    return ProviderQuote(
                        symbol=symbol, asset_class="forex", price=price,
                        change=0.0, timestamp=_ts_ms(), source="alphavantage:user",
                    ) if price > 0 else None

                resp = await _get(client, "https://www.alphavantage.co/query", params={
                    "function": "GLOBAL_QUOTE", "symbol": symbol, "apikey": creds.api_key,
                })
                data = _json(resp)
                quote = data.get("Global Quote", {}) if isinstance(data, dict) else {}
                price = _num(quote.get("05. price"))
                if price <= 0:
                    return None
                previous = _num(quote.get("08. previous close"))
                change = _num(quote.get("10. change percent", "").rstrip("%")) if quote.get("10. change percent") else (
                    ((price - previous) / previous * 100) if previous else 0.0
                )
                return ProviderQuote(
                    symbol=symbol, asset_class=classes.get(symbol, "stocks"),
                    price=price, change=change,
                    high=_num(quote.get("03. high")), low=_num(quote.get("04. low")),
                    open=_num(quote.get("02. open")),
                    volume=_num(quote.get("06. volume")),
                    timestamp=_ts_ms(), source="alphavantage:user",
                )

        for result in await asyncio.gather(*(one(s) for s in symbols), return_exceptions=True):
            if isinstance(result, ProviderRequestError):
                raise result
            if isinstance(result, ProviderQuote):
                quotes.append(result)
    return quotes


async def _fetch_fred(creds: ProviderCredentials, symbols: list[str]) -> list[ProviderQuote]:
    quotes: list[ProviderQuote] = []
    async with _client() as client:
        for symbol in symbols:
            series_id = FRED_SERIES_MAP.get(symbol)
            if not series_id:
                continue
            resp = await _get(client, "https://api.stlouisfed.org/fred/series/observations", params={
                "series_id": series_id, "api_key": creds.api_key, "file_type": "json",
                "sort_order": "desc", "limit": 2,
            })
            if resp.status_code in (400, 401, 403):
                raise ProviderRequestError(STATUS_INVALID, "FRED rejected this key.")
            if resp.status_code == 429:
                raise ProviderRequestError(STATUS_RATE_LIMITED, "FRED rate limit reached.")
            data = _json(resp) if resp.status_code == 200 else {}
            observations = data.get("observations", []) if isinstance(data, dict) else []
            values = [_num(o.get("value"), float("nan")) for o in observations]
            values = [v for v in values if v == v]
            if not values:
                continue
            price = values[0]
            change = ((price - values[1]) / values[1] * 100) if len(values) > 1 and values[1] else 0.0
            quotes.append(ProviderQuote(
                symbol=symbol, asset_class="bonds", price=price, change=change,
                high=price, low=price, open=price,
                timestamp=_ts_ms(), source="fred:user",
            ))
    return quotes


async def _fetch_alpaca(creds: ProviderCredentials, symbols: list[str]) -> list[ProviderQuote]:
    data_url = get_settings().alpaca_data_url.rstrip("/")
    headers = {
        "APCA-API-KEY-ID": creds.api_key,
        "APCA-API-SECRET-KEY": creds.api_secret,
    }
    async with _client() as client:
        resp = await _get(
            client, f"{data_url}/v2/stocks/snapshots",
            params={"symbols": ",".join(symbols), "feed": "iex"},
            headers=headers,
        )
    if resp.status_code in (401, 403):
        raise ProviderRequestError(STATUS_INVALID, "Alpaca rejected this key pair.")
    if resp.status_code == 429:
        raise ProviderRequestError(STATUS_RATE_LIMITED, "Alpaca rate limit reached.")
    if resp.status_code != 200:
        return []
    data = _json(resp)
    quotes: list[ProviderQuote] = []
    for symbol in symbols:
        row = data.get(symbol) if isinstance(data, dict) else None
        if not isinstance(row, dict):
            continue
        trade = row.get("latestTrade", {}) or {}
        day = row.get("dailyBar", {}) or {}
        previous = row.get("prevDailyBar", {}) or {}
        price = _num(trade.get("p") or day.get("c"))
        prev_close = _num(previous.get("c"))
        if price <= 0:
            continue
        change = ((price - prev_close) / prev_close * 100) if prev_close else 0.0
        quotes.append(ProviderQuote(
            symbol=symbol, asset_class="stocks", price=price, change=change,
            high=_num(day.get("h")), low=_num(day.get("l")), open=_num(day.get("o")),
            volume=_num(day.get("v")), timestamp=_ts_ms(), source="alpaca:user",
        ))
    return quotes


async def _fetch_coingecko(
    creds: ProviderCredentials, symbols: list[str]
) -> list[ProviderQuote]:
    base, headers = _coingecko_base(creds)
    id_to_symbol = {_CRYPTO_IDS[s]: s for s in symbols if s in _CRYPTO_IDS}
    if not id_to_symbol:
        return []
    async with _client() as client:
        resp = await _get(client, f"{base}/simple/price", params={
            "ids": ",".join(id_to_symbol),
            "vs_currencies": "usd",
            "include_24hr_change": "true",
            "include_24hr_vol": "true",
            "include_last_updated_at": "true",
        }, headers=headers)
    if resp.status_code in (401, 403):
        raise ProviderRequestError(STATUS_INVALID, "CoinGecko rejected this key for the selected plan.")
    if resp.status_code == 429:
        raise ProviderRequestError(STATUS_RATE_LIMITED, "CoinGecko rate limit reached.")
    if resp.status_code != 200:
        return []
    data = _json(resp)
    quotes: list[ProviderQuote] = []
    for coin_id, symbol in id_to_symbol.items():
        row = data.get(coin_id) if isinstance(data, dict) else None
        if not isinstance(row, dict):
            continue
        price = _num(row.get("usd"))
        if price <= 0:
            continue
        quotes.append(ProviderQuote(
            symbol=symbol, asset_class="crypto", price=price,
            change=_num(row.get("usd_24h_change")),
            volume=_num(row.get("usd_24h_vol")),
            timestamp=int(_num(row.get("last_updated_at"), _ts_ms() / 1000) * 1000),
            source="coingecko:user",
        ))
    return quotes


async def _fetch_polygon(creds: ProviderCredentials, symbols: list[str]) -> list[ProviderQuote]:
    quotes: list[ProviderQuote] = []
    async with _client() as client:
        for symbol in symbols:
            resp = await _get(
                client, f"https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/{symbol}",
                params={"apiKey": creds.api_key},
            )
            if resp.status_code in (401, 403):
                raise ProviderRequestError(STATUS_INVALID, "Polygon rejected this key.")
            if resp.status_code == 429:
                raise ProviderRequestError(STATUS_RATE_LIMITED, "Polygon rate limit reached.")
            if resp.status_code != 200:
                continue
            payload = _json(resp)
            row = payload.get("ticker", {}) if isinstance(payload, dict) else {}
            if not isinstance(row, dict):
                continue
            trade = row.get("lastTrade", {}) or {}
            day = row.get("day", {}) or {}
            prev = row.get("prevDay", {}) or {}
            price = _num(trade.get("p") or day.get("c"))
            prev_close = _num(prev.get("c"))
            if price <= 0:
                continue
            change = _num(row.get("todaysChangePerc"))
            if not change and prev_close:
                change = (price - prev_close) / prev_close * 100
            quotes.append(ProviderQuote(
                symbol=symbol, asset_class="stocks", price=price, change=change,
                high=_num(day.get("h")), low=_num(day.get("l")), open=_num(day.get("o")),
                volume=_num(day.get("v")), timestamp=_ts_ms(), source="polygon:user",
            ))
    return quotes
