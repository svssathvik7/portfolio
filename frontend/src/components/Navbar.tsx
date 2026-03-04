import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-(--bg-elevated)/90 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 sm:px-10 sm:py-4 lg:px-12">
        <div className="flex items-center gap-1 sm:gap-2">
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

        {onThemeToggle && (
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
        )}
      </div>
    </nav>
  )
}
