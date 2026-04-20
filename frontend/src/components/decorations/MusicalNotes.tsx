interface MusicalNotesProps {
  className?: string;
}

export default function MusicalNotes({ className }: MusicalNotesProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 32 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.6}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <ellipse cx='6' cy='18' rx='3.2' ry='2.4' transform='rotate(-18 6 18)' />
      <ellipse cx='22' cy='15' rx='3.2' ry='2.4' transform='rotate(-18 22 15)' />
      <path d='M 8.8 17.2 V 5 L 24.8 2 V 14' />
      <path d='M 8.8 5 L 24.8 2' />
    </svg>
  );
}
