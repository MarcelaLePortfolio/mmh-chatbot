import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['sans-serif'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
