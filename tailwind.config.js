/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        diamond: "polygon(100% 100%, 100% 50%, 50% 100%, 0% 50%)",
      },
      colors: {
primary: '#027384',  // Blue
        primaryLight: '#5ab4c4',     // A lighter shade of the primary color
        primaryDark: '#014a55',      // A darker shade of the primary color
        secondary: '#cedf2f',        // Base secondary color
        secondaryLight: '#e4ec83',   // A lighter shade of the secondary color
        secondaryDark: '#99ad22',    // A darker shade of the secondary color
        highlightP: '#8af9e3',         
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
