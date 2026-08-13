import { useRef, useState, useEffect, useCallback } from 'react'
import { Panel } from '@/shared/ui/Panel'
import { useNewsTicker } from '@/shared/api/hooks'

interface Headline {
    id: string
    headline: string
    symbol: string
    category: string
    asset_class: string
    change_pct: number
    abs_change: number
    price: number
    urgency: string
    sentiment: string
    source: string
    ts: string
}

const URGENCY_STYLE: Record<string, { badge: string; text: string }> = {
    ALERT:    { badge: 'bg-red-500/25 text-red-400 border-red-500/50',       text: 'text-red-200' },
    BREAKING: { badge: 'bg-amber-500/25 text-amber-400 border-amber-500/50', text: 'text-amber-100' },
    UPDATE:   { badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',    text: 'text-gray-100' },
    MARKET:   { badge: 'bg-white/5 text-gray-400 border-white/10',           text: 'text-gray-300' },
}

function TickerItem({ item }: { item: Headline }) {
    const style = URGENCY_STYLE[item.urgency] ?? URGENCY_STYLE.MARKET
    const isPositive = item.sentiment === 'bullish' || item.sentiment === 'hawkish'
    const changeColor = isPositive ? 'text-emerald-400' : 'text-red-400'
    const changeBg = isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'

    return (
        <span className="inline-flex items-center gap-2.5 whitespace-nowrap mx-6">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${style.badge}`}>
                {item.urgency}
            </span>
            <span className={`text-[13px] font-mono tracking-wide leading-none ${style.text}`}>
                {item.headline}
            </span>
            <span className={`text-[12px] font-mono font-bold px-1.5 py-0.5 rounded ${changeColor} ${changeBg}`}>
                {item.change_pct >= 0 ? '+' : ''}{item.change_pct.toFixed(2)}%
            </span>
            <span className="text-[10px] font-mono text-gray-500">
                {item.category}
            </span>
            <span className="text-gray-700/40 text-xs">•</span>
        </span>
    )
}

const PX_PER_SECOND = 50

export function BottomTimeline({ gti }: { gti: any }) {
    const { data: tickerData } = useNewsTicker()
    const headlines: Headline[] = tickerData?.headlines ?? []
    const [isPaused, setIsPaused] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)
    const [duration, setDuration] = useState(120)

    const measure = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const halfWidth = el.scrollWidth / 2
        setDuration(Math.max(40, halfWidth / PX_PER_SECOND))
    }, [])

    useEffect(() => {
        measure()
    }, [headlines, measure])

    useEffect(() => {
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [measure])

    const gtiValue = gti?.gti_value ?? 0
    const gtiColor = gtiValue >= 68 ? 'text-red-400' : gtiValue >= 45 ? 'text-amber-400' : 'text-emerald-400'
    const gtiBg = gtiValue >= 68 ? 'bg-red-500' : gtiValue >= 45 ? 'bg-amber-500' : 'bg-emerald-500'

    const alertCount = headlines.filter(h => h.urgency === 'ALERT' || h.urgency === 'BREAKING').length

    return (
        <Panel className="border-x-0 !rounded-none bg-[#080c16] border-t border-white/10 overflow-hidden">
            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
            `}</style>

            <div className="flex items-center h-[52px]">
                {/* ── LIVE ── */}
                <div className="flex items-center gap-2.5 px-4 border-r border-white/10 h-full shrink-0">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-50" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        LIVE
                    </span>
                </div>

                {/* ── GTI ── */}
                <div className="flex items-center gap-2.5 px-4 border-r border-white/10 h-full shrink-0">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">GTI</span>
                    <span className={`text-sm font-mono font-bold ${gtiColor}`}>
                        {gtiValue.toFixed(1)}
                    </span>
                    <div className="h-1.5 w-10 rounded-full bg-white/10 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${gtiBg}`}
                            style={{ width: `${Math.min(gtiValue, 100)}%` }}
                        />
                    </div>
                </div>

                {/* ── Alert count ── */}
                {alertCount > 0 && (
                    <div className="flex items-center gap-2 px-4 border-r border-white/10 h-full shrink-0">
                        <span className="text-sm font-mono font-bold text-red-400">{alertCount}</span>
                        <span className="text-[9px] font-mono text-red-400/70 uppercase tracking-wide">Alerts</span>
                    </div>
                )}

                {/* ── Marquee ── */}
                <div
                    className="flex-1 overflow-hidden cursor-default select-none"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
                    }}
                >
                    {headlines.length > 0 ? (
                        <div
                            ref={trackRef}
                            className="inline-flex items-center whitespace-nowrap will-change-transform"
                            style={{
                                animation: `marquee ${duration}s linear infinite`,
                                animationPlayState: isPaused ? 'paused' : 'running',
                            }}
                        >
                            {headlines.map((item, i) => (
                                <TickerItem key={`a-${i}`} item={item} />
                            ))}
                            {headlines.map((item, i) => (
                                <TickerItem key={`b-${i}`} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-xs font-mono text-gray-600 animate-pulse">
                                Connecting to market feeds...
                            </span>
                        </div>
                    )}
                </div>

                {/* ── Feed count ── */}
                <div className="flex items-center gap-2 px-4 border-l border-white/10 h-full shrink-0">
                    <span className="text-sm font-mono font-bold text-white">{headlines.length}</span>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wide">Feeds</span>
                </div>
            </div>
        </Panel>
    )
}
