import {
  SiRust,
  SiTypescript,
  SiPython,
  SiReact,
  SiBitcoin,
  SiEthereum,
  SiSolana,
  SiNextdotjs,
  SiDocker,
  SiPostgresql,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const SKILLS: { icon: IconType; name: string; sub: string }[] = [
  { icon: SiRust, name: 'Rust', sub: 'systems & infra' },
  { icon: SiTypescript, name: 'TypeScript', sub: 'daily driver' },
  { icon: SiPython, name: 'Python', sub: 'scripts & ML' },
  { icon: SiReact, name: 'React', sub: 'frontend' },
  { icon: SiBitcoin, name: 'Bitcoin', sub: 'P2TR scripts & HTLC' },
  { icon: SiEthereum, name: 'EVM', sub: 'Solidity & contracts' },
  { icon: SiSolana, name: 'Solana', sub: 'on-chain programs' },
  { icon: SiNextdotjs, name: 'Next.js', sub: 'full-stack' },
  { icon: SiDocker, name: 'Docker', sub: 'containers' },
  { icon: SiPostgresql, name: 'Postgres', sub: 'source of truth' },
];

export default function Skills() {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-0.5 w-6 rounded-full" style={{ background: 'var(--c-accent)' }} />
          <span
            className="text-xs uppercase tracking-widest font-medium"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-accent-ink)' }}
          >
            Toolbelt
          </span>
        </div>

        <h2
          className="font-medium text-4xl sm:text-5xl leading-tight mb-10"
          style={{
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            maxWidth: '22ch',
            color: 'var(--c-ink)',
          }}
        >
          Tools I reach for without thinking.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SKILLS.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-2xl border p-[18px] transition-all duration-200 hover:-translate-y-1 hover:rotate-1"
              style={{
                background: 'var(--c-card)',
                borderColor: 'var(--c-line)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                style={{
                  background: 'var(--c-sky-100)',
                  color: 'var(--c-accent-ink)',
                }}
              >
                <s.icon size={22} />
              </div>
              <div>
                <div className="font-semibold text-sm leading-tight" style={{ color: 'var(--c-ink)' }}>
                  {s.name}
                </div>
                <div
                  className="text-[11px] mt-0.5 leading-tight"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-mute)' }}
                >
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
