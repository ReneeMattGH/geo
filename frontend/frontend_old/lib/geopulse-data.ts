// ─── Types ────────────────────────────────────────────────────────
export type SignalType = "BUY" | "SELL" | "HOLD"
export type AssetClass = "Equities" | "Bonds" | "Commodities" | "Forex" | "Crypto"
export type Region = "North America" | "Europe" | "Asia Pacific" | "Middle East" | "Latin America" | "Africa"
export type VisualizationMode = "quantum" | "attractor" | "globe"

export interface GTIData {
  score: number
  trend: "rising" | "falling" | "stable"
  delta: number
  lastUpdate: string
  breakdown: { region: string; score: number; delta: number }[]
}

export interface AssetSignal {
  id: string
  name: string
  ticker: string
  assetClass: AssetClass
  region: Region
  signal: SignalType
  confidence: number
  uncertainty: number
  price: number
  change24h: number
  explanation: string
  riskFactors: string[]
  correlatedAssets: string[]
}

export interface TimelineEvent {
  id: string
  timestamp: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  region: Region
  impact: number
  description: string
}

export interface ScenarioParams {
  oilPriceShock: number
  interestRateChange: number
  geopoliticalEscalation: number
  supplyChainDisruption: number
  cyberThreatLevel: number
}

export interface PortfolioAsset {
  ticker: string
  name: string
  allocation: number
  exposure: number
  stressImpact: number
  signal: SignalType
}

export interface GlobeArc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string
  label: string
  intensity: number
}

export interface GlobePoint {
  lat: number
  lng: number
  size: number
  color: string
  label: string
  region: Region
  tensionScore: number
}

// ─── Mock Data ────────────────────────────────────────────────────

export const gtiData: GTIData = {
  score: 73.4,
  trend: "rising",
  delta: 2.8,
  lastUpdate: "2026-03-02T21:30:00Z",
  breakdown: [
    { region: "Middle East", score: 89.2, delta: 5.1 },
    { region: "Asia Pacific", score: 78.6, delta: 3.2 },
    { region: "Europe", score: 71.3, delta: 1.8 },
    { region: "North America", score: 62.4, delta: -0.5 },
    { region: "Latin America", score: 58.7, delta: 2.1 },
    { region: "Africa", score: 55.1, delta: 1.4 },
  ],
}

export const assetSignals: AssetSignal[] = [
  {
    id: "1", name: "Gold", ticker: "XAU/USD", assetClass: "Commodities", region: "North America",
    signal: "BUY", confidence: 87, uncertainty: 8, price: 2341.50, change24h: 1.24,
    explanation: "Safe-haven demand surging amid escalating Middle East tensions. Central bank accumulation at 12-month high. Technical breakout above key resistance at $2,300.",
    riskFactors: ["Sudden de-escalation", "USD strength reversal", "Margin calls forcing liquidation"],
    correlatedAssets: ["SLV", "GDX", "TLT"],
  },
  {
    id: "2", name: "S&P 500", ticker: "SPX", assetClass: "Equities", region: "North America",
    signal: "SELL", confidence: 72, uncertainty: 18, price: 5124.30, change24h: -0.87,
    explanation: "Risk-off sentiment accelerating. VIX approaching 25 threshold. Sector rotation into defensives. Earnings guidance weakening across tech sector.",
    riskFactors: ["Fed intervention", "Ceasefire announcement", "Momentum reversal"],
    correlatedAssets: ["QQQ", "IWM", "VIX"],
  },
  {
    id: "3", name: "Crude Oil", ticker: "CL=F", assetClass: "Commodities", region: "Middle East",
    signal: "BUY", confidence: 81, uncertainty: 14, price: 87.42, change24h: 2.31,
    explanation: "Supply disruption fears from Strait of Hormuz tensions. OPEC+ maintaining cuts. Strategic petroleum reserves at multi-year lows globally.",
    riskFactors: ["Demand destruction", "SPR release", "Production surge"],
    correlatedAssets: ["XLE", "BNO", "USO"],
  },
  {
    id: "4", name: "EUR/USD", ticker: "EUR/USD", assetClass: "Forex", region: "Europe",
    signal: "HOLD", confidence: 54, uncertainty: 31, price: 1.0723, change24h: -0.12,
    explanation: "ECB-Fed policy divergence creating cross-currents. European energy vulnerability offset by improving trade balance. Range-bound until next catalyst.",
    riskFactors: ["ECB surprise cut", "Energy crisis escalation", "Political instability"],
    correlatedAssets: ["DXY", "GBP/USD", "EUR/CHF"],
  },
  {
    id: "5", name: "Bitcoin", ticker: "BTC/USD", assetClass: "Crypto", region: "North America",
    signal: "HOLD", confidence: 58, uncertainty: 28, price: 67842.00, change24h: -1.54,
    explanation: "Institutional flows slowing post-ETF euphoria. Macro uncertainty creating vol compression. Hash rate stable, on-chain metrics neutral.",
    riskFactors: ["Regulatory crackdown", "Exchange solvency event", "Whale distribution"],
    correlatedAssets: ["ETH/USD", "SOL/USD", "MSTR"],
  },
  {
    id: "6", name: "10Y Treasury", ticker: "TNX", assetClass: "Bonds", region: "North America",
    signal: "BUY", confidence: 76, uncertainty: 12, price: 4.31, change24h: -0.04,
    explanation: "Flight-to-quality driving yields lower. Market pricing in rate cuts. Duration risk decreasing as peak rates appear established.",
    riskFactors: ["Inflation surprise", "Fiscal deficit expansion", "Foreign selling"],
    correlatedAssets: ["TLT", "IEF", "AGG"],
  },
  {
    id: "7", name: "Nikkei 225", ticker: "NKY", assetClass: "Equities", region: "Asia Pacific",
    signal: "SELL", confidence: 68, uncertainty: 22, price: 38472.00, change24h: -1.92,
    explanation: "Yen carry trade unwinding risk elevated. China spillover concerns. BOJ normalization path creating uncertainty for export-heavy components.",
    riskFactors: ["BOJ reversal", "Yen weakening", "China stimulus"],
    correlatedAssets: ["EWJ", "USD/JPY", "TOPIX"],
  },
  {
    id: "8", name: "Natural Gas", ticker: "NG=F", assetClass: "Commodities", region: "Europe",
    signal: "BUY", confidence: 74, uncertainty: 16, price: 3.42, change24h: 3.87,
    explanation: "European storage drawdowns accelerating. LNG shipping constraints. Winter demand forecast above 5-year average.",
    riskFactors: ["Mild weather", "Renewable output surge", "Demand destruction"],
    correlatedAssets: ["UNG", "BOIL", "XLE"],
  },
]

