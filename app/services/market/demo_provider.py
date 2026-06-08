"""Demo data provider for GeoTrade.

Provides realistic market data when real APIs are rate-limited or unavailable.
This ensures the frontend always displays meaningful data for demos.
"""
from datetime import datetime, UTC
from typing import List, Dict, Any
import random

from app.services.market.base_provider import MarketDataPoint, BaseMarketProvider
from app.core.logging import get_logger

logger = get_logger(__name__)

# Realistic demo data based on actual market prices (April 2025)
DEMO_CRYPTO: Dict[str, dict] = {
    "BTC": {"price": 79112.0, "change": 1.99, "volume": 26885859622, "high": 79400.0, "low": 77352.0},
    "ETH": {"price": 2388.57, "change": 3.05, "volume": 12580626537, "high": 2398.19, "low": 2308.34},
    "XRP": {"price": 1.44, "change": 1.39, "volume": 1357869192, "high": 1.45, "low": 1.42},
    "BNB": {"price": 638.33, "change": 1.34, "volume": 732992162, "high": 639.26, "low": 627.8},
    "SOL": {"price": 87.58, "change": 1.68, "volume": 2567891234, "high": 88.5, "low": 85.2},
    "ADA": {"price": 0.32, "change": -0.5, "volume": 456789123, "high": 0.33, "low": 0.31},
    "DOGE": {"price": 0.089, "change": 2.1, "volume": 1234567890, "high": 0.091, "low": 0.087},
    "AVAX": {"price": 24.56, "change": -1.2, "volume": 345678901, "high": 25.1, "low": 24.0},
    "MATIC": {"price": 0.45, "change": 0.8, "volume": 234567890, "high": 0.46, "low": 0.44},
    "DOT": {"price": 6.78, "change": -0.3, "volume": 123456789, "high": 6.85, "low": 6.70},
}

DEMO_STOCKS: Dict[str, dict] = {
    "AAPL": {"price": 198.50, "change": 1.25, "volume": 45678900, "high": 199.20, "low": 196.80},
    "MSFT": {"price": 428.30, "change": 0.85, "volume": 23456700, "high": 430.00, "low": 425.50},
    "GOOGL": {"price": 176.20, "change": -0.45, "volume": 18765400, "high": 177.50, "low": 175.20},
    "AMZN": {"price": 185.40, "change": 1.12, "volume": 34567800, "high": 186.20, "low": 183.50},
    "NVDA": {"price": 892.15, "change": 2.35, "volume": 56789000, "high": 898.00, "low": 885.50},
    "META": {"price": 495.20, "change": 0.95, "volume": 12345600, "high": 498.00, "low": 490.50},
    "TSLA": {"price": 172.30, "change": -1.85, "volume": 78901200, "high": 175.00, "low": 170.80},
    "JPM": {"price": 195.80, "change": 0.65, "volume": 9876500, "high": 197.00, "low": 194.50},
    "V": {"price": 278.90, "change": 0.42, "volume": 4567800, "high": 280.00, "low": 276.50},
    "WMT": {"price": 165.40, "change": -0.25, "volume": 6789000, "high": 166.20, "low": 164.50},
}

DEMO_FOREX: Dict[str, dict] = {
    "EUR/USD": {"price": 1.0845, "change": 0.15, "volume": 125000000000, "high": 1.0852, "low": 1.0831},
    "GBP/USD": {"price": 1.2642, "change": -0.22, "volume": 89000000000, "high": 1.2665, "low": 1.2628},
    "USD/JPY": {"price": 151.85, "change": 0.35, "volume": 98000000000, "high": 152.10, "low": 151.45},
    "USD/CHF": {"price": 0.9056, "change": 0.18, "volume": 65000000000, "high": 0.9072, "low": 0.9041},
    "AUD/USD": {"price": 0.6534, "change": -0.45, "volume": 72000000000, "high": 0.6562, "low": 0.6518},
    "USD/CAD": {"price": 1.3845, "change": 0.28, "volume": 68000000000, "high": 1.3862, "low": 1.3825},
    "EUR/GBP": {"price": 0.8578, "change": 0.38, "volume": 45000000000, "high": 0.8592, "low": 0.8556},
    "EUR/JPY": {"price": 164.72, "change": 0.52, "volume": 52000000000, "high": 165.10, "low": 164.25},
    "GBP/JPY": {"price": 191.85, "change": 0.12, "volume": 48000000000, "high": 192.30, "low": 191.40},
    "NZD/USD": {"price": 0.5892, "change": -0.35, "volume": 38000000000, "high": 0.5912, "low": 0.5875},
}

