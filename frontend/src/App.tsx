import { useEffect, useState } from 'react';
import Connect from './components/Connect';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GoToTop from './components/GoToTop';
import Navbar from './components/Navbar';
import { applyTheme, getInitialTheme, type ThemeMode } from './theme';

function App() {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    applyTheme(next);
  };

  return (
    <main className='relative min-h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-300'>
      {/* Animated gradient orb - subtle ambient glow */}
      <div
        className='pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-30 blur-3xl'
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--primary) 25%, transparent) 0%, transparent 70%)`,
          animation: 'gradient-shift 15s ease-in-out infinite',
        }}
        aria-hidden
      />
      <div
        className='pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl'
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--primary) 30%, transparent) 0%, transparent 70%)`,
          animation: 'gradient-shift 18s ease-in-out infinite reverse',
        }}
        aria-hidden
      />
      {/* Subtle background pattern */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'
        style={{
          backgroundImage: `
            linear-gradient(var(--text) 1px, transparent 1px),
            linear-gradient(90deg, var(--text) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <Navbar onThemeToggle={toggleTheme} themeMode={mode} />

      <section
        id='hero'
        className='relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20'
      >
        <div className='my-auto flex flex-col justify-center'>
          {/* Name */}
          <h1
            className='font-serif text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl'
            style={{
              fontFamily: 'var(--font-serif)',
              animation: 'fade-up 0.6s ease-out forwards',
            }}
          >
            Sathvik
          </h1>

          {/* Tagline — the three pillars */}
          <p
            className='mt-3 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <span
              className='inline-block'
              style={{ animation: 'fade-up 0.6s ease-out 0.1s forwards', opacity: 0 }}
            >
              Systems.
            </span>{' '}
            <span
              className='inline-block'
              style={{ animation: 'fade-up 0.6s ease-out 0.25s forwards', opacity: 0 }}
            >
              Songs.
            </span>{' '}
            <span
              className='inline-block'
              style={{ animation: 'fade-up 0.6s ease-out 0.4s forwards', opacity: 0 }}
            >
              Checkmates.
            </span>
          </p>

          {/* Decorative divider */}
          <div
            className='mt-8 flex items-center gap-3'
            style={{ animation: 'fade-up 0.6s ease-out 0.5s forwards', opacity: 0 }}
          >
            <span
              className='h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60'
              aria-hidden
            />
            <span className='text-[var(--text-muted)]' aria-hidden>
              •
            </span>
            <span
              className='h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60'
              aria-hidden
            />
          </div>

          {/* Hero heading */}
          <p
            className='mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl md:text-2xl'
            style={{
              fontFamily: 'var(--font-sans)',
              animation: 'fade-up 0.6s ease-out 0.6s forwards',
              opacity: 0,
            }}
          >
            I build systems that don&apos;t break,
            <br className='hidden sm:block' />
            sing when the code compiles,
            <br className='hidden sm:block' />
            and always have one more move left.
          </p>

          {/* Caption with role and interests */}
          <p
            className='mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg'
            style={{ animation: 'fade-up 0.6s ease-out 0.7s forwards', opacity: 0 }}
          >
            Backend Engineer at{' '}
            <span className='font-medium text-[var(--primary)]'>
              Garden Finance
            </span>
            . Rust, TypeScript, multi-chain infrastructure.
            <span className='mt-2 block'>
              Singer. Chess enthusiast. Occasionally funny.
            </span>
          </p>

          {/* Tech stack pills */}
          <div
            className='mt-10 flex flex-wrap gap-2'
            style={{ animation: 'fade-up 0.6s ease-out 0.85s forwards', opacity: 0 }}
          >
            {['Rust', 'TypeScript', 'Bitcoin', 'Ethereum', 'Solana', 'Sui'].map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 font-mono text-xs font-medium text-[var(--text-muted)] transition-transform duration-200 hover:scale-105 hover:border-[var(--primary)]/50 sm:text-sm'
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <footer className='mt-auto pt-12'>
          <p
            className='font-mono text-xs text-[var(--text-muted)]/70'
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Portfolio v1 — more sections coming soon
          </p>
        </footer>
      </section>

      <Experience />
      <Projects />
      <Connect />
      <GoToTop />
    </main>
  );
}

export default App;
