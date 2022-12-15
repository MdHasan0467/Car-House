/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#137c8c',

					secondary: '#b50eed',

					accent: '#f95c69',

					neutral: '#26232F',

					'base-100': '#E9E6EA',

					info: '#78C6F7',

					success: '#25B185',

					warning: '#EC8713',

					error: '#F86754',
				},
			},
		],
	},
	plugins: [require('flowbite/plugin'), require('daisyui')],
};
