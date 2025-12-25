import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://nta-backend-re6q.onrender.com',
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target: 'https://nta-backend-re6q.onrender.com',
          changeOrigin: true,
          secure: false,
        }
      }
    }
})
