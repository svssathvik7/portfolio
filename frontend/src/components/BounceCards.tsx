import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface BounceCard {
  title: string;
  description: string;
  href?: string;
  tags: string[];
  accent: string; // gradient string for the top strip
}

interface BounceCardsProps {
  cards: BounceCard[];
  className?: string;
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  cards,
  className = '',
  containerWidth = 500,
  containerHeight = 350,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string) => {
    if (/rotate\([\s\S]*?\)/.test(transformStr)) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    }
    return transformStr === 'none' ? 'rotate(0deg)' : `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const newX = parseFloat(match[1]) + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    }
    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    cards.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const delay = Math.abs(hoveredIdx - i) * 0.05;
        gsap.to(target, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    cards.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {cards.map((card, idx) => {
        const Wrapper = card.href ? 'a' : 'div';
        const linkProps = card.href
          ? { href: card.href, target: '_blank' as const, rel: 'noopener noreferrer' }
          : {};

        return (
          <div
            key={idx}
            className={`bounce-card bounce-card-${idx} group/card absolute`}
            style={{ transform: transformStyles[idx] ?? 'none' }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={() => resetSiblings()}
          >
            {/* The card itself — fixed size */}
            <Wrapper
              {...linkProps}
              aria-label={card.href ? `${card.title} (opens in new tab)` : undefined}
              className='flex h-[120px] w-[220px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--primary)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
              style={{ backgroundColor: 'var(--bg-elevated)' }}
            >
              {/* Accent gradient strip */}
              <div
                className='h-1.5 w-full shrink-0'
                style={{ background: card.accent }}
              />

              {/* Title + arrow */}
              <div className='flex items-start justify-between gap-2 px-4 pt-3'>
                <h3
                  className='text-sm font-semibold leading-snug'
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                >
                  {card.title}
                </h3>
                {card.href && (
                  <svg
                    className='mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity duration-200 group-hover/card:opacity-100'
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
                )}
              </div>

              {/* Tags */}
              <div className='mt-2 flex flex-wrap gap-1 px-4'>
                {card.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full border px-1.5 py-0.5 text-[9px] font-medium'
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
            </Wrapper>

            {/* Floating detail panel — appears below on hover */}
            <div
              className='pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-[240px] -translate-x-1/2 scale-95 rounded-xl border border-[var(--border)] p-3 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out group-hover/card:pointer-events-auto group-hover/card:scale-100 group-hover/card:opacity-100'
              style={{ backgroundColor: 'var(--bg-elevated)' }}
            >
              <p
                className='text-[11px] leading-relaxed'
                style={{ color: 'var(--text-muted)' }}
              >
                {card.description}
              </p>
              {card.tags.length > 3 && (
                <div className='mt-2 flex flex-wrap gap-1'>
                  {card.tags.slice(3).map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border px-1.5 py-0.5 text-[9px] font-medium'
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
        );
      })}
    </div>
  );
}
