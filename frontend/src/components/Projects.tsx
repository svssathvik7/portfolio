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

        <div className='mt-12 flex justify-center'>
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
