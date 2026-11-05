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
        amoled: {
          950: '#000000',
          900: '#040407',
          850: '#08080d',
          800: '#0d0d14',
          750: '#12121c',
          700: '#181824',
          600: '#222233',
          500: '#32324a',
        },
        forge: {
          cyan: '#00f2fe',
          teal: '#4facfe',
          emerald: '#10b981',
          purple: '#a855f7',
          pink: '#ec4899',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0,242,254,0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(0,242,254,0.6))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.15), transparent 70%)',
        'gradient-radial-purple': 'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.12), transparent 60%)',
      }
    },
  },
  plugins: [],
}
