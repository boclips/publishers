module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.html"],
  theme: {
    fontFamily: {
      sans: ["Rubik"],
    },

    extend: {
      colors: {
        primary: "#00217D",
        "primary-link": "#002E9E",
        "primary-light": "#F5F8FF",
        footer: "#616577",
      },
      fontSize: {
        xxs: "0.65rem",
      },
      spacing: {
        14: "3.5rem",
      },
      container: {
        padding: {
          default: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
        },
      },
      boxShadow: {
        outline: "0 2px 8px 0 rgba(0,21,80,0.15)",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
    border: ["responsive", "hover", "focus", "focus-within"],
  },
  plugins: [],
};
