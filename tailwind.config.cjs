/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'wustomers-blue': '#072AC8',
				'wustomers-primary/60': '#F3F4FC',
				'wustomers-light-black': '#2F2F2F',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
