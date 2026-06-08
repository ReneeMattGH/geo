/**
 * PortfolioTracker — Multi-asset portfolio tracking page.
 *
 * Features:
 *  - Browse ALL supported market assets from real backend API
 *  - Add/remove assets to portfolio with live price tracking
 *  - Real-time portfolio value calculations
 *  - Search, filter, and sort functionality
 *  - Professional dark fintech UI with animations
 */
import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Briefcase, Plus, Trash2,
    Search, Filter, ArrowUpDown, PieChart,
    RefreshCw, AlertCircle, X
} from 'lucide-react'
import { useAllMarkets } from '@/shared/api/hooks'

interface MarketAsset {
    symbol: string
    name?: string
    price: number
    change: number
    change_percent?: number
    asset_class: string
    source?: string
    volume?: number
    high_24h?: number
    low_24h?: number
    open_24h?: number
}

interface PortfolioHolding {
    symbol: string
    name?: string
    quantity: number
    avg_price: number
    current_price: number
    asset_class: string
}

type SortOption = 'symbol' | 'price' | 'change' | 'category'
type FilterCategory = 'all' | 'stocks' | 'crypto' | 'forex' | 'commodities' | 'bonds' | 'etfs' | 'indices'

const CATEGORY_COLORS: Record<string, string> = {
    stocks: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
    crypto: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
    forex: 'bg-green-500/20 border-green-500/30 text-green-300',
    commodities: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
    bonds: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
    etfs: 'bg-pink-500/20 border-pink-500/30 text-pink-300',
    indices: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
}

const CATEGORY_LABELS: Record<string, string> = {
    stocks: 'Stocks',
    crypto: 'Crypto',
    forex: 'Forex',
    commodities: 'Commodities',
    bonds: 'Bonds',
    etfs: 'ETFs',
    indices: 'Indices',
}

