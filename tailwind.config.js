const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

const { '2xl': remove2Xl, ...screens } = defaultTheme.screens;

module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    aspectRatio: {
      '1/1': [1, 1],
    },
    screens,
    extend: {
      container: {
        center: true,
      },
      colors: {
        odopink: '#de3d81',
        'light-blue': '#3498db',
        gray: colors.coolGray,
      },
    },
  },
  variants: {
    textColor: ['responsive', 'visited', 'hover', 'focus', 'group-hover'],
  },
  plugins: [require('tailwindcss-aspect-ratio')],
};
