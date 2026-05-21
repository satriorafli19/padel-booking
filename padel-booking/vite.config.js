import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Konfigurasi modern Vite v5 + Tailwind v4 resmi
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})