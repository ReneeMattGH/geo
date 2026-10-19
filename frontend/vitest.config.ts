import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
        // Playwright specs live in tests/ and are run by `npm run e2e`; without
        // this they are picked up by vitest and fail under the jsdom runner.
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        exclude: ['**/node_modules/**', 'tests/**', 'dist/**', 'frontend_old/**'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
})
