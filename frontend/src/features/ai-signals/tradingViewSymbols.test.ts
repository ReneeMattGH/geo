import { describe, expect, test } from 'vitest'
import { resolveTradingViewInstrument } from './tradingViewSymbols'

function resolve(symbol: string, assetClass: string) {
    return resolveTradingViewInstrument({ symbol, assetClass })
}

describe('stock mapping', () => {
    test('maps NASDAQ and NYSE listings to exchange-qualified symbols', () => {
        expect(resolve('AAPL', 'stock')).toMatchObject({
            symbol: 'NASDAQ:AAPL',
            exchange: 'NASDAQ',
            country: 'United States',
            currency: 'USD',
            reason: null,
        })
        expect(resolve('JPM', 'stock')).toMatchObject({ symbol: 'NYSE:JPM', exchange: 'NYSE' })
        expect(resolve('WMT', 'stock')).toMatchObject({ symbol: 'NASDAQ:WMT' })
        expect(resolve('BRK.B', 'stock')).toMatchObject({ symbol: 'NYSE:BRK.B' })
    })

    test('is case-insensitive and trims input', () => {
        expect(resolve(' aapl ', 'STOCK').symbol).toBe('NASDAQ:AAPL')
    })

    test('returns unavailable for unverified listings', () => {
        const resolution = resolve('ZZZZ', 'stock')
        expect(resolution.symbol).toBeNull()
        expect(resolution.reason).toBeTruthy()
    })
})

describe('ETF mapping', () => {
    test('maps funds to their correct venue', () => {
        expect(resolve('SPY', 'etf')).toMatchObject({ symbol: 'AMEX:SPY', exchange: 'AMEX' })
        expect(resolve('QQQ', 'etf')).toMatchObject({ symbol: 'NASDAQ:QQQ' })
        expect(resolve('GLD', 'etf')).toMatchObject({ symbol: 'AMEX:GLD' })
    })

    test('does not fall back to the stock map', () => {
        expect(resolve('SPY', 'stock').symbol).toBeNull()
    })
})

describe('crypto mapping', () => {
    test('maps verified tokens to Binance USDT pairs', () => {
        expect(resolve('BTC', 'crypto')).toMatchObject({
            symbol: 'BINANCE:BTCUSDT',
            exchange: 'BINANCE',
            country: 'Global',
            currency: 'USDT',
        })
        expect(resolve('ETH', 'crypto').symbol).toBe('BINANCE:ETHUSDT')
    })

    test('uses the token-specific venue for KCS', () => {
        expect(resolve('KCS', 'crypto')).toMatchObject({ symbol: 'KUCOIN:KCSUSDT', exchange: 'KUCOIN' })
    })

    test('maps tokens to their verified non-Binance venues', () => {
        expect(resolve('CRO', 'crypto')).toMatchObject({ symbol: 'CRYPTOCOM:CROUSD', exchange: 'CRYPTOCOM', currency: 'USD' })
        expect(resolve('XMR', 'crypto')).toMatchObject({ symbol: 'KRAKEN:XMRUSD', exchange: 'KRAKEN' })
        expect(resolve('OKB', 'crypto')).toMatchObject({ symbol: 'OKX:OKBUSDT', exchange: 'OKX' })
        expect(resolve('LEO', 'crypto')).toMatchObject({ symbol: 'BITFINEX:LEOUSD', exchange: 'BITFINEX' })
        expect(resolve('CC', 'crypto')).toMatchObject({ symbol: 'KRAKEN:CCUSD' })
        expect(resolve('USDT', 'crypto')).toMatchObject({ symbol: 'KRAKEN:USDTUSD' })
    })

    test('covers assets beyond the static universe', () => {
        expect(resolve('BCH', 'crypto').symbol).toBe('BINANCE:BCHUSDT')
        expect(resolve('SUI', 'crypto').symbol).toBe('BINANCE:SUIUSDT')
        expect(resolve('PEPE', 'crypto').symbol).toBe('BINANCE:PEPEUSDT')
        expect(resolve('GRAM', 'crypto').symbol).toBe('BINANCE:GRAMUSDT')
    })

    test('returns unavailable for delisted pairs and tokenized funds', () => {
        for (const symbol of ['MATIC', 'MKR', 'EOS', 'USDY', 'BUIDL', 'USYC', 'EURSAFO', 'FIGR_HELOC']) {
            const resolution = resolve(symbol, 'crypto')
            expect(resolution.symbol).toBeNull()
            expect(resolution.reason).toBeTruthy()
        }
    })

    test('does not guess a pair for unverified tokens', () => {
        expect(resolve('NOT_A_TOKEN', 'crypto').symbol).toBeNull()
    })
})

