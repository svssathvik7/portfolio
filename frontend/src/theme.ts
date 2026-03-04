export type ThemeMode = 'light' | 'dark'

export const themePalettes = {
  light: {
    '--bg': '#fafaf9',
    '--bg-elevated': '#ffffff',
    '--text': '#1c1917',
    '--text-muted': '#57534e',
    '--primary': '#0d9488',
    '--primary-soft': '#ccfbf1',
    '--primary-contrast': '#ffffff',
    '--border': '#e7e5e4',
    '--ring': '#5eead4',
    '--accent-warm': '#b45309',
  },
  dark: {
    '--bg': '#0c0a09',
    '--bg-elevated': '#1c1917',
    '--text': '#fafaf9',
    '--text-muted': '#a8a29e',
    '--primary': '#2dd4bf',
    '--primary-soft': '#134e4a',
    '--primary-contrast': '#042f2e',
    '--border': '#292524',
    '--ring': '#14b8a6',
    '--accent-warm': '#f59e0b',
  },
} as const

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const palette = themePalettes[mode]

  Object.entries(palette).forEach(([token, value]) => {
    root.style.setProperty(token, value)
  })

  root.classList.toggle('dark', mode === 'dark')
  localStorage.setItem('theme-mode', mode)
}

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem('theme-mode')
  if (saved === 'light' || saved === 'dark') return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
