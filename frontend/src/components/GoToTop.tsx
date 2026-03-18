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
      className={`fixed bottom-6 right-6 z-40 cursor-pointer transition-all duration-300 focus:outline-none md:bottom-8 md:right-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      <span
        className='flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]'
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-elevated)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <svg className='h-3 w-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
        </svg>
        top
      </span>
    </button>
  )
}
