// vite.config.ts
import react from "file:///C:/Users/willi/Documents/codex/wustomers/wustomers-frontend/node_modules/.pnpm/@vitejs+plugin-react-swc@3.0.1_vite@4.0.4/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///C:/Users/willi/Documents/codex/wustomers/wustomers-frontend/node_modules/.pnpm/vite@4.0.4_@types+node@18.11.18/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/willi/Documents/codex/wustomers/wustomers-frontend/node_modules/.pnpm/vite-plugin-pwa@0.14.1_vite@4.0.4_workbox-build@6.5.4_workbox-window@6.5.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import Markdown from "file:///C:/Users/willi/Documents/codex/wustomers/wustomers-frontend/node_modules/.pnpm/vite-plugin-react-markdown@0.2.5_vite@4.0.4/node_modules/vite-plugin-react-markdown/dist/index.mjs";
import svgr from "file:///C:/Users/willi/Documents/codex/wustomers/wustomers-frontend/node_modules/.pnpm/vite-plugin-svgr@2.4.0_rollup@2.79.1_vite@4.0.4/node_modules/vite-plugin-svgr/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/willi/Documents/codex/wustomers/wustomers-frontend/node_modules/.pnpm/vite-tsconfig-paths@4.0.5_typescript@4.9.4/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    Markdown(),
    svgr(),
    // basicSsl(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb2N1bWVudHNcXFxcY29kZXhcXFxcd3VzdG9tZXJzXFxcXHd1c3RvbWVycy1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcd2lsbGlcXFxcRG9jdW1lbnRzXFxcXGNvZGV4XFxcXHd1c3RvbWVyc1xcXFx3dXN0b21lcnMtZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3dpbGxpL0RvY3VtZW50cy9jb2RleC93dXN0b21lcnMvd3VzdG9tZXJzLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3ZpdGUtcGx1Z2luLXJlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtcblx0XHRyZWFjdCgpLFxuXHRcdHRzY29uZmlnUGF0aHMoKSxcblx0XHRNYXJrZG93bigpLFxuXHRcdHN2Z3IoKSxcblx0XHQvLyBiYXNpY1NzbCgpLFxuXHRcdFZpdGVQV0Eoe1xuXHRcdFx0cmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG5cdFx0XHRpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxuXHRcdFx0aW5jbHVkZUFzc2V0czogW1xuXHRcdFx0XHQnZmF2aWNvbi5pY28nLFxuXHRcdFx0XHQnYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuXHRcdFx0XHQnbWFza2VkLWljb24uc3ZnJyxcblx0XHRcdF0sXG5cdFx0XHRtYW5pZmVzdDoge1xuXHRcdFx0XHRuYW1lOiAnV3VzdG9tZXJzJyxcblx0XHRcdFx0c2hvcnRfbmFtZTogJ3d1c3RvbWVycycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnJyxcblx0XHRcdFx0aWNvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZycsXG5cdFx0XHRcdFx0XHRzaXplczogJzE5MngxOTInLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG5cdFx0XHRcdFx0XHRzaXplczogJzUxMng1MTInLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG5cdFx0XHRcdFx0XHRzaXplczogJzUxMng1MTInLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHR0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRiYWNrZ3JvdW5kX2NvbG9yOiAnI2ZmZmZmZicsXG5cdFx0XHRcdGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG5cdHNlcnZlcjoge1xuXHRcdC8vIGh0dHBzOiB0cnVlLFxuXHRcdHBvcnQ6IDUxNzQsXG5cdH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpWCxPQUFPLFdBQVc7QUFDblksU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sY0FBYztBQUNyQixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsU0FBUztBQUFBLElBQ1QsS0FBSztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ047QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDVjtBQUFBLFFBQ0Q7QUFBQSxRQUNBLGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxNQUNWO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFUCxNQUFNO0FBQUEsRUFDUDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
