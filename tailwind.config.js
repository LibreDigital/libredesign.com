module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      body: ['Inter', 'sans-serif'],
      display: ['Druk', 'serif'],
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.625rem',
      '3xl': '2rem',
      '4xl': ['4.25rem', {
        lineHeight: '1.1em',
      }],
      '5xl': ['4.875rem', {
        letterSpacing: '-3.14px',
        lineHeight: '.85em',
      }],
    },
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        'lightest-grey': '#919191',
        'light-grey': '#BEBEBE',
        grey: '#606060',
        'dark-grey': '#4D4D4D'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
