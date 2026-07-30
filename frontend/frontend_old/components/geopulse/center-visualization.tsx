"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { MapPin, Maximize2, Minimize2 } from "lucide-react"
import type { GlobePoint, GlobeArc, VisualizationMode } from "@/lib/geopulse-data"

interface CenterVisualizationProps {
  mode: VisualizationMode
  points: GlobePoint[]
  arcs: GlobeArc[]
  gtiScore: number
  onPointHover: (point: GlobePoint | null) => void
  onPointClick: (point: GlobePoint) => void
}

// ─── Particle System for Quantum/Attractor modes ──────────────────

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  label: string
  clusterId: number
  stress: number
  baseX: number
  baseY: number
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rotation: number,
  points: GlobePoint[],
  arcs: GlobeArc[],
  gtiScore: number,
  hoveredPoint: GlobePoint | null,
  mousePos: { x: number; y: number } | null,
) {
  ctx.clearRect(0, 0, w, h)

  const cx = w / 2
  const cy = h / 2
  const radius = Math.min(w, h) * 0.35

  // Background grid
  ctx.strokeStyle = "rgba(0, 229, 255, 0.02)"
  ctx.lineWidth = 0.5
  for (let i = 0; i < w; i += 40) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, h)
    ctx.stroke()
  }
  for (let j = 0; j < h; j += 40) {
    ctx.beginPath()
    ctx.moveTo(0, j)
    ctx.lineTo(w, j)
    ctx.stroke()
  }

  // Globe glow
  const glowGradient = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.4)
  glowGradient.addColorStop(0, `rgba(0, 229, 255, ${0.03 + gtiScore * 0.0002})`)
  glowGradient.addColorStop(1, "rgba(0, 229, 255, 0)")
  ctx.fillStyle = glowGradient
  ctx.fillRect(0, 0, w, h)

  // Globe sphere
  const sphereGradient = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius)
  sphereGradient.addColorStop(0, "rgba(30, 41, 59, 0.9)")
  sphereGradient.addColorStop(0.7, "rgba(15, 23, 42, 0.95)")
  sphereGradient.addColorStop(1, "rgba(0, 229, 255, 0.1)")
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fillStyle = sphereGradient
  ctx.fill()

  // Globe outline
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 + Math.sin(Date.now() / 2000) * 0.05})`
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Latitude lines
  for (let lat = -60; lat <= 60; lat += 30) {
    const latRad = (lat * Math.PI) / 180
    const r = radius * Math.cos(latRad)
    const yPos = cy + radius * Math.sin(latRad) * 0.8

    ctx.beginPath()
    ctx.ellipse(cx, yPos, r, r * 0.15, 0, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(0, 229, 255, 0.05)"
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Longitude lines
  for (let lon = 0; lon < 180; lon += 30) {
    const lonRad = ((lon + rotation) * Math.PI) / 180
    ctx.beginPath()
    for (let lat = -90; lat <= 90; lat += 5) {
      const latRad = (lat * Math.PI) / 180
      const x = cx + radius * Math.cos(latRad) * Math.sin(lonRad) * 0.9
      const y = cy - radius * Math.sin(latRad) * 0.8
      if (lat === -90) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = "rgba(0, 229, 255, 0.04)"
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  // Arcs (trade routes / connections)
  arcs.forEach((arc) => {
    const startPos = latLngToScreen(arc.startLat, arc.startLng, cx, cy, radius, rotation)
    const endPos = latLngToScreen(arc.endLat, arc.endLng, cx, cy, radius, rotation)

    if (!startPos.visible || !endPos.visible) return

    const midX = (startPos.x + endPos.x) / 2
    const midY = (startPos.y + endPos.y) / 2 - 40 * arc.intensity

    ctx.beginPath()
    ctx.moveTo(startPos.x, startPos.y)
    ctx.quadraticCurveTo(midX, midY, endPos.x, endPos.y)

    const arcAlpha = 0.2 + arc.intensity * 0.4 + Math.sin(Date.now() / 1000 + arc.intensity * 5) * 0.1
    ctx.strokeStyle = arc.color.replace(")", `, ${arcAlpha})`).replace("rgb", "rgba").replace("#", "")

    // Convert hex to rgba for arc
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    ctx.strokeStyle = hexToRgba(arc.color, arcAlpha)
    ctx.lineWidth = 1 + arc.intensity
    ctx.stroke()

    // Animated dot on arc
    const t = (Date.now() / (3000 / arc.intensity)) % 1
    const dotX = (1 - t) * (1 - t) * startPos.x + 2 * (1 - t) * t * midX + t * t * endPos.x
    const dotY = (1 - t) * (1 - t) * startPos.y + 2 * (1 - t) * t * midY + t * t * endPos.y

    ctx.beginPath()
    ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
    ctx.fillStyle = hexToRgba(arc.color, 0.9)
    ctx.fill()

    // Dot glow
    const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8)
    dotGlow.addColorStop(0, hexToRgba(arc.color, 0.3))
    dotGlow.addColorStop(1, hexToRgba(arc.color, 0))
    ctx.fillStyle = dotGlow
    ctx.fillRect(dotX - 8, dotY - 8, 16, 16)
  })

  // Points (hotspots)
  points.forEach((point) => {
    const pos = latLngToScreen(point.lat, point.lng, cx, cy, radius, rotation)
    if (!pos.visible) return

    const isHovered = hoveredPoint?.label === point.label
    const pulseScale = 1 + Math.sin(Date.now() / 500 + point.tensionScore) * 0.3
    const pointSize = (3 + point.size * 4) * (isHovered ? 1.5 : 1) * pulseScale

    // Outer glow
    const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pointSize * 3)
    const hexToRgba2 = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    glow.addColorStop(0, hexToRgba2(point.color, 0.3))
    glow.addColorStop(1, hexToRgba2(point.color, 0))
    ctx.fillStyle = glow
    ctx.fillRect(pos.x - pointSize * 3, pos.y - pointSize * 3, pointSize * 6, pointSize * 6)

    // Point
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, pointSize, 0, Math.PI * 2)
    ctx.fillStyle = hexToRgba2(point.color, 0.8)
    ctx.fill()

    // Ring
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, pointSize * 2, 0, Math.PI * 2)
    ctx.strokeStyle = hexToRgba2(point.color, 0.2 * pulseScale)
    ctx.lineWidth = 0.5
    ctx.stroke()

    // Label
    if (isHovered || point.tensionScore > 75) {
      ctx.font = "9px 'Geist Mono', monospace"
      ctx.fillStyle = hexToRgba2(point.color, isHovered ? 1 : 0.7)
      ctx.textAlign = "left"
      ctx.fillText(point.label, pos.x + pointSize + 4, pos.y - 4)
      ctx.font = "8px 'Geist Mono', monospace"
      ctx.fillStyle = hexToRgba2(point.color, isHovered ? 0.8 : 0.5)
      ctx.fillText(`GTI: ${point.tensionScore}`, pos.x + pointSize + 4, pos.y + 6)
    }
  })

  // HUD overlay elements
  drawHUD(ctx, w, h, gtiScore, rotation)
}

function drawHUD(ctx: CanvasRenderingContext2D, w: number, h: number, gtiScore: number, rotation: number) {
  // Top-left coordinates
  ctx.font = "9px 'Geist Mono', monospace"
  ctx.fillStyle = "rgba(0, 229, 255, 0.3)"
  ctx.textAlign = "left"
  ctx.fillText(`ROT: ${rotation.toFixed(1)}deg`, 12, 20)
  ctx.fillText(`GTI: ${gtiScore.toFixed(1)}`, 12, 32)

  // Corner brackets
  const bracketSize = 20
  const bracketColor = "rgba(0, 229, 255, 0.15)"
  ctx.strokeStyle = bracketColor
  ctx.lineWidth = 1

  // Top-left
  ctx.beginPath()
  ctx.moveTo(4, bracketSize + 4)
  ctx.lineTo(4, 4)
  ctx.lineTo(bracketSize + 4, 4)
  ctx.stroke()

  // Top-right
  ctx.beginPath()
  ctx.moveTo(w - bracketSize - 4, 4)
  ctx.lineTo(w - 4, 4)
  ctx.lineTo(w - 4, bracketSize + 4)
  ctx.stroke()

  // Bottom-left
  ctx.beginPath()
  ctx.moveTo(4, h - bracketSize - 4)
  ctx.lineTo(4, h - 4)
  ctx.lineTo(bracketSize + 4, h - 4)
  ctx.stroke()

  // Bottom-right
  ctx.beginPath()
  ctx.moveTo(w - bracketSize - 4, h - 4)
  ctx.lineTo(w - 4, h - 4)
  ctx.lineTo(w - 4, h - bracketSize - 4)
  ctx.stroke()

  // Bottom-right status
  ctx.textAlign = "right"
  ctx.fillStyle = "rgba(0, 229, 255, 0.25)"
  ctx.fillText("EARTH PULSE MODE", w - 12, h - 20)
  ctx.fillText(`RES: ${w}x${h}`, w - 12, h - 8)
}

function latLngToScreen(
  lat: number, lng: number,
  cx: number, cy: number, radius: number, rotation: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180
  const lngRad = ((lng + rotation) * Math.PI) / 180

  const x = cx + radius * Math.cos(latRad) * Math.sin(lngRad) * 0.9
  const y = cy - radius * Math.sin(latRad) * 0.8
  const z = Math.cos(latRad) * Math.cos(lngRad)

  return { x, y, visible: z > -0.2 }
}

// ─── Quantum Field Mode ──────────────────────────────────────────

function drawQuantumField(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  particles: Particle[],
  gtiScore: number,
  time: number,
) {
  ctx.clearRect(0, 0, w, h)

  // Grid background
  ctx.strokeStyle = "rgba(0, 229, 255, 0.015)"
  ctx.lineWidth = 0.5
  for (let i = 0; i < w; i += 40) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, h)
    ctx.stroke()
  }
  for (let j = 0; j < h; j += 40) {
    ctx.beginPath()
    ctx.moveTo(0, j)
    ctx.lineTo(w, j)
    ctx.stroke()
  }

  // Connection lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150 && particles[i].clusterId === particles[j].clusterId) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.05 * (1 - dist / 150)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  // Particles
  const velocityMultiplier = 0.5 + gtiScore / 100
  particles.forEach((p, i) => {
    // Update position with turbulence
    const turbulence = gtiScore / 200
    p.x += p.vx * velocityMultiplier + (Math.random() - 0.5) * turbulence
    p.y += p.vy * velocityMultiplier + (Math.random() - 0.5) * turbulence

    // Boundary wrap
    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0

    // Glow
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    glow.addColorStop(0, hexToRgba(p.color, 0.2))
    glow.addColorStop(1, hexToRgba(p.color, 0))
    ctx.fillStyle = glow
    ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8)

    // Core
    const pulse = 1 + Math.sin(time / 500 + i) * 0.2
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
    ctx.fillStyle = hexToRgba(p.color, p.alpha)
    ctx.fill()

    // Label
    ctx.font = "8px 'Geist Mono', monospace"
    ctx.fillStyle = hexToRgba(p.color, 0.6)
    ctx.textAlign = "center"
    ctx.fillText(p.label, p.x, p.y - p.size * 2 - 4)
  })

  // HUD
  ctx.font = "9px 'Geist Mono', monospace"
  ctx.fillStyle = "rgba(0, 229, 255, 0.3)"
  ctx.textAlign = "left"
  ctx.fillText("QUANTUM FIELD MODE", 12, 20)
  ctx.fillText(`PARTICLES: ${particles.length}`, 12, 32)
  ctx.fillText(`VELOCITY: ${velocityMultiplier.toFixed(2)}x`, 12, 44)

  // Corner brackets
  const bracketSize = 20
  ctx.strokeStyle = "rgba(0, 229, 255, 0.15)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(4, bracketSize + 4)
  ctx.lineTo(4, 4)
  ctx.lineTo(bracketSize + 4, 4)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(w - bracketSize - 4, 4)
  ctx.lineTo(w - 4, 4)
  ctx.lineTo(w - 4, bracketSize + 4)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(4, h - bracketSize - 4)
  ctx.lineTo(4, h - 4)
  ctx.lineTo(bracketSize + 4, h - 4)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(w - bracketSize - 4, h - 4)
  ctx.lineTo(w - 4, h - 4)
  ctx.lineTo(w - 4, h - bracketSize - 4)
  ctx.stroke()
}

// ─── Attractor Mode ──────────────────────────────────────────────

function drawAttractorMode(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  particles: Particle[],
  gtiScore: number,
  time: number,
) {
  ctx.clearRect(0, 0, w, h)

  // Grid
  ctx.strokeStyle = "rgba(0, 229, 255, 0.015)"
  ctx.lineWidth = 0.5
  for (let i = 0; i < w; i += 40) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke()
  }
  for (let j = 0; j < h; j += 40) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke()
  }

  // Attractors (safe-haven centers)
  const attractors = [
    { x: w * 0.3, y: h * 0.35, label: "GOLD", color: "#f59e0b", strength: gtiScore / 100 },
    { x: w * 0.7, y: h * 0.35, label: "BONDS", color: "#0ea5e9", strength: gtiScore / 120 },
    { x: w * 0.5, y: h * 0.7, label: "USD", color: "#22c55e", strength: gtiScore / 150 },
  ]

  // Draw attractor fields
  attractors.forEach((a) => {
    const fieldRadius = 60 + a.strength * 80
    for (let r = fieldRadius; r > 10; r -= 15) {
      ctx.beginPath()
      ctx.arc(a.x, a.y, r, 0, Math.PI * 2)
      const hexToRgba = (hex: string, alpha: number) => {
        const rr = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${rr}, ${g}, ${b}, ${alpha})`
      }
      ctx.strokeStyle = hexToRgba(a.color, 0.03 + (1 - r / fieldRadius) * 0.05)
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Center
    const pulse = 1 + Math.sin(time / 800) * 0.3
    ctx.beginPath()
    ctx.arc(a.x, a.y, 6 * pulse, 0, Math.PI * 2)
    const hexToRgba = (hex: string, alpha: number) => {
      const rr = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${rr}, ${g}, ${b}, ${alpha})`
    }
    ctx.fillStyle = hexToRgba(a.color, 0.6)
    ctx.fill()

    ctx.font = "10px 'Geist Mono', monospace"
    ctx.fillStyle = hexToRgba(a.color, 0.8)
    ctx.textAlign = "center"
    ctx.fillText(a.label, a.x, a.y - 14)
    ctx.font = "8px 'Geist Mono', monospace"
    ctx.fillStyle = hexToRgba(a.color, 0.5)
    ctx.fillText(`STR: ${(a.strength * 100).toFixed(0)}%`, a.x, a.y + 20)
  })

  // Particle dynamics with attractor forces
  particles.forEach((p, i) => {
    attractors.forEach((a) => {
      const dx = a.x - p.x
      const dy = a.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 10) {
        const isSafeHaven = p.clusterId <= 1
        const force = isSafeHaven ? a.strength * 0.3 / dist : -a.strength * 0.1 / dist
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }
    })

    // Damping
    p.vx *= 0.98
    p.vy *= 0.98

    // Noise
    p.vx += (Math.random() - 0.5) * 0.2 * (gtiScore / 50)
    p.vy += (Math.random() - 0.5) * 0.2 * (gtiScore / 50)

    p.x += p.vx
    p.y += p.vy

    // Boundaries
    if (p.x < 20) { p.x = 20; p.vx *= -0.5 }
    if (p.x > w - 20) { p.x = w - 20; p.vx *= -0.5 }
    if (p.y < 20) { p.y = 20; p.vy *= -0.5 }
    if (p.y > h - 20) { p.y = h - 20; p.vy *= -0.5 }

    const hexToRgba2 = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    // Trail
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
    glow.addColorStop(0, hexToRgba2(p.color, 0.15))
    glow.addColorStop(1, hexToRgba2(p.color, 0))
    ctx.fillStyle = glow
    ctx.fill()

    // Core
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * (1 + Math.sin(time / 400 + i) * 0.15), 0, Math.PI * 2)
    ctx.fillStyle = hexToRgba2(p.color, p.alpha)
    ctx.fill()

    // Label
    ctx.font = "7px 'Geist Mono', monospace"
    ctx.fillStyle = hexToRgba2(p.color, 0.5)
    ctx.textAlign = "center"
    ctx.fillText(p.label, p.x, p.y - p.size - 4)
  })

  // HUD
  ctx.font = "9px 'Geist Mono', monospace"
  ctx.fillStyle = "rgba(0, 229, 255, 0.3)"
  ctx.textAlign = "left"
  ctx.fillText("MARKET ATTRACTOR MODE", 12, 20)
  ctx.fillText(`ATTRACTORS: ${attractors.length}`, 12, 32)
  ctx.fillText(`STRESS: ${gtiScore.toFixed(1)}%`, 12, 44)
}

// ─── Init Particles ──────────────────────────────────────────────

function initParticles(w: number, h: number): Particle[] {
  const assets = [
    { label: "XAU", color: "#f59e0b", cluster: 0 },
    { label: "SPX", color: "#ef4444", cluster: 1 },
    { label: "CL", color: "#f59e0b", cluster: 2 },
    { label: "EUR", color: "#0ea5e9", cluster: 1 },
    { label: "BTC", color: "#00e5ff", cluster: 2 },
    { label: "TNX", color: "#22c55e", cluster: 0 },
    { label: "NKY", color: "#ef4444", cluster: 1 },
    { label: "NG", color: "#f59e0b", cluster: 2 },
    { label: "DXY", color: "#22c55e", cluster: 0 },
    { label: "VIX", color: "#ef4444", cluster: 2 },
    { label: "GBP", color: "#0ea5e9", cluster: 1 },
    { label: "SLV", color: "#f59e0b", cluster: 0 },
    { label: "ETH", color: "#00e5ff", cluster: 2 },
    { label: "DAX", color: "#ef4444", cluster: 1 },
    { label: "SOY", color: "#22c55e", cluster: 2 },
    { label: "CU", color: "#f59e0b", cluster: 2 },
  ]

  return assets.map((a) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: 3 + Math.random() * 3,
    color: a.color,
    alpha: 0.6 + Math.random() * 0.4,
    label: a.label,
    clusterId: a.cluster,
    stress: Math.random(),
    baseX: Math.random() * w,
    baseY: Math.random() * h,
  }))
}

// ─── Main Component ──────────────────────────────────────────────

export function CenterVisualization({
  mode,
  points,
  arcs,
  gtiScore,
  onPointHover,
  onPointClick,
}: CenterVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const hoveredPointRef = useRef<GlobePoint | null>(null)
  const animFrameRef = useRef<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: GlobePoint } | null>(null)

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (ctx) ctx.scale(dpr, dpr)

    if (particlesRef.current.length === 0) {
      particlesRef.current = initParticles(rect.width, rect.height)
    }
  }, [])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [resizeCanvas])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      if (mode === "globe") {
        rotationRef.current += 0.15
        drawGlobe(ctx, w, h, rotationRef.current, points, arcs, gtiScore, hoveredPointRef.current, mouseRef.current)
      } else if (mode === "quantum") {
        drawQuantumField(ctx, w, h, particlesRef.current, gtiScore, Date.now())
      } else {
        drawAttractorMode(ctx, w, h, particlesRef.current, gtiScore, Date.now())
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [mode, points, arcs, gtiScore])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseRef.current = { x, y }

    if (mode === "globe") {
      const cx = rect.width / 2
      const cy = rect.height / 2
      const radius = Math.min(rect.width, rect.height) * 0.35

      let closestPoint: GlobePoint | null = null
      let closestDist = Infinity

      points.forEach((point) => {
        const pos = latLngToScreen(point.lat, point.lng, cx, cy, radius, rotationRef.current)
        if (!pos.visible) return
        const dx = x - pos.x
        const dy = y - pos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 20 && dist < closestDist) {
          closestDist = dist
          closestPoint = point
        }
      })

      hoveredPointRef.current = closestPoint
      onPointHover(closestPoint)

      if (closestPoint) {
        const pos = latLngToScreen(closestPoint.lat, closestPoint.lng, cx, cy, radius, rotationRef.current)
        setTooltip({ x: pos.x + rect.left, y: pos.y + rect.top, point: closestPoint })
        canvas.style.cursor = "pointer"
      } else {
        setTooltip(null)
        canvas.style.cursor = "crosshair"
      }
    } else {
      canvas.style.cursor = "crosshair"
    }
  }, [mode, points, onPointHover])

  const handleClick = useCallback(() => {
    if (hoveredPointRef.current) {
      onPointClick(hoveredPointRef.current)
    }
  }, [onPointClick])

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
      style={{ background: "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 70%)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={() => {
          mouseRef.current = null
          hoveredPointRef.current = null
          setTooltip(null)
          onPointHover(null)
        }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.05)_2px,rgba(0,229,255,0.05)_4px)]" />
      </div>

      {/* Fullscreen toggle */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-sm bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
      </button>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none cyber-panel rounded-sm px-3 py-2 shadow-lg cyber-glow-border"
          style={{ left: tooltip.x + 16, top: tooltip.y - 40 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-3 w-3" style={{ color: tooltip.point.color }} />
            <span className="text-[10px] font-mono font-semibold text-foreground">{tooltip.point.label}</span>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-mono text-muted-foreground">
            <span>GTI: <span style={{ color: tooltip.point.color }}>{tooltip.point.tensionScore}</span></span>
            <span>{tooltip.point.region}</span>
          </div>
        </div>
      )}

      {/* Mode indicator overlay */}
      <div className="absolute bottom-3 left-3 text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest">
        {mode === "globe" && "Earth Pulse Active"}
        {mode === "quantum" && "Quantum Field Active"}
        {mode === "attractor" && "Market Attractor Active"}
      </div>
    </div>
  )
}
