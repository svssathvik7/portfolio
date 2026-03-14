import { useEffect, useState } from 'react';
import Connect from './components/Connect';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GoToTop from './components/GoToTop';
import Navbar from './components/Navbar';
import { applyTheme, getInitialTheme, type ThemeMode } from './theme';

const PILLARS = [
  { label: 'Systems', desc: 'I build them.' },
  { label: 'Songs', desc: 'I sing them.' },
  { label: 'Checkmates', desc: 'I play them.' },
] as const;

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
    <main
      className='scroll-snap-container relative w-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-300'
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Gradient mesh background */}
      <div
        className='pointer-events-none fixed inset-0 opacity-[0.4] dark:opacity-[0.5]'
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in srgb, var(--primary) 15%, transparent), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, color-mix(in srgb, var(--primary) 8%, transparent), transparent),
            radial-gradient(ellipse 60% 40% at 0% 80%, color-mix(in srgb, var(--primary) 10%, transparent), transparent)
          `,
        }}
      />
      {/* Subtle noise texture overlay */}
      <div
        className='pointer-events-none fixed inset-0 opacity-[0.02] dark:opacity-[0.03]'
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar onThemeToggle={toggleTheme} themeMode={mode} />

      <section
        id='hero'
        className='scroll-snap-section relative flex min-h-[100dvh] w-full flex-col'
        aria-label='Introduction'
      >
        <div className='relative mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24'>
          {/* Name */}
          <h1
            className='text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Sathvik
          </h1>

          {/* Three pillars — visual blocks */}
          <div className='mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6'>
            {PILLARS.map(({ label, desc }) => (
              <div
                key={label}
                className='group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_12%,transparent)] sm:p-5'
              >
                <span
                  className='block text-lg font-semibold text-[var(--primary)] sm:text-xl'
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {label}
                </span>
                <span className='mt-1 block text-sm text-[var(--text-muted)]'>{desc}</span>
              </div>
            ))}
          </div>

          {/* Hero copy */}
          <p
            className='mt-10 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl md:text-2xl'
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            I build systems that don&apos;t break,
            <br className='hidden sm:block' />
            sing when the code compiles,
            <br className='hidden sm:block' />
            and always have one more move left.
          </p>

          {/* Role & interests */}
          <p className='mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg'>
            Backend Engineer at{' '}
            <span className='font-medium text-[var(--primary)]'>Garden Finance</span>. Rust,
            TypeScript, multi-chain infrastructure.
            <span className='mt-2 block'>
              Singer. Chess enthusiast. Occasionally funny.
            </span>
          </p>

          {/* Tech stack pills */}
          <div className='mt-10 flex flex-wrap gap-2'>
            {['Rust', 'TypeScript', 'Bitcoin', 'Ethereum', 'Solana', 'Sui'].map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/80 px-4 py-1.5 font-mono text-xs font-medium text-[var(--text-muted)] backdrop-blur-sm transition-colors hover:border-[var(--primary)] hover:text-[var(--text)] sm:text-sm'
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className='flex justify-center pb-8'>
          <a
            href='#experience'
            className='flex flex-col items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]'
            aria-label='Scroll to Experience'
          >
            <span className='text-xs font-medium uppercase tracking-widest'>Explore</span>
            <svg
              className='h-6 w-6 animate-bounce motion-reduce:animate-none'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </a>
        </div>
      </section>

      <Experience />
      <Projects />
      <Connect />
      <GoToTop />
    </main>
  );
}

export default App;
