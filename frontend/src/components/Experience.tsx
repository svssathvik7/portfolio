import { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  id: string;
  role: string;
  org: string;
  orgHref?: string;
  duration: string;
  tags: string[];
  isActive?: boolean;
}

const ENTRIES: TimelineEntry[] = [
  {
    id: 'garden',
    role: 'Software Developer I',
    org: 'Garden Finance',
    orgHref: 'https://garden.finance/',
    duration: 'Sep 2024 – Present',
    tags: ['Rust', 'TypeScript', 'Blockchain', 'Distributed Systems'],
    isActive: true,
  },
  {
    id: 'mvgr',
    role: 'B.Tech, Computer Science',
    org: 'MVGR College of Engineering',
    duration: '2021 – 2025',
    tags: ['CGPA 9.56', 'Algorithms', 'Systems'],
    isActive: false,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='experience'
      ref={sectionRef}
      className='w-full border-t py-20 sm:py-28 md:py-32'
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
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

        <div className='mt-8 flex flex-col gap-6'>
          {ENTRIES.map((entry, i) => (
            <div
              key={entry.id}
              className='flex gap-4 transition-all duration-500 ease-out'
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Timeline indicator */}
              <div className='flex flex-col items-center pt-1.5'>
                <div
                  className='relative h-3 w-3 shrink-0 rounded-full'
                  style={{
                    backgroundColor: entry.isActive ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  {entry.isActive && (
                    <span
                      className='absolute inset-0 animate-ping rounded-full opacity-30'
                      style={{ backgroundColor: 'var(--primary)' }}
                      aria-hidden
                    />
                  )}
                </div>
                {i < ENTRIES.length - 1 && (
                  <div
                    className='mt-1.5 w-px flex-1'
                    style={{ backgroundColor: 'var(--border)' }}
                    aria-hidden
                  />
                )}
              </div>

              {/* Content */}
              <div className='flex-1 pb-2'>
                <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
                  <h3
                    className='text-base font-semibold sm:text-lg'
                    style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
                  >
                    {entry.role}
                  </h3>
                  <span
                    className='text-sm'
                    style={{ color: 'var(--text-muted)' }}
                  >
                    at{' '}
                    {entry.orgHref ? (
                      <a
                        href={entry.orgHref}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium hover:underline'
                        style={{ color: 'var(--primary)' }}
                      >
                        {entry.org}
                      </a>
                    ) : (
                      <span className='font-medium' style={{ color: 'var(--text)' }}>
                        {entry.org}
                      </span>
                    )}
                  </span>
                </div>

                <p
                  className='mt-0.5 text-xs font-medium sm:text-sm'
                  style={{ color: 'var(--text-muted)' }}
                >
                  {entry.duration}
                </p>

                <div className='mt-2 flex flex-wrap gap-1.5'>
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border px-2 py-0.5 text-[10px] font-medium sm:text-xs'
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
