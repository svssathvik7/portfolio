import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
] as const

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string
  label: string
  isActive: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
        isActive
          ? 'text-[var(--primary)]'
          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
      }`}
      aria-current={isActive ? 'location' : undefined}
    >
      {label}
      {isActive && (
        <span
          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full sm:left-5 sm:right-5"
          style={{ backgroundColor: 'var(--primary)' }}
          aria-hidden
        />
      )}
    </a>
  )
}

interface NavbarProps {
  onThemeToggle?: () => void
  themeMode?: 'light' | 'dark'
}

export default function Navbar({ onThemeToggle, themeMode = 'light' }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) setActiveId(id)
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const themeToggleButton = onThemeToggle ? (
    <button
      onClick={onThemeToggle}
      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] sm:h-10 sm:w-10"
      style={{ borderColor: 'var(--border)' }}
      aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <svg
        className="h-4 w-4 transition-transform group-hover:rotate-12 sm:h-5 sm:w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {themeMode === 'light' ? (
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
  ) : null

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg-elevated)]/80 backdrop-blur-md"
      style={{ fontFamily: 'var(--font-display)' }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-10 sm:py-4 lg:px-12">
        {/* Desktop: horizontal nav */}
        <div className="hidden items-center gap-1 md:flex md:gap-2">
          {SECTIONS.map(({ id, label }) => (
            <NavLink
              key={id}
              href={`#${id}`}
              label={label}
              isActive={activeId === id}
              onClick={(e) => handleClick(e, id)}
            />
          ))}
        </div>

        {/* Mobile: hamburger + theme */}
        <div className="flex w-full items-center justify-between md:w-auto md:justify-end md:gap-2">
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border text-[var(--text-muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] md:hidden"
            style={{ borderColor: 'var(--border)' }}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="h-5 w-5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'none' }}
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18h16" />
                </>
              )}
            </svg>
          </button>

          {themeToggleButton}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[53px] z-40 bg-[var(--bg)]/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed left-4 right-4 top-[61px] z-40 overflow-hidden rounded-2xl border transition-all duration-300 ease-out md:hidden ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 shadow-xl'
            : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <nav className="flex flex-col py-2" aria-label="Mobile navigation">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`flex items-center px-5 py-3 text-base font-medium transition-colors ${
                activeId === id
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-muted)] active:bg-[var(--bg)]'
              }`}
              style={{
                borderLeft: activeId === id ? '3px solid var(--primary)' : '3px solid transparent',
              }}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </nav>
  )
}
