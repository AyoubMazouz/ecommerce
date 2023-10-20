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
				light: '#FFFF',

				danger: '#F87171',
				'danger-dark': '#991B1B',
				warn: '#FACC15',
				'warn-dark': '#92400E',
				info: '#38BDF8',
				'info-dark': '#155E75',
				success: '#34D399',
				'success-dark': '#166534'
			},
			fontFamily: {
				main: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: []
};
