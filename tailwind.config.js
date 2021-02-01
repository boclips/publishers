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
            backgroundSize: '70%',
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
        home: '75px minmax(0, 458px) 63px',
        'search-view': '75px minmax(0, auto) 63px',
        'orders-view': '75px 50px minmax(0, auto) 63px',
        'cart-view': '75px 50px minmax(0, auto) 63px',
      },
      gridTemplateColumns: {
        container:
          'minmax(2rem, 1fr) repeat(24, minmax(0, 38px)) minmax(2rem, 1fr)',
        content: 'repeat(24, minmax(0, 38px))',
        24: 'repeat(24, 1fr)',
      },
      gridRowStart: {
        last: '-1',
      },
      gridRowEnd: {
        last: '-1',
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
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
          800: 'var(--blue-800)',
          900: 'var(--blue-900)',
        },
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        primary: '#00217D',
        'primary-hover': '#193DA1',
        'primary-active': '#001550',
        'primary-link': '#002E9E',
        'primary-light': '#F5F8FF',
        footer: '#616577',
        focus: '#63b3ed',
      },
      opacity: {
        55: '0.55',
      },
      fontSize: {
        xxs: '0.65rem',
        md: '1rem',
        h1: '2.5rem',
        h2: '1.875rem',
        h3: '1.25rem',
      },
      spacing: {
        14: '3.5rem',
      },
      boxShadow: {
        outline: '0 2px 8px 0 rgba(0,21,80,0.15)',
        'button-focus': '0 0 6px 0 #8BAAFF',
      },
      height: {
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
      },
    },
  },
  variants: {
    appearance: ['responsive', 'checked'],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    border: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'focus-within', 'active'],
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
