interface ScriptSignatureProps {
  className?: string;
}

export default function ScriptSignature({ className }: ScriptSignatureProps) {
  return (
    <span
      className={className}
      style={{ fontFamily: 'var(--font-script)' }}
      aria-hidden
    >
      ~ sathvik
    </span>
  );
}
