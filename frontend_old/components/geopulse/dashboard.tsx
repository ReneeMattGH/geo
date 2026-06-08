"use client"

import { useState, useCallback, useEffect } from "react"
import { TopBar } from "@/components/geopulse/top-bar"
import { LeftPanel } from "@/components/geopulse/left-panel"
import { CenterVisualization } from "@/components/geopulse/center-visualization"
import { RightPanel } from "@/components/geopulse/right-panel"
import { BottomTimeline } from "@/components/geopulse/bottom-timeline"
import {
  gtiData,
  assetSignals,
  timelineEvents,
  defaultScenarioParams,
  portfolioAssets,
  globePoints,
  globeArcs,
  gtiHistory,
  type VisualizationMode,
  type AssetSignal,
  type Region,
  type AssetClass,
  type ScenarioParams,
  type GlobePoint,
  type TimelineEvent,
  type GTIData,
} from "@/lib/geopulse-data"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

const COUNTRY_COORDS: Record<string, { lat: number; lng: number; region: Region }> = {
  // Middle East
  "ISR": { lat: 31.0461, lng: 34.8516, region: "Middle East" },
  "IRN": { lat: 32.4279, lng: 53.6880, region: "Middle East" },
  "SAU": { lat: 23.8859, lng: 45.0792, region: "Middle East" },
  "ARE": { lat: 24.4539, lng: 54.3773, region: "Middle East" },
  "EGY": { lat: 26.8206, lng: 30.8025, region: "Middle East" },
  "IRQ": { lat: 33.2232, lng: 43.6793, region: "Middle East" },
  "SYR": { lat: 34.8021, lng: 38.9968, region: "Middle East" },
  "YEM": { lat: 15.5527, lng: 48.5164, region: "Middle East" },
  "QAT": { lat: 25.3548, lng: 51.1839, region: "Middle East" },
  // Europe
  "GBR": { lat: 55.3781, lng: -3.4360, region: "Europe" },
  "FRA": { lat: 46.2276, lng: 2.2137, region: "Europe" },
  "DEU": { lat: 51.1657, lng: 10.4515, region: "Europe" },
  "ITA": { lat: 41.8719, lng: 12.5674, region: "Europe" },
  "ESP": { lat: 40.4637, lng: -3.7492, region: "Europe" },
  "UKR": { lat: 48.3794, lng: 31.1656, region: "Europe" },
  "RUS": { lat: 61.5240, lng: 105.3188, region: "Europe" },
  "POL": { lat: 51.9194, lng: 19.1451, region: "Europe" },
  // Asia Pacific
  "CHN": { lat: 35.8617, lng: 104.1954, region: "Asia Pacific" },
  "JPN": { lat: 36.2048, lng: 138.2529, region: "Asia Pacific" },
  "IND": { lat: 20.5937, lng: 78.9629, region: "Asia Pacific" },
  "AUS": { lat: -25.2744, lng: 133.7751, region: "Asia Pacific" },
  "KOR": { lat: 35.9078, lng: 127.7669, region: "Asia Pacific" },
  "TWN": { lat: 23.6978, lng: 120.9605, region: "Asia Pacific" },
  "VNM": { lat: 14.0583, lng: 108.2772, region: "Asia Pacific" },
  // Americas
  "USA": { lat: 37.0902, lng: -95.7129, region: "North America" },
  "CAN": { lat: 56.1304, lng: -106.3468, region: "North America" },
  "MEX": { lat: 23.6345, lng: -102.5528, region: "Latin America" },
  "BRA": { lat: -14.2350, lng: -51.9253, region: "Latin America" },
  "ARG": { lat: -38.4161, lng: -63.6167, region: "Latin America" },
  "CHL": { lat: -35.6751, lng: -71.5430, region: "Latin America" },
};

