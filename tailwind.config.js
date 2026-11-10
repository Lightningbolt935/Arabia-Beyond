/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#07090E',
          card: '#0E121A',
          text: '#F5F5F7',
          subtext: '#A1A1A6',
          border: 'rgba(255, 255, 255, 0.12)',
          blue: '#0071E3',
        },
        luxury: {
          dark: '#07090E',
          darkSurface: '#0E121A',
          darkBorder: '#232936',
          sand: '#EFECE6',
          sandLight: '#F9F8F6',
          gold: '#C5A880',
          goldLight: '#DFC9AA',
          goldMuted: '#9B8160',
          deepBlue: '#0A192F',
          emerald: '#1C3A35',
          terracotta: '#A25841'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'apple-md': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'apple-lg': '0 16px 40px rgba(0, 0, 0, 0.6)',
        'luxury-soft': '0 10px 40px -10px rgba(0, 0, 0, 0.4)',
        'luxury-elevated': '0 20px 60px -15px rgba(0, 0, 0, 0.7)',
        'luxury-glow': '0 0 50px -10px rgba(197, 168, 128, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #DFC9AA 0%, #C5A880 50%, #9B8160 100%)',
      }
    },
  },
  plugins: [],
};
