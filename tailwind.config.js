/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy colors (for backward compatibility)
        'shrine-red': '#DC143C',
        'shrine-gold': '#FFD700',
        'shrine-navy': '#191970',
        'shrine-cream': '#FFF8DC',
        
        // New design system
        'dark': {
          'primary': '#0a0a0f',
          'secondary': '#13131a',
          'tertiary': '#1a1a25',
        },
        'purple': {
          'deep': '#1e1b4b',
          'medium': '#312e81',
          'dark': '#0f0e2e',
        },
        'gold': {
          'primary': '#fbbf24',
          'light': '#fcd34d',
          'dark': '#f59e0b',
        },
        'glass': {
          'white': 'rgba(255, 255, 255, 0.05)',
          'border': 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        'japanese': ['Noto Sans JP', 'Hiragino Sans', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'text-reveal': 'text-reveal 0.6s ease-out',
        'float-orb': 'float-orb 20s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'typewriter': 'typewriter 2s steps(40, end)',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'text-reveal': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'float-orb': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
          },
          '33%': {
            transform: 'translate(-30%, -60%) scale(1.1) rotate(120deg)',
          },
          '66%': {
            transform: 'translate(-70%, -40%) scale(0.9) rotate(240deg)',
          },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}