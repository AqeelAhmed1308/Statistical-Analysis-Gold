/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-cream': '#FDFCF8',
        'gold-50': '#FFFBEB',
        'gold-100': '#FEF3C7',
        'gold-200': '#FDE68A',
        'gold-300': '#FCD34D',
        'gold-400': '#FBBF24',
        'gold-500': '#F59E0B',
        'gold-600': '#D97706',
        'slate-800': '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(217, 119, 6, 0.08)',
        'glow-text': '0 0 20px rgba(245, 158, 11, 0.4)',
        '3d': '0 20px 50px -12px rgba(217, 119, 6, 0.25)',
      },
      backgroundImage: {
        'shimmer-gold': 'linear-gradient(90deg, #B45309 0%, #FBBF24 25%, #FFFBEB 50%, #FBBF24 75%, #B45309 100%)',
      },
      animation: {
        'shimmer-text': 'shimmer 6s linear infinite',
        'border-flow': 'borderFlow 4s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        borderFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}