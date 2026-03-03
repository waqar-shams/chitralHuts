/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // global CSS variables
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        'card-hover': 'var(--color-card-hover)',
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',

        // project-specific palette
        green: {
          50: '#10B981',
          100: '#DCEBE9',
          200: '#B8D7D2',
          300: '#8DBBB6',
          400: '#DCEBE9',
          700: '#25605B',
        },
        accent: {
          100: '#FCEAE4',
          300: '#F6BDAB',
          400: '#EF9C82',
        },
        gray: {
          100: '#6B7280',
          50: '#9CA3AF',
        },
        yellow: {
          300: '#F6CB53',
        },
        neutral: {
          50: '#F6F6F6',
          100: '#EEEEEE',
          600: '#545454',
        },
        red: { 700: '#C8170D' },
        secondary: {
          50: '#F4F9F8',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};