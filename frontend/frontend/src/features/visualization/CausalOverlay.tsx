import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap, AlertTriangle, DollarSign } from 'lucide-react'

interface CausalNode {
    id: string;
    type: 'country' | 'sector' | 'asset';
    name: string;
    position: { x: number; y: number };
    impact: number; // -1 to 1
    confidence: number; // 0 to 1
}

interface CausalLink {
    source: string;
    target: string;
    strength: number; // 0 to 1
    delay: number; // milliseconds
    type: 'positive' | 'negative' | 'neutral';
}

interface CausalOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export function CausalOverlay({ isVisible, onClose }: CausalOverlayProps) {
    const [activeNodes, setActiveNodes] = useState<string[]>([]);
    const [propagationStep, setPropagationStep] = useState(0);
    const [nodes, setNodes] = useState<CausalNode[]>([]);
    const [links, setLinks] = useState<CausalLink[]>([]);

    // Fetch causal network data from backend
    useEffect(() => {
        if (!isVisible) return;

        const fetchCausalData = async () => {
            try {
                // Fetch causal network data from backend API
                const response = await fetch('/api/v1/globe/causal-network');
                if (response.ok) {
                    const data = await response.json();
                    setNodes(data.nodes || []);
                    setLinks(data.links || []);
                } else {
                    // If API not available, show empty state
                    setNodes([]);
                    setLinks([]);
                }
            } catch (error) {
                console.error('Error fetching causal network data:', error);
                setNodes([]);
                setLinks([]);
            }
        };

        fetchCausalData();
    }, [isVisible]);

    // Animation sequence
    useEffect(() => {
        if (!isVisible) return;

        const sequence = async () => {
            // Reset
            setActiveNodes([]);
            setPropagationStep(0);

            // Step 1: Activate source countries
            await new Promise(resolve => setTimeout(resolve, 500));
            setActiveNodes(['russia', 'ukraine']);
            setPropagationStep(1);

            // Step 2: Propagate to sectors
            await new Promise(resolve => setTimeout(resolve, 1000));
            setActiveNodes(prev => [...prev, 'energy', 'defense', 'commodities']);
            setPropagationStep(2);

            // Step 3: Propagate to assets
            await new Promise(resolve => setTimeout(resolve, 1500));
            setActiveNodes(prev => [...prev, 'oil', 'gas', 'wheat', 'gold']);
            setPropagationStep(3);
        };

        sequence();
    }, [isVisible]);

    const getNodeColor = (node: CausalNode, isActive: boolean) => {
        if (!isActive) return 'rgba(156, 163, 175, 0.3)';

        switch (node.type) {
            case 'country':
                return node.impact < 0 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(34, 197, 94, 0.8)';
            case 'sector':
                return node.impact > 0 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(239, 68, 68, 0.8)';
            case 'asset':
                return node.impact > 0 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
            default:
                return 'rgba(0, 242, 255, 0.8)';
        }
    };

    const getNodeIcon = (type: string, impact: number) => {
        switch (type) {
            case 'country':
                return <AlertTriangle className="h-4 w-4" />;
            case 'sector':
                return impact > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
            case 'asset':
                return <DollarSign className="h-4 w-4" />;
            default:
                return <Zap className="h-4 w-4" />;
        }
    };

    const getLinkOpacity = (link: CausalLink) => {
        const sourceActive = activeNodes.includes(link.source);
        const targetActive = activeNodes.includes(link.target);
        return sourceActive && targetActive ? 0.8 : 0.2;
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="w-[90vw] h-[80vh] bg-[#0a0f1c]/95 border border-white/15 rounded-lg p-6 relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-mono font-bold text-white mb-1">
                                Causal Propagation Analysis
                            </h2>
                            <p className="text-sm text-gray-400 font-mono">
                                Real-time stress propagation from geopolitical events to market assets
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>

                    {/* Causal Network Visualization */}
                    <div className="relative w-full h-full bg-gray-900/20 rounded border border-gray-700/30 overflow-hidden">
                        {/* Background grid */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(0, 242, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0, 242, 255, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '50px 50px'
                            }}
                        />

                        {/* Links */}
                        <svg className="absolute inset-0 w-full h-full">
                            {links.map((link, index) => {
                                const sourceNode = nodes.find(n => n.id === link.source);
                                const targetNode = nodes.find(n => n.id === link.target);
                                if (!sourceNode || !targetNode) return null;

                                const x1 = (sourceNode.position.x / 100) * window.innerWidth * 0.9;
                                const y1 = (sourceNode.position.y / 100) * window.innerHeight * 0.8;
                                const x2 = (targetNode.position.x / 100) * window.innerWidth * 0.9;
                                const y2 = (targetNode.position.y / 100) * window.innerHeight * 0.8;

                                return (
                                    <motion.line
                                        key={`${link.source}-${link.target}`}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={
                                            link.type === 'positive' ? '#22c55e' :
                                                link.type === 'negative' ? '#ef4444' : '#0ea5e9'
                                        }
                                        strokeWidth={link.strength * 3}
                                        strokeOpacity={getLinkOpacity(link)}
                                        strokeDasharray={link.type === 'neutral' ? '5,5' : '0'}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: index * 0.2, duration: 1 }}
                                    />
                                );
                            })}
                        </svg>

                        {/* Nodes */}
                        {nodes.map((node) => {
                            const isActive = activeNodes.includes(node.id);
                            return (
                                <motion.div
                                    key={node.id}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: `${node.position.x}%`,
                                        top: `${node.position.y}%`,
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: isActive ? 1 : 0.7,
                                        opacity: isActive ? 1 : 0.4
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div
                                        className="w-16 h-16 rounded-full border-2 flex items-center justify-center relative"
                                        style={{
                                            backgroundColor: getNodeColor(node, isActive),
                                            borderColor: isActive ? '#ffffff' : 'rgba(156, 163, 175, 0.5)',
                                            boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
                                        }}
                                    >
                                        <span className="text-white">
                                            {getNodeIcon(node.type, node.impact)}
                                        </span>

                                        {/* Impact indicator */}
                                        {isActive && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 border border-white/30 flex items-center justify-center">
                                                <span className="text-xs font-mono text-white">
                                                    {node.impact > 0 ? '+' : ''}{(node.impact * 100).toFixed(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                                        <div className="text-xs font-mono text-white whitespace-nowrap">
                                            {node.name}
                                        </div>
                                        <div className="text-xs font-mono text-gray-400">
                                            {(node.confidence * 100).toFixed(0)}% conf.
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 bg-gray-900/80 border border-gray-600/50 rounded p-3">
                            <h4 className="text-sm font-mono text-white mb-2">Legend</h4>
                            <div className="space-y-1 text-xs font-mono">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-gray-300">Geopolitical Source</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <span className="text-gray-300">Market Sector</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-gray-300">Trading Asset</span>
                                </div>
                            </div>
                        </div>

                        {/* Step indicator */}
                        <div className="absolute bottom-4 right-4 bg-gray-900/80 border border-gray-600/50 rounded p-3">
                            <h4 className="text-sm font-mono text-white mb-2">Propagation Step</h4>
                            <div className="text-2xl font-mono font-bold text-white">
                                {propagationStep}/3
                            </div>
                            <div className="text-xs text-gray-400 font-mono">
                                {propagationStep === 0 && 'Initializing...'}
                                {propagationStep === 1 && 'Geopolitical Events'}
                                {propagationStep === 2 && 'Sector Impact'}
                                {propagationStep === 3 && 'Asset Pricing'}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}