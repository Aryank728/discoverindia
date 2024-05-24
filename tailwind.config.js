/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        headerColor: '#3BBCD9',
        bodyColor: '#BF9075',
        customGradientStart: '#3BBCD9',
        customGradientEnd: '#1e90ff', // example second color
      },
      backgroundImage: theme => ({
        'gradient-animated': `linear-gradient(90deg, #3BBCD9, #1e90ff, #ff6347, #3BBCD9)`,
      }),
      animation: {
        'gradient-animate': 'gradientBG 15s ease infinite',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}