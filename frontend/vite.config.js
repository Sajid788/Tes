import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Simple Vite configuration with backend API proxy
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://tes-g9jw.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
