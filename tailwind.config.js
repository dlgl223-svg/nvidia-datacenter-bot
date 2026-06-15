/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06070d',
        panel: '#0d0f1a',
        panel2: '#11141f',
        line: '#1d2235',
        muted: '#8a93ad',
        ghost: '#5a6178',
        brand: '#7df9ff',
        amd: '#ed1c24',
        nvidia: '#76b900',
        gold: '#f4c042',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(125,249,255,0.25), 0 0 40px -8px rgba(125,249,255,0.35)',
        card: '0 18px 50px -22px rgba(0,0,0,0.9)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        pulseGlow: {
          '0%,100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
        flow: { to: { 'stroke-dashoffset': '-200' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        riseIn: { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        spinSlow: 'spinSlow 6s linear infinite',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite',
        flow: 'flow 1.4s linear infinite',
        riseIn: 'riseIn 0.6s ease both',
      },
    },
  },
  plugins: [],
};
