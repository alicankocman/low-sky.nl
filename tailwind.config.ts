import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Calm, warm neutral palette
        'sage': {
          50: '#f7f8f7',
          100: '#eef0ed',
          200: '#d5dbd2',
          300: '#b8c3b3',
          400: '#96a68e',
          500: '#7a8b72',
          600: '#62705b',
          700: '#4f5a49',
          800: '#414a3d',
          900: '#373f34',
        },
        'sand': {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ebe7dd',
          300: '#ddd6c7',
          400: '#cdc1ab',
          500: '#bfad91',
          600: '#a99576',
          700: '#8b7a60',
          800: '#726552',
          900: '#5e5446',
        },
        'ink': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial-style type scale
        'display': ['5.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'h1': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '300' }],
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }],
        'h3': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '400' }],
        'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '48': '12rem',
      },
      maxWidth: {
        'prose': '65ch',
        'prose-wide': '75ch',
        'container': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
