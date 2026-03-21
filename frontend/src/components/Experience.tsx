import { useEffect, useRef, useState } from 'react';

interface Entry {
  id: string;
  role: string;
  org: string;
  orgHref?: string;
  duration: string;
  description: string;
  tags: string[];
  isActive?: boolean;
}

const ENTRIES: Entry[] = [
  {
    id: 'garden',
    role: 'Software Developer I',
    org: 'Garden Finance',
    orgHref: 'https://garden.finance/',
    duration: 'Sep 2024 – Present',
    description:
      'Building and maintaining backend infrastructure for cross-chain swap protocols. Working across Rust and TypeScript services powering Bitcoin, EVM, and Sui ecosystems.',
    tags: ['Rust', 'TypeScript', 'Distributed Systems', 'Blockchain'],
    isActive: true,
  },
  {
    id: 'mvgr',
    role: 'B.Tech, Computer Science',
    org: 'MVGR College of Engineering',
    duration: '2021 – 2025',
    description:
      'Graduated with a CGPA of 9.37. Built strong foundations in computer science, programming, and systems design.',
    tags: ['Computer Science', 'Programming', 'CGPA 9.37'],
  },
];

function AccordionEntry({ entry, isOpen, onToggle }: {
  entry: Entry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className='group cursor-pointer transition-colors'
      onClick={onToggle}
    >
      {/* Header row */}
      <div className='flex items-center gap-4 py-5 sm:gap-6 sm:py-6'>
        {/* Left: accent line + duration */}
        <div className='flex shrink-0 items-center gap-3'>
          <div
            className='h-8 w-[3px] rounded-full transition-colors duration-300'
            style={{
              backgroundColor: isOpen || entry.isActive ? 'var(--primary)' : 'var(--border)',
            }}
          />
          <span
            className='w-[120px] text-xs font-medium sm:w-[140px] sm:text-sm'
            style={{
              fontFamily: 'var(--font-mono)',
              color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
              transition: 'color 0.3s',
            }}
          >
            {entry.duration}
            {entry.isActive && (
              <span
                className='ml-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full align-middle'
                style={{ backgroundColor: 'var(--primary)' }}
              />
            )}
          </span>
        </div>

        {/* Middle: role + org */}
        <div className='min-w-0 flex-1'>
          <h3
            className='text-base font-semibold tracking-tight sm:text-lg'
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--text)',
            }}
          >
            {entry.role}
          </h3>
          <p className='mt-0.5 text-xs sm:text-sm' style={{ color: 'var(--text-muted)' }}>
            {entry.org}
          </p>
        </div>

        {/* Right: toggle indicator */}
        <svg
          className='h-4 w-4 shrink-0 transition-transform duration-300 sm:h-5 sm:w-5'
          style={{
            color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </div>

      {/* Expandable details */}
      <div
        className='exp-expand'
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className='overflow-hidden'>
          <div className='pb-5 pl-[calc(3px+12px+120px+16px)] pr-4 sm:pb-6 sm:pl-[calc(3px+12px+140px+24px)]'>
            <p
              className='text-sm leading-relaxed'
              style={{ color: 'var(--text-muted)' }}
            >
              {entry.description}
            </p>
            <div className='mt-3 flex flex-wrap gap-2'>
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-full border px-2.5 py-0.5 text-xs font-medium'
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {entry.orgHref && (
              <a
                href={entry.orgHref}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-3 inline-flex items-center gap-1 text-xs font-medium hover:underline'
                style={{ color: 'var(--primary)' }}
                onClick={(e) => e.stopPropagation()}
              >
                Visit {entry.org}
                <svg className='h-3 w-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 17L17 7M17 7H7M17 7v10' />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First one open by default

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='experience'
      ref={sectionRef}
      className='w-full py-10 sm:py-14 md:py-16'
      style={{ backgroundColor: 'var(--bg)' }}
      aria-labelledby='experience-heading'
    >
      <div className='mx-auto max-w-3xl px-6 sm:px-10 lg:px-12'>
        <h2
          id='experience-heading'
          className='font-serif text-2xl font-bold tracking-tight sm:text-3xl'
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          Experience
        </h2>

        <div className='mt-8'>
          {ENTRIES.map((entry, i) => (
            <div
              key={entry.id}
              className='transition-all duration-500 ease-out'
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <AccordionEntry
                entry={entry}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
