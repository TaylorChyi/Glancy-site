import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssImport from 'postcss-import'

// https://vite.dev/config/
const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': srcDir
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssImport({
          resolve(id) {
            if (id.startsWith('@/')) {
              return path.resolve(srcDir, id.slice(2))
            }
            return undefined
          }
        })
      ]
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
