/**
 * Maps GeoTrade instrument identifiers to exchange-qualified TradingView
 * symbols. Every entry here was checked against TradingView's public symbol
 * directory; anything that could not be verified resolves to `null` so the UI
 * shows "chart unavailable" instead of a different instrument's chart.
 */

export type TradingViewInterval = '1' | '5' | '15' | '30' | '60' | '240' | 'D' | 'W' | 'M'

export interface TradingViewResolution {
    requestedSymbol: string
    symbol: string | null
    exchange: string | null
    country: string | null
    currency: string | null
    reason: string | null
}

interface Instrument {
    symbol: string
    exchange: string
    country: string
    currency: string
}

const US_STOCK_EXCHANGE: Record<string, 'NASDAQ' | 'NYSE'> = {
    AAPL: 'NASDAQ', MSFT: 'NASDAQ', NVDA: 'NASDAQ', TSLA: 'NASDAQ',
    AMZN: 'NASDAQ', META: 'NASDAQ', GOOGL: 'NASDAQ', AVGO: 'NASDAQ',
    COST: 'NASDAQ', NFLX: 'NASDAQ', ADBE: 'NASDAQ', CSCO: 'NASDAQ',
    TMUS: 'NASDAQ', AMD: 'NASDAQ', TXN: 'NASDAQ', AMGN: 'NASDAQ',
    PEP: 'NASDAQ', CMCSA: 'NASDAQ',
    JPM: 'NYSE', GS: 'NYSE', BAC: 'NYSE', BA: 'NYSE', CAT: 'NYSE',
    'BRK.B': 'NYSE', TSM: 'NYSE', V: 'NYSE', WMT: 'NASDAQ', UNH: 'NYSE',
    MA: 'NYSE', XOM: 'NYSE', HD: 'NYSE', PG: 'NYSE', JNJ: 'NYSE',
    ABBV: 'NYSE', KO: 'NYSE', CRM: 'NYSE', TMO: 'NYSE', WFC: 'NYSE',
    MRK: 'NYSE', LMT: 'NYSE', RTX: 'NYSE', NOC: 'NYSE', GD: 'NYSE',
    CVX: 'NYSE', ACN: 'NYSE', DIS: 'NYSE', ABT: 'NYSE', GE: 'NYSE',
    VZ: 'NYSE', DHR: 'NYSE', NEE: 'NYSE', PM: 'NYSE', IBM: 'NYSE',
    UBER: 'NYSE', BMY: 'NYSE', PFE: 'NYSE', COP: 'NYSE',
}

const US_ETF_EXCHANGE: Record<string, 'NASDAQ' | 'AMEX'> = {
    SPY: 'AMEX', QQQ: 'NASDAQ', DIA: 'AMEX', GLD: 'AMEX', SLV: 'AMEX',
    ARKK: 'AMEX', VTI: 'AMEX', IWM: 'AMEX', VOO: 'AMEX', VEA: 'AMEX',
    VWO: 'AMEX', EEM: 'AMEX', TLT: 'NASDAQ', HYG: 'AMEX', LQD: 'AMEX',
    XLE: 'AMEX', XLF: 'AMEX', XLK: 'AMEX', XLV: 'AMEX', XLI: 'AMEX',
    XLP: 'AMEX', XLU: 'AMEX', XLB: 'AMEX', XLC: 'AMEX', XBI: 'AMEX',
    SMH: 'NASDAQ', SOXX: 'NASDAQ', VNQ: 'AMEX', IYR: 'AMEX', EFA: 'AMEX',
    FXI: 'AMEX', KWEB: 'AMEX', EWJ: 'AMEX', EWG: 'AMEX', ITA: 'AMEX',
    USO: 'AMEX', UNG: 'AMEX',
}

