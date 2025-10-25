/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#dbeeff",
          200: "#afd5ff",
          300: "#7fbaff",
          400: "#4f9eff",
          500: "#217fff",
          600: "#0d63db",
          700: "#064cab",
          800: "#03347a",
          900: "#001d4a",
        },
      },
    },
  },
  plugins: [],
}