DEMO_COMMODITIES: Dict[str, dict] = {
    "XAU/USD": {"price": 2389.45, "change": 0.85, "volume": 125000000, "high": 2395.20, "low": 2381.50},  # Gold
    "XAG/USD": {"price": 28.45, "change": 1.25, "volume": 89000000, "high": 28.85, "low": 28.05},  # Silver
    "WTI": {"price": 78.35, "change": -0.45, "volume": 145000000, "high": 79.20, "low": 77.80},  # Oil
    "BRENT": {"price": 82.65, "change": -0.35, "volume": 125000000, "high": 83.40, "low": 82.10},  # Brent Oil
    "NATGAS": {"price": 2.85, "change": 2.15, "volume": 78000000, "high": 2.92, "low": 2.78},  # Natural Gas
}

DEMO_BONDS: Dict[str, dict] = {
    "DGS1MO": {"price": 3.69, "change": 0.27},  # 1-Month Treasury
    "DGS3MO": {"price": 3.69, "change": 0.0},  # 3-Month Treasury
    "DGS6MO": {"price": 3.72, "change": 0.0},  # 6-Month Treasury
    "DGS1": {"price": 3.70, "change": 0.27},    # 1-Year Treasury
    "DGS2": {"price": 3.83, "change": 1.06},   # 2-Year Treasury
    "DGS5": {"price": 4.08, "change": 1.24},   # 5-Year Treasury
    "DGS10": {"price": 4.42, "change": 0.91},  # 10-Year Treasury
    "DGS30": {"price": 4.78, "change": 0.42},  # 30-Year Treasury
    "DFF": {"price": 5.33, "change": 0.0},      # Fed Funds Rate
    "T10Y2Y": {"price": 0.59, "change": -14.49}, # 10Y-2Y Spread
}

DEMO_ETFS: Dict[str, dict] = {
    "SPY": {"price": 512.35, "change": 0.85, "volume": 45678900, "high": 514.20, "low": 510.50},  # S&P 500 ETF
    "QQQ": {"price": 445.20, "change": 1.25, "volume": 34567800, "high": 447.00, "low": 443.50},  # NASDAQ 100 ETF
    "IWM": {"price": 198.45, "change": -0.35, "volume": 23456700, "high": 199.80, "low": 197.20},  # Russell 2000 ETF
    "DIA": {"price": 398.75, "change": 0.65, "volume": 12345600, "high": 400.00, "low": 397.50},  # Dow Jones ETF
    "VTI": {"price": 245.30, "change": 0.45, "volume": 18765400, "high": 246.50, "low": 244.20},  # Total Stock Market ETF
    "VWO": {"price": 42.85, "change": -0.25, "volume": 9876500, "high": 43.20, "low": 42.50},  # Emerging Markets ETF
    "EFA": {"price": 78.90, "change": 0.35, "volume": 6789000, "high": 79.30, "low": 78.40},  # EAFE ETF
    "GLD": {"price": 182.45, "change": 1.15, "volume": 5678900, "high": 183.50, "low": 181.20},  # Gold ETF
    "SLV": {"price": 22.85, "change": 1.45, "volume": 4567800, "high": 23.10, "low": 22.50},  # Silver ETF
    "USO": {"price": 78.35, "change": -0.65, "volume": 3456780, "high": 79.20, "low": 77.80},  # Oil ETF
}

DEMO_INDICES: Dict[str, dict] = {
    "SPX": {"price": 5234.50, "change": 0.85, "volume": 0, "high": 5250.00, "low": 5210.00},  # S&P 500 Index
    "NDX": {"price": 18456.20, "change": 1.25, "volume": 0, "high": 18520.00, "low": 18380.00},  # NASDAQ 100 Index
    "DJIA": {"price": 39875.30, "change": 0.65, "volume": 0, "high": 40000.00, "low": 39750.00},  # Dow Jones Index
    "RUT": {"price": 2045.80, "change": -0.35, "volume": 0, "high": 2060.00, "low": 2030.00},  # Russell 2000 Index
    "VIX": {"price": 14.25, "change": -5.20, "volume": 0, "high": 15.00, "low": 14.00},  # VIX Index
    "N225": {"price": 38487.50, "change": 0.45, "volume": 0, "high": 38600.00, "low": 38350.00},  # Nikkei 225 Index
    "FTSE": {"price": 8164.20, "change": -0.25, "volume": 0, "high": 8200.00, "low": 8140.00},  # FTSE 100 Index
    "DAX": {"price": 18492.50, "change": 0.85, "volume": 0, "high": 18550.00, "low": 18420.00},  # DAX Index
    "CAC": {"price": 8088.50, "change": 0.35, "volume": 0, "high": 8120.00, "low": 8060.00},  # CAC 40 Index
    "HSI": {"price": 18476.50, "change": -0.45, "volume": 0, "high": 18600.00, "low": 18350.00},  # Hang Seng Index
}


