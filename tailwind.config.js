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
        primary: '#214C4F',
        primaryLight: '#81c6ca',
        primaryDark: '#023C48',
        secondary: '#559c17',
        secondaryLight: '#ADEB76',
        secondaryDark: '#8EA123',
        seclightt: '#d7f5bc',
        highlightP: '#76E3D1',
        backGround: '#F2F6F5',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      fontWeight: {
        'extra-light': 100,
        'light': 200,
        'regular': 300,
        'medium': 500,
        'semi-bold': 600,
        'bold': 700,
        'extra-bold': 1200,
        'black': 1800,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        scaleIn: 'scaleIn 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
  // Adding global scrollbar styles
  corePlugins: {
    preflight: true, // Make sure the global reset is active
  },
}
