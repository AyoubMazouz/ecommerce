/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*/*.svelte'],
	theme: {
		extend: {
			colors: {
				primary: '#2563EB',
				secondary: '#60A5FA',
				dark: '#111827',
				'semi-dark': '#374151',
				shading: '#D1D5DB',
				'semi-light': '#F3F4F6',
				light: '#FFFF'
			}
		}
	},
	plugins: []
};
