/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    patterns: {
      opacities: {
          100: "1",
          80: ".80",
          60: ".60",
          40: ".40",
          20: ".20",
          10: ".10",
          5: ".05",
      },
      sizes: {
          1: "0.25rem",
          2: "0.5rem",
          4: "1rem",
          6: "1.5rem",
          8: "2rem",
          16: "4rem",
          20: "5rem",
          24: "6rem",
          32: "8rem",
      }
  },
    extend: {
      animation: {
        marquee: "marquee 3s ease-in-out infinite",
      },
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
   
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        
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
  plugins: [

    require('tailwindcss-bg-patterns'),
  ],
  // Adding global scrollbar styles
  corePlugins: {
    preflight: true, // Make sure the global reset is active
  },
}
