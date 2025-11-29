import { defineConfig } from 'vite'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
    base: '/landing-koin-finance/',
    plugins: [
        injectHTML(),
    ],
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    }
})