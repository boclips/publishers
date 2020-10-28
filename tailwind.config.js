module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Rubik'],
    },

    extend: {
      colors: {
        primary: '#00217D',
        'primary-hover': '#193DA1',
        'primary-active': '#001550',
        'primary-link': '#002E9E',
        'primary-light': '#F5F8FF',
        footer: '#616577',
      },
      fontSize: {
        xxs: '0.65rem',
      },
      spacing: {
        14: '3.5rem',
      },
      container: {
        padding: {
          default: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
        },
      },
      boxShadow: {
        outline: '0 2px 8px 0 rgba(0,21,80,0.15)',
        'button-focus': '0 0 6px 0 #8BAAFF',
      },
    },
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    border: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
  },
  plugins: [],
};
