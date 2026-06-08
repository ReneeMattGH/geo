"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  BarChart3,
  Briefcase,
  Eye,
  ExternalLink,
  Target,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import type { AssetSignal, PortfolioAsset } from "@/lib/geopulse-data"

interface RightPanelProps {
  signals: AssetSignal[]
  portfolio: PortfolioAsset[]
  selectedAsset: AssetSignal | null
  onSelectAsset: (asset: AssetSignal) => void
}

function SignalBadge({ signal, size = "sm" }: { signal: "BUY" | "SELL" | "HOLD"; size?: "sm" | "md" }) {
  const config = {
    BUY: { color: "#22c55e", bg: "rgba(34, 197, 94, 0.1)", border: "rgba(34, 197, 94, 0.3)" },
    SELL: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.3)" },
    HOLD: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.3)" },
  }
  const c = config[signal]
  const sizeClass = size === "md" ? "px-2.5 py-1 text-[11px]" : "px-1.5 py-0.5 text-[9px]"

  return (
    <span
      className={`inline-flex items-center rounded-sm border font-mono font-bold uppercase tracking-wider ${sizeClass}`}
      style={{ color: c.color, backgroundColor: c.bg, borderColor: c.border }}
    >
      {signal}
    </span>
  )
}

function ConfidenceBar({ confidence, uncertainty }: { confidence: number; uncertainty: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[9px] font-mono">
        <span className="text-muted-foreground">Confidence</span>
        <span className="text-foreground tabular-nums">{confidence}%</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-secondary/80 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#00e5ff] transition-all duration-500"
          style={{ width: `${confidence}%`, boxShadow: "0 0 6px rgba(0, 229, 255, 0.3)" }}
        />
        {/* Uncertainty range overlay */}
        <div
          className="absolute inset-y-0 rounded-full bg-[#f59e0b]/20"
          style={{
            left: `${Math.max(0, confidence - uncertainty)}%`,
            width: `${uncertainty * 2}%`,
          }}
        />
      </div>
      <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground/60">
        <span>Uncertainty: {uncertainty}%</span>
        <span className={confidence >= 70 ? "text-[#22c55e]" : confidence >= 50 ? "text-[#f59e0b]" : "text-[#ef4444]"}>
          {confidence >= 70 ? "High Signal" : confidence >= 50 ? "Moderate" : "Low Signal"}
        </span>
      </div>
    </div>
  )
}

function formatPrice(price: number): string {
  if (price >= 1000) {
    const [intPart, decPart] = price.toFixed(2).split(".")
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `${formatted}.${decPart}`
  }
  return price.toFixed(price >= 100 ? 2 : 4)
}

function AssetCard({ asset, isSelected, onClick }: {
  asset: AssetSignal
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2.5 rounded-sm border transition-all duration-200 ${isSelected
          ? "border-[#00e5ff]/30 bg-[#00e5ff]/5 shadow-[0_0_10px_rgba(0,229,255,0.05)]"
          : "border-border/30 bg-secondary/20 hover:border-border/60 hover:bg-secondary/30"
        }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-foreground">{asset.ticker}</span>
          <SignalBadge signal={asset.signal} />
        </div>
        <span className={`text-[10px] font-mono tabular-nums flex items-center gap-0.5 ${asset.change24h >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
          }`}>
          {asset.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-muted-foreground">{asset.name}</span>
        <span className="text-[10px] font-mono text-foreground/80 tabular-nums">
          {formatPrice(asset.price)}
        </span>
      </div>
      <div className="mt-1.5 h-0.5 rounded-full bg-secondary/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${asset.confidence}%`,
            background: asset.signal === "BUY" ? "#22c55e" : asset.signal === "SELL" ? "#ef4444" : "#f59e0b",
            opacity: 0.6,
          }}
        />
      </div>
    </button>
  )
}

