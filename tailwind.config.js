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
      },
      colors: {
        "baseYellow":"#eeb032",
        "primary":"#ef3f23"
      }
    
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),


  ],
}
