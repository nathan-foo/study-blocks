/** @type {import('tailwindcss').Config} */

const { withUt } = require("uploadthing/tw");

const config = withUt({
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			'magical-childhood': ['magical-childhood', 'sans-serif'],
		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
			"blue-primary": '#1354ed',
			"green-primary": '#c9e4de',
			"yellow-primary": '#faedcb',
			"purple-primary": '#9b2fed',
			"pink-primary": '#fcb6f4',
			"orange-primary": '#f7d9c4',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
});

export default config;