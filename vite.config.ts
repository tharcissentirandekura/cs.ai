import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5498,
    proxy: {
      '/api': {
        target: 'http://ollama.cs.oberlin.edu:11434',
        changeOrigin: true,
        secure: false
      }
    }
  }
})