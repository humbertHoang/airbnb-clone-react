/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';
export default {
  content: { files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], extract },
  theme: {
    fontFamily: {
      sans: ['"Inter", sans-serif'],
    },
    screens,
    fontSize,
    extend: {
      colors: {
        primary: '#FF385C',
      },
    },
  },
  plugins: [fluid],
};
