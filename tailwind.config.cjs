/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./examples/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
}