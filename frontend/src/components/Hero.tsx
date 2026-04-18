import InkUnderline from './decorations/InkUnderline';
import MusicalNotes from './decorations/MusicalNotes';
import ScriptSignature from './decorations/ScriptSignature';

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative mx-auto flex min-h-[85vh] w-full max-w-3xl flex-col px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16'
    >
      <div className='my-auto flex flex-col justify-center'>
        <ScriptSignature className='text-xl text-[var(--primary)]/80 sm:text-2xl' />

        <h1
          className='mt-1 font-serif text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl'
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Sathvik
        </h1>

        <p
          className='mt-3 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl'
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Systems.{' '}
          <span className='relative inline-block'>
            Songs
            <MusicalNotes className='absolute -right-10 -top-2 h-6 w-8 -rotate-[8deg] text-[var(--primary)] opacity-40 sm:-right-12 sm:h-7 sm:w-10' />
          </span>
          . Checkmates.
        </p>

        <div className='mt-8 h-3 w-48 text-[var(--primary)] opacity-70'>
          <InkUnderline className='h-full w-full' />
        </div>

        <p
          className='mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl md:text-2xl'
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          I build systems that don&apos;t break,
          <br className='hidden sm:block' />
          sing when the code compiles,
          <br className='hidden sm:block' />
          and always have one more move left.
        </p>

        <p className='mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg'>
          Backend Engineer at{' '}
          <a
            href='https://garden.finance/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium text-[var(--primary)] hover:underline'
          >
            Garden Finance
          </a>
          . Rust, TypeScript, multi-chain infrastructure.
          <span className='mt-2 block'>
            Singer. Chess enthusiast. Occasionally funny.
          </span>
        </p>

        <div className='mt-10 flex flex-wrap gap-2'>
          {['Rust', 'TypeScript', 'Bitcoin', 'Ethereum', 'Solana', 'Sui'].map((tag) => (
            <span
              key={tag}
              className='rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 font-mono text-xs font-medium text-[var(--text-muted)] sm:text-sm'
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <footer className='mt-auto pt-12' />
    </section>
  );
}
