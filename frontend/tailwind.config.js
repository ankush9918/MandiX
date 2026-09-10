/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mandi-bg": "#F7F8FA",
        "mandi-slate": "#0F172A",
        "mandi-slate-dark": "#0B1120",
        "mandi-muted": "#64748B",
        "mandi-border": "#E2E8F0",
        "neon-mint": "#00F098",
        "accent-green": "#00C97E",
        "light-mint": "#E8FFF6",
        "deep-green": "#006D42",
        "kisan-green": "#008753",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'level-1': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'level-2': '0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'level-3': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'neon-glow': '0 0 0 1px #00F098, 0 4px 14px 0 rgba(0, 240, 152, 0.35)',
      },
      borderRadius: {
        '2xl': '1.5rem',
        'xl': '1rem',
        'lg': '0.5rem',
      }
    },
  },
  plugins: [],
}
