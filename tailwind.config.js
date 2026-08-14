/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      colors: {
        void: {
          dark: '#05070E',
          card: '#0A0F1D',
          border: '#1E293B',
          hover: '#131B2E',
        },
        electric: {
          DEFAULT: '#00B4D8',
          deep: '#0077B6',
          navy: '#1E6091',
          cyan: '#38BDF8',
          neon: '#4CC9F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.15) 0%, rgba(5, 7, 14, 0) 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'metallic-gradient': 'linear-gradient(135deg, #00B4D8 0%, #0077B6 50%, #1E6091 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.5', filter: 'drop-shadow(0 0 10px rgba(0,180,216,0.3))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(0,180,216,0.8))' },
        }
      }
    },
  },
  plugins: [],
}
