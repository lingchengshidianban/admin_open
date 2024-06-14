import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  base: '/',
  telemetry: false,
  server: {
    port: 9528,
    open: false,
    proxy: {
      '/gateway': {
        target: 'https://dev-os.roncoos.com/gateway',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gateway/, '')
      }
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[name]'
    })
  ],
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
