import { useEffect, useState } from 'react'

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry?.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '0px' }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 md:bottom-8 md:right-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{
        borderColor: 'var(--primary)',
        backgroundColor: 'var(--bg-elevated)',
        color: 'var(--primary)',
      }}
      aria-label="Scroll to top"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}
