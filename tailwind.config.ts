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
			'primary-yellow-green': '#63b920',
			'primary-red': '#f44177',
			'primary-pink': '#CB1A6F',
			'light-gray': '#f0f4fc',
			gray: '#bbbbbb',
		},
	},
	plugins: [],
};

export default config;
