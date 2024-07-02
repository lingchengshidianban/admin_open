// vite.config.js
import { defineConfig } from "file:///D:/open_project/admin_open/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/open_project/admin_open/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { createSvgIconsPlugin } from "file:///D:/open_project/admin_open/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\open_project\\admin_open";
var vite_config_default = defineConfig({
  base: "/",
  telemetry: false,
  server: {
    port: 9528,
    open: true,
    proxy: {
      "/gateway": {
        target: "https://dev-os.roncoos.com/gateway",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/gateway/, "")
      }
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, ".", "src")
    }
  },
  cssPreprocessOptions: {
    scss: {
      additionalData: '@import "./src//scss/common.scss";'
      // 全局公共样式
    }
  },
  build: {
    minify: "terser",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxvcGVuX3Byb2plY3RcXFxcYWRtaW5fb3BlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcb3Blbl9wcm9qZWN0XFxcXGFkbWluX29wZW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L29wZW5fcHJvamVjdC9hZG1pbl9vcGVuL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvJyxcbiAgdGVsZW1ldHJ5OiBmYWxzZSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogOTUyOCxcbiAgICBvcGVuOiB0cnVlLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2dhdGV3YXknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vZGV2LW9zLnJvbmNvb3MuY29tL2dhdGV3YXknLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9nYXRld2F5LywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnJyldLFxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXSdcbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuJywgJ3NyYycpXG4gICAgfVxuICB9LFxuICBjc3NQcmVwcm9jZXNzT3B0aW9uczoge1xuICAgIHNjc3M6IHtcbiAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjLy9zY3NzL2NvbW1vbi5zY3NzXCI7JyAvLyBcdTUxNjhcdTVDNDBcdTUxNkNcdTUxNzFcdTY4MzdcdTVGMEZcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLG9CQUFvQjtBQUNuUyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxjQUFjLEVBQUU7QUFBQSxNQUNsRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsTUFDeEQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLElBQ3BCLE1BQU07QUFBQSxNQUNKLGdCQUFnQjtBQUFBO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYix1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