export const timelineEvents: TimelineEvent[] = [
  { id: "1", timestamp: "2026-03-02T08:00:00Z", title: "Strait of Hormuz Naval Buildup", severity: "critical", region: "Middle East", impact: 92, description: "Multiple carrier groups repositioning near strategic chokepoint" },
  { id: "2", timestamp: "2026-03-02T06:30:00Z", title: "ECB Emergency Rate Meeting Called", severity: "high", region: "Europe", impact: 78, description: "Unscheduled meeting amid sovereign spread widening" },
  { id: "3", timestamp: "2026-03-02T04:15:00Z", title: "Taiwan Strait Aerial Incursions", severity: "high", region: "Asia Pacific", impact: 85, description: "Record number of military aircraft detected in ADIZ" },
  { id: "4", timestamp: "2026-03-01T22:00:00Z", title: "US Fed Emergency Liquidity Facility", severity: "high", region: "North America", impact: 71, description: "New backstop facility for systemically important institutions" },
  { id: "5", timestamp: "2026-03-01T18:45:00Z", title: "OPEC+ Emergency Production Cut", severity: "medium", region: "Middle East", impact: 65, description: "Additional 500k bbl/day cut announced" },
  { id: "6", timestamp: "2026-03-01T14:20:00Z", title: "Rare Earth Export Restrictions", severity: "medium", region: "Asia Pacific", impact: 58, description: "New export controls on critical minerals for semiconductor manufacturing" },
  { id: "7", timestamp: "2026-03-01T10:00:00Z", title: "EU Energy Emergency Protocol", severity: "medium", region: "Europe", impact: 52, description: "Stage 2 energy emergency activated across member states" },
  { id: "8", timestamp: "2026-03-01T06:30:00Z", title: "Cyber Attack on SWIFT Network", severity: "critical", region: "North America", impact: 88, description: "Coordinated DDoS attack causing intermittent settlement delays" },
  { id: "9", timestamp: "2026-02-28T20:00:00Z", title: "Latin America Debt Crisis Contagion", severity: "low", region: "Latin America", impact: 42, description: "Credit default swaps widening across EM sovereign debt" },
  { id: "10", timestamp: "2026-02-28T15:00:00Z", title: "African Union Trade Pact Collapse", severity: "low", region: "Africa", impact: 35, description: "Key continental trade agreement ratification stalled" },
]

export const defaultScenarioParams: ScenarioParams = {
  oilPriceShock: 0,
  interestRateChange: 0,
  geopoliticalEscalation: 50,
  supplyChainDisruption: 30,
  cyberThreatLevel: 40,
}

export const portfolioAssets: PortfolioAsset[] = [
  { ticker: "SPY", name: "S&P 500 ETF", allocation: 30, exposure: 28.5, stressImpact: -12.4, signal: "SELL" },
  { ticker: "TLT", name: "20+ Year Treasury", allocation: 20, exposure: 19.8, stressImpact: 4.2, signal: "BUY" },
  { ticker: "GLD", name: "Gold ETF", allocation: 15, exposure: 16.2, stressImpact: 8.7, signal: "BUY" },
  { ticker: "EEM", name: "Emerging Markets", allocation: 10, exposure: 8.9, stressImpact: -18.3, signal: "SELL" },
  { ticker: "USO", name: "Oil Fund", allocation: 10, exposure: 11.4, stressImpact: 15.6, signal: "BUY" },
  { ticker: "BTC", name: "Bitcoin", allocation: 8, exposure: 9.1, stressImpact: -7.2, signal: "HOLD" },
  { ticker: "UUP", name: "US Dollar Index", allocation: 7, exposure: 6.1, stressImpact: 3.1, signal: "BUY" },
]

