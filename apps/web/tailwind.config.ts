const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
import { Inter, Montserrat, Poppins, Playfair_Display } from 'next/font/google';

module.exports = {
  content: [
    '../../node_modules/flowbite-react/**/*.{js,ts,jsx,tsx,mdx,mjs}',
    '../../node_modules/flowbite/**/*.{js,ts,jsx,tsx,mdx,mjs}',
    '../flowbite-react-app/node_modules/flowbite/dist/flowbite.min.js',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1600px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair_Display', 'serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin'), flowbite.plugin(), ({
    charts: true,
  })],
};
