/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: '#fea933',
          yellow: '#fecb38',
          cream: '#f6e8cd',
          'cream-light': '#fbf2e4',
        },
        surface: {
          dark: '#0d0404',
          darker: '#111010',
          black: '#000000',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        pulse_amber: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(254,169,51,0.6)' },
          '50%': { boxShadow: '0 0 0 10px rgba(254,169,51,0)' },
        },
      },
      animation: {
        'pulse-amber': 'pulse_amber 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