const COMMODITY_INSTRUMENTS: Record<string, Instrument> = {
    XAUUSD: { symbol: 'OANDA:XAUUSD', exchange: 'OANDA', country: 'Global', currency: 'USD' },
    XAGUSD: { symbol: 'OANDA:XAGUSD', exchange: 'OANDA', country: 'Global', currency: 'USD' },
    PLATINUM: { symbol: 'NYMEX:PL1!', exchange: 'NYMEX', country: 'United States', currency: 'USD' },
    PALLADIUM: { symbol: 'NYMEX:PA1!', exchange: 'NYMEX', country: 'United States', currency: 'USD' },
    COPPER: { symbol: 'COMEX:HG1!', exchange: 'COMEX', country: 'United States', currency: 'USD' },
    WTI: { symbol: 'NYMEX:CL1!', exchange: 'NYMEX', country: 'United States', currency: 'USD' },
    BRENT: { symbol: 'NYMEX:BZ1!', exchange: 'NYMEX', country: 'United States', currency: 'USD' },
    NATGAS: { symbol: 'NYMEX:NG1!', exchange: 'NYMEX', country: 'United States', currency: 'USD' },
    HEATINGOIL: { symbol: 'NYMEX:HO1!', exchange: 'NYMEX', country: 'United States', currency: 'USD' },
    CORN: { symbol: 'CBOT:ZC1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
    WHEAT: { symbol: 'CBOT:ZW1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
    SOYBEANS: { symbol: 'CBOT:ZS1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
    COFFEE: { symbol: 'ICEUS:KC1!', exchange: 'ICEUS', country: 'United States', currency: 'USD' },
    SUGAR: { symbol: 'ICEUS:SB1!', exchange: 'ICEUS', country: 'United States', currency: 'USD' },
    COTTON: { symbol: 'ICEUS:CT1!', exchange: 'ICEUS', country: 'United States', currency: 'USD' },
    COCOA: { symbol: 'ICEUS:CC1!', exchange: 'ICEUS', country: 'United States', currency: 'USD' },
    ORANGEJUICE: { symbol: 'ICEUS:OJ1!', exchange: 'ICEUS', country: 'United States', currency: 'USD' },
    LEANHOGS: { symbol: 'CME:HE1!', exchange: 'CME', country: 'United States', currency: 'USD' },
    LIVECATTLE: { symbol: 'CME:LE1!', exchange: 'CME', country: 'United States', currency: 'USD' },
    FEEDERCATTLE: { symbol: 'CME:GF1!', exchange: 'CME', country: 'United States', currency: 'USD' },
    OATS: { symbol: 'CBOT:ZO1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
    ROUGH_RICE: { symbol: 'CBOT:ZR1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
    SOYMEAL: { symbol: 'CBOT:ZM1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
    SOYOIL: { symbol: 'CBOT:ZL1!', exchange: 'CBOT', country: 'United States', currency: 'USD' },
}

const INDEX_INSTRUMENTS: Record<string, Instrument> = {
    SPX: { symbol: 'SP:SPX', exchange: 'SP', country: 'United States', currency: 'USD' },
    NDX: { symbol: 'NASDAQ:NDX', exchange: 'NASDAQ', country: 'United States', currency: 'USD' },
    DJI: { symbol: 'TVC:DJI', exchange: 'TVC', country: 'United States', currency: 'USD' },
    RUT: { symbol: 'TVC:RUT', exchange: 'TVC', country: 'United States', currency: 'USD' },
    DAX: { symbol: 'XETR:DAX', exchange: 'XETR', country: 'Germany', currency: 'EUR' },
    FTSE: { symbol: 'TVC:UKX', exchange: 'TVC', country: 'United Kingdom', currency: 'GBP' },
    CAC: { symbol: 'EURONEXT:PX1', exchange: 'EURONEXT', country: 'France', currency: 'EUR' },
    STOXX50: { symbol: 'TVC:SX5E', exchange: 'TVC', country: 'Eurozone', currency: 'EUR' },
    NKY: { symbol: 'TVC:NI225', exchange: 'TVC', country: 'Japan', currency: 'JPY' },
    HSI: { symbol: 'TVC:HSI', exchange: 'TVC', country: 'Hong Kong', currency: 'HKD' },
    SSEC: { symbol: 'SSE:000001', exchange: 'SSE', country: 'China', currency: 'CNY' },
    SENSEX: { symbol: 'BSE:SENSEX', exchange: 'BSE', country: 'India', currency: 'INR' },
    NIFTY: { symbol: 'NSE:NIFTY', exchange: 'NSE', country: 'India', currency: 'INR' },
    ASX200: { symbol: 'SP:XJO', exchange: 'SP', country: 'Australia', currency: 'AUD' },
    TSX: { symbol: 'TSX:TSX', exchange: 'TSX', country: 'Canada', currency: 'CAD' },
    IBOV: { symbol: 'BMFBOVESPA:IBOV', exchange: 'BMFBOVESPA', country: 'Brazil', currency: 'BRL' },
    MEXBOL: { symbol: 'BMV:ME', exchange: 'BMV', country: 'Mexico', currency: 'MXN' },
    KOSPI: { symbol: 'TVC:KOSPI', exchange: 'TVC', country: 'South Korea', currency: 'KRW' },
    TWSE: { symbol: 'TWSE:IX0001', exchange: 'TWSE', country: 'Taiwan', currency: 'TWD' },
    STI: { symbol: 'TVC:STI', exchange: 'TVC', country: 'Singapore', currency: 'SGD' },
    KLSE: { symbol: 'FTSEMYX:FBMKLCI', exchange: 'FTSEMYX', country: 'Malaysia', currency: 'MYR' },
    TA35: { symbol: 'TASE:TA35', exchange: 'TASE', country: 'Israel', currency: 'ILS' },
    IBEX: { symbol: 'BME:IBC', exchange: 'BME', country: 'Spain', currency: 'EUR' },
    SMI: { symbol: 'SIX:SMI', exchange: 'SIX', country: 'Switzerland', currency: 'CHF' },
}

const BOND_INSTRUMENTS: Record<string, Instrument> = {
    US01M: { symbol: 'TVC:US01MY', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US03M: { symbol: 'TVC:US03MY', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US06M: { symbol: 'TVC:US06MY', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US01Y: { symbol: 'TVC:US01Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US02Y: { symbol: 'TVC:US02Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US03Y: { symbol: 'TVC:US03Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US05Y: { symbol: 'TVC:US05Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US07Y: { symbol: 'TVC:US07Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US10Y: { symbol: 'TVC:US10Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US20Y: { symbol: 'TVC:US20Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    US30Y: { symbol: 'TVC:US30Y', exchange: 'TVC', country: 'United States', currency: 'USD' },
    FEDFUNDS: { symbol: 'FRED:FEDFUNDS', exchange: 'FRED', country: 'United States', currency: 'USD' },
    US10Y2Y: { symbol: 'FRED:T10Y2Y', exchange: 'FRED', country: 'United States', currency: 'USD' },
    US10Y3M: { symbol: 'FRED:T10Y3M', exchange: 'FRED', country: 'United States', currency: 'USD' },
    TIPS05Y: { symbol: 'FRED:DFII5', exchange: 'FRED', country: 'United States', currency: 'USD' },
    TIPS10Y: { symbol: 'FRED:DFII10', exchange: 'FRED', country: 'United States', currency: 'USD' },
    TIPS20Y: { symbol: 'FRED:DFII20', exchange: 'FRED', country: 'United States', currency: 'USD' },
    TIPS30Y: { symbol: 'FRED:DFII30', exchange: 'FRED', country: 'United States', currency: 'USD' },
    AAA: { symbol: 'FRED:DAAA', exchange: 'FRED', country: 'United States', currency: 'USD' },
    BAA: { symbol: 'FRED:DBAA', exchange: 'FRED', country: 'United States', currency: 'USD' },
    SOFR: { symbol: 'FRED:SOFR', exchange: 'FRED', country: 'United States', currency: 'USD' },
    PRIME: { symbol: 'FRED:DPRIME', exchange: 'FRED', country: 'United States', currency: 'USD' },
    MORTGAGE30Y: { symbol: 'FRED:MORTGAGE30US', exchange: 'FRED', country: 'United States', currency: 'USD' },
    MORTGAGE15Y: { symbol: 'FRED:MORTGAGE15US', exchange: 'FRED', country: 'United States', currency: 'USD' },
    CORP: { symbol: 'FRED:BAMLC0A0CMEY', exchange: 'FRED', country: 'United States', currency: 'USD' },
    HY: { symbol: 'FRED:BAMLH0A0HYM2EY', exchange: 'FRED', country: 'United States', currency: 'USD' },
    CORP_AAA: { symbol: 'FRED:BAMLC0A1CAAAEY', exchange: 'FRED', country: 'United States', currency: 'USD' },
    CORP_AA: { symbol: 'FRED:BAMLC0A2CAAEY', exchange: 'FRED', country: 'United States', currency: 'USD' },
    CORP_A: { symbol: 'FRED:BAMLC0A3CAEY', exchange: 'FRED', country: 'United States', currency: 'USD' },
    CORP_BBB: { symbol: 'FRED:BAMLC0A4CBBBEY', exchange: 'FRED', country: 'United States', currency: 'USD' },
}

const CRYPTO_WITHOUT_TV_LISTING = new Set([
    'MATIC', 'MKR', 'EOS', 'USDY', 'BUIDL', 'USYC', 'EURSAFO', 'FIGR_HELOC',
])
const COMMODITY_WITHOUT_TV_LISTING = new Set(['LUMBER'])
const INDEX_WITHOUT_TV_LISTING = new Set(['JKSE'])

function binancePair(token: string): Instrument {
    return {
        symbol: `BINANCE:${token}USDT`,
        exchange: 'BINANCE',
        country: 'Global',
        currency: 'USDT',
    }
}

function venuePair(symbol: string, exchange: string, currency: string): Instrument {
    return { symbol, exchange, country: 'Global', currency }
}

// Every token below was checked against TradingView's symbol directory. The
// list mirrors the live signals feed; anything missing resolves to unavailable
// rather than being guessed into a different token's pair.
const BINANCE_USDT_TOKENS = [
    'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'LTC',
    'LINK', 'UNI', 'ATOM', 'ETC', 'XLM', 'ALGO', 'VET', 'FIL', 'AAVE', 'TRX',
    'NEAR', 'APT', 'ICP', 'HBAR', 'SAND', 'MANA', 'THETA', 'FLOW', 'XTZ',
    'SNX', 'BAT', 'QNT', 'ZEC', 'BCH', 'SUI', 'SHIB', 'TAO', 'ENA', 'PEPE',
    'ONDO', 'HYPE', 'GRAM', 'USDC', 'USDE', 'XAUT', 'USD1', 'RLUSD',
    'USDS',
]

const CRYPTO_INSTRUMENTS: Record<string, Instrument> = {
    ...Object.fromEntries(BINANCE_USDT_TOKENS.map(token => [token, binancePair(token)])),
    KCS: venuePair('KUCOIN:KCSUSDT', 'KUCOIN', 'USDT'),
    OKB: venuePair('OKX:OKBUSDT', 'OKX', 'USDT'),
    WBT: venuePair('WHITEBIT:WBTUSDT', 'WHITEBIT', 'USDT'),
    CRO: venuePair('CRYPTOCOM:CROUSD', 'CRYPTOCOM', 'USD'),
    LEO: venuePair('BITFINEX:LEOUSD', 'BITFINEX', 'USD'),
    M: venuePair('GATEIO:MUSDT', 'GATEIO', 'USDT'),
    CC: venuePair('KRAKEN:CCUSD', 'KRAKEN', 'USD'),
    PYUSD: venuePair('KRAKEN:PYUSDUSD', 'KRAKEN', 'USD'),
    DAI: venuePair('KRAKEN:DAIUSD', 'KRAKEN', 'USD'),
    XMR: venuePair('KRAKEN:XMRUSD', 'KRAKEN', 'USD'),
    USDT: venuePair('KRAKEN:USDTUSD', 'KRAKEN', 'USD'),
    USDG: venuePair('KRAKEN:USDGUSD', 'KRAKEN', 'USD'),
    RAIN: venuePair('GATEIO:RAINUSDT', 'GATEIO', 'USDT'),
}

const FOREX_PAIRS = new Set([
    'EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'NZDUSD',
    'EURGBP', 'EURJPY', 'EURAUD', 'EURCHF', 'EURCAD', 'GBPJPY', 'GBPCHF',
    'GBPAUD', 'GBPCAD', 'AUDJPY', 'AUDNZD', 'AUDCAD', 'NZDJPY', 'NZDCAD',
    'CADJPY', 'CHFJPY', 'EURNZD', 'AUDCHF', 'NZDCHF', 'CADCHF', 'EURSEK',
    'EURNOK', 'USDSEK', 'USDNOK', 'USDMXN', 'USDSGD', 'USDHKD', 'USDCNH',
])

function unavailable(
    requestedSymbol: string,
    reason: string,
): TradingViewResolution {
    return {
        requestedSymbol,
        symbol: null,
        exchange: null,
        country: null,
        currency: null,
        reason,
    }
}

function resolved(
    requestedSymbol: string,
    instrument: Instrument,
): TradingViewResolution {
    return {
        requestedSymbol,
        symbol: instrument.symbol,
        exchange: instrument.exchange,
        country: instrument.country,
        currency: instrument.currency,
        reason: null,
    }
}

function normalizeClass(assetClass: string): string {
    return assetClass.trim().toLowerCase()
}

export function resolveTradingViewInstrument(input: {
    symbol: string
    assetClass: string
    region?: string | null
}): TradingViewResolution {
    const symbol = input.symbol.trim().toUpperCase()
    const assetClass = normalizeClass(input.assetClass)

    if (assetClass === 'stock' || assetClass === 'stocks' || assetClass === 'equity') {
        const exchange = US_STOCK_EXCHANGE[symbol]
        if (!exchange) {
            return unavailable(
                symbol,
                'This listing has no verified TradingView exchange mapping.',
            )
        }
        return resolved(symbol, {
            symbol: `${exchange}:${symbol}`,
            exchange,
            country: 'United States',
            currency: 'USD',
        })
    }

    if (assetClass === 'etf' || assetClass === 'etfs') {
        const exchange = US_ETF_EXCHANGE[symbol]
        if (!exchange) {
            return unavailable(
                symbol,
                'This fund has no verified TradingView exchange mapping.',
            )
        }
        return resolved(symbol, {
            symbol: `${exchange}:${symbol}`,
            exchange,
            country: 'United States',
            currency: 'USD',
        })
    }

    if (assetClass === 'crypto' || assetClass === 'cryptocurrency') {
        if (CRYPTO_WITHOUT_TV_LISTING.has(symbol)) {
            return unavailable(
                symbol,
                'TradingView does not publish a supported chart for this token.',
            )
        }
        const instrument = CRYPTO_INSTRUMENTS[symbol]
        return instrument
            ? resolved(symbol, instrument)
            : unavailable(symbol, 'This token has no verified TradingView trading pair.')
    }

    if (assetClass === 'forex' || assetClass === 'fx') {
        if (!FOREX_PAIRS.has(symbol)) {
            return unavailable(
                symbol,
                'This currency pair has no verified TradingView listing.',
            )
        }
        const exchange = symbol === 'USDSGD' ? 'FX_IDC' : 'FX'
        return resolved(symbol, {
            symbol: `${exchange}:${symbol}`,
            exchange,
            country: 'Global',
            currency: symbol.slice(-3),
        })
    }

    if (assetClass === 'commodity' || assetClass === 'commodities') {
        if (COMMODITY_WITHOUT_TV_LISTING.has(symbol)) {
            return unavailable(
                symbol,
                'TradingView does not list a supported contract for this instrument.',
            )
        }
        const instrument = COMMODITY_INSTRUMENTS[symbol]
        return instrument
            ? resolved(symbol, instrument)
            : unavailable(symbol, 'This contract has no verified TradingView symbol.')
    }

    if (assetClass === 'equity_index' || assetClass === 'index' || assetClass === 'indices') {
        if (INDEX_WITHOUT_TV_LISTING.has(symbol)) {
            return unavailable(
                symbol,
                'TradingView does not publish a chart for this index.',
            )
        }
        const instrument = INDEX_INSTRUMENTS[symbol]
        return instrument
            ? resolved(symbol, instrument)
            : unavailable(symbol, 'This index has no verified TradingView symbol.')
    }

    if (assetClass === 'bond' || assetClass === 'bonds' || assetClass === 'fixed_income') {
        const instrument = BOND_INSTRUMENTS[symbol]
        return instrument
            ? resolved(symbol, instrument)
            : unavailable(symbol, 'This yield series has no verified TradingView symbol.')
    }

    return unavailable(symbol, 'TradingView mapping is not available for this asset class.')
}
