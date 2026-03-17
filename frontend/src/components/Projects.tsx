import { useState } from 'react';
import BounceCards, { type BounceCard } from './BounceCards';

const PROJECTS: BounceCard[] = [
  {
    title: 'Turbine RPC Proxy',
    description:
      'Multi-chain RPC proxy with intelligent load balancing, health checks, caching, hedged requests, and per-endpoint auth. Any JSON-RPC chain.',
    href: 'https://crates.io/crates/turbine-rpc-proxy',
    tags: ['Rust', 'Multi-Chain', 'Infrastructure', 'Load Balancing', 'Caching'],
    accent: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
  {
    title: 'Garden SDK',
    description:
      'TypeScript SDK for cross-chain atomic swaps. Bitcoin HTLC support, multi-wallet connectors, Sui & Spark integration.',
    href: 'https://www.npmjs.com/search?q=%40gardenfi%2Fcore',
    tags: ['TypeScript', 'Bitcoin', 'HTLC', 'Sui', 'Wallet Connectors'],
    accent: 'linear-gradient(135deg, #22c55e, #16a34a)',
  },
  {
    title: 'Garden Staking',
    description:
      'Rust-based staking and reward distribution system. On-chain reward calculations with deterministic precision accounting.',
    href: 'https://app.garden.finance/stake',
    tags: ['Rust', 'Staking', 'Rewards', 'Deterministic', 'On-chain'],
    accent: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  {
    title: 'Garden Orderbook',
    description:
      'High-performance orderbook service powering Garden\'s cross-chain swap matching and execution engine.',
    href: 'https://garden.finance',
    tags: ['Hono', 'PostgreSQL', 'Workers', 'Hyperdrive', 'Orderbook'],
    accent: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  },
  {
    title: 'Bitcoin ZMQ Watcher',
    description:
      'Real-time Bitcoin transaction monitoring via ZeroMQ. Watches mempool and block events for the Garden protocol.',
    href: 'https://github.com/svssathvik7',
    tags: ['Rust', 'Bitcoin', 'Real-time', 'ZeroMQ', 'Mempool'],
    accent: 'linear-gradient(135deg, #ec4899, #db2777)',
  },
];

const TRANSFORM_STYLES = [
  'rotate(10deg) translate(-170px)',
  'rotate(5deg) translate(-85px)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(85px)',
  'rotate(2deg) translate(170px)',
];

function MobileProjectCard({ project }: { project: BounceCard }) {
  const [expanded, setExpanded] = useState(false);

  const inner = (
    <>
      {/* Accent strip */}
      <div
        className='h-1 w-full shrink-0 rounded-t-xl'
        style={{ background: project.accent }}
      />
      <div className='p-4'>
        <div className='flex items-start justify-between gap-2'>
          <h3
            className='text-base font-semibold'
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            {project.title}
          </h3>
          <div className='flex items-center gap-2'>
            {project.href && (
              <a
                href={project.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${project.title} (opens in new tab)`}
                className='shrink-0'
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className='h-4 w-4'
                  style={{ color: 'var(--primary)' }}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 17L17 7M17 7H7M17 7v10'
                  />
                </svg>
              </a>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className='shrink-0 transition-transform duration-200'
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              <svg
                className='h-4 w-4'
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
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='mt-2 flex flex-wrap gap-1.5'>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className='rounded-full border px-2 py-0.5 text-[10px] font-medium'
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

        {/* Expandable section */}
        <div
          className='overflow-hidden transition-all duration-300 ease-out'
          style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}
        >
          <div
            className='mt-3 h-px w-full'
            style={{ backgroundColor: 'var(--border)' }}
          />
          <p
            className='mt-3 text-xs leading-relaxed'
            style={{ color: 'var(--text-muted)' }}
          >
            {project.description}
          </p>
          {project.tags.length > 3 && (
            <div className='mt-2 flex flex-wrap gap-1.5'>
              {project.tags.slice(3).map((tag) => (
                <span
                  key={tag}
                  className='rounded-full border px-2 py-0.5 text-[10px] font-medium'
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
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      className='overflow-hidden rounded-xl border border-[var(--border)] transition-colors duration-200 active:border-[var(--primary)]'
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      {inner}
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id='projects'
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

        {/* Desktop: BounceCards with hover-expand */}
        <div className='mt-12 hidden justify-center md:flex'>
          <BounceCards
            cards={PROJECTS}
            containerWidth={600}
            containerHeight={350}
            transformStyles={TRANSFORM_STYLES}
            enableHover={true}
            animationDelay={0.5}
            animationStagger={0.08}
          />
        </div>

        {/* Mobile: expandable cards */}
        <div className='mt-10 flex flex-col gap-3 md:hidden'>
          {PROJECTS.map((project) => (
            <MobileProjectCard key={project.title} project={project} />
          ))}
        </div>

        <p
          className='mt-12 text-center text-sm sm:text-base'
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
