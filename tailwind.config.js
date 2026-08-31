/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variableName}))`
      : `rgb(var(${variableName}) / ${opacityValue})`
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // All theme-aware colors read from CSS variables (see src/index.css)
        // so the same class names (bg-ink, text-muted, ...) work correctly
        // under the light, dark, and gradient themes.
        ink: withOpacity('--c-ink'),
        paper: withOpacity('--c-paper'),
        surface: withOpacity('--c-surface'),
        navy: withOpacity('--c-navy'),
        accent: {
          DEFAULT: withOpacity('--c-accent'),
          dim: withOpacity('--c-accent-dim'),
          soft: withOpacity('--c-accent-soft'),
        },
        muted: {
          DEFAULT: withOpacity('--c-muted'),
          light: withOpacity('--c-muted-light'),
        },
        line: withOpacity('--c-line'),
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1160px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,14,26,0.04), 0 8px 24px -12px rgba(11,14,26,0.10)',
        cardHover: '0 4px 10px rgba(11,14,26,0.06), 0 20px 40px -16px rgba(47,111,237,0.22)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

