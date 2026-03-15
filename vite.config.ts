import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@cs.ai/sdk': resolve(__dirname, './sdk/index.ts')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:11434',
        changeOrigin: false
      }
    }
  }
})
