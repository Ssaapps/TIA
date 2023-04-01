/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["rubik"],
        proxima: ["proxima"],
        proximaBold: ["proxima-bold"],
      }
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),

  ],
}
