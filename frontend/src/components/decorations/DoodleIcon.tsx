import type { ReactNode } from 'react';

type DoodleVariant = 'briefcase' | 'spark' | 'envelope';

interface DoodleIconProps {
  variant: DoodleVariant;
  className?: string;
}

const PATHS: Record<DoodleVariant, ReactNode> = {
  briefcase: (
    <>
      <path d='M3.5 8.5 C 3.5 7.7, 4.2 7, 5 7 h 14 c 0.8 0, 1.5 0.7, 1.5 1.5 v 10 c 0 0.8, -0.7 1.5, -1.5 1.5 h -14 c -0.8 0, -1.5 -0.7, -1.5 -1.5 z' />
      <path d='M9 7 V 5.2 C 9 4.5, 9.6 4, 10.3 4 h 3.4 C 14.4 4, 15 4.5, 15 5.2 V 7' />
      <path d='M3 12.5 h 18' />
    </>
  ),
  spark: (
    <>
      <path d='M12 3 L 13.2 10.8 L 21 12 L 13.2 13.2 L 12 21 L 10.8 13.2 L 3 12 L 10.8 10.8 Z' />
      <path d='M19 5 l 1 2 M 5 19 l 1.5 1.5' />
    </>
  ),
  envelope: (
    <>
      <path d='M3 6.5 C 3 5.7, 3.7 5, 4.5 5 h 15 c 0.8 0, 1.5 0.7, 1.5 1.5 v 11 c 0 0.8, -0.7 1.5, -1.5 1.5 h -15 c -0.8 0, -1.5 -0.7, -1.5 -1.5 z' />
      <path d='M3.5 6.8 L 12 13 L 20.5 6.8' />
    </>
  ),
};

export default function DoodleIcon({ variant, className }: DoodleIconProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.6}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      {PATHS[variant]}
    </svg>
  );
}
