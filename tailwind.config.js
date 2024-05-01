/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter var"', 'system-ui'],
      jost: ['"Jost"', 'sans-serif'],
    },
    extend: {
      colors: { 
      'nav':'rgba(206, 211, 232, 0.44)',
      },
    },
  },
  plugins: [],
}