export const globePoints: GlobePoint[] = [
  { lat: 38.9072, lng: -77.0369, size: 0.8, color: "#f59e0b", label: "Washington D.C.", region: "North America", tensionScore: 62 },
  { lat: 51.5074, lng: -0.1278, size: 0.7, color: "#f59e0b", label: "London", region: "Europe", tensionScore: 58 },
  { lat: 48.8566, lng: 2.3522, size: 0.6, color: "#0ea5e9", label: "Paris", region: "Europe", tensionScore: 45 },
  { lat: 52.5200, lng: 13.4050, size: 0.6, color: "#0ea5e9", label: "Berlin", region: "Europe", tensionScore: 42 },
  { lat: 35.6762, lng: 139.6503, size: 0.9, color: "#ef4444", label: "Tokyo", region: "Asia Pacific", tensionScore: 78 },
  { lat: 39.9042, lng: 116.4074, size: 1.0, color: "#ef4444", label: "Beijing", region: "Asia Pacific", tensionScore: 85 },
  { lat: 25.2048, lng: 55.2708, size: 0.85, color: "#ef4444", label: "Dubai", region: "Middle East", tensionScore: 82 },
  { lat: 24.7136, lng: 46.6753, size: 0.9, color: "#ef4444", label: "Riyadh", region: "Middle East", tensionScore: 89 },
  { lat: 1.3521, lng: 103.8198, size: 0.5, color: "#22c55e", label: "Singapore", region: "Asia Pacific", tensionScore: 35 },
  { lat: -23.5505, lng: -46.6333, size: 0.6, color: "#f59e0b", label: "Sao Paulo", region: "Latin America", tensionScore: 48 },
  { lat: 19.4326, lng: -99.1332, size: 0.5, color: "#0ea5e9", label: "Mexico City", region: "Latin America", tensionScore: 38 },
  { lat: 55.7558, lng: 37.6173, size: 0.95, color: "#ef4444", label: "Moscow", region: "Europe", tensionScore: 91 },
  { lat: 28.6139, lng: 77.2090, size: 0.7, color: "#f59e0b", label: "New Delhi", region: "Asia Pacific", tensionScore: 55 },
  { lat: -33.8688, lng: 151.2093, size: 0.4, color: "#22c55e", label: "Sydney", region: "Asia Pacific", tensionScore: 28 },
  { lat: 25.0340, lng: 121.5645, size: 0.95, color: "#ef4444", label: "Taipei", region: "Asia Pacific", tensionScore: 88 },
  { lat: 37.5665, lng: 126.9780, size: 0.7, color: "#f59e0b", label: "Seoul", region: "Asia Pacific", tensionScore: 65 },
]

export const globeArcs: GlobeArc[] = [
  { startLat: 38.9072, startLng: -77.0369, endLat: 51.5074, endLng: -0.1278, color: "#00e5ff", label: "US-UK Intel", intensity: 0.8 },
  { startLat: 39.9042, startLng: 116.4074, endLat: 25.0340, endLng: 121.5645, color: "#ef4444", label: "PRC-Taiwan", intensity: 1.0 },
  { startLat: 24.7136, startLng: 46.6753, endLat: 55.7558, endLng: 37.6173, color: "#f59e0b", label: "OPEC Corridor", intensity: 0.7 },
  { startLat: 35.6762, startLng: 139.6503, endLat: 38.9072, endLng: -77.0369, color: "#0ea5e9", label: "Pacific Trade", intensity: 0.6 },
  { startLat: 51.5074, startLng: -0.1278, endLat: 25.2048, endLng: 55.2708, color: "#f59e0b", label: "Energy Route", intensity: 0.85 },
  { startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, color: "#22c55e", label: "APAC Trade", intensity: 0.4 },
  { startLat: 55.7558, startLng: 37.6173, endLat: 39.9042, endLng: 116.4074, color: "#ef4444", label: "Sino-Russia", intensity: 0.9 },
  { startLat: 28.6139, startLng: 77.2090, endLat: 24.7136, endLng: 46.6753, color: "#f59e0b", label: "Energy Import", intensity: 0.65 },
]

// ─── GTI History for sparkline (deterministic) ───────────────────
export const gtiHistory: { time: string; value: number }[] = Array.from({ length: 48 }, (_, i) => {
  // Deterministic pseudo-random based on index
  const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453
  const pseudoRandom = seed - Math.floor(seed)
  return {
    time: `${48 - i}h`,
    value: 55 + Math.sin(i / 4) * 10 + pseudoRandom * 8 + (i > 30 ? (i - 30) * 0.8 : 0),
  }
}).reverse()
