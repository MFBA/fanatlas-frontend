type IconProps = { className?: string };

/** The monoline F in the header's violet square. Solid fill, no gradient. */
export function BrandMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M6 4h13" />
      <path d="M6 12h9" />
      <path d="M6 4v16" />
    </svg>
  );
}
