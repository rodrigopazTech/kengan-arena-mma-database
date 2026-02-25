/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kengan-gold': '#D4AF37',
        'kengan-red': '#8B0000',
        'kengan-dark': '#0A0A0A',
        'kengan-card': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
