import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#dfc06a',
          dark: '#a88a3a',
        },
        dark: {
          DEFAULT: '#111111',
          lighter: '#1a1a1a',
          card: '#1e1e1e',
          border: '#2a2a2a',
        },
        cream: {
          DEFAULT: '#faf8f5',
          dark: '#f0ece6',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
