interface InkUnderlineProps {
  className?: string;
}

export default function InkUnderline({ className }: InkUnderlineProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 300 12'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      preserveAspectRatio='none'
      aria-hidden
    >
      <path d='M 4 6 C 60 3, 120 9, 180 5 S 260 8, 296 6' />
    </svg>
  );
}
