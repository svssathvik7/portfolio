import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Contact' },
] as const;

interface NavbarProps {
  onThemeToggle?: () => void;
  themeMode?: 'light' | 'dark';
}

export default function Navbar({ onThemeToggle, themeMode = 'light' }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6">
      <nav
        className="mx-auto flex max-w-[900px] items-center justify-between px-5 py-2.5 rounded-full border"
        style={{
          background: 'color-mix(in oklch, var(--c-card) 86%, transparent)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderColor: 'var(--c-line)',
          boxShadow: 'var(--shadow-sm)',
        }}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div
          className="flex items-center gap-2.5 font-semibold tracking-tight select-none"
          style={{ letterSpacing: '-0.01em', color: 'var(--c-ink)' }}
        >
          <div
            className="w-[22px] h-[22px] rounded-full shrink-0"
            style={{
              background: 'radial-gradient(circle at 30% 30%, var(--c-sky-200), var(--c-sky-500))',
              boxShadow: 'inset 0 -4px 8px oklch(55% 0.15 205 / 0.5), 0 4px 14px oklch(60% 0.15 205 / 0.35)',
              animation: 'bob 5s ease-in-out infinite',
            }}
          />
          <span className="hidden sm:inline">sathvik.dev</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                color: activeId === id ? 'var(--c-ink)' : 'var(--c-ink-soft)',
                background: activeId === id ? 'var(--c-sky-50)' : 'transparent',
              }}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: theme toggle + CTA */}
        <div className="flex items-center gap-2">
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              className="h-9 w-9 rounded-full border flex items-center justify-center transition-all duration-200 hover:border-[var(--c-sky-300)]"
              style={{
                borderColor: 'var(--c-line)',
                color: 'var(--c-mute)',
              }}
              aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {themeMode === 'light' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                )}
              </svg>
            </button>
          )}

          <button
            className="hidden sm:flex px-4 py-2 rounded-full text-sm font-semibold border-none transition-all duration-150 hover:-translate-y-0.5"
            style={{
              background: 'var(--c-ink)',
              color: 'var(--bg)',
            }}
            onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Say hi
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: 'var(--c-line)', color: 'var(--c-mute)' }}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`absolute left-4 right-4 top-[calc(100%+8px)] rounded-2xl border overflow-hidden transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 shadow-xl pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{ borderColor: 'var(--c-line)', background: 'var(--c-card)' }}
      >
        <nav className="flex flex-col py-2">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="flex items-center px-5 py-3 text-sm font-medium transition-colors"
              style={{
                color: activeId === id ? 'var(--c-accent-ink)' : 'var(--c-ink-soft)',
                borderLeft: activeId === id ? '3px solid var(--c-accent)' : '3px solid transparent',
              }}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
      )}
    </div>
  );
}
