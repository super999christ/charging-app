/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nxu-charging": {
          black: "#0C0C0C",
          blackalpha: "#0c0c0ca0",
          white: "#FFFFFF",
          darkwhite: "#979797",
          placeholder: "#555",
          grey: "#484848",
          red: "#FF6060",
          gold: "#9B7221",
          green: "#22AA44",
        },
      },
    },
  },
  plugins: [],
};
