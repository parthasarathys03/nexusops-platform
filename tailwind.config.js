import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Sans', ...fontFamily.sans],
        body: ['IBM Plex Sans', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
        sans: ['IBM Plex Sans', ...fontFamily.sans],
      },
      colors: {
        brand: {
          50: 'rgba(45,126,255,0.05)',
          100: 'rgba(45,126,255,0.10)',
          200: 'rgba(45,126,255,0.20)',
          500: '#2D7EFF',
          600: '#1A5FD4',
          700: '#1247A8',
        },
        surface: {
          base: '#050B18',
          default: '#080F1F',
          elevated: '#0D1629',
          overlay: '#111E36',
          subtle: '#162038',
        },
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(45,126,255,0.20)',
        modal: '0 8px 48px rgba(0,0,0,0.7)',
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};