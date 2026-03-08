import { useEffect, useRef, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  href?: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'garden-sdk',
    title: 'Garden SDK',
    href: 'https://www.npmjs.com/search?q=%40gardenfi%2Fcore',
    description:
      "TypeScript SDK wrapping the Garden backend for cross-chain atomic swaps. Led development of complete Bitcoin HTLC support, Bitcoin wallet connections (OKX, Unisat, Xverse), Sui integration, Litecoin support, and Spark (Bitcoin L2) support. Published as @gardenfi/core, @gardenfi/wallet-connectors, and related packages on npm.",
    tags: [
      'TypeScript',
      'Bitcoin',
      'HTLC',
      'Sui',
      'Litecoin',
      'Spark',
      'Wallet Connectors',
      'Blockchain SDK',
    ],
  },
  {
    id: 'garden-staking',
    title: 'Garden Staking & Distribution',
    href: 'https://app.garden.finance/stake',
    description:
      "Rust-based distribution system powering Garden's reward infrastructure. Handles on-chain reward distribution, staking logic, and precision accounting with deterministic reward calculations. Production-grade backend services built for reliability at scale.",
    tags: [
      'Rust',
      'Blockchain',
      'Staking and Rewards',
      'Deterministic Systems',
      'Backend Infrastructure',
    ],
  },
  {
    id: 'turbine-rpc-proxy',
    title: 'Turbine RPC Proxy',
    href: 'https://crates.io/crates/turbine-rpc-proxy',
    description:
      'Multi-chain RPC proxy with intelligent endpoint rotation, health checks, and caching. Supports any JSON-RPC chain — EVM, Solana, Starknet, and more. Built in Rust for performance and reliability.',
    tags: [
      'Rust',
      'RPC',
      'Multi-Chain',
      'Load Balancing',
      'Health Checks',
      'Caching',
      'Infrastructure',
    ],
  },
];

function ProjectCard({
  project,
  isVisible,
  delay,
}: {
  project: Project;
  isVisible: boolean;
  delay: number;
}) {
  const content = (
    <>
      <div className='flex items-start justify-between gap-3'>
        <h3
          className='min-w-0 flex-1 text-base font-semibold transition-colors duration-300 group-hover:text-[var(--primary)] sm:text-lg'
          style={{ color: 'var(--text)' }}
        >
          {project.title}
        </h3>
        {project.href && (
          <svg
            className='mt-0.5 h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[var(--primary)] sm:h-5 sm:w-5'
            style={{ color: 'var(--text-muted)' }}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        )}
      </div>
      <p
        className='mt-3 text-sm leading-relaxed'
        style={{ color: 'var(--text-muted)' }}
      >
        {project.description}
      </p>
      <div className='mt-4 flex flex-wrap gap-2'>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className='rounded-full border px-2.5 py-1 font-mono text-xs'
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  const cardClassName = `group block min-w-0 rounded-2xl border border-[var(--border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_15%,transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 sm:p-6 ${
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
  }`;
  const cardStyle = {
    backgroundColor: 'var(--bg-elevated)',
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
  };

  if (project.href) {
    return (
      <a
        href={project.href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`${project.title} (opens in new tab)`}
        className={cardClassName}
        style={cardStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={cardClassName} style={cardStyle}>
      {content}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    sectionObserver.observe(el);

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const itemRefs = PROJECTS.map((_, i) =>
      document.getElementById(`project-item-${i}`),
    ).filter(Boolean);

    const observers = itemRefs.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(i));
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -20px 0px' },
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [isVisible]);

  return (
    <section
      id='projects'
      ref={sectionRef}
      className='w-full border-t py-16 sm:py-20 md:py-24'
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
      aria-labelledby='projects-heading'
    >
      <div className='mx-auto max-w-3xl px-6 sm:px-10 lg:px-12'>
        <h2
          id='projects-heading'
          className='font-serif text-2xl font-bold tracking-tight sm:text-3xl'
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          Projects
        </h2>
        <p
          className='mt-2 text-base sm:text-lg'
          style={{ color: 'var(--text-muted)' }}
        >
          Selected systems and infrastructure work.
        </p>

        <div className='mt-10 grid gap-6 sm:gap-8 md:grid-cols-2'>
          {PROJECTS.map((project, i) => (
            <div key={project.id} id={`project-item-${i}`}>
              <ProjectCard
                project={project}
                isVisible={visibleItems.has(i)}
                delay={i * 80}
              />
            </div>
          ))}
        </div>

        <p
          className='mt-10 text-center text-sm sm:text-base'
          style={{ color: 'var(--text-muted)' }}
        >
          And many more —{' '}
          <a
            href='https://github.com/svssathvik7'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium transition-colors hover:underline'
            style={{ color: 'var(--primary)' }}
            aria-label='View more projects on GitHub'
          >
            explore on GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