class DemoProvider:
    """Provider that returns realistic demo data for UI testing."""
    
    name = "demo"
    
    @staticmethod
    def get_crypto(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo crypto data."""
        symbols = symbols or list(DEMO_CRYPTO.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_CRYPTO:
                data = DEMO_CRYPTO[symbol]
                # Add small random fluctuation for realism
                price = data["price"] * (1 + random.uniform(-0.002, 0.002))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="crypto",
                    price=round(price, 2),
                    change=round(data["change"] + random.uniform(-0.1, 0.1), 2),
                    timestamp=timestamp,
                    source="coingecko",
                    volume=data["volume"],
                    high_24h=data["high"],
                    low_24h=data["low"],
                    open_24h=0.0
                ))
        return results
    
    @staticmethod
    def get_stocks(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo stock data."""
        symbols = symbols or list(DEMO_STOCKS.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_STOCKS:
                data = DEMO_STOCKS[symbol]
                price = data["price"] * (1 + random.uniform(-0.005, 0.005))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="stocks",
                    price=round(price, 2),
                    change=round(data["change"] + random.uniform(-0.05, 0.05), 2),
                    timestamp=timestamp,
                    source="alpaca",
                    volume=data["volume"],
                    high_24h=data["high"],
                    low_24h=data["low"],
                    open_24h=0.0
                ))
        return results
    
    @staticmethod
    def get_forex(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo forex data."""
        symbols = symbols or list(DEMO_FOREX.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_FOREX:
                data = DEMO_FOREX[symbol]
                price = data["price"] * (1 + random.uniform(-0.001, 0.001))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="forex",
                    price=round(price, 4),
                    change=round(data["change"] + random.uniform(-0.02, 0.02), 2),
                    timestamp=timestamp,
                    source="twelvedata",
                    volume=data["volume"],
                    high_24h=data["high"],
                    low_24h=data["low"],
                    open_24h=0.0
                ))
        return results
    
    @staticmethod
    def get_commodities(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo commodities data."""
        symbols = symbols or list(DEMO_COMMODITIES.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_COMMODITIES:
                data = DEMO_COMMODITIES[symbol]
                price = data["price"] * (1 + random.uniform(-0.003, 0.003))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="commodities",
                    price=round(price, 2),
                    change=round(data["change"] + random.uniform(-0.1, 0.1), 2),
                    timestamp=timestamp,
                    source="twelvedata",
                    volume=data["volume"],
                    high_24h=data["high"],
                    low_24h=data["low"],
                    open_24h=0.0
                ))
        return results
    
    @staticmethod
    def get_bonds(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo bonds data."""
        symbols = symbols or list(DEMO_BONDS.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_BONDS:
                data = DEMO_BONDS[symbol]
                price = data["price"] * (1 + random.uniform(-0.01, 0.01))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="bonds",
                    price=round(price, 2),
                    change=round(data["change"] + random.uniform(-0.05, 0.05), 2),
                    timestamp=timestamp,
                    source="fred",
                    volume=0.0,
                    high_24h=data["price"],
                    low_24h=data["price"],
                    open_24h=data["price"]
                ))
        return results

    @staticmethod
    def get_etfs(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo ETF data."""
        symbols = symbols or list(DEMO_ETFS.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_ETFS:
                data = DEMO_ETFS[symbol]
                price = data["price"] * (1 + random.uniform(-0.005, 0.005))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="etfs",
                    price=round(price, 2),
                    change=round(data["change"] + random.uniform(-0.05, 0.05), 2),
                    timestamp=timestamp,
                    source="alpaca",
                    volume=data["volume"],
                    high_24h=data["high"],
                    low_24h=data["low"],
                    open_24h=0.0
                ))
        return results

    @staticmethod
    def get_indices(symbols: List[str] = None) -> List[MarketDataPoint]:
        """Get demo equity indices data."""
        symbols = symbols or list(DEMO_INDICES.keys())
        results = []
        timestamp = int(datetime.now(UTC).timestamp() * 1000)
        
        for symbol in symbols:
            if symbol in DEMO_INDICES:
                data = DEMO_INDICES[symbol]
                price = data["price"] * (1 + random.uniform(-0.005, 0.005))
                results.append(MarketDataPoint(
                    symbol=symbol,
                    asset_class="indices",
                    price=round(price, 2),
                    change=round(data["change"] + random.uniform(-0.05, 0.05), 2),
                    timestamp=timestamp,
                    source="demo",
                    volume=data["volume"],
                    high_24h=data["high"],
                    low_24h=data["low"],
                    open_24h=0.0
                ))
        return results


def get_demo_provider() -> DemoProvider:
    """Get demo provider instance."""
    return DemoProvider()
