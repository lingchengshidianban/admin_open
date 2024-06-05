import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  telemetry: false,
  server: {
    port: 9528,
    open: true,
    proxy: {
      '/gateway': {
        target: 'https://dev-os.roncoos.com/gateway',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gateway/, '')
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '.', 'src')
    }
  },
  cssPreprocessOptions: {
    scss: {
      additionalData: '@import "./src//scss/common.scss";' // 全局公共样式
    }
  },
  build: {
    minify: 'terser',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
