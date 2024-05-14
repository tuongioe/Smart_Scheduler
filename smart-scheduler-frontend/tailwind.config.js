/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00717F",
        "primary-50": "#00A9BF",
        "primary-100": "#005E6A",
        "primary-200": "#004B55",
        "small-text": "#929292",
      },
    },
  },
  plugins: [],
};
