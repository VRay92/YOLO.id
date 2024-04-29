/** @type {import('tailwindcss').Config} */
import { Inter, Montserrat, Poppins, Playfair_Display } from 'next/font/google';
const flowbite = require('flowbite-react/tailwind');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair_Display', 'serif'],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
