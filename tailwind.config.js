/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './agente-ia.html',
    './quem-somos.html',
    './desenvolvimento.html',
    './src/**/*.{html,js}',
  ],
  safelist: [
    // Evita purgar animações que são aplicadas dinamicamente (data-animate)
    'animate-slide-right',
    'animate-slide-left',
    'animate-slide-down',
    'animate-zoom-in',
    'animate-fade',
    'animate-pop',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#1e3a8a',
        accent: '#3b82f6',
        light: '#eff6ff',
        dark: '#1e1b4b',
        'kamino-navy': '#0f172a',
        'kamino-blue': '#1d4ed8',
        'kamino-green': '#10b981',
        'kamino-purple': '#8b5cf6',
        'kamino-cyan': '#06b6d4',
        'glass-dark': 'rgba(30, 41, 59, 0.5)',
        'glass-light': 'rgba(241, 245, 249, 0.1)',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      animation: {
        fade: 'fadeIn 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'zoom-in': 'zoomIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
