import { useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, type ThemeMode } from './theme'

function App() {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const initial = getInitialTheme()
    setMode(initial)
    applyTheme(initial)
  }, [])

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light'
    setMode(next)
    applyTheme(next)
  }

  return (
    <main className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-4 sm:p-6 lg:p-10">
        <header className="flex items-center justify-between">
          <h1 className="text-base font-semibold sm:text-lg">Sathvik Portfolio</h1>
          <button
            onClick={toggleTheme}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text)] shadow-sm transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          >
            {mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </header>

        <div className="my-auto grid gap-6 lg:grid-cols-2 lg:gap-10">
          <article className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-medium text-[var(--primary)]">Custom Portfolio Build</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Full-screen landing page with theme system from day one.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              This layout is fully responsive and designed to be a clean base for your upcoming sections: projects,
              experience, interests, and more.
            </p>
          </article>

          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-8 lg:p-10">
            <h3 className="text-lg font-semibold sm:text-xl">Theme tokens (centralized)</h3>
            <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
              Edit <code className="rounded bg-[var(--bg)] px-1.5 py-0.5">frontend/src/theme.ts</code> to change all
              light/dark colors globally.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[var(--border)] p-3">
                <p className="text-xs text-[var(--text-muted)]">Background</p>
                <div className="mt-2 h-10 rounded-md border border-[var(--border)] bg-[var(--bg)]" />
              </div>
              <div className="rounded-xl border border-[var(--border)] p-3">
                <p className="text-xs text-[var(--text-muted)]">Surface</p>
                <div className="mt-2 h-10 rounded-md border border-[var(--border)] bg-[var(--bg-elevated)]" />
              </div>
              <div className="rounded-xl border border-[var(--border)] p-3">
                <p className="text-xs text-[var(--text-muted)]">Primary</p>
                <div className="mt-2 h-10 rounded-md" style={{ backgroundColor: 'var(--primary)' }} />
              </div>
              <div className="rounded-xl border border-[var(--border)] p-3">
                <p className="text-xs text-[var(--text-muted)]">Text</p>
                <div className="mt-2 h-10 rounded-md border border-[var(--border)] bg-[var(--bg)]" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