export function GeopulseDashboard() {
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<VisualizationMode>("globe")
  const [scenario, setScenario] = useState<ScenarioParams>(defaultScenarioParams)
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([])
  const [selectedAssetClasses, setSelectedAssetClasses] = useState<AssetClass[]>([])
  const [selectedAsset, setSelectedAsset] = useState<AssetSignal | null>(null)
  const [, setHoveredPoint] = useState<GlobePoint | null>(null)

  // Real data states
  const [realGti, setRealGti] = useState<GTIData>(gtiData)
  const [realSignals, setRealSignals] = useState<AssetSignal[]>(assetSignals)
  const [realEvents, setRealEvents] = useState<TimelineEvent[]>(timelineEvents)
  const [realPoints, setRealPoints] = useState<GlobePoint[]>(globePoints)

  useEffect(() => {
    setMounted(true)

    // Fetch initial data
    // const fetchData = async () => {
    //   try {
    //     const [gtiRes, signalRes, eventRes, heatmapRes] = await Promise.all([
    //       fetch(`${API_BASE}/gti/current`),
    //       fetch(`${API_BASE}/signals/assets`),
    //       fetch(`${API_BASE}/events/timeline`),
    //       fetch(`${API_BASE}/risk/heatmap`)
    //     ]);

    //     if (gtiRes.ok) {
    //       const data = await gtiRes.json();
    //       setRealGti({
    //         score: data.gti_value,
    //         trend: data.gti_delta_1h >= 0 ? "rising" : "falling",
    //         delta: data.gti_delta_1h,
    //         lastUpdate: data.ts,
    //         breakdown: (data.top_drivers || []).map((d: any) => ({
    //           region: d.region || d.driver || "Global",
    //           score: data.gti_value * (1 + (d.contribution_weight || 0)),
    //           delta: (d.contribution_weight || 0) * 10
    //         }))
    //       });
    //     }

    //     if (signalRes.ok) {
    //       const data = await signalRes.json();
    //       const mapped = (data.signals || []).map((s: any, idx: number) => ({
    //         id: String(idx),
    //         name: s.symbol,
    //         ticker: s.symbol,
    //         assetClass: (s.sector || "Equities") as AssetClass,
    //         region: s.region as Region,
    //         signal: (s.recommendation?.toUpperCase() || "HOLD") as any,
    //         confidence: (s.confidence_score || 0) * 100,
    //         uncertainty: (s.uncertainty || 0) * 100,
    //         price: s.price || 0,
    //         change24h: (s.directional_bias || 0) * 100,
    //         explanation: s.reasoning || "No explanation available.",
    //         riskFactors: s.risk_factors || [],
    //         correlatedAssets: s.correlated_assets || []
    //       }));
    //       setRealSignals(mapped);
    //       if (mapped.length > 0) setSelectedAsset(mapped[0]);
    //     }

    //     if (eventRes.ok) {
    //       const data = await eventRes.json();
    //       setRealEvents((data.events || []).map((e: any) => ({
    //         id: String(e.id),
    //         timestamp: e.occurred_at || e.ts,
    //         title: e.title,
    //         severity: (e.severity_score > 0.8 ? "critical" : e.severity_score > 0.5 ? "high" : e.severity_score > 0.2 ? "medium" : "low") as any,
    //         region: e.region as any,
    //         impact: (e.magnitude || e.severity_score || 0) * 100,
    //         description: e.summary || e.title
    //       })));
    //     }

    //     if (heatmapRes.ok) {
    //       const data = await heatmapRes.json();
    //       setRealPoints((data.points || []).map((p: any) => {
    //         const coords = COUNTRY_COORDS[p.country_iso] || { lat: 0, lng: 0, region: "Europe" as Region };
    //         return {
    //           lat: coords.lat,
    //           lng: coords.lng,
    //           size: p.risk_score / 100,
    //           color: p.risk_score > 70 ? "#ef4444" : p.risk_score > 40 ? "#f59e0b" : "#22c55e",
    //           label: p.country_iso,
    //           region: coords.region,
    //           tensionScore: p.risk_score
    //         };
    //       }));
    //     }
    //   } catch (err) {
    //     console.error("Failed to fetch Geopulse data:", err);
    //   }
    // };

    // fetchData();
    // const interval = setInterval(fetchData, 30000); // 30s refresh
    // return () => clearInterval(interval);

  }, [])

  const handleRegionToggle = useCallback((region: Region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    )
  }, [])

  const handleAssetClassToggle = useCallback((ac: AssetClass) => {
    setSelectedAssetClasses((prev) =>
      prev.includes(ac) ? prev.filter((a) => a !== ac) : [...prev, ac]
    )
  }, [])

  const handleSelectAsset = useCallback((asset: AssetSignal) => {
    setSelectedAsset(asset)
  }, [])

  const handlePointHover = useCallback((point: GlobePoint | null) => {
    setHoveredPoint(point)
  }, [])

  const handlePointClick = useCallback((point: GlobePoint) => {
    const matchedAsset = realSignals.find((a) => a.region === point.region)
    if (matchedAsset) setSelectedAsset(matchedAsset)
  }, [realSignals])

  const handleEventSelect = useCallback((event: TimelineEvent) => {
    const matchedAsset = realSignals.find((a) => a.region === event.region)
    if (matchedAsset) setSelectedAsset(matchedAsset)
  }, [realSignals])

  const filteredSignals = realSignals.filter((signal) => {
    if (selectedRegions.length > 0 && !selectedRegions.includes(signal.region)) return false
    if (selectedAssetClasses.length > 0 && !selectedAssetClasses.includes(signal.assetClass)) return false
    return true
  })

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: "#06080d" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center h-12 w-12 rounded-lg" style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}>
            <div className="h-5 w-5 rounded-full animate-spin" style={{ border: "2px solid rgba(0,229,255,0.3)", borderTopColor: "#00e5ff" }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold tracking-[0.2em] font-mono" style={{ color: "#e2e8f0" }}>GEOPULSE</span>
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: "#64748b" }}>Initializing Systems</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background grid-bg">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff]/[0.03] to-transparent animate-scanline" />
      </div>

      <TopBar gti={realGti} mode={mode} onModeChange={setMode} />

      <div className="flex-1 flex overflow-hidden">
        <LeftPanel
          scenario={scenario}
          onScenarioChange={setScenario}
          selectedRegions={selectedRegions}
          onRegionToggle={handleRegionToggle}
          selectedAssetClasses={selectedAssetClasses}
          onAssetClassToggle={handleAssetClassToggle}
        />

        <CenterVisualization
          mode={mode}
          points={realPoints}
          arcs={globeArcs}
          gtiScore={realGti.score}
          onPointHover={handlePointHover}
          onPointClick={handlePointClick}
        />

        <RightPanel
          signals={filteredSignals}
          portfolio={portfolioAssets}
          selectedAsset={selectedAsset}
          onSelectAsset={handleSelectAsset}
        />
      </div>

      <BottomTimeline
        events={realEvents}
        gtiHistory={gtiHistory}
        gti={realGti}
        onEventSelect={handleEventSelect}
      />
    </div>
  )
}
