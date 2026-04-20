import { useEffect, useState } from 'react';
import About from './components/About';
import ClickSpark from './components/ClickSpark';
import Connect from './components/Connect';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GoToTop from './components/GoToTop';
import WaveDivider from './components/decorations/WaveDivider';
import { applyTheme, getInitialTheme, type ThemeMode } from './theme';

function CloudBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <div className="bg-cloud c1" />
      <div className="bg-cloud c2" />
      <div className="bg-cloud c3" />
      <div className="bg-cloud c4" />
    </div>
  );
}

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
    <ClickSpark
      sparkColor={mode === 'dark' ? 'oklch(72% 0.14 205)' : 'oklch(64% 0.15 205)'}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <CloudBackground />
      <div className="relative min-h-screen w-full overflow-hidden" style={{ color: 'var(--c-ink)' }}>
        <Navbar onThemeToggle={toggleTheme} themeMode={mode} />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <WaveDivider />
          <Connect />
        </main>
        <GoToTop />
      </div>
    </ClickSpark>
  );
}

export default App;
