/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'light-cyan': '#E0FBFC',
				'light-blue': '#C2DFE3',
				'cadet-gray': '#9DB4C0',
				'payne-gray': '#5C6B73',
				'gunmetal-gray': '#253237'
			},
			borderWidth: {
				3: '3px'
			}
		}
	},
	plugins: []
}
