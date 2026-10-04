'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useCalls } from '@/components/markets/calls-store';
import { PredictionCard, resolveCall } from '@/components/markets/prediction-card';
import { EmptyState } from '@/components/home/empty-state';
import { marketIdsForSport } from '@/data/markets';
import { MOCK_MATCHES } from '@/data/mockData';
import { groupLabel, kickoffSortKey } from '@/lib/format';

type Filter = 'all' | 'today' | 'tomorrow' | 'mine';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'mine', label: 'My calls' },
];

export default function PredictPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const { open, callCount, submit } = useCalls();

  // Nearest kickoff first, locked matches sunk to the bottom (DESIGN.md 8).
  const ordered = useMemo(
    () =>
      [...MOCK_MATCHES].sort((a, b) => {
        const lockedA = a.status !== 'upcoming' ? 1 : 0;
        const lockedB = b.status !== 'upcoming' ? 1 : 0;
        if (lockedA !== lockedB) return lockedA - lockedB;
        return kickoffSortKey(a.detailTime) - kickoffSortKey(b.detailTime);
      }),
    [],
  );

  const visible = ordered.filter((match) => {
    if (filter === 'mine') return Boolean(open[match.id]);
    if (filter === 'today') return groupLabel(match.detailTime) === 'Later today';
    if (filter === 'tomorrow') return groupLabel(match.detailTime) === 'Tomorrow';
    return true;
  });

  const openMatches = ordered.filter((match) => match.status === 'upcoming');
  const marketCount = openMatches.reduce(
    (sum, match) => sum + marketIdsForSport(match.sport).length,
    0,
  );

  return (
    <>
      <header className="flex shrink-0 flex-col gap-1.5 px-5 pb-4 pt-3">
        <h1 className="text-h1 text-fg">Predict</h1>
        <p className="text-body-sm text-fg-muted">
          <span className="num">{openMatches.length}</span> matches,{' '}
          <span className="num">{marketCount}</span> markets open
        </p>
      </header>

      <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5 pb-4">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={clsx(
              'flex h-9 shrink-0 items-center rounded-full px-3.5 text-label',
              filter === id
                ? 'bg-violet-600 text-white'
                : 'border border-line bg-ink-2 text-fg-muted',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <main className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-5 pb-5">
        {visible.map((match) => (
          <PredictionCard key={match.id} match={match} />
        ))}

        {visible.length === 0 && (
          <EmptyState
            message={
              filter === 'mine'
                ? 'You have no open calls. Pick a market to make one.'
                : 'No matches open for calls on that day.'
            }
            action="Show all matches"
            onAction={() => setFilter('all')}
          />
        )}
      </main>

      {callCount > 0 && (
        <div className="flex shrink-0 items-center gap-3 border-t border-line-strong bg-ink-1 px-5 py-4">
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-body-sm text-fg">
              <span className="num">{callCount}</span>{' '}
              {callCount === 1 ? 'call ready' : 'calls ready'}
            </span>
            <span className="micro text-fg-faint">100 points each</span>
          </div>
          <button
            type="button"
            onClick={() =>
              submit((matchId, call) => {
                const match = MOCK_MATCHES.find((entry) => entry.id === matchId)!;
                const { label, multiplier } = resolveCall(match, call);
                return {
                  matchId,
                  matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                  call,
                  label,
                  multiplier,
                  pointsCommitted: 100,
                  pointsAtStake: Math.round(100 * multiplier),
                  status: 'pending' as const,
                };
              })
            }
            className="flex h-12 shrink-0 items-center rounded-md bg-violet-600 px-6 text-label text-white"
          >
            Submit {callCount} {callCount === 1 ? 'call' : 'calls'}
          </button>
        </div>
      )}
    </>
  );
}
