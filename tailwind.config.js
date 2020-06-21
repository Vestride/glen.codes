module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    aspectRatio: {
      '1/1': [1, 1],
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        odopink: '#de3d81',
        'light-blue': '#3498db',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'visited', 'hover', 'focus', 'group-hover'],
  },
  plugins: [require('tailwindcss-aspect-ratio')],
};
