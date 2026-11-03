/**
 * Non-secret display preferences.
 *
 * Only settings that change how the app behaves are cached here, so the first
 * paint uses the right landing page and clock. API keys never touch this file
 * or any browser storage — they live encrypted on the backend.
 */

export type LandingPage = 'landing' | 'globe' | 'map' | 'charts' | 'portfolio'
export type AssetClassPreference =
    | 'all' | 'stocks' | 'crypto' | 'forex' | 'commodities' | 'bonds' | 'etfs' | 'indices'
export type TimeFormat = '12h' | '24h'
export type DataSourcePreference = 'auto' | 'geotrade' | 'user'

export interface Preferences {
    profileName: string | null
    defaultLandingPage: LandingPage
    defaultAssetClass: AssetClassPreference
    refreshIntervalSeconds: number
    timeZone: string
    timeFormat: TimeFormat
    dataSourcePreference: DataSourcePreference
}

const CACHE_KEY = 'geotrade_preferences'

export const DEFAULT_PREFERENCES: Preferences = {
    profileName: null,
    defaultLandingPage: 'globe',
    defaultAssetClass: 'all',
    refreshIntervalSeconds: 15,
    timeZone: 'UTC',
    timeFormat: '24h',
    dataSourcePreference: 'auto',
}

export const LANDING_OPTIONS: { value: LandingPage; label: string }[] = [
    { value: 'globe', label: 'Earth Pulse (globe)' },
    { value: 'map', label: 'Geo Map' },
    { value: 'charts', label: 'AI Signals' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'landing', label: 'Website / About' },
]

export const ASSET_CLASS_OPTIONS: { value: AssetClassPreference; label: string }[] = [
    { value: 'all', label: 'All assets' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'forex', label: 'Forex' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'bonds', label: 'Bonds' },
    { value: 'etfs', label: 'ETFs' },
    { value: 'indices', label: 'Indices' },
]

export const REFRESH_OPTIONS = [5, 10, 15, 30, 60, 120, 300]

export function readCachedPreferences(): Preferences {
    if (typeof localStorage === 'undefined') return DEFAULT_PREFERENCES
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return DEFAULT_PREFERENCES
        const parsed = JSON.parse(raw) as Partial<Preferences>
        return {
            ...DEFAULT_PREFERENCES,
            ...parsed,
            refreshIntervalSeconds: clampRefresh(parsed.refreshIntervalSeconds),
        }
    } catch {
        return DEFAULT_PREFERENCES
    }
}

export function writeCachedPreferences(prefs: Preferences): void {
    if (typeof localStorage === 'undefined') return
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(prefs))
    } catch {
        // storage unavailable (private mode) — settings still live on the server
    }
}

export function clampRefresh(seconds: number | undefined): number {
    if (typeof seconds !== 'number' || !Number.isFinite(seconds)) return 15
    return Math.min(300, Math.max(5, Math.round(seconds)))
}

export function formatClock(
    date: Date,
    timeZone: string,
    timeFormat: TimeFormat,
): string {
    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: timeFormat === '12h',
        }).format(date)
    } catch {
        return date.toISOString().substring(11, 19)
    }
}

const FALLBACK_ZONES = [
    'UTC', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Zurich',
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Sao_Paulo', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore',
    'Asia/Hong_Kong', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney',
]

export function timeZoneOptions(current: string): string[] {
    let zones: string[] = FALLBACK_ZONES
    try {
        const supported = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] })
            .supportedValuesOf?.('timeZone')
        if (supported?.length) zones = supported
    } catch {
        // older runtime — keep the curated list
    }
    return zones.includes(current) ? zones : [current, ...zones]
}

export function zoneLabel(zone: string): string {
    return zone.replace(/_/g, ' ')
}
