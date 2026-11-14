/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EE',
        parchment: '#FCFBF8',
        atlas: '#EFECE4',
        ink: '#141E28',
        slateink: '#3E4C59',
        mutedink: '#667480',
        hairline: '#D8D3C8',
        rainblue: '#1D5B86',
        raindeep: '#123A57',
        monsoon: '#1E7A6E',
        extreme: '#C85A28',
        ochre: '#B8862D',
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};

