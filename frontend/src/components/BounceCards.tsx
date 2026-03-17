import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface BounceCard {
  title: string;
  href?: string;
  tags: string[];
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
        const inner = (
          <>
            <h3
              className='text-base font-semibold sm:text-lg'
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
            >
              {card.title}
            </h3>
            <div className='mt-3 flex flex-wrap gap-1.5'>
              {card.tags.slice(0, 3).map((tag) => (
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

        const cardClass = `bounce-card bounce-card-${idx} absolute flex flex-col justify-end rounded-2xl border border-[var(--border)] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:border-[var(--primary)] cursor-pointer`;
        const cardStyle = {
          width: 200,
          height: 140,
          backgroundColor: 'var(--bg-elevated)',
          transform: transformStyles[idx] ?? 'none',
        };

        return card.href ? (
          <a
            key={idx}
            href={card.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${card.title} (opens in new tab)`}
            className={cardClass}
            style={cardStyle}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {inner}
          </a>
        ) : (
          <div
            key={idx}
            className={cardClass}
            style={cardStyle}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
