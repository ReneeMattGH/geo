/**
 * Formatting helpers for unified market data.
 *
 * The backend returns every asset class in one shape (`price` + `change`), but
 * the units differ: equities/ETFs/crypto/commodities are prices in USD, forex
 * pairs are exchange rates needing 4–5 decimals, bonds are yields in percent and
 * indices are point levels. `change` is ALWAYS a percentage already — never
 * multiply it by 100.
 */

export type AssetClass =
    | 'stocks' | 'crypto' | 'forex' | 'commodities' | 'bonds' | 'etfs' | 'indices'

/** Asset classes quoted in USD, so they get a `$` prefix. */
const USD_QUOTED = new Set<string>(['stocks', 'crypto', 'commodities', 'etfs'])

/** Decimal places that keep small prices (e.g. sub-cent crypto) readable. */
function priceDecimals(price: number): number {
    const abs = Math.abs(price)
    if (abs === 0) return 2
    if (abs >= 1000) return 2
    if (abs >= 1) return 2
    if (abs >= 0.01) return 4
    if (abs >= 0.0001) return 6
    return 8
}

/** Format a price for display, respecting the units of its asset class. */
export function formatPrice(price: number | undefined | null, assetClass: string): string {
    if (price === undefined || price === null || !Number.isFinite(price)) return '—'

    if (assetClass === 'bonds') {
        // Treasury yields and spreads are already expressed in percent.
        return `${price.toFixed(2)}%`
    }

    if (assetClass === 'forex') {
        // JPY crosses trade near 100+, everything else near 1 — scale decimals.
        const decimals = Math.abs(price) >= 20 ? 3 : 5
        return price.toFixed(decimals)
    }

    if (assetClass === 'indices') {
        // Index levels are points, not dollars.
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    const decimals = priceDecimals(price)
    const formatted = price.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
    return USD_QUOTED.has(assetClass) ? `$${formatted}` : formatted
}

/**
 * Format a percentage change. `change` arrives as a percentage (2.5 === +2.5%),
 * so it is rendered as-is.
 */
export function formatChange(change: number | undefined | null): string {
    if (change === undefined || change === null || !Number.isFinite(change)) return '—'
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
}

/** Compact volume/notional display (1.2B, 340.5M, 12.3K). */
export function formatVolume(volume: number | undefined | null): string | null {
    if (!volume || !Number.isFinite(volume) || volume <= 0) return null
    if (volume >= 1e12) return `${(volume / 1e12).toFixed(2)}T`
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`
    return volume.toFixed(0)
}

/** Human label for the upstream that priced a row (`yahoo:cached` → `yahoo`). */
export function sourceLabel(source: string | undefined): string {
    if (!source) return 'unknown'
    return source.split(':')[0]
}

/** True when a row carries a usable live price. */
export function isPriced(row: { price?: number; status?: string }): boolean {
    return typeof row.price === 'number' && row.price > 0 && row.status !== 'unavailable'
}

/** Readable label for data freshness. */
export function dataStatusLabel(dataStatus: string | undefined): string {
    switch (dataStatus) {
        case 'live': return 'LIVE'
        case 'delayed': return 'DELAYED'
        case 'stale': return 'STALE'
        case 'unavailable': return 'UNAVAILABLE'
        default: return dataStatus?.toUpperCase() ?? 'LIVE'
    }
}

/** CSS color class for data freshness. */
export function dataStatusColor(dataStatus: string | undefined): string {
    switch (dataStatus) {
        case 'live': return 'text-green-400'
        case 'delayed': return 'text-amber-400'
        case 'stale': return 'text-orange-400'
        case 'unavailable': return 'text-red-400'
        default: return 'text-green-400'
    }
}
