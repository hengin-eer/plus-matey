import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
		colors: {
			black: '#000000',
			white: '#ffffff',
			'primary-yellow-green': '#63B920',
			'primary-green': '#41F494',
			'primary-red': '#F44177',
			'primary-yellow': '#FBD85C',
			'primary-pink': '#DB2A7F',
			gray: '#BBBBBB',
			'light-gray': '#F0F4FC',
			'department-m': '#E34014',
			'department-e': '#FABF1B',
			'department-c': '#7CC3D9',
			'department-a': '#AFC617',
			'department-all': '#B6A4C7',
			male: '#B0D9FF',
			female: '#FFB0B5',
		},
	},
	plugins: [],
};
export default config;
