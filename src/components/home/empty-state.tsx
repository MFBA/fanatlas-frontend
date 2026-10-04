import Link from 'next/link';

/** One line, one ghost action. No illustration, no exclamation marks. */
export function EmptyState({
  message,
  action,
  onAction,
  href,
}: {
  message: string;
  action: string;
  onAction?: () => void;
  /** Use instead of `onAction` when the action is simply going somewhere. */
  href?: string;
}) {
  return (
    <div className="mx-5 flex flex-col items-start gap-3 rounded-lg border border-line bg-ink-1 p-4">
      <p className="text-body-sm text-fg-muted">{message}</p>
      {href ? (
        <Link href={href} className="text-label text-violet-300">
          {action}
        </Link>
      ) : (
        <button type="button" onClick={onAction} className="text-label text-violet-300">
          {action}
        </button>
      )}
    </div>
  );
}
