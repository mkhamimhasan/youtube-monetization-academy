/**
 * Global design tokens — single source of truth mirrored from
 * tailwind.config.js and globals.css.
 *
 * Tailwind classes can't be read by Three.js materials, GSAP color
 * tweens, or canvas/SVG code, so those layers import raw values from
 * here instead of hardcoding hex strings inline.
 */

export const colors = {
  space: '#050a18',
  spaceMid: '#0d1b3e',
  spacePanel: '#080f22',

  line: '#1e3a6e',

  neonBlue: '#0066ff',
  neonBlueLight: '#4da6ff',
  neonCyan: '#00d4ff',
  neonPurple: '#7c3aed',
  neonPurpleLight: '#a78bfa',
  neonAmber: '#fbbf24',
  neonAmberDeep: '#d97706',
  neonGreen: '#34d399',
  neonGreenDeep: '#10b981',
  neonRed: '#f43f5e',
  whatsapp: '#25d366',

  inkPrimary: '#e2e8f0',
  inkSecondary: '#64748b',
  inkMuted: '#475569',
};

export const fonts = {
  display: "'Orbitron', sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const easing = {
  cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)', // GSAP-compatible cubic-bezier string
};

/** Breakpoints, mirrored from the blueprint's responsive hero spec. */
export const breakpoints = {
  mobile: 768,
  tablet: 1200,
};

/** Bloom / post-processing defaults for the Three.js hero globe (Phase 2+). */
export const bloom = {
  threshold: 0.3,
  strength: 1.8,
  radius: 0.4,
};

export default { colors, fonts, easing, breakpoints, bloom };
