import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // The three/deck/maplibre chunks are intentionally this big and are only
    // fetched by the 3D views; the default 500 kB warning is pure noise here.
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // The 3D/geo stacks are large and change far less often than app code;
        // isolating them keeps them in the browser cache across deploys.
        manualChunks: {
          three: ['three', 'three-globe', 'react-globe.gl', '@react-three/fiber', '@react-three/drei'],
          deck: ['@deck.gl/core', '@deck.gl/layers', '@deck.gl/aggregation-layers', '@deck.gl/geo-layers', '@deck.gl/mesh-layers', '@deck.gl/react', 'deck.gl'],
          maplibre: ['maplibre-gl'],
          charts: ['lightweight-charts', 'd3'],
        },
      },
    },
  },
})
