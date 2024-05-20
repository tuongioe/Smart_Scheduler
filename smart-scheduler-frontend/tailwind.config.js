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
      maxWidth: {
        custom: "calc(100% - 32px)",
      },
      boxShadow: {
        custom: "1px -1px 48px 0px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [],
};
