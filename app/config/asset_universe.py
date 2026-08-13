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
                    # Forex (approximate mid-2025 levels)
                    "EURUSD": 1.08, "GBPUSD": 1.27, "USDJPY": 155.0,
                    "USDCHF": 0.90, "USDCAD": 1.37, "AUDUSD": 0.65,
                    "NZDUSD": 0.60, "EURGBP": 0.85, "EURJPY": 168.0,
                    "EURAUD": 1.66, "EURCHF": 0.97, "EURCAD": 1.48,
                    "GBPJPY": 197.0, "GBPCHF": 1.14, "GBPAUD": 1.95,
                    "GBPCAD": 1.74, "AUDJPY": 101.0, "AUDNZD": 1.09,
                    "AUDCAD": 0.89, "NZDJPY": 92.0, "NZDCAD": 0.82,
                    "CADJPY": 113.0, "CHFJPY": 172.0, "EURNZD": 1.80,
                    "AUDCHF": 0.58, "NZDCHF": 0.53, "CADCHF": 0.65,
                    "EURSEK": 11.20, "EURNOK": 11.50, "USDSEK": 10.40,
                    "USDNOK": 10.70, "USDMXN": 17.20, "USDSGD": 1.34,
                    "USDHKD": 7.82, "USDCNH": 7.25,
                    # Crypto
                    "BTC": 65000, "ETH": 3500, "BNB": 600, "SOL": 150,
                    "XRP": 0.55, "ADA": 0.45, "DOGE": 0.12, "AVAX": 35,
                    "DOT": 7.0, "LTC": 85, "LINK": 15, "MATIC": 0.70,
                    # Commodities
                    "XAUUSD": 2350, "XAGUSD": 28.0, "PLATINUM": 980,
                    "PALLADIUM": 1000, "COPPER": 4.50, "WTI": 78,
                    "BRENT": 82, "NATGAS": 2.50, "CORN": 450,
                    "WHEAT": 600, "SOYBEANS": 1200, "COFFEE": 200,
                    # Indices
                    "SPX": 5200, "NDX": 18500, "DJI": 39800,
                    "DAX": 18400, "FTSE": 8200, "NKY": 38500,
                    "HSI": 18500, "NIFTY": 22000,
                    # Stocks
                    "AAPL": 175, "MSFT": 420, "NVDA": 900, "TSLA": 240,
                    "AMZN": 185, "META": 500, "GOOGL": 175, "JPM": 195,
                    # Bonds
                    "US10Y": 4.2, "US02Y": 4.6, "US30Y": 4.5,
                    "FEDFUNDS": 5.33, "SOFR": 5.31,
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
        {"symbol": "EURNZD", "name": "Euro / New Zealand Dollar", "type": "minor"},
        {"symbol": "AUDCHF", "name": "Australian Dollar / Swiss Franc", "type": "minor"},
        {"symbol": "NZDCHF", "name": "New Zealand Dollar / Swiss Franc", "type": "minor"},
        {"symbol": "CADCHF", "name": "Canadian Dollar / Swiss Franc", "type": "minor"},
        {"symbol": "EURSEK", "name": "Euro / Swedish Krona", "type": "cross"},
        {"symbol": "EURNOK", "name": "Euro / Norwegian Krone", "type": "cross"},
        {"symbol": "USDSEK", "name": "US Dollar / Swedish Krona", "type": "cross"},
        {"symbol": "USDNOK", "name": "US Dollar / Norwegian Krone", "type": "cross"},
        {"symbol": "USDMXN", "name": "US Dollar / Mexican Peso", "type": "cross"},
        {"symbol": "USDSGD", "name": "US Dollar / Singapore Dollar", "type": "cross"},
        {"symbol": "USDHKD", "name": "US Dollar / Hong Kong Dollar", "type": "cross"},
        {"symbol": "USDCNH", "name": "US Dollar / Offshore Chinese Yuan", "type": "cross"},
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
        {"symbol": "COCOA", "name": "Cocoa", "type": "agri"},
        {"symbol": "ORANGEJUICE", "name": "Orange Juice", "type": "agri"},
        {"symbol": "LEANHOGS", "name": "Lean Hogs", "type": "livestock"},
        {"symbol": "LIVECATTLE", "name": "Live Cattle", "type": "livestock"},
        {"symbol": "FEEDERCATTLE", "name": "Feeder Cattle", "type": "livestock"},
        {"symbol": "OATS", "name": "Oats", "type": "agri"},
        {"symbol": "ROUGH_RICE", "name": "Rough Rice", "type": "agri"},
        {"symbol": "SOYMEAL", "name": "Soybean Meal", "type": "agri"},
        {"symbol": "SOYOIL", "name": "Soybean Oil", "type": "agri"},
        {"symbol": "LUMBER", "name": "Lumber", "type": "industrial"},
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
        {"symbol": "ASX200", "name": "S&P/ASX 200", "region": "Asia Pacific"},
        {"symbol": "TSX", "name": "S&P/TSX Composite", "region": "North America"},
        {"symbol": "IBOV", "name": "Ibovespa", "region": "Latin America"},
        {"symbol": "MEXBOL", "name": "IPC Mexico", "region": "Latin America"},
        {"symbol": "KOSPI", "name": "KOSPI", "region": "Asia"},
        {"symbol": "TWSE", "name": "Taiwan Weighted Index", "region": "Asia"},
        {"symbol": "STI", "name": "Straits Times Index", "region": "Asia"},
        {"symbol": "JKSE", "name": "Jakarta Composite", "region": "Asia"},
        {"symbol": "KLSE", "name": "FTSE Bursa Malaysia KLCI", "region": "Asia"},
        {"symbol": "TA35", "name": "TA-125", "region": "Middle East"},
        {"symbol": "IBEX", "name": "IBEX 35", "region": "Europe"},
        {"symbol": "SMI", "name": "Swiss Market Index", "region": "Europe"},
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
        {"symbol": "UNI", "name": "Uniswap"},
        {"symbol": "ATOM", "name": "Cosmos"},
        {"symbol": "ETC", "name": "Ethereum Classic"},
        {"symbol": "XLM", "name": "Stellar"},
        {"symbol": "ALGO", "name": "Algorand"},
        {"symbol": "VET", "name": "VeChain"},
        {"symbol": "FIL", "name": "Filecoin"},
        {"symbol": "AAVE", "name": "Aave"},
        {"symbol": "TRX", "name": "TRON"},
        {"symbol": "NEAR", "name": "NEAR Protocol"},
        {"symbol": "APT", "name": "Aptos"},
        {"symbol": "MKR", "name": "Maker"},
        {"symbol": "ICP", "name": "Internet Computer"},
        {"symbol": "HBAR", "name": "Hedera"},
        {"symbol": "SAND", "name": "The Sandbox"},
        {"symbol": "MANA", "name": "Decentraland"},
        {"symbol": "THETA", "name": "Theta Network"},
        {"symbol": "EOS", "name": "EOS"},
        {"symbol": "FLOW", "name": "Flow"},
        {"symbol": "XTZ", "name": "Tezos"},
        {"symbol": "KCS", "name": "KuCoin Token"},
        {"symbol": "SNX", "name": "Synthetix"},
        {"symbol": "BAT", "name": "Basic Attention Token"},
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
        {"symbol": "BRK.B", "name": "Berkshire Hathaway Inc.", "sector": "Conglomerate"},
        {"symbol": "AVGO", "name": "Broadcom Inc.", "sector": "Tech"},
        {"symbol": "TSM", "name": "Taiwan Semiconductor Manufacturing", "sector": "Semiconductors"},
        {"symbol": "V", "name": "Visa Inc.", "sector": "Payments"},
        {"symbol": "WMT", "name": "Walmart Inc.", "sector": "Retail"},
        {"symbol": "UNH", "name": "UnitedHealth Group Inc.", "sector": "Healthcare"},
        {"symbol": "MA", "name": "Mastercard Incorporated", "sector": "Payments"},
        {"symbol": "XOM", "name": "Exxon Mobil Corporation", "sector": "Energy"},
        {"symbol": "HD", "name": "Home Depot, Inc.", "sector": "Retail"},
        {"symbol": "PG", "name": "Procter & Gamble Co.", "sector": "Consumer"},
        {"symbol": "JNJ", "name": "Johnson & Johnson", "sector": "Healthcare"},
        {"symbol": "COST", "name": "Costco Wholesale Corporation", "sector": "Retail"},
        {"symbol": "ABBV", "name": "AbbVie Inc.", "sector": "Healthcare"},
        {"symbol": "NFLX", "name": "Netflix, Inc.", "sector": "Media"},
        {"symbol": "KO", "name": "Coca-Cola Company", "sector": "Consumer"},
        {"symbol": "CRM", "name": "Salesforce, Inc.", "sector": "Software"},
        {"symbol": "PEP", "name": "PepsiCo, Inc.", "sector": "Consumer"},
        {"symbol": "TMO", "name": "Thermo Fisher Scientific Inc.", "sector": "Healthcare"},
        {"symbol": "ADBE", "name": "Adobe Inc.", "sector": "Software"},
        {"symbol": "WFC", "name": "Wells Fargo & Company", "sector": "Finance"},
        {"symbol": "CSCO", "name": "Cisco Systems, Inc.", "sector": "Tech"},
        {"symbol": "MRK", "name": "Merck & Co., Inc.", "sector": "Healthcare"},
        {"symbol": "TMUS", "name": "T-Mobile US, Inc.", "sector": "Telecom"},
        {"symbol": "AMD", "name": "Advanced Micro Devices, Inc.", "sector": "Semiconductors"},
        # Defense
        {"symbol": "LMT", "name": "Lockheed Martin Corporation", "sector": "Defense"},
        {"symbol": "RTX", "name": "RTX Corporation", "sector": "Defense"},
        {"symbol": "NOC", "name": "Northrop Grumman Corporation", "sector": "Defense"},
        {"symbol": "GD", "name": "General Dynamics Corporation", "sector": "Defense"},
        # Energy
        {"symbol": "CVX", "name": "Chevron Corporation", "sector": "Energy"},
        # Additional large-cap
        {"symbol": "ACN", "name": "Accenture plc", "sector": "Consulting"},
        {"symbol": "DIS", "name": "The Walt Disney Company", "sector": "Media"},
        {"symbol": "ABT", "name": "Abbott Laboratories", "sector": "Healthcare"},
        {"symbol": "GE", "name": "GE Aerospace", "sector": "Industrial"},
        {"symbol": "VZ", "name": "Verizon Communications Inc.", "sector": "Telecom"},
        {"symbol": "DHR", "name": "Danaher Corporation", "sector": "Healthcare"},
        {"symbol": "TXN", "name": "Texas Instruments Inc.", "sector": "Semiconductors"},
        {"symbol": "NEE", "name": "NextEra Energy, Inc.", "sector": "Utilities"},
        {"symbol": "PM", "name": "Philip Morris International", "sector": "Consumer"},
        {"symbol": "IBM", "name": "International Business Machines", "sector": "Tech"},
        {"symbol": "AMGN", "name": "Amgen Inc.", "sector": "Biotech"},
        {"symbol": "UBER", "name": "Uber Technologies, Inc.", "sector": "Tech"},
        {"symbol": "BMY", "name": "Bristol-Myers Squibb Company", "sector": "Healthcare"},
        {"symbol": "PFE", "name": "Pfizer Inc.", "sector": "Healthcare"},
        {"symbol": "CMCSA", "name": "Comcast Corporation", "sector": "Media"},
        {"symbol": "COP", "name": "ConocoPhillips", "sector": "Energy"},
    ],
    "etfs": [
        {"symbol": "SPY", "name": "SPDR S&P 500 ETF Trust"},
        {"symbol": "QQQ", "name": "Invesco QQQ Trust"},
        {"symbol": "DIA", "name": "SPDR Dow Jones Industrial Average ETF Trust"},
        {"symbol": "GLD", "name": "SPDR Gold Shares"},
        {"symbol": "SLV", "name": "iShares Silver Trust"},
        {"symbol": "ARKK", "name": "ARK Innovation ETF"},
        {"symbol": "VTI", "name": "Vanguard Total Stock Market ETF"},
        {"symbol": "IWM", "name": "iShares Russell 2000 ETF"},
        {"symbol": "VOO", "name": "Vanguard S&P 500 ETF"},
        {"symbol": "VEA", "name": "Vanguard FTSE Developed Markets ETF"},
        {"symbol": "VWO", "name": "Vanguard FTSE Emerging Markets ETF"},
        {"symbol": "EEM", "name": "iShares MSCI Emerging Markets ETF"},
        {"symbol": "TLT", "name": "iShares 20+ Year Treasury Bond ETF"},
        {"symbol": "HYG", "name": "iShares iBoxx $ High Yield Corporate Bond ETF"},
        {"symbol": "LQD", "name": "iShares iBoxx $ Investment Grade Corporate Bond ETF"},
        {"symbol": "XLE", "name": "Energy Select Sector SPDR Fund"},
        {"symbol": "XLF", "name": "Financial Select Sector SPDR Fund"},
        {"symbol": "XLK", "name": "Technology Select Sector SPDR Fund"},
        {"symbol": "XLV", "name": "Health Care Select Sector SPDR Fund"},
        {"symbol": "XLI", "name": "Industrial Select Sector SPDR Fund"},
        {"symbol": "XLP", "name": "Consumer Staples Select Sector SPDR Fund"},
        {"symbol": "XLU", "name": "Utilities Select Sector SPDR Fund"},
        {"symbol": "XLB", "name": "Materials Select Sector SPDR Fund"},
        {"symbol": "XLC", "name": "Communication Services Select Sector SPDR Fund"},
        {"symbol": "XBI", "name": "SPDR S&P Biotech ETF"},
        {"symbol": "SMH", "name": "VanEck Semiconductor ETF"},
        {"symbol": "SOXX", "name": "iShares Semiconductor ETF"},
        {"symbol": "VNQ", "name": "Vanguard Real Estate ETF"},
        {"symbol": "IYR", "name": "iShares U.S. Real Estate ETF"},
        {"symbol": "EFA", "name": "iShares MSCI EAFE ETF"},
        {"symbol": "FXI", "name": "iShares China Large-Cap ETF"},
        {"symbol": "KWEB", "name": "KraneShares CSI China Internet ETF"},
        {"symbol": "EWJ", "name": "iShares MSCI Japan ETF"},
        {"symbol": "EWG", "name": "iShares MSCI Germany ETF"},
        {"symbol": "ITA", "name": "iShares U.S. Aerospace & Defense ETF"},
        {"symbol": "USO", "name": "United States Oil Fund LP"},
        {"symbol": "UNG", "name": "United States Natural Gas Fund LP"},
    ],
    "bonds": [
        {"symbol": "US01M", "name": "US 1-Month Treasury Yield"},
        {"symbol": "US03M", "name": "US 3-Month Treasury Yield"},
        {"symbol": "US06M", "name": "US 6-Month Treasury Yield"},
        {"symbol": "US01Y", "name": "US 1-Year Treasury Yield"},
        {"symbol": "US02Y", "name": "US 2-Year Treasury Yield"},
        {"symbol": "US03Y", "name": "US 3-Year Treasury Yield"},
        {"symbol": "US05Y", "name": "US 5-Year Treasury Yield"},
        {"symbol": "US07Y", "name": "US 7-Year Treasury Yield"},
        {"symbol": "US10Y", "name": "US 10-Year Treasury Yield"},
        {"symbol": "US20Y", "name": "US 20-Year Treasury Yield"},
        {"symbol": "US30Y", "name": "US 30-Year Treasury Yield"},
        {"symbol": "FEDFUNDS", "name": "Federal Funds Rate"},
        {"symbol": "US10Y2Y", "name": "10Y-2Y Treasury Spread"},
        {"symbol": "US10Y3M", "name": "10Y-3M Treasury Spread"},
        {"symbol": "TIPS05Y", "name": "US 5-Year TIPS Yield"},
        {"symbol": "TIPS10Y", "name": "US 10-Year TIPS Yield"},
        {"symbol": "TIPS20Y", "name": "US 20-Year TIPS Yield"},
        {"symbol": "TIPS30Y", "name": "US 30-Year TIPS Yield"},
        {"symbol": "AAA", "name": "Moody's AAA Corporate Bond Yield"},
        {"symbol": "BAA", "name": "Moody's BAA Corporate Bond Yield"},
        {"symbol": "SOFR", "name": "Secured Overnight Financing Rate"},
        {"symbol": "PRIME", "name": "US Bank Prime Loan Rate"},
        {"symbol": "MORTGAGE30Y", "name": "US 30-Year Fixed Mortgage Rate"},
        {"symbol": "MORTGAGE15Y", "name": "US 15-Year Fixed Mortgage Rate"},
        {"symbol": "CORP", "name": "ICE BofA US Corporate Effective Yield"},
        {"symbol": "HY", "name": "ICE BofA US High Yield Effective Yield"},
        {"symbol": "CORP_AAA", "name": "ICE BofA AAA US Corporate Effective Yield"},
        {"symbol": "CORP_AA", "name": "ICE BofA AA US Corporate Effective Yield"},
        {"symbol": "CORP_A", "name": "ICE BofA A US Corporate Effective Yield"},
        {"symbol": "CORP_BBB", "name": "ICE BofA BBB US Corporate Effective Yield"},
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
