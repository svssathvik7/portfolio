export type ThemeMode = 'light' | 'dark';

export const themePalettes = {
  light: {
    '--bg': 'oklch(98.5% 0.015 205)',
    '--bg-elevated': '#ffffff',
    '--text': 'oklch(22% 0.03 205)',
    '--text-muted': 'oklch(42% 0.04 205)',
    '--primary': 'oklch(64% 0.15 205)',
    '--primary-soft': 'oklch(93% 0.06 205)',
    '--primary-contrast': '#ffffff',
    '--border': 'oklch(90% 0.03 205)',
    '--ring': 'oklch(80% 0.12 205)',
    '--accent-warm': '#f59e0b',
  },
  dark: {
    '--bg': 'oklch(18% 0.03 205)',
    '--bg-elevated': 'oklch(22% 0.035 205)',
    '--text': 'oklch(96% 0.02 205)',
    '--text-muted': 'oklch(65% 0.03 205)',
    '--primary': 'oklch(72% 0.14 205)',
    '--primary-soft': 'oklch(26% 0.04 205)',
    '--primary-contrast': 'oklch(18% 0.03 205)',
    '--border': 'oklch(30% 0.03 205)',
    '--ring': 'oklch(80% 0.12 205)',
    '--accent-warm': '#fbbf24',
  },
} as const;

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const palette = themePalettes[mode];

  Object.entries(palette).forEach(([token, value]) => {
    root.style.setProperty(token, value);
  });

  root.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme-mode', mode);
}

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem('theme-mode');
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
