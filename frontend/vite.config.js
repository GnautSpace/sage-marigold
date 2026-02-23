/* eslint-disable no-unused-vars */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true, // Needed for IDX to expose the server
    allowedHosts: [
      '.cloudworkstations.dev',
      'localhost',
      '127.0.0.1'
    ],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        // This ensures /api/auth/login stays exactly as is 
        // when sent to the backend
        rewrite: (path) => path 
      }
    }
  },
  // This part is crucial for Cloud IDEs
  hmr: {
    clientPort: 443 
  }
})