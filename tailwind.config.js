module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
      colors: {
        custom: {
          navbar: "#232533",
          cardBg: "#101118",
          black: "#0E0F15",
          blue1: "#0088FF",
          blue2: "#0F9AFF",
          yellow1: "#FDD231",
          yellow2: "#F9C200",
          gray1: "#C5CAF6",
          gray2: "#C4C8ED",
          purple1: "#A259FF",
          purple2: "#8E00FD"
        },
      },
      dropShadow: {
        'navbar': '0 4px 4px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
};