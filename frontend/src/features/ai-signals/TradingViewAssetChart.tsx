import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AlertTriangle, BarChart3, Loader2, RefreshCw } from 'lucide-react'
import {
    resolveTradingViewInstrument,
    type TradingViewInterval,
} from './tradingViewSymbols'

interface TradingViewWidgetInstance {
    remove?: () => void
    onChartReady?: (callback: () => void) => void
}

interface TradingViewLibrary {
    widget: new (config: Record<string, unknown>) => TradingViewWidgetInstance
}

declare global {
    interface Window {
        TradingView?: TradingViewLibrary
    }
}

const TIMEFRAMES: ReadonlyArray<{ id: TradingViewInterval; label: string; title: string }> = [
    { id: '1', label: '1m', title: '1 minute' },
    { id: '5', label: '5m', title: '5 minutes' },
    { id: '15', label: '15m', title: '15 minutes' },
    { id: '30', label: '30m', title: '30 minutes' },
    { id: '60', label: '1H', title: '1 hour' },
    { id: '240', label: '4H', title: '4 hours' },
    { id: 'D', label: '1D', title: '1 day' },
    { id: 'W', label: '1W', title: '1 week' },
    { id: 'M', label: '1M', title: '1 month' },
]

const SCRIPT_ID = 'geotrade-tradingview-tv-js'
const SCRIPT_SRC = 'https://s3.tradingview.com/tv.js'
const READY_TIMEOUT_MS = 25000

let scriptPromise: Promise<void> | null = null

function loadTradingViewLibrary(): Promise<void> {
    if (window.TradingView?.widget) return Promise.resolve()
    if (scriptPromise) return scriptPromise

    scriptPromise = new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
        const script = existing ?? document.createElement('script')

        const handleLoad = () => {
            cleanup()
            resolve()
        }
        const handleError = () => {
            cleanup()
            script.remove()
            scriptPromise = null
            reject(new Error('The TradingView chart library could not be loaded.'))
        }
        const cleanup = () => {
            script.removeEventListener('load', handleLoad)
            script.removeEventListener('error', handleError)
        }

        script.addEventListener('load', handleLoad)
        script.addEventListener('error', handleError)

        if (!existing) {
            script.id = SCRIPT_ID
            script.src = SCRIPT_SRC
            script.async = true
            document.head.appendChild(script)
        }
    })

    return scriptPromise
}

interface TradingViewAssetChartProps {
    symbol: string
    label: string
    assetClass: string
    region?: string | null
    initialInterval?: TradingViewInterval
}

