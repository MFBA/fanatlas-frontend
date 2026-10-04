'use client';

import { Trash2 } from 'lucide-react';
import { Sheet } from '@/components/ui/sheet';
import { Waveform } from '@/components/ui/waveform';
import { useFan } from '@/components/profile/profile-store';
import { LANGUAGE_NAMES } from '@/data/languages';
import { INITIAL_USER } from '@/data/mockData';

/** The screen behind `Manage`. Removing a save is the only action, because
 *  reordering saved moments is a feature nobody asked for. */
export function HighlightsSheet({ onClose }: { onClose: () => void }) {
  const { fan, removeHighlight } = useFan();
  const cap = INITIAL_USER.highlightCap;

  return (
    <Sheet
      title="Saved moments"
      subtitle={`${fan.highlights.length} of ${cap} saved. Oldest clears first once you hit ${cap}.`}
      onClose={onClose}
    >
      <div className="flex flex-col px-5">
        {fan.highlights.length === 0 && (
          <p className="py-4 text-body-sm text-fg-muted">
            Nothing saved yet. Save a moment from the match screen.
          </p>
        )}

        {fan.highlights.map((highlight, index) => (
          <div key={highlight.id}>
            {index > 0 && <div className="h-px bg-line" />}
            <div className="flex items-center gap-3 py-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-violet-950">
                <Waveform />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-body-sm text-fg">{highlight.title}</span>
                <span className="micro truncate text-fg-faint">
                  {highlight.matchTitle} · {LANGUAGE_NAMES[highlight.language]} · {highlight.voice}
                </span>
              </span>
              <span className="num shrink-0 text-num-sm text-fg-muted">{highlight.duration}</span>
              <button
                type="button"
                onClick={() => removeHighlight(highlight.id)}
                aria-label={`Remove ${highlight.title}`}
                className="shrink-0 pl-1 text-fg-faint"
              >
                <Trash2 size={16} strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
