"use client"

import { useState } from "react"
import {
  Filter,
  ChevronDown,
  ChevronRight,
  Crosshair,
  Sliders,
  Flame,
  Zap,
  ShieldAlert,
  Globe2,
  BarChart3,
  Truck,
} from "lucide-react"
import type { AssetClass, Region, ScenarioParams } from "@/lib/geopulse-data"

interface LeftPanelProps {
  scenario: ScenarioParams
  onScenarioChange: (params: ScenarioParams) => void
  selectedRegions: Region[]
  onRegionToggle: (region: Region) => void
  selectedAssetClasses: AssetClass[]
  onAssetClassToggle: (assetClass: AssetClass) => void
}

function SectionHeader({ label, icon, collapsed, onToggle }: {
  label: string
  icon: React.ReactNode
  collapsed: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-2 px-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
    </button>
  )
}

function FilterChip({ label, active, onClick, color }: {
  label: string
  active: boolean
  onClick: () => void
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-sm text-[9px] font-mono uppercase tracking-wider border transition-all duration-200 ${active
          ? `bg-[${color || "#00e5ff"}]/10 text-[${color || "#00e5ff"}] border-[${color || "#00e5ff"}]/30`
          : "bg-transparent text-muted-foreground border-border/50 hover:border-border"
        }`}
      style={active ? {
        backgroundColor: `${color || "#00e5ff"}15`,
        color: color || "#00e5ff",
        borderColor: `${color || "#00e5ff"}40`,
      } : undefined}
    >
      {label}
    </button>
  )
}

function ScenarioSlider({ label, value, onChange, icon, color, description }: {
  label: string
  value: number
  onChange: (v: number) => void
  icon: React.ReactNode
  color: string
  description: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-[10px] font-mono text-foreground/80 uppercase tracking-wider">
            {label}
          </span>
        </div>
        <span
          className="text-[11px] font-mono font-semibold tabular-nums"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-secondary/80 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
      <p className="text-[8px] font-mono text-muted-foreground/60 leading-relaxed">{description}</p>
    </div>
  )
}

function RegionBreakdown({ regions }: { regions: { region: string; score: number; delta: number }[] }) {
  return (
    <div className="space-y-1.5">
      {regions.map((r) => {
        const getColor = () => {
          if (r.score >= 80) return "#ef4444"
          if (r.score >= 60) return "#f59e0b"
          if (r.score >= 40) return "#0ea5e9"
          return "#22c55e"
        }
        const color = getColor()
        return (
          <div key={r.region} className="flex items-center gap-2">
            <div className="w-24 text-[9px] font-mono text-muted-foreground truncate">{r.region}</div>
            <div className="flex-1 h-1 rounded-full bg-secondary/80 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${r.score}%`,
                  background: color,
                  boxShadow: `0 0 6px ${color}50`,
                }}
              />
            </div>
            <div className="flex items-center gap-1 w-16 justify-end">
              <span className="text-[10px] font-mono font-semibold tabular-nums" style={{ color }}>
                {r.score.toFixed(0)}
              </span>
              <span className={`text-[8px] font-mono ${r.delta >= 0 ? "text-[#ef4444]" : "text-[#22c55e]"}`}>
                {r.delta >= 0 ? "+" : ""}{r.delta.toFixed(1)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function LeftPanel({
  scenario,
  onScenarioChange,
  selectedRegions,
  onRegionToggle,
  selectedAssetClasses,
  onAssetClassToggle,
}: LeftPanelProps) {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false)
  const [scenarioCollapsed, setScenarioCollapsed] = useState(false)
  const [regionCollapsed, setRegionCollapsed] = useState(false)

  const regions: Region[] = ["North America", "Europe", "Asia Pacific", "Middle East", "Latin America", "Africa"]
  const assetClasses: AssetClass[] = ["Equities", "Bonds", "Commodities", "Forex", "Crypto"]

  const gtiBreakdown = [
    { region: "Middle East", score: 89.2, delta: 5.1 },
    { region: "Asia Pacific", score: 78.6, delta: 3.2 },
    { region: "Europe", score: 71.3, delta: 1.8 },
    { region: "N. America", score: 62.4, delta: -0.5 },
    { region: "Lat. America", score: 58.7, delta: 2.1 },
    { region: "Africa", score: 55.1, delta: 1.4 },
  ]

  const updateScenario = (key: keyof ScenarioParams, value: number) => {
    onScenarioChange({ ...scenario, [key]: value })
  }

  return (
    <aside className="w-72 cyber-panel border-r border-[var(--panel-border)] flex flex-col overflow-hidden relative">
      {/* Tactical corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00e5ff]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00e5ff]/20" />

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {/* Region Breakdown */}
        <div>
          <SectionHeader
            label="Region Tensions"
            icon={<Globe2 className="h-3 w-3" />}
            collapsed={regionCollapsed}
            onToggle={() => setRegionCollapsed(!regionCollapsed)}
          />
          {!regionCollapsed && <RegionBreakdown regions={gtiBreakdown} />}
        </div>

        <div className="h-px bg-border/50" />

        {/* Filters */}
        <div>
          <SectionHeader
            label="Asset Filters"
            icon={<Filter className="h-3 w-3" />}
            collapsed={filtersCollapsed}
            onToggle={() => setFiltersCollapsed(!filtersCollapsed)}
          />
          {!filtersCollapsed && (
            <div className="space-y-3">
              <div>
                <span className="text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                  Region
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {regions.map((region) => (
                    <FilterChip
                      key={region}
                      label={region.replace("North ", "N.").replace("Latin ", "L.").replace(" Pacific", "")}
                      active={selectedRegions.includes(region)}
                      onClick={() => onRegionToggle(region)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                  Asset Class
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {assetClasses.map((ac) => (
                    <FilterChip
                      key={ac}
                      label={ac}
                      active={selectedAssetClasses.includes(ac)}
                      onClick={() => onAssetClassToggle(ac)}
                      color="#0ea5e9"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-border/50" />

        {/* Scenario Simulation */}
        <div>
          <SectionHeader
            label="Scenario Simulation"
            icon={<Sliders className="h-3 w-3" />}
            collapsed={scenarioCollapsed}
            onToggle={() => setScenarioCollapsed(!scenarioCollapsed)}
          />
          {!scenarioCollapsed && (
            <div className="space-y-4 mt-1">
              <ScenarioSlider
                label="Oil Shock"
                value={scenario.oilPriceShock}
                onChange={(v) => updateScenario("oilPriceShock", v)}
                icon={<Flame className="h-3 w-3 text-[#f59e0b]" />}
                color="#f59e0b"
                description="Simulates crude price disruption scenario"
              />
              <ScenarioSlider
                label="Rate Change"
                value={scenario.interestRateChange}
                onChange={(v) => updateScenario("interestRateChange", v)}
                icon={<BarChart3 className="h-3 w-3 text-[#0ea5e9]" />}
                color="#0ea5e9"
                description="Central bank emergency rate adjustment"
              />
              <ScenarioSlider
                label="Escalation"
                value={scenario.geopoliticalEscalation}
                onChange={(v) => updateScenario("geopoliticalEscalation", v)}
                icon={<Crosshair className="h-3 w-3 text-[#ef4444]" />}
                color="#ef4444"
                description="Military conflict escalation probability"
              />
              <ScenarioSlider
                label="Supply Chain"
                value={scenario.supplyChainDisruption}
                onChange={(v) => updateScenario("supplyChainDisruption", v)}
                icon={<Truck className="h-3 w-3 text-[#f59e0b]" />}
                color="#f59e0b"
                description="Global logistics disruption index"
              />
              <ScenarioSlider
                label="Cyber Threat"
                value={scenario.cyberThreatLevel}
                onChange={(v) => updateScenario("cyberThreatLevel", v)}
                icon={<ShieldAlert className="h-3 w-3 text-[#00e5ff]" />}
                color="#00e5ff"
                description="Infrastructure cyber attack probability"
              />

              <button className="w-full py-2 rounded-sm border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[10px] font-mono uppercase tracking-wider text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all flex items-center justify-center gap-2">
                <Zap className="h-3 w-3" />
                Run Simulation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom status */}
      <div className="px-3 py-2 border-t border-[var(--panel-border)] bg-[var(--card)]/50">
        <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider">
          <span>Data Feeds: 6 Active</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Connected
          </span>
        </div>
      </div>
    </aside>
  )
}
