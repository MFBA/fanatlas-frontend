'use client';

import clsx from 'clsx';
import { formatMultiplier, formatScoreline } from '@/lib/markets';
import type { ScorelineOutcome } from '@/types';

export type ScoreSelection = { home: number; away: number };

/**
 * A many-outcome market, so it carries a caption comparing crowd and model
 * rather than a Split Bar (DESIGN.md 7.7).
 */
export function CorrectScoreMarket({
  outcomes,
  selection,
  onSelect,
  readOnly = false,
}: {
  outcomes: ScorelineOutcome[];
  selection: ScoreSelection | null;
  onSelect: (selection: ScoreSelection | null) => void;
  readOnly?: boolean;
}) {
  const crowdPick = [...outcomes].sort((a, b) => b.communityShare - a.communityShare)[0];
  const modelPick = [...outcomes].sort((a, b) => b.modelShare - a.modelShare)[0];

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-body-sm text-violet-300">
          Fans favour <span className="num">{formatScoreline(crowdPick.home, crowdPick.away)}</span>
        </span>
        <span className="shrink-0 text-label text-fg-muted">
          Model <span className="num">{formatScoreline(modelPick.home, modelPick.away)}</span>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {outcomes.map((outcome) => {
          const selected =
            selection?.home === outcome.home && selection?.away === outcome.away;
          return (
            <button
              key={`${outcome.home}-${outcome.away}`}
              type="button"
              aria-pressed={selected}
              disabled={readOnly}
              onClick={() =>
                onSelect(selected ? null : { home: outcome.home, away: outcome.away })
              }
              className={clsx(
                'flex h-[52px] flex-col items-center justify-center gap-0.5 rounded-sm border',
                selected ? 'border-violet-600 bg-violet-600' : 'border-line bg-ink-2',
              )}
            >
              <span className={clsx('num text-[15px]', selected ? 'text-white' : 'text-fg')}>
                {formatScoreline(outcome.home, outcome.away)}
              </span>
              <span
                className={clsx(
                  'num text-[11px]',
                  selected ? 'text-violet-100' : 'text-fg-faint',
                )}
              >
                {formatMultiplier(outcome.multiplier)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
