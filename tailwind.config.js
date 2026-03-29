/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Couleur or / dorée
        'henok-or': {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f0c040',
          500: '#d4a017',
          600: '#c8920e',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Bleu marine (couleur principale)
        'henok-marine': {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1e3a5f',
          600: '#1a3354',
          700: '#152b47',
          800: '#10223a',
          900: '#0b192d',
        },
        // Orange vif (CTA)
        'henok-orange': {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#e8600a',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        titre:  ["'Cinzel'", 'Georgia', 'serif'],
        corps:  ["'Nunito'", 'sans-serif'],
        mono:   ["'Share Tech Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};
