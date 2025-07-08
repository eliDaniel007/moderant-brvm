import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ignorer les erreurs TypeScript pendant le build
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorer tous les avertissements TypeScript
        if (warning.code === 'TS2307' || warning.code === 'TS2769' || warning.code === 'TS6133') {
          return
        }
        warn(warning)
      }
    }
  },
  esbuild: {
    // Désactiver la vérification TypeScript
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
