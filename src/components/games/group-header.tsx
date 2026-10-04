/** Sticks to the top of its group while the list scrolls. */
export function GroupHeader({
  title,
  count,
  live = false,
}: {
  title: string;
  count: number;
  live?: boolean;
}) {
  return (
    <div className="sticky top-14 z-10 flex items-center gap-2 bg-ink-0 px-5 pb-2.5">
      {live && <span className="size-1.5 animate-live-pulse rounded-full bg-live" />}
      <h2 className={live ? 'micro text-live' : 'micro text-fg-faint'}>{title}</h2>
      <span className="flex-1" />
      <span className="num text-num-sm text-fg-faint">{count}</span>
    </div>
  );
}