export function PortfolioTracker() {
    const { data: marketsData, isLoading, error, refetch } = useAllMarkets()
    
    // Portfolio state
    const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([])
    
    // UI state
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all')
    const [sortBy, setSortBy] = useState<SortOption>('symbol')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    
    // Flatten all market assets into a single array
    const allAssets = useMemo(() => {
        if (!marketsData?.data) return []
        
        const assets: MarketAsset[] = []
        const categories = ['stocks', 'crypto', 'forex', 'commodities', 'bonds', 'etfs', 'indices'] as const
        
        categories.forEach(category => {
            const items = marketsData.data[category] || []
            items.forEach((item: any) => {
                if (item.symbol && typeof item.price === 'number') {
                    assets.push({
                        symbol: item.symbol,
                        name: item.name || item.symbol,
                        price: item.price,
                        change: item.change || 0,
                        change_percent: item.change_percent,
                        asset_class: category,
                        source: item.source,
                        volume: item.volume,
                        high_24h: item.high_24h,
                        low_24h: item.low_24h,
                        open_24h: item.open_24h,
                    })
                }
            })
        })
        
        return assets
    }, [marketsData])
    
    // Filter and sort assets
    const filteredAssets = useMemo(() => {
        let filtered = allAssets
        
        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(asset => asset.asset_class === selectedCategory)
        }
        
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(asset =>
                asset.symbol.toLowerCase().includes(query) ||
                (asset.name && asset.name.toLowerCase().includes(query))
            )
        }
        
        // Sorting
        filtered.sort((a, b) => {
            let comparison = 0
            switch (sortBy) {
                case 'symbol':
                    comparison = a.symbol.localeCompare(b.symbol)
                    break
                case 'price':
                    comparison = a.price - b.price
                    break
                case 'change':
                    comparison = (a.change_percent || a.change) - (b.change_percent || b.change)
                    break
                case 'category':
                    comparison = a.asset_class.localeCompare(b.asset_class)
                    break
            }
            return sortOrder === 'asc' ? comparison : -comparison
        })
        
        return filtered
    }, [allAssets, selectedCategory, searchQuery, sortBy, sortOrder])
    
    // Portfolio calculations
    const portfolioStats = useMemo(() => {
        const totalValue = portfolio.reduce((sum, holding) => 
            sum + (holding.quantity * holding.current_price), 0
        )
        
        const totalCost = portfolio.reduce((sum, holding) => 
            sum + (holding.quantity * holding.avg_price), 0
        )
        
        const totalPnL = totalValue - totalCost
        const totalPnLPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0
        
        // Asset allocation
        const allocation = portfolio.map(holding => ({
            symbol: holding.symbol,
            name: holding.name,
            value: holding.quantity * holding.current_price,
            percentage: totalValue > 0 ? ((holding.quantity * holding.current_price) / totalValue) * 100 : 0,
            asset_class: holding.asset_class,
        }))
        
        return {
            totalValue,
            totalCost,
            totalPnL,
            totalPnLPercent,
            allocation,
            assetCount: portfolio.length,
        }
    }, [portfolio])
    
    // Add asset to portfolio
    const addAsset = useCallback((asset: MarketAsset) => {
        const existing = portfolio.find(h => h.symbol === asset.symbol)
        if (existing) {
            // Increase quantity
            setPortfolio(prev => prev.map(h => 
                h.symbol === asset.symbol
                    ? { ...h, quantity: h.quantity + 1, current_price: asset.price }
                    : h
            ))
        } else {
            // Add new holding
            setPortfolio(prev => [...prev, {
                symbol: asset.symbol,
                name: asset.name,
                quantity: 1,
                avg_price: asset.price,
                current_price: asset.price,
                asset_class: asset.asset_class,
            }])
        }
    }, [portfolio])
    
    // Remove asset from portfolio
    const removeAsset = useCallback((symbol: string) => {
        setPortfolio(prev => prev.filter(h => h.symbol !== symbol))
    }, [])
    
    // Update portfolio prices when market data changes
    const updatePortfolioPrices = useCallback(() => {
        if (!allAssets.length) return
        
        setPortfolio(prev => prev.map(holding => {
            const asset = allAssets.find(a => a.symbol === holding.symbol)
            if (asset) {
                return { ...holding, current_price: asset.price }
            }
            return holding
        }))
    }, [allAssets])
    
    // Auto-update portfolio prices when market data refreshes
    useEffect(() => {
        updatePortfolioPrices()
    }, [allAssets, updatePortfolioPrices])
    
    // Handle sort change
    const handleSort = (option: SortOption) => {
        if (sortBy === option) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(option)
            setSortOrder('asc')
        }
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-4 font-mono">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <div>
                    <h3 className="text-base font-bold text-white mb-2">Data Temporarily Unavailable</h3>
                    <p className="text-sm text-gray-400 max-w-md">
                        Unable to fetch market data. Please check your connection and try again.
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                </button>
            </div>
        )
    }
    
    return (
        <div className="h-full flex flex-col bg-[#03060f]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#07091a]/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    <h1 className="text-sm font-bold tracking-widest text-white uppercase">Portfolio Tracker</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => refetch()}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="Refresh prices"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>
            
            {/* Main Content - Two Panel Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Market Asset List */}
                <div className="flex-1 flex flex-col border-r border-white/10 min-w-0">
                    {/* Search and Filters */}
                    <div className="p-4 space-y-3 border-b border-white/10">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-[#07091a]/80 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        
                        {/* Category Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <Filter className="w-4 h-4 text-gray-500" />
                            {(['all', 'stocks', 'crypto', 'forex', 'commodities', 'bonds', 'etfs', 'indices'] as FilterCategory[]).map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                                        selectedCategory === category
                                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {category === 'all' ? 'All' : CATEGORY_LABELS[category]}
                                </button>
                            ))}
                        </div>
                        
                        {/* Sort Options */}
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4 text-gray-500" />
                            <div className="flex gap-1">
                                {(['symbol', 'price', 'change', 'category'] as SortOption[]).map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleSort(option)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all capitalize ${
                                            sortBy === option
                                                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        {option}
                                        {sortBy === option && (
                                            <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Asset List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12 text-gray-500 text-xs">
                                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                Loading market data...
                            </div>
                        ) : filteredAssets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-xs text-center">
                                <Search className="w-8 h-8 mb-2 opacity-50" />
                                <p>No assets found</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <AnimatePresence mode="popLayout">
                                    {filteredAssets.map(asset => (
                                        <motion.div
                                            key={asset.symbol}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="flex items-center justify-between p-3 rounded-lg bg-[#07091a]/60 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className="flex-shrink-0">
                                                    <span className="text-white font-bold text-xs">{asset.symbol}</span>
                                                    {asset.name && asset.name !== asset.symbol && (
                                                        <span className="text-gray-500 text-[10px] ml-1">{asset.name}</span>
                                                    )}
                                                </div>
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${CATEGORY_COLORS[asset.asset_class]}`}>
                                                    {CATEGORY_LABELS[asset.asset_class] || asset.asset_class}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <div className="text-right">
                                                    <p className="text-white font-mono text-xs">${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    <p className={`text-[10px] font-mono ${(asset.change_percent || asset.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                        {(asset.change_percent || asset.change) >= 0 ? '+' : ''}{((asset.change_percent || asset.change) * 100).toFixed(2)}%
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => addAsset(asset)}
                                                    className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all flex-shrink-0"
                                                    title="Add to portfolio"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Right Panel - Portfolio */}
                <div className="w-96 flex flex-col bg-[#07091a]/30 min-w-0">
                    {/* Portfolio Header */}
                    <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <PieChart className="w-4 h-4 text-purple-400" />
                            <h2 className="text-xs font-bold tracking-widest text-white uppercase">My Portfolio</h2>
                            <span className="ml-auto text-[10px] text-gray-500">{portfolioStats.assetCount} assets</span>
                        </div>
                        
                        {/* Portfolio Stats */}
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                                <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Total Value</p>
                                <p className="text-xl font-bold text-white font-mono">
                                    ${portfolioStats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-lg bg-[#07091a]/80 border border-white/10">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Total P/L</p>
                                    <p className={`text-sm font-bold font-mono ${portfolioStats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {portfolioStats.totalPnL >= 0 ? '+' : ''}${portfolioStats.totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#07091a]/80 border border-white/10">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">P/L %</p>
                                    <p className={`text-sm font-bold font-mono ${portfolioStats.totalPnLPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {portfolioStats.totalPnLPercent >= 0 ? '+' : ''}{portfolioStats.totalPnLPercent.toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Asset Allocation */}
                    {portfolioStats.allocation.length > 0 && (
                        <div className="p-4 border-b border-white/10">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Asset Allocation</p>
                            <div className="space-y-2">
                                {portfolioStats.allocation.map(item => (
                                    <div key={item.symbol} className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-400 w-16 truncate">{item.symbol}</span>
                                        <div className="flex-1 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${CATEGORY_COLORS[item.asset_class]?.split(' ')[0] || 'bg-purple-500'}`}
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-400 w-10 text-right">{item.percentage.toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Portfolio Holdings */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {portfolio.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-xs text-center">
                                <Briefcase className="w-8 h-8 mb-2 opacity-50" />
                                <p>Your portfolio is empty</p>
                                <p className="text-[10px] mt-1">Add assets from the list to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <AnimatePresence mode="popLayout">
                                    {portfolio.map(holding => {
                                        const currentValue = holding.quantity * holding.current_price
                                        const costBasis = holding.quantity * holding.avg_price
                                        const pnl = currentValue - costBasis
                                        const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0
                                        
                                        return (
                                            <motion.div
                                                key={holding.symbol}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.15 }}
                                                className="p-3 rounded-lg bg-[#07091a]/80 border border-white/10 group"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white font-bold text-xs">{holding.symbol}</span>
                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${CATEGORY_COLORS[holding.asset_class]}`}>
                                                            {CATEGORY_LABELS[holding.asset_class] || holding.asset_class}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeAsset(holding.symbol)}
                                                        className="p-1 rounded hover:bg-red-500/10 hover:text-red-400 text-gray-600 transition-all opacity-0 group-hover:opacity-100"
                                                        title="Remove from portfolio"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                                    <div>
                                                        <p className="text-gray-500">Quantity</p>
                                                        <p className="text-white font-mono">{holding.quantity}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Avg Price</p>
                                                        <p className="text-white font-mono">${holding.avg_price.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Current Price</p>
                                                        <p className="text-white font-mono">${holding.current_price.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Total Value</p>
                                                        <p className="text-white font-mono">${currentValue.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                                                    <span className="text-[9px] text-gray-500">Unrealized P/L</span>
                                                    <span className={`text-[10px] font-mono font-semibold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
