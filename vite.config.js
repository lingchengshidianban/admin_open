import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  telemetry: false,
  server: {
    port: 9528,
    open: true
  },
  proxy: {
    '/gateway': {
      target: 'https://dev-os.roncoos.com/gateway',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/gateway/, '')
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `""`
      }
    }
  }
})
