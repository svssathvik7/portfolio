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
        <g className='wave-scroll'>
          <path d='M 0 40 C 240 10, 480 70, 720 40 C 960 10, 1200 70, 1440 40 C 1680 10, 1920 70, 2160 40 C 2400 10, 2640 70, 2880 40 V 80 H 0 Z' />
        </g>
      </svg>
    </div>
  );
}
