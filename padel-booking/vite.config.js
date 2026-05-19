import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi standar React + Vite (Anti-Crash di Vercel)
export default defineConfig({
  plugins: [react()],
})