'use client';

import clsx from 'clsx';
import { formatMultiplier } from '@/lib/markets';
import { Avatar } from '@/components/ui/avatar';
import type { ScorerOutcome } from '@/types';

/** 60px player rows. The fan's own pick tints its disc (DESIGN.md 7.7). */
export function FirstScorerMarket({
  outcomes,
  selection,
  onSelect,
  readOnly = false,
}: {
  outcomes: ScorerOutcome[];
  selection: string | null;
  onSelect: (playerId: string | null) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {outcomes.map((outcome, index) => {
        const selected = selection === outcome.id;
        return (
          <button
            key={outcome.id}
            type="button"
            aria-pressed={selected}
            disabled={readOnly}
            onClick={() => onSelect(selected ? null : outcome.id)}
            className={clsx(
              'flex h-[60px] items-center gap-3 px-1',
              index > 0 && 'border-t border-line',
            )}
          >
            {/* A player gets their picture, or their initials on an identity
                tint. `No scorer` is not a person, so it stays neutral. */}
            <Avatar
              name={outcome.name}
              src={outcome.photo}
              size={32}
              label={outcome.teamShortName ? undefined : '0-0'}
              tone={selected ? 'violet' : outcome.teamShortName ? 'identity' : 'neutral'}
            />

            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-body-sm text-fg">{outcome.name}</span>
              <span className={clsx('micro', selected ? 'text-violet-300' : 'text-fg-faint')}>
                {outcome.teamShortName ? `${outcome.teamShortName} · ` : ''}
                {outcome.communityShare}% of fans
              </span>
            </span>

            <span
              className={clsx(
                'flex h-8 shrink-0 items-center rounded-sm border px-2.5',
                selected ? 'border-violet-600 bg-violet-600' : 'border-line bg-ink-2',
              )}
            >
              <span className={clsx('num text-[13px]', selected ? 'text-white' : 'text-fg')}>
                {formatMultiplier(outcome.multiplier)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