export function TradingViewAssetChart({
    symbol,
    label,
    assetClass,
    region,
    initialInterval = 'D',
}: TradingViewAssetChartProps) {
    const rawId = useId()
    const containerId = `geotrade-tv-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`
    const hostRef = useRef<HTMLDivElement | null>(null)
    const [interval, setInterval] = useState<TradingViewInterval>(initialInterval)
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [reloadToken, setReloadToken] = useState(0)

    const resolution = useMemo(
        () => resolveTradingViewInstrument({ symbol, assetClass, region }),
        [symbol, assetClass, region],
    )
    const resolvedSymbol = resolution.symbol

    useEffect(() => {
        if (!resolvedSymbol) return
        const host = hostRef.current
        if (!host) return

        let disposed = false
        let instance: TradingViewWidgetInstance | null = null
        let iframeProbe = 0

        const revealChart = () => {
            if (disposed) return
            window.clearTimeout(readyTimer)
            setStatus('ready')
        }

        const watchForIframe = () => {
            if (!host.querySelector('iframe')) return
            window.clearInterval(iframeProbe)
            // The widget's ready callback is not reliable across tv.js builds;
            // the iframe is present once the chart is mounted, so reveal then.
            window.setTimeout(revealChart, 1200)
        }

        setStatus('loading')
        setErrorMessage(null)

        const readyTimer = window.setTimeout(() => {
            if (disposed || host.querySelector('iframe')) return
            setStatus('error')
            setErrorMessage(
                'The chart did not finish loading. A browser extension or network policy may be blocking TradingView.',
            )
        }, READY_TIMEOUT_MS)

        loadTradingViewLibrary()
            .then(() => {
                if (disposed || !hostRef.current) return
                const library = window.TradingView
                if (!library?.widget) {
                    throw new Error('The TradingView chart library is unavailable.')
                }

                host.replaceChildren()
                instance = new library.widget({
                    container_id: containerId,
                    autosize: true,
                    symbol: resolvedSymbol,
                    interval,
                    timezone: 'Etc/UTC',
                    theme: 'dark',
                    style: '1',
                    locale: 'en',
                    toolbar_bg: '#07091a',
                    enable_publishing: false,
                    allow_symbol_change: false,
                    withdateranges: true,
                    hide_side_toolbar: false,
                    hide_top_toolbar: false,
                    details: true,
                    hotlist: false,
                    calendar: false,
                    save_image: true,
                    volumePaneSize: 'medium',
                    studies: ['RSI@tv-basicstudies', 'MASimple@tv-basicstudies'],
                    overrides: {
                        'paneProperties.background': '#03060f',
                        'paneProperties.backgroundType': 'solid',
                        'paneProperties.vertGridProperties.color': 'rgba(148, 163, 184, 0.08)',
                        'paneProperties.horzGridProperties.color': 'rgba(148, 163, 184, 0.08)',
                        'scalesProperties.textColor': '#94a3b8',
                        'mainSeriesProperties.candleStyle.upColor': '#22c55e',
                        'mainSeriesProperties.candleStyle.downColor': '#ef4444',
                        'mainSeriesProperties.candleStyle.borderUpColor': '#22c55e',
                        'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
                        'mainSeriesProperties.candleStyle.wickUpColor': '#22c55e',
                        'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
                    },
                })
                instance.onChartReady?.(() => {
                    if (disposed) return
                    window.clearTimeout(readyTimer)
                    setStatus('ready')
                })
                iframeProbe = window.setInterval(watchForIframe, 250)
            })
            .catch((error: unknown) => {
                if (disposed) return
                window.clearTimeout(readyTimer)
                setStatus('error')
                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : 'The TradingView chart could not be loaded.',
                )
            })

        return () => {
            disposed = true
            window.clearTimeout(readyTimer)
            window.clearInterval(iframeProbe)
            try {
                instance?.remove?.()
            } catch {
                // Widget teardown is best-effort; clearing the host removes the iframe anyway.
            }
            host.replaceChildren()
        }
    }, [containerId, interval, reloadToken, resolvedSymbol])

    return (
        <section
            className="bg-white/5 border border-white/10 rounded-xl p-6"
            aria-label={`TradingView chart for ${label}`}
        >
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#a855f7]" />
                        TRADINGVIEW CHART
                    </h3>
                    <p className="text-white/60 font-mono text-xs mt-1">
                        {label} · {symbol}
                    </p>
                    {resolvedSymbol && (
                        <p className="text-white/40 font-mono text-[11px] mt-1">
                            {resolvedSymbol} · {resolution.exchange} · {resolution.country} · {resolution.currency}
                        </p>
                    )}
                </div>

                {resolvedSymbol && (
                    <div
                        className="flex flex-wrap gap-1.5"
                        role="group"
                        aria-label="Chart timeframe"
                    >
                        {TIMEFRAMES.map(frame => {
                            const active = interval === frame.id
                            return (
                                <button
                                    key={frame.id}
                                    type="button"
                                    onClick={() => setInterval(frame.id)}
                                    aria-pressed={active}
                                    title={frame.title}
                                    className={`px-2.5 py-1 rounded-md border font-mono text-[11px] transition-all ${
                                        active
                                            ? 'bg-[#a855f7]/20 border-[#a855f7]/50 text-[#e9d5ff]'
                                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                                    }`}
                                >
                                    {frame.label}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {!resolvedSymbol ? (
                <div
                    role="status"
                    className="mt-5 rounded-lg border border-dashed border-[#a855f7]/25 bg-[#03060f]/60 px-6 py-12 text-center"
                >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10">
                        <AlertTriangle className="h-6 w-6 text-[#a855f7]" />
                    </div>
                    <p className="font-mono text-sm font-semibold text-white">
                        Chart unavailable for this instrument
                    </p>
                    <p className="mx-auto mt-2 max-w-md font-mono text-xs leading-relaxed text-white/50">
                        {resolution.reason}
                    </p>
                    <p className="mx-auto mt-2 max-w-md font-mono text-[11px] leading-relaxed text-white/30">
                        No substitute instrument is shown, so the chart always matches the asset above.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/60">
                            {resolution.requestedSymbol}
                        </span>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase text-white/40">
                            {assetClass}
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative mt-4 overflow-hidden rounded-lg border border-white/10 bg-[#03060f]">
                        <div
                            id={containerId}
                            ref={hostRef}
                            className="h-[420px] w-full sm:h-[500px] lg:h-[560px]"
                        />
                        {status !== 'ready' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#03060f]/92 px-6 text-center">
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="h-7 w-7 animate-spin text-[#a855f7]" />
                                        <p className="font-mono text-xs text-white/60">
                                            Loading {resolvedSymbol} chart…
                                        </p>
                                    </>
                                ) : (
                                    <div role="alert" className="max-w-md">
                                        <AlertTriangle className="mx-auto mb-3 h-7 w-7 text-[#f59e0b]" />
                                        <p className="font-mono text-sm font-semibold text-white">
                                            Chart could not be loaded
                                        </p>
                                        <p className="mt-2 font-mono text-xs leading-relaxed text-white/50">
                                            {errorMessage}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setReloadToken(token => token + 1)}
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#a855f7]/40 bg-[#a855f7]/15 px-3 py-1.5 font-mono text-xs text-[#e9d5ff] transition-colors hover:bg-[#a855f7]/25"
                                        >
                                            <RefreshCw className="h-3.5 w-3.5" />
                                            Retry chart
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/35">
                        Charts are rendered by TradingView. Data may be real-time or delayed depending on the
                        exchange, instrument and your TradingView plan; trading sessions follow the exchange.
                        Use the chart toolbar for indicators, drawing tools and fullscreen.
                    </p>
                </>
            )}
        </section>
    )
}
