/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#050810',
        'bg-panel': '#111827',
        'bg-panel-hover': '#1f2937',
        'accent-green': '#00ff88',
        'accent-cyan': '#00e5ff',
        'accent-gold': '#ffb700',
        'accent-danger': '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
