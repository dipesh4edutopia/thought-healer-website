/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefbfa',
          100: '#d0f7f5',
          200: '#a5eeeb',
          300: '#6de3de',
          400: '#38d0ca',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'wave': 'wave 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(20, 184, 166, 0.5), 0 0 10px rgba(20, 184, 166, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(20, 184, 166, 0.8), 0 0 20px rgba(20, 184, 166, 0.4)' }
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
        },
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200%': '200% 200%',
        '300%': '300% 300%',
      },
      backgroundImage: {
        'neural-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNSAzLjIgMS4zLjkuOSAxLjMgMiAxLjMgMy4yIDAgMS4yLS41IDIuMy0xLjMgMy4yLS45LjktMiAxLjMtMy4yIDEuM3MtMi4zLS41LTMuMi0xLjNjLS45LS45LTEuMy0yLTEuMy0zLjIgMC0xLjIuNS0yLjMgMS4zLTMuMi45LS45IDItMS4zIDMuMi0xLjN6TTI0IDMwYzEuMiAwIDIuMy41IDMuMiAxLjMuOS45IDEuMyAyIDEuMyAzLjIgMCAxLjItLjUgMi4zLTEuMyAzLjItLjkuOS0yIDEuMy0zLjIgMS4zcy0yLjMtLjUtMy4yLTEuM2MtLjktLjktMS4zLTItMS4zLTMuMiAwLTEuMi41LTIuMyAxLjMtMy4yLjktLjkgMi0xLjMgMy4yLTEuM3oiIHN0cm9rZT0icmdiYSgyMCwgMTg0LCAxNjYsIDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0yNCAzMGMwLTYgNC41LTExLjEgMTAuNC0xMS45TTM2IDE4YzUuOSAwIDExLjEgNC41IDExLjkgMTAuNE0zNiA0MmM1LjkgMCAxMS4xLTQuNSAxMS45LTEwLjRNMjQgMzBjMCA2IDQuNSAxMS4xIDEwLjQgMTEuOSIgc3Ryb2tlPSJyZ2JhKDIxNywgNzAsIDIzOSwgMC4yKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')",
      },
    }
  },
  plugins: [],
}
