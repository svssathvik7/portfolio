import BounceCards, { type BounceCard } from './BounceCards';

const PROJECTS: BounceCard[] = [
  {
    title: 'Turbine RPC Proxy',
    href: 'https://crates.io/crates/turbine-rpc-proxy',
    tags: ['Rust', 'Multi-Chain', 'Infrastructure'],
  },
  {
    title: 'Garden SDK',
    href: 'https://www.npmjs.com/search?q=%40gardenfi%2Fcore',
    tags: ['TypeScript', 'Bitcoin', 'HTLC'],
  },
  {
    title: 'Garden Staking',
    href: 'https://app.garden.finance/stake',
    tags: ['Rust', 'Staking', 'Rewards'],
  },
  {
    title: 'Garden Orderbook',
    href: 'https://garden.finance',
    tags: ['Hono', 'PostgreSQL', 'Workers'],
  },
  {
    title: 'Bitcoin ZMQ Watcher',
    href: 'https://github.com/svssathvik7',
    tags: ['Rust', 'Bitcoin', 'Real-time'],
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
  const inner = (
    <>
      <h3
        className='text-base font-semibold'
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
      >
        {project.title}
      </h3>
      <div className='mt-2 flex flex-wrap gap-1.5'>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className='rounded-full border px-2 py-0.5 font-mono text-[10px]'
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
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`${project.title} (opens in new tab)`}
        className='block rounded-xl border border-[var(--border)] p-4 transition-colors duration-200 active:border-[var(--primary)]'
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className='rounded-xl border border-[var(--border)] p-4'
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

        {/* Desktop: BounceCards with hover */}
        <div className='mt-12 hidden justify-center md:flex'>
          <BounceCards
            cards={PROJECTS}
            containerWidth={600}
            containerHeight={300}
            transformStyles={TRANSFORM_STYLES}
            enableHover={true}
            animationDelay={0.5}
            animationStagger={0.08}
          />
        </div>

        {/* Mobile: stacked flex cards */}
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
