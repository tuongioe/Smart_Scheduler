/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#00717F",
        "primary-50": "#00A9BF",
        "primary-100": "#005E6A",
        "primary-200": "#004B55",
        "small-text": "#929292",
        'dark-color': '#262525',
        'blue-custom-1': '#00bcd4',
        'blue-custom-2': '#00a9bf',
        'blue-custom-3': '#0096aa',
        'blue-custom-4': '#008494',
        'blue-custom-5': '#00717f',
        'blue-custom-6': '#005e6a',
        'blue-custom-7': '#004b55',
        'blue-custom-8': '#003840',
        'blue-custom-9': '#00262a',
        'blue-custom-10': '#001315',
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
