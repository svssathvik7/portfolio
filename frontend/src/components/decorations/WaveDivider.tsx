interface WaveDividerProps {
  className?: string;
}

export default function WaveDivider({ className }: WaveDividerProps) {
  return (
    <div className={className} aria-hidden>
      <svg
        className='block h-20 w-full'
        viewBox='0 0 1440 80'
        preserveAspectRatio='none'
        fill='var(--primary-soft)'
        style={{ opacity: 0.5 }}
      >
        <path d='M 0 40 C 240 10, 480 70, 720 40 S 1200 10, 1440 40 V 80 H 0 Z' />
      </svg>
    </div>
  );
}