describe('forex mapping', () => {
    test('maps pairs to the FX venue with the quote currency', () => {
        expect(resolve('EURUSD', 'forex')).toMatchObject({
            symbol: 'FX:EURUSD',
            exchange: 'FX',
            currency: 'USD',
        })
        expect(resolve('USDJPY', 'forex')).toMatchObject({ symbol: 'FX:USDJPY', currency: 'JPY' })
    })

    test('uses FX_IDC for the Singapore pair TradingView moved', () => {
        expect(resolve('USDSGD', 'forex')).toMatchObject({ symbol: 'FX_IDC:USDSGD', exchange: 'FX_IDC' })
    })
})

describe('commodity mapping', () => {
    test('maps spot metals and futures contracts', () => {
        expect(resolve('XAUUSD', 'commodity')).toMatchObject({
            symbol: 'OANDA:XAUUSD',
            exchange: 'OANDA',
            currency: 'USD',
        })
        expect(resolve('WTI', 'commodity')).toMatchObject({ symbol: 'NYMEX:CL1!', exchange: 'NYMEX' })
        expect(resolve('CORN', 'commodity')).toMatchObject({ symbol: 'CBOT:ZC1!' })
        expect(resolve('COFFEE', 'commodity')).toMatchObject({ symbol: 'ICEUS:KC1!' })
    })

    test('returns unavailable for contracts without a TradingView listing', () => {
        expect(resolve('LUMBER', 'commodity').symbol).toBeNull()
        expect(resolve('NOT_A_CONTRACT', 'commodity').symbol).toBeNull()
    })
})

describe('index mapping', () => {
    test('maps indices to canonical symbols across regions', () => {
        expect(resolve('SPX', 'equity_index')).toMatchObject({
            symbol: 'SP:SPX',
            country: 'United States',
            currency: 'USD',
        })
        expect(resolve('DAX', 'equity_index')).toMatchObject({
            symbol: 'XETR:DAX',
            country: 'Germany',
            currency: 'EUR',
        })
        expect(resolve('NKY', 'equity_index')).toMatchObject({ symbol: 'TVC:NI225', currency: 'JPY' })
        expect(resolve('ASX200', 'equity_index')).toMatchObject({ symbol: 'SP:XJO', currency: 'AUD' })
        expect(resolve('MEXBOL', 'equity_index')).toMatchObject({ symbol: 'BMV:ME', currency: 'MXN' })
    })

    test('returns unavailable when TradingView has no index chart', () => {
        expect(resolve('JKSE', 'equity_index').symbol).toBeNull()
    })
})

describe('bond mapping', () => {
    test('maps treasury yields and FRED series', () => {
        expect(resolve('US10Y', 'bond')).toMatchObject({ symbol: 'TVC:US10Y', exchange: 'TVC' })
        expect(resolve('US01M', 'bond')).toMatchObject({ symbol: 'TVC:US01MY' })
        expect(resolve('FEDFUNDS', 'bond')).toMatchObject({ symbol: 'FRED:FEDFUNDS', exchange: 'FRED' })
        expect(resolve('HY', 'bond')).toMatchObject({ symbol: 'FRED:BAMLH0A0HYM2EY' })
    })

    test('returns unavailable for unknown yield series', () => {
        expect(resolve('NOT_A_SERIES', 'bond').symbol).toBeNull()
    })
})

describe('cross-class safety', () => {
    test('never reuses another asset class mapping', () => {
        expect(resolve('AAPL', 'commodity').symbol).toBeNull()
        expect(resolve('XAUUSD', 'stock').symbol).toBeNull()
        expect(resolve('SPX', 'crypto').symbol).toBeNull()
        expect(resolve('AAPL', 'crypto').symbol).toBeNull()
        expect(resolve('EURUSD', 'bond').symbol).toBeNull()
    })

    test('returns unavailable for unsupported asset classes', () => {
        expect(resolve('AAPL', 'real_estate')).toMatchObject({
            symbol: null,
            reason: 'TradingView mapping is not available for this asset class.',
        })
    })
})
