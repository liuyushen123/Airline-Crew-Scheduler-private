/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050816',
        'bg-secondary': '#020617',
        'fg-primary': '#f4f4f4',
        'fg-secondary': '#d4d4d4',
        'accent-primary': '#c3152f',
        'accent-secondary': '#98012e',
      },
    },
  },
  plugins: [],
}