import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

const isDocker = process.env.VITE_DOCKER === 'true'

// https://vitejs.dev/config/
export default defineConfig({
	
  plugins: [react(),!isDocker && mkcert({
      savePath: './certs', 
    }),].filter(Boolean),
  server: {
    https: isDocker
      ? {
          key: '/app/certs/dev.pem', 
          cert: '/app/certs/cert.pem',
        }
      : true,
    host: '0.0.0.0',
  },
})
