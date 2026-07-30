"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  AlertTriangle,
  AlertOctagon,
  Info,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"
import type { TimelineEvent } from "@/lib/geopulse-data"
import type { GTIData } from "@/lib/geopulse-data"

interface BottomTimelineProps {
  events: TimelineEvent[]
  gtiHistory: { time: string; value: number }[]
  gti: GTIData
  onEventSelect: (event: TimelineEvent) => void
}

function SeverityIcon({ severity }: { severity: TimelineEvent["severity"] }) {
  switch (severity) {
    case "critical":
      return <AlertOctagon className="h-3 w-3 text-[#ef4444]" />
    case "high":
      return <AlertTriangle className="h-3 w-3 text-[#f59e0b]" />
    case "medium":
      return <Info className="h-3 w-3 text-[#0ea5e9]" />
    case "low":
      return <Info className="h-3 w-3 text-muted-foreground" />
  }
}

function getSeverityColor(severity: TimelineEvent["severity"]): string {
  switch (severity) {
    case "critical": return "#ef4444"
    case "high": return "#f59e0b"
    case "medium": return "#0ea5e9"
    case "low": return "#64748b"
  }
}

function MiniSparkline({ data, width = 200, height = 32 }: {
  data: { time: string; value: number }[]
  width?: number
  height?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)

    if (data.length < 2) return

    const values = data.map(d => d.value)
    const min = Math.min(...values) - 2
    const max = Math.max(...values) + 2
    const range = max - min

    // Draw area
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(0, 229, 255, 0.1)")
    gradient.addColorStop(1, "rgba(0, 229, 255, 0)")

    ctx.beginPath()
    ctx.moveTo(0, height)

    data.forEach((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d.value - min) / range) * height
      if (i === 0) ctx.lineTo(x, y)
      else ctx.lineTo(x, y)
    })

    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    data.forEach((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d.value - min) / range) * height
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })

    ctx.strokeStyle = "#00e5ff"
    ctx.lineWidth = 1.5
    ctx.stroke()

    // End dot
    const lastVal = values[values.length - 1]
    const lastX = width
    const lastY = height - ((lastVal - min) / range) * height
    ctx.beginPath()
    ctx.arc(lastX - 1, lastY, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = "#00e5ff"
    ctx.fill()

    // Glow on end
    const glow = ctx.createRadialGradient(lastX - 1, lastY, 0, lastX - 1, lastY, 8)
    glow.addColorStop(0, "rgba(0, 229, 255, 0.3)")
    glow.addColorStop(1, "rgba(0, 229, 255, 0)")
    ctx.fillStyle = glow
    ctx.fillRect(lastX - 9, lastY - 8, 16, 16)
  }, [data, width, height])

  return <canvas ref={canvasRef} />
}

function EventMarker({ event, onClick, isSelected }: {
  event: TimelineEvent
  onClick: () => void
  isSelected: boolean
}) {
  const color = getSeverityColor(event.severity)
  const time = new Date(event.timestamp)
  const hours = String(time.getUTCHours()).padStart(2, "0")
  const minutes = String(time.getUTCMinutes()).padStart(2, "0")
  const timeStr = `${hours}:${minutes}`

  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 w-44 p-2 rounded-sm border transition-all duration-200 group ${
        isSelected
          ? "border-[var(--color)] bg-[var(--color-bg)]"
          : "border-border/30 bg-secondary/10 hover:border-border/60 hover:bg-secondary/20"
      }`}
      style={{
        "--color": color,
        "--color-bg": `${color}10`,
      } as React.CSSProperties}
    >
      {/* Severity indicator line */}
      <div
        className="absolute top-0 left-0 w-0.5 h-full rounded-l-sm"
        style={{ background: color, opacity: isSelected ? 1 : 0.5 }}
      />

      <div className="flex items-start gap-1.5 pl-1.5">
        <SeverityIcon severity={event.severity} />
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-mono text-foreground/90 line-clamp-1 text-left">{event.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] font-mono text-muted-foreground tabular-nums">{timeStr}</span>
            <span
              className="text-[7px] font-mono uppercase tracking-wider px-1 py-px rounded-sm border"
              style={{
                color,
                borderColor: `${color}30`,
                backgroundColor: `${color}10`,
              }}
            >
              {event.severity}
            </span>
          </div>
        </div>
        <span
          className="text-[10px] font-mono font-bold tabular-nums"
          style={{ color }}
        >
          {event.impact}
        </span>
      </div>
    </button>
  )
}

export function BottomTimeline({ events, gtiHistory, gti, onEventSelect }: BottomTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = direction === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }, [])

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEventId(event.id)
    onEventSelect(event)
  }

  return (
    <div className="cyber-panel border-t border-[var(--panel-border)] relative">
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent" />

      <div className="flex items-stretch">
        {/* GTI Sparkline section */}
        <div className="w-56 flex-shrink-0 border-r border-[var(--panel-border)] px-3 py-2 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">GTI 48h Trend</span>
            <span className="text-[11px] font-mono font-bold text-[#00e5ff] tabular-nums">{gti.score.toFixed(1)}</span>
          </div>
          <MiniSparkline data={gtiHistory} width={200} height={28} />
          <div className="flex items-center justify-between mt-1 text-[7px] font-mono text-muted-foreground/50">
            <span>48h ago</span>
            <span>Now</span>
          </div>
        </div>

        {/* Timeline controls */}
        <div className="flex-shrink-0 border-r border-[var(--panel-border)] flex flex-col items-center justify-center px-2 gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-sm bg-secondary/50 border border-border/50 text-muted-foreground hover:text-[#00e5ff] transition-colors"
            aria-label={isPlaying ? "Pause replay" : "Play replay"}
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <div className="flex gap-0.5">
            <button
              onClick={() => scroll("left")}
              className="p-1 rounded-sm bg-secondary/30 border border-border/30 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1 rounded-sm bg-secondary/30 border border-border/30 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Scrollable events */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--panel-bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--panel-bg)] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event) => (
              <EventMarker
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
                isSelected={selectedEventId === event.id}
              />
            ))}
          </div>
        </div>

        {/* Event count */}
        <div className="flex-shrink-0 border-l border-[var(--panel-border)] px-3 flex flex-col items-center justify-center">
          <span className="text-lg font-mono font-bold text-foreground tabular-nums">{events.length}</span>
          <span className="text-[7px] font-mono text-muted-foreground uppercase tracking-wider">Events</span>
          <span className="text-[7px] font-mono text-[#ef4444] uppercase tracking-wider mt-0.5">
            {events.filter(e => e.severity === "critical").length} Critical
          </span>
        </div>
      </div>
    </div>
  )
}
