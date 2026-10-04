'use client';

import clsx from 'clsx';
import { SplitBar } from '@/components/match/split-bar';
import { formatMultiplier } from '@/lib/markets';
import type { Match } from '@/types';

export type ResultSide = 'home' | 'draw' | 'away';

/** Split Bar plus three outcome buttons. The default market (DESIGN.md 7.7). */
export function MatchResultMarket({
  match,
  selection,
  onSelect,
  readOnly = false,
}: {
  match: Match;
  selection: ResultSide | null;
  onSelect: (side: ResultSide | null) => void;
  readOnly?: boolean;
}) {
  const sides: { id: ResultSide; label: string; multiplier?: number }[] = [
    { id: 'home', label: match.homeTeam.name, multiplier: match.multipliers.home },
    ...(match.multipliers.draw !== undefined
      ? [{ id: 'draw' as const, label: 'Draw', multiplier: match.multipliers.draw }]
      : []),
    { id: 'away', label: match.awayTeam.name, multiplier: match.multipliers.away },
  ];

  return (
    <div className="flex flex-col gap-3.5">
      <SplitBar
        community={match.communityVotes.home}
        model={match.aiWinProbability.home}
        communityLabel={`Fans back ${match.homeTeam.name}`}
        modelLabel="Model confidence"
      />

      <div className="flex gap-2">
        {sides.map(({ id, label, multiplier }) => {
          const selected = selection === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              disabled={readOnly}
              onClick={() => onSelect(selected ? null : id)}
              className={clsx(
                'flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-md border px-2',
                selected ? 'border-violet-600 bg-violet-600' : 'border-line bg-ink-2',
              )}
            >
              <span
                className={clsx(
                  'max-w-full truncate text-label',
                  selected ? 'text-violet-50' : 'text-fg-muted',
                )}
              >
                {label}
              </span>
              <span className={clsx('num text-num-md', selected ? 'text-white' : 'text-fg')}>
                {formatMultiplier(multiplier ?? 0)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
