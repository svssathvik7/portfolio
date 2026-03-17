import { useEffect, useState } from 'react';
import ClickSpark from './components/ClickSpark';
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
    <ClickSpark sparkColor={mode === 'dark' ? '#ffffff' : '#000000'} sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
    <main className='relative min-h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-300'>
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
        className='relative mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24'
      >
        <div className='flex flex-col justify-center'>
          {/* Name */}
          <h1
            className='font-serif text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Sathvik
          </h1>

          {/* Tagline — the three pillars */}
          <p
            className='mt-3 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Systems. Songs. Checkmates.
          </p>

          {/* Decorative divider */}
          <div className='mt-8 flex items-center gap-3'>
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
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            I build systems that don&apos;t break,
            <br className='hidden sm:block' />
            sing when the code compiles,
            <br className='hidden sm:block' />
            and always have one more move left.
          </p>

          {/* Caption with role and interests */}
          <p className='mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg'>
            Backend Engineer at{' '}
            <a href='https://garden.finance/' target='_blank' rel='noopener noreferrer' className='font-medium text-[var(--primary)] hover:underline'>
              Garden Finance
            </a>
            . Rust, TypeScript, multi-chain infrastructure.
            <span className='mt-2 block'>
              Singer. Chess enthusiast. Occasionally funny.
            </span>
          </p>

          {/* Tech stack pills */}
          <div className='mt-10 flex flex-wrap gap-2'>
            {['Rust', 'TypeScript', 'Bitcoin', 'Ethereum', 'Solana', 'Sui'].map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 font-mono text-xs font-medium text-[var(--text-muted)] sm:text-sm'
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </section>

      <Experience />
      <Projects />
      <Connect />
      <GoToTop />
    </main>
    </ClickSpark>
  );
}

export default App;
