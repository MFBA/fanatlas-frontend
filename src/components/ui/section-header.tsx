export function SectionHeader({
  title,
  action,
  onAction,
  live = false,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  live?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        {live && <span className="size-1.5 animate-live-pulse rounded-full bg-live" />}
        <h2 className={live ? 'micro text-live' : 'micro text-fg-faint'}>{title}</h2>
      </div>
      {action && (
        <button type="button" onClick={onAction} className="micro text-violet-300">
          {action}
        </button>
      )}
    </div>
  );
}
