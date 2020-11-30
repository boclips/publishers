const debugScreens = require('tailwindcss-debug-screens');
const customForms = require('@tailwindcss/custom-forms');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  corePlugins: {
    container: false,
  },
  theme: {
    customForms: (theme) => ({
      default: {
        checkbox: {
          '&:checked': {
            backgroundSize: '68%',
            backgroundRepeat: 'no-repeat',
          },
          icon:
            '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 5.75L4.75 8.75L12.25 1.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          '&:focus': {
            boxShadow: 'none',
            outline: 'none',
            borderColor: undefined,
          },
          '&:focus-visible': {
            borderColor: theme('colors.focus'),
            outline: '0 0 0 3px rgba(66,153,225,.5)',
          },
        },
      },
    }),
    fontFamily: {
      sans: ['Rubik'],
    },
    screens: {
      sm: '1280px',
      md: '1440px',
      lg: '1680px',
    },
    extend: {
      gridTemplateRows: {
        home: '75px minmax(0, 432px) 63px',
        'search-view': '75px minmax(0, auto) 63px',
        'cart-view': '75px minmax(0, auto) 63px',
      },
      gridTemplateColumns: {
        container:
          'minmax(2rem, 1fr) repeat(24, minmax(0, 38px)) minmax(2rem, 1fr)',
        content: 'repeat(24, minmax(0, 70px))',
        24: 'repeat(24, 1fr)',
      },
      gridColumnStart: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
      },
      gridColumnEnd: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
      },
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
        focus: '#63b3ed',
      },
      fontSize: {
        xxs: '0.65rem',
        h1: '2.5rem',
        h2: '1.875rem',
        h3: '1.25rem',
      },
      spacing: {
        14: '3.5rem',
      },
      // container: {
      //   padding: {
      //     default: '2rem',
      //     sm: '1rem',
      //   },
      //   maxWidth: '1600px',
      // },
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
  plugins: [
    customForms,
    debugScreens,
    ({ addComponents }) => {
      addComponents({
        '.container': {
          maxWidth: '100%',
        },
      });
    },
  ],
};
