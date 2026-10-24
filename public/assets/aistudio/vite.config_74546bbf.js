import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // One copy of React, always. Claimed template projects crashed on first
    // boot ("useState of null" -> white screen) when Vite's pre-bundle cache
    // held a second React copy; the white screen then triggered the credit-
    // spending auto-fix on a site that was never broken.
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // 'react-dom/client' must be listed alongside 'react-dom'. Vite pre-bundles
    // per entry point, so leaving the subpath out let it be resolved separately
    // and pull in a SECOND copy of React — which is what produced
    // "ReactDOM.createRoot(...).render is not a function" on fresh projects.
    include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
  },
})