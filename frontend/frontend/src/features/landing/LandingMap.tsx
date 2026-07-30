/** GeoTrade marketing website — world map. See /website/README.md */
import { useState, useEffect, useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { api } from '@/shared/api/client'

const INITIAL_VIEW = { longitude: 0, latitude: 20, zoom: 1.2, pitch: 0, bearing: 0 }

export function LandingMap() {
    const [geojson, setGeojson] = useState<any>(null)
    const [countryData, setCountryData] = useState<any>(null)

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(r => r.json()).then(setGeojson).catch(() => { })
        
        api.getGlobeCountries().then(setCountryData).catch(() => {})
    }, [])

    const riskLookup = useMemo<Record<string, number>>(() => {
        if (!countryData?.countries) return {}
        return Object.fromEntries(countryData.countries.map((c: any) => [c.iso, c.gti_score]))
    }, [countryData])

    const [hoveredIso, setHoveredIso] = useState<string | null>(null)

    const layers = useMemo(() => {
        if (!geojson) return []

        return [new GeoJsonLayer({
            id: 'landing-countries',
            data: geojson,
            pickable: true,
            stroked: true,
            filled: true,
            getFillColor: (d: any) => {
                const iso = d.properties?.ISO_A2 ?? ''
                const score = riskLookup[iso] ?? (Math.random() * 40 + 10) // random fallback for visuals
                
                const isHovered = iso === hoveredIso
                const alpha = isHovered ? 255 : 120

                if (score >= 80) return [239, 68, 68, alpha]
                if (score >= 60) return [245, 158, 11, alpha]
                if (score >= 35) return [14, 165, 233, alpha]
                return [34, 197, 94, alpha]
            },
            getLineColor: (d: any) => {
                const iso = d.properties?.ISO_A2 ?? ''
                return iso === hoveredIso ? [255, 255, 255, 150] : [255, 255, 255, 30]
            },
            lineWidthMinPixels: 1,
            onHover: (info: any) => {
                setHoveredIso(info.object?.properties?.ISO_A2 || null)
            },
            updateTriggers: {
                getFillColor: [riskLookup, hoveredIso],
                getLineColor: [hoveredIso]
            }
        })]
    }, [geojson, riskLookup, hoveredIso])

    return (
        <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ background: 'radial-gradient(circle at center, #0a1020 0%, #03060f 100%)' }}>
            <DeckGL
                initialViewState={INITIAL_VIEW}
                controller={false}
                layers={layers}
                getCursor={() => hoveredIso ? 'pointer' : 'default'}
            />
        </div>
    )
}
