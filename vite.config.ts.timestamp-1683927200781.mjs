// vite.config.ts
import react from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/@vitejs+plugin-react-swc@3.0.1_vite@4.0.4/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite@4.0.4_@types+node@18.11.18/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-plugin-pwa@0.14.1_vite@4.0.4_workbox-build@6.5.4_workbox-window@6.5.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import Markdown from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-plugin-react-markdown@0.2.5_vite@4.0.4/node_modules/vite-plugin-react-markdown/dist/index.mjs";
import svgr from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-plugin-svgr@2.4.0_rollup@2.79.1_vite@4.0.4/node_modules/vite-plugin-svgr/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-tsconfig-paths@4.0.5_typescript@4.9.4/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    Markdown(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "masked-icon.svg"
      ],
      manifest: {
        name: "Wustomers",
        short_name: "wustomers",
        description: "",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
      }
    })
  ],
  server: {
    // https: true,
    port: 5174
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb2N1bWVudHNcXFxcY29kZXhcXFxcd3VzdG9tZXJzLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb2N1bWVudHNcXFxcY29kZXhcXFxcd3VzdG9tZXJzLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy93aWxsaS9Eb2N1bWVudHMvY29kZXgvd3VzdG9tZXJzLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3ZpdGUtcGx1Z2luLXJlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtcblx0XHRyZWFjdCgpLFxuXHRcdHRzY29uZmlnUGF0aHMoKSxcblx0XHRNYXJrZG93bigpLFxuXHRcdHN2Z3IoKSxcblx0XHRWaXRlUFdBKHtcblx0XHRcdHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuXHRcdFx0aW5qZWN0UmVnaXN0ZXI6ICdhdXRvJyxcblx0XHRcdGluY2x1ZGVBc3NldHM6IFtcblx0XHRcdFx0J2Zhdmljb24uaWNvJyxcblx0XHRcdFx0J2FwcGxlLXRvdWNoLWljb24ucG5nJyxcblx0XHRcdFx0J21hc2tlZC1pY29uLnN2ZycsXG5cdFx0XHRdLFxuXHRcdFx0bWFuaWZlc3Q6IHtcblx0XHRcdFx0bmFtZTogJ1d1c3RvbWVycycsXG5cdFx0XHRcdHNob3J0X25hbWU6ICd3dXN0b21lcnMnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJycsXG5cdFx0XHRcdGljb25zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiAnYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmcnLFxuXHRcdFx0XHRcdFx0c2l6ZXM6ICcxOTJ4MTkyJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiAnYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmcnLFxuXHRcdFx0XHRcdFx0c2l6ZXM6ICc1MTJ4NTEyJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiAnYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmcnLFxuXHRcdFx0XHRcdFx0c2l6ZXM6ICc1MTJ4NTEyJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxuXHRcdFx0XHRcdFx0cHVycG9zZTogJ2FueSBtYXNrYWJsZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0dGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcblx0XHRcdFx0YmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG5cdFx0XHR9LFxuXHRcdH0pLFxuXHRdLFxuXHRzZXJ2ZXI6IHtcblx0XHQvLyBodHRwczogdHJ1ZSxcblx0XHRwb3J0OiA1MTc0LFxuXHR9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsT0FBTyxXQUFXO0FBQ25XLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxJQUNULEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNQLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWU7QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTjtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNWO0FBQUEsUUFDRDtBQUFBLFFBQ0EsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLE1BQ1Y7QUFBQSxJQUNELENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQSxJQUVQLE1BQU07QUFBQSxFQUNQO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
