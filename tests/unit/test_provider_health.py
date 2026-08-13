"""Provider health checks.

Tests each market data provider's parsing and data normalization logic
using mocked HTTP responses that mirror the actual API shapes.
"""
from __future__ import annotations

import pytest
from datetime import datetime, UTC

from app.services.market.base_provider import MarketDataPoint


def test_market_data_point_schema():
    """Verify the canonical schema includes all required fields."""
    dp = MarketDataPoint(
        symbol="TEST",
        asset_class="stocks",
        price=100.0,
        change=1.5,
        timestamp=1000,
        source="test",
        name="Test Asset",
    )
    d = dp.to_dict()
    required = [
        "symbol", "asset_class", "price", "change", "timestamp", "source",
        "volume", "high_24h", "low_24h", "open_24h", "name", "status",
        "currency", "market_cap", "data_status",
    ]
    for field in required:
        assert field in d, f"Missing field: {field}"


def test_unavailable_data_point():
    """Unavailable points must have data_status='unavailable' and price=0."""
    dp = MarketDataPoint.unavailable("BTC", "crypto", "coingecko")
    assert dp.price == 0.0
    assert dp.status == "unavailable"
    assert dp.data_status == "unavailable"
    assert dp.symbol == "BTC"
    assert dp.source == "coingecko"


def test_data_status_defaults_to_live():
    """Normal data points default to data_status='live'."""
    dp = MarketDataPoint(
        symbol="AAPL", asset_class="stocks", price=200.0,
        change=1.0, timestamp=1000, source="alpaca",
    )
    assert dp.data_status == "live"
    assert dp.status == "ok"


def test_delayed_data_status():
    """Providers that serve delayed data should set data_status='delayed'."""
    dp = MarketDataPoint(
        symbol="SPX", asset_class="indices", price=5200.0,
        change=0.5, timestamp=1000, source="yahoo",
        data_status="delayed",
    )
    assert dp.data_status == "delayed"


def test_stale_data_status():
    """Cached/last-good-price data should be tagged 'stale'."""
    dp = MarketDataPoint(
        symbol="AAPL", asset_class="stocks", price=200.0,
        change=1.0, timestamp=1000, source="alpaca:cached",
        data_status="stale",
    )
    assert dp.data_status == "stale"
    assert dp.source.endswith(":cached")


def test_market_cap_field():
    """Market cap should be captured for crypto assets."""
    dp = MarketDataPoint(
        symbol="BTC", asset_class="crypto", price=80000.0,
        change=2.0, timestamp=1000, source="coingecko",
        market_cap=1_500_000_000_000.0,
    )
    assert dp.market_cap == 1_500_000_000_000.0
    assert dp.to_dict()["market_cap"] == 1_500_000_000_000.0


def test_currency_field():
    """Currency defaults to USD."""
    dp = MarketDataPoint(
        symbol="AAPL", asset_class="stocks", price=200.0,
        change=1.0, timestamp=1000, source="alpaca",
    )
    assert dp.currency == "USD"


# ── CoinGecko parsing ─────────────────────────────────────────────────────

class TestCoinGeckoParser:
    def test_parse_coin_with_market_cap(self):
        from app.services.market.coingecko_provider import CoinGeckoProvider
        provider = CoinGeckoProvider()
        coin = {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "current_price": 79112.0,
            "price_change_percentage_24h": 1.99,
            "total_volume": 26885859622,
            "high_24h": 79400.0,
            "low_24h": 77352.0,
            "market_cap": 1560000000000,
        }
        dp = provider._parse_coin(coin)
        assert dp is not None
        assert dp.symbol == "BTC"
        assert dp.price == 79112.0
        assert dp.market_cap == 1560000000000
        assert dp.source == "coingecko"
        assert dp.data_status == "live"

    def test_parse_coin_zero_price_returns_none(self):
        from app.services.market.coingecko_provider import CoinGeckoProvider
        provider = CoinGeckoProvider()
        coin = {
            "id": "dead-coin",
            "symbol": "dead",
            "name": "Dead Coin",
            "current_price": 0,
        }
        assert provider._parse_coin(coin) is None


# ── FRED parsing ──────────────────────────────────────────────────────────

class TestFREDProvider:
    def test_build_point_marks_delayed(self):
        from app.services.market.fred_provider import FREDProvider
        provider = FREDProvider()
        dp = provider._build_point("US10Y", 4.42, 4.38, "2026-08-08", "fred")
        assert dp.data_status == "delayed"
        assert dp.price == 4.42
        assert dp.name == "US 10-Year Treasury"

    def test_bond_change_calculation(self):
        from app.services.market.fred_provider import FREDProvider
        provider = FREDProvider()
        dp = provider._build_point("US02Y", 4.0, 3.8, "2026-08-08", "fred")
        expected_change = ((4.0 - 3.8) / 3.8) * 100
        assert dp.change == pytest.approx(expected_change, abs=0.01)


# ── Commodities naming ────────────────────────────────────────────────────

class TestCommoditiesProvider:
    def test_commodity_names_defined(self):
        from app.services.market.commodities_provider import COMMODITY_NAMES, DEFAULT_COMMODITIES
        for sym in DEFAULT_COMMODITIES:
            assert sym in COMMODITY_NAMES, f"Missing name for commodity: {sym}"

    def test_all_commodities_have_yahoo_proxy(self):
        from app.services.market.commodities_provider import DEFAULT_COMMODITIES
        from app.services.market.yahoo_provider import COMMODITY_SYMBOLS
        for sym in DEFAULT_COMMODITIES:
            assert sym in COMMODITY_SYMBOLS, f"No Yahoo futures proxy for: {sym}"


# ── Forex naming ──────────────────────────────────────────────────────────

class TestForexProvider:
    def test_pair_names(self):
        from app.services.market.forex_provider import ForexProvider
        provider = ForexProvider()
        assert provider._pair_name("EURUSD") == "Euro / US Dollar"
        assert provider._pair_name("USDJPY") == "US Dollar / Japanese Yen"
        assert provider._pair_name("GBPCHF") == "British Pound / Swiss Franc"


# ── Demo provider source labels ───────────────────────────────────────────

class TestDemoProvider:
    def test_demo_source_is_honest(self):
        """DemoProvider must identify itself as 'demo', not impersonate real providers."""
        from app.services.market.demo_provider import DemoProvider
        for fn in [
            DemoProvider.get_crypto,
            DemoProvider.get_stocks,
            DemoProvider.get_forex,
            DemoProvider.get_commodities,
            DemoProvider.get_bonds,
            DemoProvider.get_etfs,
            DemoProvider.get_indices,
        ]:
            results = fn()
            for dp in results:
                assert dp.source == "demo", (
                    f"{fn.__name__} returned source='{dp.source}' — "
                    "DemoProvider must not impersonate real providers"
                )
