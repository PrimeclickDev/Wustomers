// vite.config.ts
import basicSsl from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/@vitejs+plugin-basic-ssl@1.0.1_vite@4.0.4/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import react from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/@vitejs+plugin-react-swc@3.0.1_vite@4.0.4/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite@4.0.4_@types+node@18.11.18/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-plugin-pwa@0.14.1_fh56thzkyakgjs6jm6gbtbzxsq/node_modules/vite-plugin-pwa/dist/index.mjs";
import svgr from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-plugin-svgr@2.4.0_rollup@2.79.1+vite@4.0.4/node_modules/vite-plugin-svgr/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/willi/Documents/codex/wustomers-frontend/node_modules/.pnpm/vite-tsconfig-paths@4.0.5_typescript@4.9.4/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    basicSsl(),
    tsconfigPaths(),
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
    https: true,
    port: 5174
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb2N1bWVudHNcXFxcY29kZXhcXFxcd3VzdG9tZXJzLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb2N1bWVudHNcXFxcY29kZXhcXFxcd3VzdG9tZXJzLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy93aWxsaS9Eb2N1bWVudHMvY29kZXgvd3VzdG9tZXJzLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdHJlYWN0KCksXG5cdFx0YmFzaWNTc2woKSxcblx0XHR0c2NvbmZpZ1BhdGhzKCksXG5cdFx0c3ZncigpLFxuXHRcdFZpdGVQV0Eoe1xuXHRcdFx0cmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG5cdFx0XHRpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxuXHRcdFx0aW5jbHVkZUFzc2V0czogW1xuXHRcdFx0XHQnZmF2aWNvbi5pY28nLFxuXHRcdFx0XHQnYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuXHRcdFx0XHQnbWFza2VkLWljb24uc3ZnJyxcblx0XHRcdF0sXG5cdFx0XHRtYW5pZmVzdDoge1xuXHRcdFx0XHRuYW1lOiAnV3VzdG9tZXJzJyxcblx0XHRcdFx0c2hvcnRfbmFtZTogJ3d1c3RvbWVycycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnJyxcblx0XHRcdFx0aWNvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZycsXG5cdFx0XHRcdFx0XHRzaXplczogJzE5MngxOTInLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG5cdFx0XHRcdFx0XHRzaXplczogJzUxMng1MTInLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG5cdFx0XHRcdFx0XHRzaXplczogJzUxMng1MTInLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHR0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuXHRcdFx0XHRiYWNrZ3JvdW5kX2NvbG9yOiAnI2ZmZmZmZicsXG5cdFx0XHRcdGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG5cdHNlcnZlcjoge1xuXHRcdGh0dHBzOiB0cnVlLFxuXHRcdHBvcnQ6IDUxNzQsXG5cdH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixPQUFPLGNBQWM7QUFDdFcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFHMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ1AsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsZUFBZTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Q7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNOO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1Y7QUFBQSxRQUNEO0FBQUEsUUFDQSxhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsTUFDVjtBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNQO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
