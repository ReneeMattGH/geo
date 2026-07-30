"""Centralized asset universe for GeoTrade.

Groups all supported assets by market class for consistent polling and display.
"""
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class AssetDefinition:
    """Definition of a tradeable asset."""
    symbol: str
    name: str
    asset_class: str  # stocks, crypto, forex, commodities, etc.
    region: Optional[str] = None
    sector: Optional[str] = None
    type: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    # Additional fields for signals_v2 compatibility
    label: str = ""
    description: str = ""
    category: str = ""
    geo_sensitivity: List[str] = field(default_factory=list)
    finnhub_sym: Optional[str] = None
    base_price: float = 100.0


class AssetUniverse:
    """Collection of all supported assets in the system."""
    
    def __init__(self):
        self._assets: Dict[str, AssetDefinition] = {}
        self._load_from_config()
    
    def _load_from_config(self) -> None:
        """Load assets from ASSET_UNIVERSE config."""
        for asset_class, assets in ASSET_UNIVERSE.items():
            for asset_data in assets:
                symbol = asset_data["symbol"]
                # Map asset_class to category for signals_v2
                category_map = {
                    "forex": "forex",
                    "commodities": "commodity",
                    "indices": "equity_index",
                    "crypto": "crypto",
                    "stocks": "stock",
                    "etfs": "etf",
                    "bonds": "bond"
                }
                category = category_map.get(asset_class, asset_class)
                
                # Set geo_sensitivity based on asset type
                geo_sensitivity = ["political_instability", "economic_policy_change"]
                if asset_class in ["commodities", "bonds"]:
                    geo_sensitivity = ["military_escalation", "energy_supply_disruption", "political_instability"]
                elif asset_class == "forex":
                    geo_sensitivity = ["political_instability", "economic_policy_change", "trade_restrictions"]
                elif asset_class == "indices":
                    geo_sensitivity = ["military_escalation", "political_instability", "economic_policy_change"]
                
                # Set base price based on asset type
                base_price_map = {
                    "BTC": 65000, "ETH": 3500, "XAUUSD": 2350, "SPX": 5200,
                    "AAPL": 175, "TSLA": 240, "EURUSD": 1.08, "US10Y": 4.2
                }
                base_price = base_price_map.get(symbol, 100.0)
                
                self._assets[symbol] = AssetDefinition(
                    symbol=symbol,
                    name=asset_data.get("name", symbol),
                    asset_class=asset_class,
                    region=asset_data.get("region", "global"),
                    sector=asset_data.get("sector", asset_class),
                    type=asset_data.get("type"),
                    metadata=asset_data,
                    label=asset_data.get("name", symbol),
                    description=f"{asset_data.get('name', symbol)} - {asset_class}",
                    category=category,
                    geo_sensitivity=geo_sensitivity,
                    finnhub_sym=asset_data.get("finnhub_sym"),
                    base_price=base_price
                )
    
    def all(self) -> List[AssetDefinition]:
        """Get all asset definitions."""
        return list(self._assets.values())
    
    def grouped(self) -> Dict[str, List[Dict]]:
        """Return assets grouped by category."""
        grouped = {}
        for asset in self._assets.values():
            if asset.category not in grouped:
                grouped[asset.category] = []
            grouped[asset.category].append({
                "symbol": asset.symbol,
                "name": asset.name,
                "asset_class": asset.asset_class,
                "region": asset.region,
                "sector": asset.sector,
                "type": asset.type,
                "label": asset.label,
                "description": asset.description,
                "category": asset.category,
                "geo_sensitivity": asset.geo_sensitivity,
                "base_price": asset.base_price
            })
        return grouped
    
    def symbols(self) -> List[str]:
        """Get all symbols."""
        return list(self._assets.keys())
    
    def __len__(self) -> int:
        """Return the number of assets in the universe."""
        return len(self._assets)
    
    def get_asset(self, symbol: str) -> Optional[AssetDefinition]:
        """Get asset definition by symbol."""
        return self._assets.get(symbol)
    
    def get_all_assets(self) -> List[AssetDefinition]:
        """Get all asset definitions."""
        return list(self._assets.values())
    
    def get_by_class(self, asset_class: str) -> List[AssetDefinition]:
        """Get all assets of a specific class."""
        return [a for a in self._assets.values() if a.asset_class == asset_class]
    
    def get_all_symbols(self) -> List[str]:
        """Get all symbols."""
        return list(self._assets.keys())


# Global singleton
_asset_universe: Optional[AssetUniverse] = None


