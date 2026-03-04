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
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text) 1px, transparent 1px),
            linear-gradient(90deg, var(--text) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <section className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <header className="flex items-center justify-between">
          <span className="font-mono text-sm tracking-wide text-[var(--text-muted)]">Sathvik</span>
          <button
            onClick={toggleTheme}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/80 text-[var(--text-muted)] shadow-sm backdrop-blur-sm transition-all hover:border-[var(--primary)] hover:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <svg
              className="h-5 w-5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mode === 'light' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              )}
            </svg>
          </button>
        </header>

        <div className="my-auto flex flex-col justify-center">
          {/* Name */}
          <h1
            className="font-serif text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Sathvik
          </h1>

          {/* Tagline — the three pillars */}
          <p
            className="mt-3 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Systems. Songs. Checkmates.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center gap-3">
            <span
              className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60"
              aria-hidden
            />
            <span className="text-[var(--text-muted)]" aria-hidden>
              •
            </span>
            <span
              className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60"
              aria-hidden
            />
          </div>

          {/* Hero heading */}
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            I build systems that don&apos;t break,
            <br className="hidden sm:block" />
            sing when the code compiles,
            <br className="hidden sm:block" />
            and always have one more move left.
          </p>

          {/* Caption with role and interests */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Backend Engineer at{' '}
            <span className="font-medium text-[var(--primary)]">Garden Finance</span>. Rust, TypeScript,
            multi-chain infrastructure.
            <span className="mt-2 block">
              Singer. Chess enthusiast. Occasionally funny.
            </span>
          </p>

          {/* Tech stack pills */}
          <div className="mt-10 flex flex-wrap gap-2">
            {['Rust', 'TypeScript', 'Multi-chain'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 font-mono text-xs font-medium text-[var(--text-muted)] sm:text-sm"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <footer className="mt-auto pt-12">
          <p className="font-mono text-xs text-[var(--text-muted)]/70" style={{ fontFamily: 'var(--font-mono)' }}>
            Portfolio v1 — more sections coming soon
          </p>
        </footer>
      </section>
    </main>
  )
}

export default App
