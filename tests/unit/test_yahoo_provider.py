from __future__ import annotations

import httpx
import pytest

from app.services.market.yahoo_provider import YahooProvider


def quote_row(symbol: str, price: float, change_pct: float = 1.5) -> dict:
    return {
        "symbol": symbol,
        "regularMarketPrice": price,
        "regularMarketChangePercent": change_pct,
        "regularMarketPreviousClose": price / (1 + change_pct / 100),
        "regularMarketVolume": 1_000_000,
        "regularMarketDayHigh": price * 1.01,
        "regularMarketDayLow": price * 0.99,
        "regularMarketOpen": price * 0.995,
        "regularMarketTime": 1_700_000_000,
        "shortName": f"{symbol} Inc.",
    }


def build_provider(handler) -> tuple[YahooProvider, httpx.AsyncClient]:
    provider = YahooProvider()
    client = httpx.AsyncClient(transport=httpx.MockTransport(handler))
    return provider, client


@pytest.mark.asyncio
async def test_batch_quote_maps_provider_symbols_back_to_display_symbols() -> None:
    """Index/FX rows come back under Yahoo tickers and must be re-keyed."""
    seen: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.path == "/v1/test/getcrumb":
            return httpx.Response(200, text="abc123")
        if request.url.path == "/v7/finance/quote":
            seen.append(request.url.params["symbols"])
            return httpx.Response(200, json={"quoteResponse": {"result": [
                quote_row("^GSPC", 5000.0),
                quote_row("^N225", 39000.0),
            ]}})
        return httpx.Response(200, text="")

    provider, client = build_provider(handler)
    async with client:
        rows = await provider._fetch_batched(
            client,
            ["SPX", "NKY"],
            {"SPX": "^GSPC", "NKY": "^N225"},
            "indices",
            {"SPX": "S&P 500", "NKY": "Nikkei 225"},
        )

    assert set(rows) == {"SPX", "NKY"}
    assert rows["SPX"].price == 5000.0
    assert rows["SPX"].name == "S&P 500"
    assert rows["SPX"].asset_class == "indices"
    # One request covered both symbols.
    assert seen == ["^GSPC,^N225"]


@pytest.mark.asyncio
async def test_batch_quote_change_is_a_percentage_not_a_ratio() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.path == "/v1/test/getcrumb":
            return httpx.Response(200, text="abc123")
        return httpx.Response(200, json={"quoteResponse": {"result": [quote_row("AAPL", 200.0, -2.25)]}})

    provider, client = build_provider(handler)
    async with client:
        rows = await provider._fetch_batched(client, ["AAPL"], {}, "stocks", {})

    assert rows["AAPL"].change == pytest.approx(-2.25)


@pytest.mark.asyncio
async def test_batch_failure_falls_back_and_enters_cooldown() -> None:
    """A throttled batch endpoint must not be retried on every cycle."""
    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.path == "/v1/test/getcrumb":
            return httpx.Response(429, text="Too Many Requests")
        return httpx.Response(429, text="Too Many Requests")

    provider, client = build_provider(handler)
    async with client:
        rows = await provider._fetch_batched(client, ["AAPL"], {}, "stocks", {})
        assert rows == {}
        # Second call short-circuits without touching the network.
        assert await provider._fetch_batched(client, ["AAPL"], {}, "stocks", {}) == {}

    assert provider._batch_blocked_until > 0


@pytest.mark.asyncio
async def test_zero_priced_rows_are_skipped() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.path == "/v1/test/getcrumb":
            return httpx.Response(200, text="abc123")
        return httpx.Response(200, json={"quoteResponse": {"result": [
            quote_row("AAPL", 200.0),
            {"symbol": "DEAD", "regularMarketPrice": 0},
        ]}})

    provider, client = build_provider(handler)
    async with client:
        rows = await provider._fetch_batched(client, ["AAPL", "DEAD"], {}, "stocks", {})

    assert set(rows) == {"AAPL"}


@pytest.mark.asyncio
async def test_fetch_symbols_returns_one_row_per_requested_symbol() -> None:
    """Symbols missing from every source still appear, marked unavailable."""
    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.path == "/v1/test/getcrumb":
            return httpx.Response(200, text="abc123")
        if request.url.path == "/v7/finance/quote":
            return httpx.Response(200, json={"quoteResponse": {"result": [quote_row("AAPL", 200.0)]}})
        return httpx.Response(404, json={"chart": {"result": None}})

    provider = YahooProvider()
    transport = httpx.MockTransport(handler)

    import app.services.market.yahoo_provider as module

    original = module.httpx.AsyncClient

    def patched(*args, **kwargs):
        kwargs["transport"] = transport
        return original(*args, **kwargs)

    module.httpx.AsyncClient = patched
    try:
        rows = await provider.fetch_symbols(["AAPL", "MSFT"], "stocks")
    finally:
        module.httpx.AsyncClient = original

    assert [r.symbol for r in rows] == ["AAPL", "MSFT"]
    assert rows[0].status == "ok"
    assert rows[1].status == "unavailable"


def test_forex_symbol_map_and_names() -> None:
    provider = YahooProvider()
    assert provider.get_forex_symbol_map(["EURUSD"]) == {"EURUSD": "EURUSD=X"}
    assert provider.get_forex_names(["EURUSD"])["EURUSD"] == "Euro / US Dollar"


def test_commodity_coverage_matches_default_universe() -> None:
    """Every configured commodity has a Yahoo futures proxy."""
    from app.services.market.commodities_provider import DEFAULT_COMMODITIES

    provider = YahooProvider()
    missing = [s for s in DEFAULT_COMMODITIES if not provider.supports_commodity(s)]
    assert missing == []
