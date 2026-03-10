import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHash } from 'crypto'

// Temporary polyfill for Vite bug where crypto.hash is not defined in Node
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = {}
}

if (typeof globalThis.crypto.hash !== 'function') {
  globalThis.crypto.hash = (algorithm) => createHash(algorithm)
}

export default defineConfig({
  base: '/retro-personal-site',
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
      '/uploads': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
})
