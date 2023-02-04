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
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			includeAssets: [
				'favicon.ico',
				'apple-touch-icon.png',
				'masked-icon.svg',
			],
			manifest: {
				name: 'Wustomers',
				short_name: 'wustomers',
				description: '',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
			},
		}),
	],
})
