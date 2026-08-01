/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces — matches approved design system: #0A0A0F → #111827 → #0F172A
        space: {
          DEFAULT: '#0a0a0f', // primary background
          deep: '#0a0a0f',
          mid: '#111827', // gradient midpoint
          panel: '#0f172a', // tabs/nav surface / final gradient stop
        },
        // Border / hairline
        line: {
          DEFAULT: '#1e3a6e',
          soft: 'rgba(255,255,255,0.07)',
          faint: 'rgba(255,255,255,0.05)',
        },
        // Neon accent system
        neon: {
          blue: '#0066ff',
          'blue-light': '#4da6ff',
          cyan: '#00d4ff',
          purple: '#7c3aed',
          'purple-light': '#a78bfa',
          amber: '#fbbf24',
          'amber-deep': '#d97706',
          green: '#34d399',
          'green-deep': '#10b981',
          red: '#f43f5e',
          whatsapp: '#25d366',
        },
        // Text scale
        ink: {
          primary: '#e2e8f0', // headings / body
          secondary: '#64748b', // descriptions
          muted: '#475569', // supporting copy
          faint: '#1e3a6e', // micro-labels
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'], // headline / hero / signature
        body: ['Inter', 'system-ui', 'sans-serif'], // paragraph / UI text
        mono: ['"JetBrains Mono"', 'monospace'], // stats, tech labels, data
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0a0a0f 0%, #111827 60%, #0f172a 100%)',
        'text-gradient-hero':
          'linear-gradient(135deg, #ffffff 0%, #4da6ff 50%, #a78bfa 100%)',
        'cta-gradient': 'linear-gradient(135deg, #0066ff, #7c3aed)',
        'glow-radial':
          'radial-gradient(ellipse, rgba(0,102,255,0.07) 0%, transparent 70%)',
      },
      boxShadow: {
        'neon-blue': '0 0 24px rgba(0,102,255,0.35)',
        'neon-cyan': '0 0 24px rgba(0,212,255,0.3)',
        'neon-purple': '0 0 24px rgba(124,58,237,0.35)',
        'neon-green': '0 0 24px rgba(52,211,153,0.3)',
        glass: '0 8px 32px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        card: '9px',
        pill: '20px',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      // Motion durations kept within spec's 0.4–0.6s window where the
      // animation drives entrance/emphasis (fade-up). Ambient loops
      // (marquee, float, pulse-glow) are intentionally slower since
      // they're background motion, not interaction feedback — spec's
      // 0.4–0.6s guidance is for hover/transition states.
      animation: {
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'spin-slow': 'spin 4s linear infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};