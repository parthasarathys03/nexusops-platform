/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Font Families ──────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      // ── Nexus Command Color System ─────────────────────────────────────────
      colors: {
        // Surfaces
        'nc-base':     '#0B1222',
        'nc-surface':  '#0F1729',
        'nc-elevated': '#131D2E',
        'nc-overlay':  '#1A2540',
        'nc-subtle':   '#1E2D45',

        // Borders
        'nc-border':   '#1E293B',

        // Text
        'nc-primary':  '#E2E8F0',
        'nc-muted':    '#94A3B8',
        'nc-faint':    '#475569',

        // Accent (Electric Teal)
        'nc-accent':        '#00D4AA',
        'nc-accent-hover':  '#00BF99',
        'nc-accent-dim':    'rgba(0,212,170,0.08)',

        // Semantic
        'nc-amber':   '#F59E0B',
        'nc-emerald': '#10B981',
        'nc-rose':    '#F43F5E',
        'nc-blue':    '#3B82F6',
        'nc-purple':  '#8B5CF6',
      },

      // ── Border Radius ───────────────────────────────────────────────────────
      borderRadius: {
        'nc-sm':  '0.375rem',
        'nc-md':  '0.5rem',
        'nc-lg':  '0.75rem',
        'nc-xl':  '1rem',
        'nc-2xl': '1.5rem',
      },

      // ── Box Shadows (glow-based) ────────────────────────────────────────────
      boxShadow: {
        'nc-glow':         '0 0 0 1px rgba(0,212,170,0.15), 0 4px 20px rgba(0,212,170,0.12)',
        'nc-glow-strong':  '0 0 0 1px rgba(0,212,170,0.25), 0 8px 32px rgba(0,212,170,0.2)',
        'nc-glow-amber':   '0 0 0 1px rgba(245,158,11,0.2), 0 4px 20px rgba(245,158,11,0.12)',
        'nc-glow-rose':    '0 0 0 1px rgba(244,63,94,0.2), 0 4px 20px rgba(244,63,94,0.12)',
        'nc-glow-emerald': '0 0 0 1px rgba(16,185,129,0.2), 0 4px 20px rgba(16,185,129,0.12)',
        'nc-card':         '0 4px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
      },

      // ── Animation Keyframes ────────────────────────────────────────────────
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0,212,170,0.2)' },
          '50%':      { boxShadow: '0 0 20px rgba(0,212,170,0.5), 0 0 40px rgba(0,212,170,0.2)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'glow-pulse':    'glow-pulse 2s ease-in-out infinite',
        shimmer:         'shimmer 2.5s linear infinite',
        'fade-up':       'fade-up 0.3s ease-out',
        'fade-in':       'fade-in 0.2s ease-out',
        'scale-in':      'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