def get_asset_universe() -> AssetUniverse:
    """Get the global AssetUniverse singleton."""
    global _asset_universe
    if _asset_universe is None:
        _asset_universe = AssetUniverse()
    return _asset_universe

ASSET_UNIVERSE: Dict[str, List[Dict[str, Any]]] = {
    "forex": [
        # Majors
        {"symbol": "EURUSD", "name": "Euro / US Dollar", "type": "major"},
        {"symbol": "GBPUSD", "name": "British Pound / US Dollar", "type": "major"},
        {"symbol": "USDJPY", "name": "US Dollar / Japanese Yen", "type": "major"},
        {"symbol": "USDCHF", "name": "US Dollar / Swiss Franc", "type": "major"},
        {"symbol": "USDCAD", "name": "US Dollar / Canadian Dollar", "type": "major"},
        {"symbol": "AUDUSD", "name": "Australian Dollar / US Dollar", "type": "major"},
        {"symbol": "NZDUSD", "name": "New Zealand Dollar / US Dollar", "type": "major"},
        # Minors
        {"symbol": "EURGBP", "name": "Euro / British Pound", "type": "minor"},
        {"symbol": "EURJPY", "name": "Euro / Japanese Yen", "type": "minor"},
        {"symbol": "EURAUD", "name": "Euro / Australian Dollar", "type": "minor"},
        {"symbol": "EURCHF", "name": "Euro / Swiss Franc", "type": "minor"},
        {"symbol": "EURCAD", "name": "Euro / Canadian Dollar", "type": "minor"},
        {"symbol": "GBPJPY", "name": "British Pound / Japanese Yen", "type": "minor"},
        {"symbol": "GBPCHF", "name": "British Pound / Swiss Franc", "type": "minor"},
        {"symbol": "GBPAUD", "name": "British Pound / Australian Dollar", "type": "minor"},
        {"symbol": "GBPCAD", "name": "British Pound / Canadian Dollar", "type": "minor"},
        {"symbol": "AUDJPY", "name": "Australian Dollar / Japanese Yen", "type": "minor"},
        {"symbol": "AUDNZD", "name": "Australian Dollar / New Zealand Dollar", "type": "minor"},
        {"symbol": "AUDCAD", "name": "Australian Dollar / Canadian Dollar", "type": "minor"},
        {"symbol": "NZDJPY", "name": "New Zealand Dollar / Japanese Yen", "type": "minor"},
        {"symbol": "NZDCAD", "name": "New Zealand Dollar / Canadian Dollar", "type": "minor"},
        {"symbol": "CADJPY", "name": "Canadian Dollar / Japanese Yen", "type": "minor"},
        {"symbol": "CHFJPY", "name": "Swiss Franc / Japanese Yen", "type": "minor"},
    ],
    "commodities": [
        # Metals
        {"symbol": "XAUUSD", "name": "Gold Spot / US Dollar", "type": "metal"},
        {"symbol": "XAGUSD", "name": "Silver Spot / US Dollar", "type": "metal"},
        {"symbol": "PLATINUM", "name": "Platinum Spot", "type": "metal"},
        {"symbol": "PALLADIUM", "name": "Palladium Spot", "type": "metal"},
        {"symbol": "COPPER", "name": "Copper Spot", "type": "metal"},
        # Energy
        {"symbol": "WTI", "name": "WTI Crude Oil", "type": "energy"},
        {"symbol": "BRENT", "name": "Brent Crude Oil", "type": "energy"},
        {"symbol": "NATGAS", "name": "Natural Gas", "type": "energy"},
        {"symbol": "HEATINGOIL", "name": "Heating Oil", "type": "energy"},
        # Agriculture
        {"symbol": "CORN", "name": "Corn", "type": "agri"},
        {"symbol": "WHEAT", "name": "Wheat", "type": "agri"},
        {"symbol": "SOYBEANS", "name": "Soybeans", "type": "agri"},
        {"symbol": "COFFEE", "name": "Coffee", "type": "agri"},
        {"symbol": "SUGAR", "name": "Sugar", "type": "agri"},
        {"symbol": "COTTON", "name": "Cotton", "type": "agri"},
    ],
    "indices": [
        # US
        {"symbol": "SPX", "name": "S&P 500", "region": "US"},
        {"symbol": "NDX", "name": "NASDAQ 100", "region": "US"},
        {"symbol": "DJI", "name": "Dow Jones Industrial Average", "region": "US"},
        {"symbol": "RUT", "name": "Russell 2000", "region": "US"},
        # Europe
        {"symbol": "DAX", "name": "DAX 40", "region": "Europe"},
        {"symbol": "FTSE", "name": "FTSE 100", "region": "Europe"},
        {"symbol": "CAC", "name": "CAC 40", "region": "Europe"},
        {"symbol": "STOXX50", "name": "Euro Stoxx 50", "region": "Europe"},
        # Asia
        {"symbol": "NKY", "name": "Nikkei 225", "region": "Asia"},
        {"symbol": "HSI", "name": "Hang Seng Index", "region": "Asia"},
        {"symbol": "SSEC", "name": "Shanghai Composite", "region": "Asia"},
        {"symbol": "SENSEX", "name": "BSE Sensex", "region": "Asia"},
        {"symbol": "NIFTY", "name": "Nifty 50", "region": "Asia"},
    ],
    "crypto": [
        {"symbol": "BTC", "name": "Bitcoin"},
        {"symbol": "ETH", "name": "Ethereum"},
        {"symbol": "BNB", "name": "Binance Coin"},
        {"symbol": "SOL", "name": "Solana"},
        {"symbol": "XRP", "name": "XRP"},
        {"symbol": "ADA", "name": "Cardano"},
        {"symbol": "DOGE", "name": "Dogecoin"},
        {"symbol": "AVAX", "name": "Avalanche"},
        {"symbol": "MATIC", "name": "Polygon"},
        {"symbol": "DOT", "name": "Polkadot"},
        {"symbol": "LTC", "name": "Litecoin"},
        {"symbol": "LINK", "name": "Chainlink"},
    ],
    "stocks": [
        # US Big Tech
        {"symbol": "AAPL", "name": "Apple Inc.", "sector": "Tech"},
        {"symbol": "MSFT", "name": "Microsoft Corporation", "sector": "Tech"},
        {"symbol": "NVDA", "name": "NVIDIA Corporation", "sector": "Tech"},
        {"symbol": "TSLA", "name": "Tesla, Inc.", "sector": "Auto/Tech"},
        {"symbol": "AMZN", "name": "Amazon.com, Inc.", "sector": "Consumer/Tech"},
        {"symbol": "META", "name": "Meta Platforms, Inc.", "sector": "Tech"},
        {"symbol": "GOOGL", "name": "Alphabet Inc.", "sector": "Tech"},
        # Finance
        {"symbol": "JPM", "name": "JPMorgan Chase & Co.", "sector": "Finance"},
        {"symbol": "GS", "name": "Goldman Sachs Group, Inc.", "sector": "Finance"},
        {"symbol": "BAC", "name": "Bank of America Corp.", "sector": "Finance"},
        # Industrial
        {"symbol": "BA", "name": "The Boeing Company", "sector": "Industrial"},
        {"symbol": "CAT", "name": "Caterpillar Inc.", "sector": "Industrial"},
    ],
    "etfs": [
        {"symbol": "SPY", "name": "SPDR S&P 500 ETF Trust"},
        {"symbol": "QQQ", "name": "Invesco QQQ Trust"},
        {"symbol": "DIA", "name": "SPDR Dow Jones Industrial Average ETF Trust"},
        {"symbol": "GLD", "name": "SPDR Gold Shares"},
        {"symbol": "SLV", "name": "iShares Silver Trust"},
        {"symbol": "ARKK", "name": "ARK Innovation ETF"},
        {"symbol": "VTI", "name": "Vanguard Total Stock Market ETF"},
    ],
    "bonds": [
        {"symbol": "US02Y", "name": "US 2-Year Treasury Yield"},
        {"symbol": "US05Y", "name": "US 5-Year Treasury Yield"},
        {"symbol": "US10Y", "name": "US 10-Year Treasury Yield"},
        {"symbol": "US30Y", "name": "US 30-Year Treasury Yield"},
        {"symbol": "DE10Y", "name": "Germany 10-Year Bond Yield"},
        {"symbol": "GB10Y", "name": "UK Gilt 10-Year Yield"},
        {"symbol": "IN10Y", "name": "India 10-Year Bond Yield"},
    ]
}

def get_all_symbols() -> List[str]:
    """Return a flat list of all symbols in the universe."""
    symbols = []
    for market in ASSET_UNIVERSE.values():
        for asset in market:
            symbols.append(asset["symbol"])
    return list(set(symbols))

def get_assets_by_market(market: str) -> List[Dict[str, Any]]:
    """Return all assets for a given market."""
    return ASSET_UNIVERSE.get(market, [])
