/** @type {import('tailwindcss').Config} */

const { bgColor } = require("./theme/colors.js");

module.exports = {

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./auth/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        
        ...bgColor,
      },

      fontFamily: {
        heading: ["Poppins_600SemiBold"],
        headingBold: ["Poppins_700Bold"],

        body: ["Inter_400Regular"],
        bodyMedium: ["Inter_500Medium"],
        bodyBold: ["Inter_700Bold"],
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",

        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
        "5xl": "36px",

        "6xl": "42px",
        "7xl": "48px",
        "8xl": "56px",
        "9xl": "64px"
      },
      screens: {
        mobile: { max: "767px" },
        tablet: { min: "768px", max: "1023px" },
      }
    },
  },
  plugins: [],
}