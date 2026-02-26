import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ — configuración de Vite
export default defineConfig({
  plugins: [react()],
})
