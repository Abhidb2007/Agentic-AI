import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f172a',
        card: '#111827',
        accent: '#3b82f6',
        accentSoft: '#dbeafe',
        border: '#e5e7eb',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15,23,42,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
