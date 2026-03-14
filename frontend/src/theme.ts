export type ThemeMode = 'light' | 'dark';

export const themePalettes = {
  light: {
    '--bg': '#fefaf5',
    '--bg-elevated': '#ffffff',
    '--text': '#1c1917',
    '--text-muted': '#57534e',
    '--primary': '#d97706',
    '--primary-soft': '#fef3c7',
    '--primary-contrast': '#ffffff',
    '--border': '#e7e5e4',
    '--ring': '#f59e0b',
    '--accent-warm': '#b45309',
  },
  dark: {
    '--bg': '#0a0a0b',
    '--bg-elevated': '#141414',
    '--text': '#fafaf9',
    '--text-muted': '#a8a29e',
    '--primary': '#fbbf24',
    '--primary-soft': '#422006',
    '--primary-contrast': '#1c1917',
    '--border': '#27272a',
    '--ring': '#f59e0b',
    '--accent-warm': '#f59e0b',
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
