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
          violet: '#411B7F',
          'violet-light': '#5C2DA8',
          'violet-subtle': 'rgba(65,27,127,0.08)',
          'violet-muted': 'rgba(65,27,127,0.12)',
          coral: '#FE6F5E',
          'coral-light': '#FF8A7A',
          'coral-subtle': 'rgba(254,111,94,0.08)',
          50: 'rgba(65,27,127,0.05)',
          100: 'rgba(65,27,127,0.10)',
          200: 'rgba(65,27,127,0.20)',
          500: '#411B7F',
          600: '#361668',
          700: '#2B1154',
        },
        surface: {
          base: '#0F172A',
          default: '#1E293B',
          elevated: '#162032',
          overlay: '#1A2744',
          subtle: '#1E2D3E',
        },
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(65,27,127,0.1), 0 16px 40px rgba(65,27,127,0.08)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(65,27,127,0.2)',
        'glow-coral': '0 0 20px rgba(254,111,94,0.2)',
        modal: '0 8px 48px rgba(0,0,0,0.2)',
        'sidebar-item': '0 2px 8px rgba(65,27,127,0.12)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #411B7F 0%, #FE6F5E 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(65,27,127,0.12) 0%, rgba(254,111,94,0.08) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-header': 'linear-gradient(to right, #FAF8FF 0%, #FFFCFB 100%)',
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
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
