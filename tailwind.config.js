/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["rubik"],
        proxima: ["proxima"],
        proximaBold: ["proxima-bold"],
      },
      colors: {
        "primary":"#ef3f23",
        "baseYellow":"#1e4570"
      }
    
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),


  ],
}
