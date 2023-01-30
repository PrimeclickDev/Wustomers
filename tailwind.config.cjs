/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				aeonik: "'Aeonik', 'sans-serif'",
			},
			colors: {
				'wustomers-blue': '#072AC8',
				'wustomers-blue-light': '#3955D3',
				'wustomers-primary': '#F3F4FC',
				'wustomers-main': '#2F2F2F',
				'wustomers-primary-light': '#E6EAF9',
				'wustomers-border-color': '#9CAAE9',
			},
			borderRadius: {
				sx: '3px',
			},
			padding: {
				2.5: '0.65rem',
			},
		},
	},
	plugins: [],
}