function AssetDetail({ asset }: { asset: AssetSignal }) {
  return (
    <div className="space-y-3 p-3 rounded-sm border border-[#00e5ff]/10 bg-[#00e5ff]/[0.02]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-foreground">{asset.ticker}</span>
            <SignalBadge signal={asset.signal} size="md" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">{asset.name} / {asset.assetClass}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-mono font-bold text-foreground tabular-nums">
            {formatPrice(asset.price)}
          </div>
          <span className={`text-[10px] font-mono tabular-nums ${asset.change24h >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
            }`}>
            {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Confidence */}
      <ConfidenceBar confidence={asset.confidence} uncertainty={asset.uncertainty} />

      {/* AI Explanation */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Eye className="h-3 w-3 text-[#00e5ff]" />
          <span className="text-[9px] font-mono text-[#00e5ff] uppercase tracking-wider">AI Analysis</span>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
          {asset.explanation}
        </p>
      </div>

      {/* Risk Factors */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <AlertTriangle className="h-3 w-3 text-[#f59e0b]" />
          <span className="text-[9px] font-mono text-[#f59e0b] uppercase tracking-wider">Risk Factors</span>
        </div>
        <div className="space-y-0.5">
          {asset.riskFactors.map((risk, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[9px] font-mono text-muted-foreground">
              <span className="text-[#f59e0b]/50 mt-0.5">{'>'}</span>
              <span>{risk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Correlated */}
      <div>
        <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">Correlated</span>
        <div className="flex gap-1 mt-1">
          {asset.correlatedAssets.map((ticker) => (
            <span key={ticker} className="px-1.5 py-0.5 rounded-sm bg-secondary/50 border border-border/30 text-[8px] font-mono text-muted-foreground">
              {ticker}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PortfolioStress({ portfolio }: { portfolio: PortfolioAsset[] }) {
  const totalStress = portfolio.reduce((sum, a) => sum + a.stressImpact * (a.allocation / 100), 0)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Net Stress Impact</span>
        <span className={`text-sm font-mono font-bold tabular-nums ${totalStress >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {totalStress >= 0 ? "+" : ""}{totalStress.toFixed(2)}%
        </span>
      </div>

      <div className="space-y-1">
        {portfolio.map((asset) => (
          <div key={asset.ticker} className="flex items-center gap-2 group">
            <span className="w-8 text-[9px] font-mono text-muted-foreground">{asset.ticker}</span>
            <div className="flex-1 h-1 rounded-full bg-secondary/60 overflow-hidden relative">
              {/* Allocation bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#0ea5e9]/30"
                style={{ width: `${asset.allocation}%` }}
              />
              {/* Stress impact overlay */}
              <div
                className={`absolute inset-y-0 rounded-full ${asset.stressImpact >= 0 ? "bg-[#22c55e]" : "bg-[#ef4444]"}`}
                style={{
                  left: asset.stressImpact >= 0 ? `${asset.allocation}%` : `${asset.allocation + asset.stressImpact}%`,
                  width: `${Math.abs(asset.stressImpact)}%`,
                  opacity: 0.5,
                }}
              />
            </div>
            <div className="flex items-center gap-1.5 w-20 justify-end">
              <span className="text-[8px] font-mono text-muted-foreground/60 tabular-nums">{asset.allocation}%</span>
              <span className={`text-[9px] font-mono font-semibold tabular-nums ${asset.stressImpact >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                }`}>
                {asset.stressImpact >= 0 ? "+" : ""}{asset.stressImpact.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RightPanel({ signals, portfolio, selectedAsset, onSelectAsset }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<"signals" | "portfolio">("signals")
  const [signalsExpanded, setSignalsExpanded] = useState(true)

  return (
    <aside className="w-80 cyber-panel border-l border-[var(--panel-border)] flex flex-col overflow-hidden relative">
      {/* Tactical corner accents */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00e5ff]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00e5ff]/20" />

      {/* Tab headers */}
      <div className="flex border-b border-[var(--panel-border)]">
        <button
          onClick={() => setActiveTab("signals")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all ${activeTab === "signals"
              ? "text-[#00e5ff] border-b border-[#00e5ff] bg-[#00e5ff]/5"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Target className="h-3 w-3" />
          Signals
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all ${activeTab === "portfolio"
              ? "text-[#00e5ff] border-b border-[#00e5ff] bg-[#00e5ff]/5"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Briefcase className="h-3 w-3" />
          Portfolio
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "signals" ? (
          <div className="p-3 space-y-3">
            {/* Selected asset detail */}
            {selectedAsset && (
              <AssetDetail asset={selectedAsset} />
            )}

            {/* Signal list */}
            <div>
              <button
                onClick={() => setSignalsExpanded(!signalsExpanded)}
                className="flex items-center justify-between w-full py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="h-3 w-3" />
                  All Signals ({signals.length})
                </span>
                {signalsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {signalsExpanded && (
                <div className="space-y-1.5 mt-1">
                  {signals.map((signal) => (
                    <AssetCard
                      key={signal.id}
                      asset={signal}
                      isSelected={selectedAsset?.id === signal.id}
                      onClick={() => onSelectAsset(signal)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-4">
            {/* Portfolio header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00e5ff]" />
                <span className="text-[10px] font-mono text-[#00e5ff] uppercase tracking-wider">
                  Stress Test Results
                </span>
              </div>
              <button className="text-[9px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors">
                <ExternalLink className="h-3 w-3" />
                Export
              </button>
            </div>

            <PortfolioStress portfolio={portfolio} />

            {/* Portfolio breakdown */}
            <div className="space-y-2 pt-2 border-t border-border/30">
              <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                Position Detail
              </span>
              {portfolio.map((asset) => (
                <div
                  key={asset.ticker}
                  className="p-2 rounded-sm border border-border/20 bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold text-foreground">{asset.ticker}</span>
                      <SignalBadge signal={asset.signal} />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold tabular-nums ${asset.stressImpact >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                      }`}>
                      {asset.stressImpact >= 0 ? "+" : ""}{asset.stressImpact.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground">
                    <span>{asset.name}</span>
                    <span>Alloc: {asset.allocation}% / Exp: {asset.exposure}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom status */}
      <div className="px-3 py-2 border-t border-[var(--panel-border)] bg-[var(--card)]/50">
        <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider">
          <span>AI Model: GPT-Quant v4.2</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            Processing
          </span>
        </div>
      </div>
    </aside>
  )
}
