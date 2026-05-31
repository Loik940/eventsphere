/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        primary: '#4F46E5',
        'primary-light': '#EEF2FF',
        dark: '#0F172A',
        surface: '#F9F8F6',
        border: '#ECEAE4',
        muted: '#64748B',
        categories: {
          hackathon: { bg: '#EEF2FF', text: '#3730A3', accent: '#4F46E5' },
          atelier: { bg: '#ECFDF5', text: '#065F46', accent: '#10B981' },
          conference: { bg: '#FFF7ED', text: '#9A3412', accent: '#F97316' },
          seminaire: { bg: '#FAF5FF', text: '#6B21A8', accent: '#9333EA' },
          culturel: { bg: '#FFF1F2', text: '#9F1239', accent: '#F43F5E' },
          sport: { bg: '#FFFBEB', text: '#92400E', accent: '#F59E0B' },
        },
      },
    },
  },
  plugins: [],
}
