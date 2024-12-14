import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

const isDocker = process.env.VITE_DOCKER === 'true'

// https://vitejs.dev/config/
export default defineConfig({
	
  plugins: [react(), mkcert({
      savePath: './certs', 
    }),].filter(Boolean),
  server: {
    https: {
          key: '/app/certs/dev.pem', 
          cert: '/app/certs/cert.pem',
        },
    host: '0.0.0.0',
  },
})
