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
				'wustomers-gray': '#828282',
				'wustomers-dark-gray': '#D5D5D5',
				'wustomers-blue-other': '#1E96FC',
				'wustomers-neutral-dark': '#585858',
			},
			borderRadius: {
				sx: '3px',
			},
			padding: {
				2.5: '0.65rem',
			},
			keyframes: {
				slideDown: {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				slideUp: {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				overlayShow: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				contentShow: {
					from: {
						opacity: 0,
						transform: 'translate(-50%, -48%) scale(0.96)',
					},
					to: { opacity: 0, transform: 'translate(-50%, -50%) scale(1)' },
				},
			},
			animation: {
				slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
				slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
			},
		},
	},
	plugins: [],
}
