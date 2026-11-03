import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { useStore } from '@/shared/state/store'

export const useGti = () => {
    return useQuery({
        queryKey: ['gti'],
        queryFn: api.getGti,
        refetchInterval: 15000,
        staleTime: 10000,
    })
}

export const useSignals = () => {
    return useQuery({
        queryKey: ['signals'],
        queryFn: api.getSignals,
        refetchInterval: 30000,
        staleTime: 20000,
    })
}

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: api.getEvents,
        refetchInterval: 30000,
        staleTime: 25000,
    })
}

export const useGlobeCountries = () => {
    return useQuery({
        queryKey: ['globe-countries'],
        queryFn: api.getGlobeCountries,
        refetchInterval: 30000,
        staleTime: 20000,
    })
}

export const useEnhancedSignals = (region?: string) => {
    return useQuery({
        queryKey: ['enhanced-signals', region ?? 'all'],
        queryFn: () => api.getEnhancedSignals(region),
        refetchInterval: 60000,
        staleTime: 45000,
    })
}

export const useLivePrices = (symbols: string[]) => {
    const uniqueSymbols = Array.from(new Set(symbols.map(s => s.toUpperCase()))).sort()
    const refreshSeconds = useStore(s => s.preferences.refreshIntervalSeconds)
    const intervalMs = Math.max(5000, refreshSeconds * 1000)
    return useQuery({
        queryKey: ['live-prices', uniqueSymbols.join(','), refreshSeconds],
        queryFn: () => api.getLivePrices(uniqueSymbols),
        enabled: uniqueSymbols.length > 0,
        refetchInterval: intervalMs,
        staleTime: Math.min(3000, intervalMs),
    })
}

export const useSimulateScenario = () => {
    return useMutation({
        mutationFn: api.simulateScenario
    })
}

export const useEvaluatePortfolio = () => {
    return useMutation({
        mutationFn: api.evaluatePortfolio
    })
}

// ── Cart / email-keyed portfolio hooks ────────────────────────────────────────

export const useCart = (email: string | null) => {
    return useQuery({
        queryKey: ['cart', email],
        queryFn: () => api.getCart(email!),
        enabled: !!email,
        staleTime: 30000,
    })
}

export const useSaveCart = (email: string | null) => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ holdings, name }: { holdings: any[]; name?: string }) =>
            api.saveCart(email!, holdings, name),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cart', email] })
        },
    })
}

export const usePortfolioRisk = () => {
    return useMutation({
        mutationFn: (email: string) => api.getPortfolioRisk(email),
    })
}

// The backend caches each asset class for 10–60s depending on how expensive its
// upstream is, so polling faster than this only returns the same payload.
const MARKET_REFETCH_MS = 15000

function useMarketRefetchMs() {
    const refreshSeconds = useStore(s => s.preferences.refreshIntervalSeconds)
    return Math.max(MARKET_REFETCH_MS, refreshSeconds * 1000)
}

export const useAllMarkets = () => {
    const intervalMs = useMarketRefetchMs()
    return useQuery({
        queryKey: ['all-markets'],
        queryFn: api.getAllMarkets,
        refetchInterval: intervalMs,
        staleTime: intervalMs,
        // Keep the previous asset list on screen while a refetch is in flight.
        placeholderData: prev => prev,
    })
}

export const useNewsTicker = () => {
    return useQuery({
        queryKey: ['news-ticker'],
        queryFn: api.getNewsTicker,
        refetchInterval: 15000,
        staleTime: 10000,
        placeholderData: prev => prev,
    })
}

export const useMarketsByClass = (assetClass: string) => {
    const normalized = assetClass.toLowerCase()
    const intervalMs = useMarketRefetchMs()
    return useQuery({
        queryKey: ['markets', normalized],
        queryFn: () => api.getMarketsByClass(normalized),
        refetchInterval: intervalMs,
        staleTime: intervalMs,
        placeholderData: prev => prev,
    })
}
