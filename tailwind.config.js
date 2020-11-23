const debugScreens = require('tailwindcss-debug-screens');
const customForms = require('@tailwindcss/custom-forms');

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
    // screens: {
    //   sm: '1080px',
    //   md: '1280px',
    //   lg: '1440px',
    //   xl: '1920px',
    // },
    extend: {
      colors: {
        blue: {
          100: '#F9FBFF',
          200: '#F5F8FF',
          300: '#E6ECFB',
          400: '#D9E3FF',
          500: '#BCCDFF',
          600: '#8BAAFF',
          700: '#193DA1',
          800: '#00217D',
          900: '#001550',
        },
        gray: {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0',
          600: '#718096',
          700: '#4A5568',
          800: '#2D3748',
          900: '#1A202C',
        },
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
    appearance: ['responsive', 'checked'],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    border: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'focus-within',
      'active',
      'checked',
    ],
  },
  plugins: [customForms, debugScreens],
};
