'use client';

import { useEffect } from 'react';

/**
 * The bottom sheet shell. Extracted from the commentary sheet once a second
 * and third sheet needed the same scrim, handle and header, so the chrome is
 * defined once (DESIGN.md 7.6).
 */
export function Sheet({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end" role="dialog" aria-modal="true">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink-0/65" />

      <div className="relative flex max-h-[85%] flex-col rounded-t-xl border-t border-line-strong bg-ink-1 pb-6 pt-3 shadow-2">
        <div className="flex shrink-0 justify-center pb-4">
          <span className="h-1 w-9 rounded-full bg-line-strong" />
        </div>

        <div className="flex shrink-0 flex-col gap-1 px-5 pb-4">
          <h2 className="text-h2 text-fg">{title}</h2>
          {subtitle && <p className="text-body-sm text-fg-muted">{subtitle}</p>}
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
