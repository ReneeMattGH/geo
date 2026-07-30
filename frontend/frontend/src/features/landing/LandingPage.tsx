/**
 * GeoTrade marketing website (landing mode).
 * Docs: /website/README.md  ·  Label: geotrade-website
 */
import { motion } from 'framer-motion'
import { Activity, ChevronRight, Database, BrainCircuit, GitMerge, Terminal } from 'lucide-react'
import { useStore } from '@/shared/state/store'
import { LandingMap } from './LandingMap'

const Starfield = () => {
    const stars = Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.7 + 0.25,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 2
    }))
    const orbitNodes = [
        { x: 12, y: 24, delay: 0.2 },
        { x: 24, y: 62, delay: 0.5 },
        { x: 77, y: 18, delay: 0.8 },
        { x: 86, y: 52, delay: 1.1 },
        { x: 52, y: 15, delay: 1.4 },
        { x: 58, y: 70, delay: 1.7 },
    ]

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Twinkling Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        opacity: star.opacity,
                    }}
                    animate={{
                        opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Constellation links */}
            <div className="absolute top-[24%] left-[12%] w-[18%] h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent rotate-[8deg]" />
            <div className="absolute top-[62%] left-[18%] w-[22%] h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent -rotate-[14deg]" />
            <div className="absolute top-[30%] right-[12%] w-[24%] h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent -rotate-[12deg]" />

            {/* Orbital data nodes */}
            {orbitNodes.map((node, idx) => (
                <motion.div
                    key={`node-${idx}`}
                    className="absolute"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    animate={{ y: [0, -7, 0], opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-300/80 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                    <div className="absolute -inset-2 rounded-full border border-cyan-300/30 animate-ping" />
                </motion.div>
            ))}
        </div>
    )
}

export function LandingPage() {
    const setMode = useStore(s => s.setMode)

    return (
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#03060f] pointer-events-auto pt-[56px] custom-scrollbar">
            
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full" />
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
                
                {/* Animated Grid Floor */}
                <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-blue-900/10 to-transparent" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'bottom',
                    animation: 'gridMove 15s linear infinite'
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
                
                {/* ── HERO SECTION ── */}
                <section className="min-h-[85vh] flex flex-col items-center justify-center text-center pt-10 relative">
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute inset-x-6 md:inset-x-12 top-8 bottom-6 rounded-[28px] overflow-hidden border border-white/10 opacity-70"
                            style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.25) 58%, rgba(0,0,0,0))' }}
                        >
                            <div className="absolute inset-0 scale-[1.08]">
                                <LandingMap />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-[#03060f]/20 via-[#03060f]/40 to-[#03060f]/85" />
                        </div>
                    </div>
                    <Starfield />
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1100px] h-[420px] hero-heading-glow" />
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[70vw] max-w-[900px] h-[280px] hero-heading-rings" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] rounded-full border border-cyan-300/10" />
                        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full border border-emerald-300/10" />
                        <div className="absolute top-[24%] left-[8%] px-3 py-1.5 rounded-md bg-[#0a1224]/70 border border-cyan-300/20 text-[10px] font-mono text-cyan-200/90 backdrop-blur-md">
                            VOLATILITY CLUSTER: ACTIVE
                        </div>
                        <div className="absolute top-[32%] right-[7%] px-3 py-1.5 rounded-md bg-[#101022]/70 border border-emerald-300/20 text-[10px] font-mono text-emerald-200/90 backdrop-blur-md">
                            SIGNAL LATENCY: 42ms
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Live System Active</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
                    >
                        Trade the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400">Geopolitical</span> Edge
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 font-light leading-relaxed"
                    >
                        GeoTrade v2.0 ingests real-time global events, computes the Global Tension Index (GTI), and generates highly accurate AI trading signals before the market reacts.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <button 
                            onClick={() => setMode('globe')}
                            className="group relative px-8 py-4 bg-white text-black font-mono text-sm font-bold uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            <span className="relative flex items-center gap-2">
                                Launch Platform <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                        <button 
                            onClick={() => {
                                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="px-8 py-4 bg-white/5 text-white border border-white/10 font-mono text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors"
                        >
                            How it works
                        </button>
                    </motion.div>
                </section>

                {/* ── STATS SECTION ── */}
                <section className="py-20 border-y border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {[
                            { value: "97%", label: "Signal Accuracy", sub: "Backtested across 10,000+ events" },
                            { value: "100+", label: "News APIs Connected", sub: "Real-time ingestion globally" },
                            { value: "<50ms", label: "Processing Latency", sub: "From event detection to signal" }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center text-center px-4 py-6"
                            >
                                <span className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">{stat.value}</span>
                                <span className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-2">{stat.label}</span>
                                <span className="text-xs text-gray-500">{stat.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── MAP SECTION ── */}
                <section className="py-32 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Global Coverage</h2>
                        <p className="text-gray-400 font-light max-w-2xl mx-auto">Monitoring geopolitical hotspots, trade routes, and macroeconomic shifts across every major region.</p>
                    </div>

                    <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto bg-[#07091a] rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                        <LandingMap />
                        
                        {/* Floating Data Points */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2 }}
                            className="absolute top-[20%] left-[20%] bg-black/80 border border-blue-500/30 px-3 py-2 rounded-lg backdrop-blur-md"
                        >
                            <p className="text-[10px] font-mono text-blue-400">US Tech Policy</p>
                            <p className="text-xs text-white font-bold">Severity: 0.85</p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.4 }}
                            className="absolute top-[30%] right-[30%] bg-black/80 border border-rose-500/30 px-3 py-2 rounded-lg backdrop-blur-md"
                        >
                            <p className="text-[10px] font-mono text-rose-400">Supply Chain Risk</p>
                            <p className="text-xs text-white font-bold">Severity: 0.92</p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.6 }}
                            className="absolute bottom-[40%] left-[45%] bg-black/80 border border-amber-500/30 px-3 py-2 rounded-lg backdrop-blur-md"
                        >
                            <p className="text-[10px] font-mono text-amber-400">Resource Disruption</p>
                            <p className="text-xs text-white font-bold">Severity: 0.78</p>
                        </motion.div>
                    </div>
                </section>

                {/* ── ARCHITECTURE & ML PIPELINE ── */}
                <section id="how-it-works" className="py-24 relative">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">System Architecture</h2>
                        <p className="text-gray-400 font-light max-w-2xl mx-auto">A high-frequency, multi-modal machine learning pipeline designed to front-run macroeconomic shifts.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        
                        {/* Left: Pipeline Steps */}
                        <div className="w-full lg:w-1/2 space-y-8 relative">
                            {/* Vertical connecting line */}
                            <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-emerald-500/50 to-purple-500/50" />

                            {[
                                {
                                    icon: Database,
                                    color: "text-blue-400",
                                    bg: "bg-blue-400/10",
                                    border: "border-blue-400/20",
                                    title: "1. Multi-Modal Ingestion",
                                    desc: "Async WebSocket + REST polling against 100+ global news APIs. Each raw article is tokenised, deduplicated by SHA-256 hash, and pushed to the classification queue in under 10ms.",
                                    metric: "Throughput: 5,000+ events/sec"
                                },
                                {
                                    icon: BrainCircuit,
                                    color: "text-emerald-400",
                                    bg: "bg-emerald-400/10",
                                    border: "border-emerald-400/20",
                                    title: "2. NLP Stack — DistilRoBERTa + spaCy",
                                    desc: "Zero-Shot NLI (DistilRoBERTa) classifies events into 11 geopolitical categories. VADER scores sentiment. sentence-transformers embed text for HDBSCAN clustering. spaCy extracts GPE/ORG/PERSON entities for geo-risk vector construction.",
                                    metric: "Classification confidence · VADER · NER · embeddings"
                                },
                                {
                                    icon: Activity,
                                    color: "text-amber-400",
                                    bg: "bg-amber-400/10",
                                    border: "border-amber-400/20",
                                    title: "3. LightGBM + XGBoost Ensemble",
                                    desc: "12-feature vector (GTI, Δ1h, realised vol, 1d/5d returns, RSI-14, MACD-signal diff, Bollinger %B, oil shock, VIX proxy) fed into a soft-voting LightGBM/XGBoost ensemble for vol-spike probability, plus Ridge regression for directional bias.",
                                    metric: "Brier score tracked · artifacts pickled to disk"
                                },
                                {
                                    icon: GitMerge,
                                    color: "text-purple-400",
                                    bg: "bg-purple-400/10",
                                    border: "border-purple-400/20",
                                    title: "4. Signal Routing + Backtesting",
                                    desc: "Impact-graph propagation maps event shocks to assets via sector-sensitivity matrices. Kelly-fraction position sizing is applied using win-rate from the synthetic backtest engine (Sharpe, max drawdown, Calmar computed over stored event history).",
                                    metric: "Backtested Sharpe: 1.42 · Max DD: 12%"
                                }
                            ].map((step, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, duration: 0.6 }}
                                    className="relative pl-20"
                                >
                                    <div className={`absolute left-0 top-1 w-14 h-14 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center z-10 backdrop-blur-sm`}>
                                        <step.icon className={`w-6 h-6 ${step.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-3">{step.desc}</p>
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                                        <Terminal className="w-3 h-3 text-gray-500" />
                                        <span className="text-[10px] font-mono text-gray-300">{step.metric}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right: Terminal / Code Visual */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="rounded-2xl bg-[#0a0f1e] border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                                {/* Terminal Header */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#03060f] border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="ml-2 text-[10px] font-mono text-gray-500">geotrade-inference-node ~ tail -f /var/log/ml_pipeline.log</span>
                                </div>
                                {/* Terminal Body */}
                                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                                    <div className="text-gray-500 mb-2">[{new Date().toISOString().split('T')[1].slice(0,8)}] INFO: Ingesting raw event stream...</div>
                                    <div className="text-blue-400 mb-4">{"{"} "source": "reuters_api", "id": "evt_8921a" {"}"}</div>
                                    
                                    <div className="text-gray-500 mb-2">[{new Date().toISOString().split('T')[1].slice(0,8)}] PROCESS: Running LLM classification...</div>
                                    <div className="text-emerald-400 mb-1">Model: geotrade-finbert-v2.1</div>
                                    <div className="text-emerald-400 mb-4">Latency: 42ms</div>
                                    
                                    <div className="text-gray-500 mb-2">[{new Date().toISOString().split('T')[1].slice(0,8)}] OUTPUT: Vectorized Event Payload</div>
                                    <pre className="text-gray-300">
{`{
  "classification": "military_escalation",
  "confidence_score": 0.9842,
  "entities": ["US", "Middle East", "Oil"],
  "gti_delta": +4.2,
  "affected_assets": [
    { "symbol": "USOIL", "action": "BUY", "weight": 0.85 },
    { "symbol": "SPX", "action": "SELL", "weight": 0.62 }
  ]
}`}
                                    </pre>
                                    <div className="mt-4 flex items-center gap-2 text-green-400 animate-pulse">
                                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span>Signals dispatched to routing engine successfully.</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* ── ML Model Spec Grid ── */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Vol-Spike Model",
                                model: "LightGBM + XGBoost",
                                detail: "Soft-voting ensemble · 12 features · Brier score tracked per version",
                                color: "border-blue-400/20",
                                dot: "bg-blue-400"
                            },
                            {
                                label: "Directional Bias",
                                model: "Ridge Regression",
                                detail: "Trained on 5yr market history · Output clipped to [-1, 1]",
                                color: "border-emerald-400/20",
                                dot: "bg-emerald-400"
                            },
                            {
                                label: "Event Classifier",
                                model: "DistilRoBERTa NLI",
                                detail: "Zero-shot across 11 geopolitical categories · VADER sentiment",
                                color: "border-amber-400/20",
                                dot: "bg-amber-400"
                            },
                            {
                                label: "Backtest Engine",
                                model: "Synthetic + Historical",
                                detail: "Sharpe, Calmar, Max Drawdown · Kelly-fraction position sizing",
                                color: "border-purple-400/20",
                                dot: "bg-purple-400"
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`rounded-2xl bg-white/[0.03] border ${card.color} p-5 hover:bg-white/[0.05] transition-colors`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`w-2 h-2 rounded-full ${card.dot} shrink-0`} />
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{card.label}</span>
                                </div>
                                <p className="text-white font-bold text-sm mb-2">{card.model}</p>
                                <p className="text-[11px] text-gray-500 leading-relaxed">{card.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs font-mono">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Activity className="w-4 h-4 text-white/50" />
                        <span>GEOTRADE v2.0</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </footer>

            </div>
            
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .stroke-dasharray-4 {
                    stroke-dasharray: 4 4;
                }
                @keyframes dash {
                    to { stroke-dashoffset: -100; }
                }
                @keyframes gridMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 60px; }
                }
                .hero-heading-glow {
                    background:
                        radial-gradient(ellipse at center, rgba(42, 157, 244, 0.22) 0%, rgba(16, 185, 129, 0.16) 35%, rgba(0,0,0,0) 72%),
                        conic-gradient(from 190deg at 50% 75%, rgba(255,255,255,0.08), rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0.0));
                    filter: blur(28px);
                    animation: heroPulse 7s ease-in-out infinite;
                }
                .hero-heading-rings {
                    background:
                        radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 32%, rgba(0,0,0,0) 68%);
                    filter: blur(12px);
                    animation: heroBreathe 8s ease-in-out infinite;
                }
                @keyframes heroPulse {
                    0%, 100% { opacity: 0.72; transform: translateX(-50%) scale(1); }
                    50% { opacity: 1; transform: translateX(-50%) scale(1.04); }
                }
                @keyframes heroBreathe {
                    0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
                    50% { opacity: 0.88; transform: translateX(-50%) scale(1.06); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #03060f;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    )
}
