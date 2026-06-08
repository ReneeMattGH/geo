"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  Radio,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Wifi,
  Clock,
  Zap,
  Globe,
  Atom,
  Orbit,
} from "lucide-react"
import type { GTIData, VisualizationMode } from "@/lib/geopulse-data"

interface TopBarProps {
  gti: GTIData
  mode: VisualizationMode
  onModeChange: (mode: VisualizationMode) => void
}

function GTIScoreDisplay({ score, trend, delta }: { score: number; trend: string; delta: number }) {
  const getTrendIcon = () => {
    if (trend === "rising") return <TrendingUp className="h-3.5 w-3.5 text-[#ef4444]" />
    if (trend === "falling") return <TrendingDown className="h-3.5 w-3.5 text-[#22c55e]" />
    return <Minus className="h-3.5 w-3.5 text-[#f59e0b]" />
  }

  const getScoreColor = () => {
    if (score >= 80) return "text-[#ef4444]"
    if (score >= 60) return "text-[#f59e0b]"
    if (score >= 40) return "text-[#0ea5e9]"
    return "text-[#22c55e]"
  }

  const getSeverityLabel = () => {
    if (score >= 80) return "CRITICAL"
    if (score >= 60) return "ELEVATED"
    if (score >= 40) return "MODERATE"
    return "LOW"
  }

  const getSeverityColor = () => {
    if (score >= 80) return "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30"
    if (score >= 60) return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30"
    if (score >= 40) return "bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30"
    return "bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30"
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Shield className="h-5 w-5 text-[#00e5ff]" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#00e5ff] animate-pulse-glow" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Global Tension Index
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-mono font-bold tabular-nums ${getScoreColor()}`}>
              {score.toFixed(1)}
            </span>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-xs font-mono ${delta >= 0 ? "text-[#ef4444]" : "text-[#22c55e]"}`}>
                {delta >= 0 ? "+" : ""}{delta.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <span className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider ${getSeverityColor()}`}>
        {getSeverityLabel()}
      </span>
    </div>
  )
}

function LiveClock() {
  const [timeStr, setTimeStr] = useState("--:--:--")

  useEffect(() => {
    function update() {
      const now = new Date()
      const h = String(now.getUTCHours()).padStart(2, "0")
      const m = String(now.getUTCMinutes()).padStart(2, "0")
      const s = String(now.getUTCSeconds()).padStart(2, "0")
      setTimeStr(`${h}:${m}:${s}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Clock className="h-3 w-3" />
      <span className="text-[11px] font-mono tabular-nums">
        {timeStr} UTC
      </span>
    </div>
  )
}

export function TopBar({ gti, mode, onModeChange }: TopBarProps) {
  const modes: { id: VisualizationMode; label: string; icon: React.ReactNode }[] = [
    { id: "globe", label: "EARTH PULSE", icon: <Globe className="h-3.5 w-3.5" /> },
    { id: "quantum", label: "QUANTUM FIELD", icon: <Atom className="h-3.5 w-3.5" /> },
    { id: "attractor", label: "ATTRACTOR", icon: <Orbit className="h-3.5 w-3.5" /> },
  ]

  return (
    <header className="cyber-panel border-b border-[var(--panel-border)] px-4 py-2 flex items-center justify-between relative z-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,0.03) 2px,rgba(0,229,255,0.03) 4px)" }} />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center h-8 w-8 rounded" style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}>
            <Activity className="h-4 w-4 text-[#00e5ff]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.2em] text-foreground glow-text font-mono">
              GEOPULSE
            </span>
            <span className="text-[8px] font-mono tracking-[0.15em] text-muted-foreground uppercase">
              Tactical Intelligence
            </span>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <GTIScoreDisplay score={gti.score} trend={gti.trend} delta={gti.delta} />
      </div>

      <div className="flex items-center gap-1 bg-secondary/50 rounded-sm p-0.5 border border-border/50">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
              mode === m.id
                ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            {m.icon}
            <span className="hidden lg:inline">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[10px] font-mono text-[#22c55e] uppercase">Live</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio className="h-3 w-3 text-[#00e5ff] animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground">
              {gti.breakdown.length} FEEDS
            </span>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <LiveClock />

        <div className="flex items-center gap-1.5 rounded-sm px-2 py-1" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}>
          <Zap className="h-3 w-3 text-[#00e5ff]" />
          <span className="text-[10px] font-mono text-[#00e5ff] uppercase tracking-wider">
            AI Active
          </span>
        </div>
      </div>
    </header>
  )
}
