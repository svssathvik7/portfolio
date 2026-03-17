import { useEffect, useRef, useState } from 'react';

interface Entry {
  id: string;
  role: string;
  org: string;
  orgHref?: string;
  duration: string;
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
    tags: ['Rust', 'TypeScript', 'Distributed Systems', 'Blockchain'],
    isActive: true,
  },
  {
    id: 'mvgr',
    role: 'B.Tech, Computer Science',
    org: 'MVGR College of Engineering',
    duration: '2021 – 2025',
    tags: ['CGPA 9.56', 'Algorithms', 'Systems'],
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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='experience'
      ref={sectionRef}
      className='w-full border-t py-16 sm:py-20 md:py-24'
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

        <div className='mt-10 flex flex-col'>
          {ENTRIES.map((entry, i) => (
            <div
              key={entry.id}
              className='transition-all duration-500 ease-out'
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {/* Divider between entries — same style as hero */}
              {i > 0 && (
                <div className='my-8 flex items-center gap-3 sm:my-10'>
                  <span
                    className='h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40'
                    aria-hidden
                  />
                  <span className='text-xs text-[var(--text-muted)] opacity-40' aria-hidden>
                    •
                  </span>
                  <span
                    className='h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40'
                    aria-hidden
                  />
                </div>
              )}

              <div>
                {/* Role */}
                <h3
                  className='text-xl font-semibold tracking-tight sm:text-2xl'
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: entry.isActive ? 'var(--text)' : 'var(--text)',
                  }}
                >
                  {entry.role}
                </h3>

                {/* Org + Duration on one line */}
                <p className='mt-1.5 text-sm sm:text-base' style={{ color: 'var(--text-muted)' }}>
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
                  <span className='mx-2 opacity-40'>·</span>
                  {entry.duration}
                  {entry.isActive && (
                    <span
                      className='ml-2 inline-block h-2 w-2 animate-pulse rounded-full align-middle'
                      style={{ backgroundColor: 'var(--primary)' }}
                      aria-label='Currently active'
                    />
                  )}
                </p>

                {/* Tags */}
                <div className='mt-3 flex flex-wrap gap-2'>
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border px-3 py-1 text-xs font-medium'
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
