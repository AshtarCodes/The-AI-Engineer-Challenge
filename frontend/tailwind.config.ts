import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dragon capsule theme colors
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        'surface-elev1': 'var(--surface-elev1)',
        'surface-elev2': 'var(--surface-elev2)',
        overlay: 'var(--overlay)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-dim': 'var(--text-dim)',
        'text-invert': 'var(--text-invert)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'accent-muted': 'var(--accent-muted)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        'field-bg': 'var(--field-bg)',
        'field-border': 'var(--field-border)',
        'card-bg': 'var(--card-bg)',
        'button-primary': 'var(--button-primary)',
        'button-on-primary': 'var(--button-on-primary)',
        'button-ghost': 'var(--button-ghost)',
        'button-ghost-border': 'var(--button-ghost-border)',
        divider: 'var(--divider)',
        'focus-ring': 'var(--focus-ring)',
        'selection-bg': 'var(--selection-bg)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
