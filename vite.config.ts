import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(),
		imagetools(),
		VitePWA({ registerType: 'autoUpdate', injectRegister: 'auto' }),
	],
})
