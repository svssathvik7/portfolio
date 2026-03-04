export type ThemeMode = 'light' | 'dark'

export const themePalettes = {
  light: {
    '--bg': '#f8fafc',
    '--bg-elevated': '#ffffff',
    '--text': '#0f172a',
    '--text-muted': '#475569',
    '--primary': '#2563eb',
    '--primary-contrast': '#ffffff',
    '--border': '#e2e8f0',
    '--ring': '#93c5fd',
  },
  dark: {
    '--bg': '#020617',
    '--bg-elevated': '#0f172a',
    '--text': '#e2e8f0',
    '--text-muted': '#94a3b8',
    '--primary': '#38bdf8',
    '--primary-contrast': '#082f49',
    '--border': '#1e293b',
    '--ring': '#0ea5e9',
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
