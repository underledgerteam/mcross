const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      primary: "#000",
      secondary: "#fff",
      black: "#000",
      white: "#fff",
      gray: {
        ...colors.gray,
        100: "#f7fafc",
        900: "#1a202c",
      }
    },
    extend: {
      fontFamily: {
        display: ["Open Sans", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      },
      visibility: ["group-hover"],
    },
  },
  plugins: [],
}