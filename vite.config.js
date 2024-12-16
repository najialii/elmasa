import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/categories': 'http://localhost:8000', // Redirect /categories API requests to backend
    }
  },  
  plugins: [react()],
  
})
