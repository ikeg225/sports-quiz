module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      'header': ['Oswald'],
      'body': ['Verdana']
    },
    screens: {
      'xsm': '575px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    boxShadow: {
      'internal': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    },
  },
  plugins: [],
}