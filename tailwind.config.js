/** @type {import('tailwindcss').Config} */
// THE LIVING MONSOON SKY — semantic tokens remapped onto a storm-atmosphere palette.
// Legacy token names (ivory, parchment, ink…) are kept so every page inherits the sky theme.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces (deepest → lifted)
        ivory: '#071522', // page sky: midnight storm navy
        parchment: '#0C1E2E', // panels: one layer of cloud above the night
        atlas: '#10283B', // alternate band: deep atmospheric blue
        // Typography
        ink: '#DCE8EF', // mist white
        slateink: '#A9BCC8',
        mutedink: '#7F96A5',
        hairline: '#22384A',
        // Accents
        rainblue: '#729CB5',
        raindeep: '#10283B',
        monsoon: '#5C9B9B',
        extreme: '#D9895A', // restrained ember for rainfall extremes
        ochre: '#C9A35A',
        // Explicit sky palette
        storm: '#071522',
        atmos: '#10283B',
        thunder: '#344653',
        rain: '#729CB5',
        mist: '#DCE8EF',
        lightning: '#D9E8F3',
        tealsky: '#5C9B9B',
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
