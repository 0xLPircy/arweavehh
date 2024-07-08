/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          DEFAULT: '#40959D',
          '600': '#1B8EDC',
        },
      },
    },
  },
  plugins: [],
};
