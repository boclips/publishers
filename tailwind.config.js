module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.html"],
  theme: {
    fontFamily: {
      'heading': ['Rubik Medium'],
    },
    extend: {
      colors: {
        "primary": '#00217D',
        "primary-light": '#F5F8FF'
      },
    },
  },
  variants: {},
  plugins: [],
};
