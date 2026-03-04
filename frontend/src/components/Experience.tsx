import { useEffect, useRef, useState } from 'react'

type EntryType = 'Work' | 'Education'

interface TimelineEntry {
  id: string
  role: string
  org: string
  duration: string
  type: EntryType
  description: string
  tags: string[]
  isActive?: boolean
}

const ENTRIES: TimelineEntry[] = [
  {
    id: 'garden',
    role: 'Software Developer III',
    org: 'Garden Finance (Hashiraworks)',
    duration: 'September 30, 2025 – Present',
    type: 'Work',
    description:
      'Building and maintaining backend infrastructure for cross-chain swap protocols. Working across Rust and TypeScript services powering Bitcoin, EVM, and Sui ecosystems.',
    tags: ['Rust', 'TypeScript', 'Distributed Systems', 'Blockchain'],
    isActive: true,
  },
  {
    id: 'mvgr',
    role: 'B.Tech',
    org: 'MVGR College of Engineering (MVGRCE)',
    duration: '2021 – 2025',
    type: 'Education',
    description:
      'Bachelor of Technology. Graduated with a CGPA of 9.56. Built strong foundations in computer science, algorithms, and systems.',
    tags: ['Computer Science', 'Algorithms', 'Systems'],
    isActive: false,
  },
]

function TimelineDot({ isActive }: { isActive?: boolean }) {
  return (
    <div
      className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-5 sm:w-5 ${
        isActive
          ? 'border-[var(--primary)] bg-[var(--primary)]'
          : 'border-[var(--border)] bg-[var(--bg-elevated)]'
      }`}
    >
      {isActive && (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-30"
          style={{ backgroundColor: 'var(--primary)' }}
          aria-hidden
        />
      )}
    </div>
  )
}

function TimelineEntryCard({
  entry,
  isVisible,
}: {
  entry: TimelineEntry
  isVisible: boolean
}) {
  return (
    <div
      className={`flex gap-4 transition-all duration-700 ease-out sm:gap-6 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        <TimelineDot isActive={entry.isActive} />
      </div>

      <div
        className={`flex-1 pb-10 sm:pb-12 ${
          entry.isActive
            ? 'rounded-xl border-2 border-[var(--primary)]'
            : 'rounded-xl border border-[var(--border)]'
        } bg-[var(--bg-elevated)] p-5 shadow-sm transition-colors sm:p-6`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <h3 className="text-lg font-semibold text-[var(--text)] sm:text-xl">
            {entry.role}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex rounded-full px-3 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: 'var(--primary-soft)',
                color: 'var(--primary)',
              }}
            >
              {entry.type}
            </span>
            <span
              className="inline-flex rounded-full border px-3 py-0.5 text-xs font-medium text-[var(--text-muted)]"
              style={{ borderColor: 'var(--border)' }}
            >
              {entry.duration}
            </span>
          </div>
        </div>

        <p className="mt-1 text-sm font-medium text-[var(--primary)] sm:text-base">
          {entry.org}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {entry.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2.5 py-1 font-mono text-xs text-[var(--text-muted)]"
              style={{ borderColor: 'var(--border)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleEntries, setVisibleEntries] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const refs = entryRefs.current

    refs.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisibleEntries((prev) => new Set(prev).add(i))
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section
      id="experience"
      className="w-full border-t py-16 sm:py-20 md:py-24"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-12">
        <h2
          id="experience-heading"
          className="font-serif text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Experience
        </h2>

        <div className="relative mt-10">
          {/* Timeline line */}
          <div
            className="absolute left-[7px] top-5 bottom-8 w-px sm:left-[9px]"
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden
          />
          <div className="flex flex-col gap-8 sm:gap-10">
            {ENTRIES.map((entry, i) => (
              <div
                key={entry.id}
                ref={(el) => {
                  entryRefs.current[i] = el
                }}
              >
                <TimelineEntryCard
                  entry={entry}
                  isVisible={visibleEntries.has(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
