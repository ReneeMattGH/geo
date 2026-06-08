"""API Provider validation and safe usage utilities.

Ensures API keys are validated on startup and providers gracefully handle missing keys.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Optional

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)


@dataclass
class ProviderStatus:
    """Status of an API provider."""
    name: str
    active: bool
    has_key: bool
    message: str


class APIProviderManager:
    """Manages API provider configurations and validates availability."""
    
    def __init__(self) -> None:
        self.settings = get_settings()
        self._statuses: Dict[str, ProviderStatus] = {}
        self._validate_all()
    
    def _validate_all(self) -> None:
        """Validate all API providers."""
        providers = [
            ("alpaca", self._check_alpaca),
            ("twelvedata", self._check_twelvedata),
            ("finnhub", self._check_finnhub),
            ("fred", self._check_fred),
            ("alphavantage", self._check_alphavantage),
            ("coingecko", self._check_coingecko),
            ("newsapi", self._check_newsapi),
        ]
        
        for name, check_func in providers:
            self._statuses[name] = check_func()
    
    def _check_alpaca(self) -> ProviderStatus:
        """Check Alpaca API configuration."""
        has_key = bool(self.settings.alpaca_api_key and self.settings.alpaca_secret_key)
        if has_key:
            return ProviderStatus(
                name="Alpaca",
                active=True,
                has_key=True,
                message=f"Active (Paper: {self.settings.alpaca_paper})"
            )
        return ProviderStatus(
            name="Alpaca",
            active=False,
            has_key=False,
            message="Missing ALPACA_API_KEY or ALPACA_SECRET_KEY - stocks/ETFs unavailable"
        )
    
    def _check_twelvedata(self) -> ProviderStatus:
        """Check Twelve Data API configuration."""
        has_key = bool(self.settings.twelvedata_api_key)
        if has_key:
            return ProviderStatus(
                name="Twelve Data",
                active=True,
                has_key=True,
                message="Active - forex and commodities available"
            )
        return ProviderStatus(
            name="Twelve Data",
            active=False,
            has_key=False,
            message="Missing TWELVEDATA_API_KEY - forex/commodities unavailable"
        )
    
    def _check_finnhub(self) -> ProviderStatus:
        """Check Finnhub API configuration."""
        has_key = bool(self.settings.finnhub_api_key)
        if has_key:
            return ProviderStatus(
                name="Finnhub",
                active=True,
                has_key=True,
                message="Active - stock data available"
            )
        return ProviderStatus(
            name="Finnhub",
            active=False,
            has_key=False,
            message="Missing FINNHUB_API_KEY - using fallback"
        )
    
    def _check_fred(self) -> ProviderStatus:
        """Check FRED API configuration."""
        has_key = bool(self.settings.fred_api_key)
        if has_key:
            return ProviderStatus(
                name="FRED",
                active=True,
                has_key=True,
                message="Active - bond/economic data available"
            )
        return ProviderStatus(
            name="FRED",
            active=False,
            has_key=False,
            message="Missing FRED_API_KEY - bond data unavailable"
        )
    
    def _check_alphavantage(self) -> ProviderStatus:
        """Check Alpha Vantage API configuration."""
        has_key = bool(self.settings.alphavantage_api_key)
        if has_key:
            return ProviderStatus(
                name="Alpha Vantage",
                active=True,
                has_key=True,
                message="Active - backup forex/commodities available"
            )
        return ProviderStatus(
            name="Alpha Vantage",
            active=False,
            has_key=False,
            message="Missing ALPHAVANTAGE_API_KEY - no backup for forex"
        )
    
    def _check_coingecko(self) -> ProviderStatus:
        """Check CoinGecko API configuration."""
        # CoinGecko doesn't require API key for basic usage
        return ProviderStatus(
            name="CoinGecko",
            active=True,
            has_key=True,
            message="Active (free tier) - crypto data available"
        )
    
    def _check_newsapi(self) -> ProviderStatus:
        """Check News API configuration."""
        has_key = bool(self.settings.newsapi_key)
        if has_key:
            return ProviderStatus(
                name="NewsAPI",
                active=True,
                has_key=True,
                message="Active - news ingestion available"
            )
        return ProviderStatus(
            name="NewsAPI",
            active=False,
            has_key=False,
            message="Missing NEWSAPI_KEY - using RSS feeds only"
        )
    
    def get_status(self, provider: str) -> Optional[ProviderStatus]:
        """Get status of a specific provider."""
        return self._statuses.get(provider.lower())
    
    def get_all_statuses(self) -> List[ProviderStatus]:
        """Get all provider statuses."""
        return list(self._statuses.values())
    
    def is_active(self, provider: str) -> bool:
        """Check if a provider is active."""
        status = self._statuses.get(provider.lower())
        return status.active if status else False
    
    def log_status(self) -> None:
        """Log the status of all providers."""
        logger.info("=" * 50)
        logger.info("API PROVIDER STATUS")
        logger.info("=" * 50)
        
        active_count = 0
        for status in self._statuses.values():
            icon = "✓" if status.active else "✗"
            level = "info" if status.active else "warning"
            getattr(logger, level)(f"{icon} {status.name}: {status.message}")
            if status.active:
                active_count += 1
        
        logger.info("-" * 50)
        logger.info(f"Active providers: {active_count}/{len(self._statuses)}")
        logger.info("=" * 50)


# Singleton instance
_provider_manager: Optional[APIProviderManager] = None


def get_provider_manager() -> APIProviderManager:
    """Get the global APIProviderManager singleton."""
    global _provider_manager
    if _provider_manager is None:
        _provider_manager = APIProviderManager()
    return _provider_manager


def check_provider(provider: str) -> bool:
    """Quick check if a provider is active."""
    return get_provider_manager().is_active(provider)


def require_provider(provider: str, operation: str = "operation") -> bool:
    """Check if provider is active, log warning if not.
    
    Returns True if provider is active, False otherwise.
    """
    mgr = get_provider_manager()
    status = mgr.get_status(provider)
    
    if status and status.active:
        return True
    
    logger.warning(
        f"Cannot perform {operation}: {provider} provider not configured",
        provider=provider,
        missing_key=status.message if status else "unknown"
    )
    return False
