/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '767px', // changed from 768px to 767px because of Ipad Mini
      "margin-break" : "975px",
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',    
    },
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
      },
    },
  },
  plugins: [],
}
