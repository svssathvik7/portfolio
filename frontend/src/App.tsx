import { useEffect, useState } from 'react';
import ClickSpark from './components/ClickSpark';
import Connect from './components/Connect';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Projects from './components/Projects';
import GoToTop from './components/GoToTop';
import Navbar from './components/Navbar';
import WaveDivider from './components/decorations/WaveDivider';
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
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03]'
          style={{
            backgroundImage: `
              linear-gradient(var(--text) 1px, transparent 1px),
              linear-gradient(90deg, var(--text) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        <Navbar onThemeToggle={toggleTheme} themeMode={mode} />

        <Hero />
        <Experience />
        <Projects />
        <WaveDivider />
        <Connect />
        <GoToTop />
      </main>
    </ClickSpark>
  );
}

export default App;
