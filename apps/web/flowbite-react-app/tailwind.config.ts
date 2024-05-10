import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './node_modules/flowbite/dist/flowbite.min.js',
    './node_modules/flowbite-react/**/*.{js,ts,jsx,tsx,mdx,mjs}',
    './node_modules/flowbite/**/*.{js,ts,jsx,tsx,mdx,mjs}',
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
export default config;
