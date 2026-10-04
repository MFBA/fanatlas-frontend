/**
 * Groups sit on one ink-1 surface with hairline dividers, not a stack of cards,
 * so a long fixture list reads as a table.
 */
export function Group({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="border-y border-line bg-ink-1">
      {children.map((child, index) => (
        <div key={index}>
          {index > 0 && <div className="mx-5 h-px bg-line" />}
          {child}
        </div>
      ))}
    </div>
  );
}
