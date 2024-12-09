/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  safelist: [
    'from-emerald-50',
    'to-emerald-100',
    'text-emerald-500',
    'text-emerald-600',
    'border-emerald-200',
    'from-blue-50',
    'to-blue-100',
    'text-blue-500',
    'text-blue-600',
    'border-blue-200',
    'from-violet-50',
    'to-violet-100',
    'text-violet-500',
    'text-violet-600',
    'border-violet-200',
  ],
  plugins: [],
};