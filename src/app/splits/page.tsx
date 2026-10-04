'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { SplitBar } from '@/components/match/split-bar';
import { EmptyState } from '@/components/home/empty-state';
import { MOCK_MATCHES } from '@/data/mockData';
import { SPLIT_THRESHOLD } from '@/lib/format';

/**
 * The screen the home promo was pointing at. One card per match where the
 * crowd and the model disagree by more than the threshold, widest gap first,
 * because the gap is the story.
 */
export default function SplitsPage() {
  const splits = useMemo(
    () =>
      MOCK_MATCHES.map((match) => ({
        match,
        community: match.communityVotes.home,
        model: match.aiWinProbability.home,
        gap: Math.abs(match.communityVotes.home - match.aiWinProbability.home),
      }))
        .filter((entry) => entry.gap > SPLIT_THRESHOLD)
        .sort((a, b) => b.gap - a.gap),
    [],
  );

  return (
    <>
      <header className="flex shrink-0 flex-col gap-1.5 px-5 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Back home" className="text-fg-muted">
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
          </Link>
          <h1 className="text-h1 text-fg">Splits</h1>
        </div>
        <p className="text-body-sm text-fg-muted">
          <span className="num">{splits.length}</span>{' '}
          {splits.length === 1 ? 'match' : 'matches'} where fans and the model disagree by more than{' '}
          <span className="num">{SPLIT_THRESHOLD}</span> points
        </p>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-5 pb-5">
        {splits.length === 0 ? (
          <EmptyState
            message="Fans and the model agree across the board today."
            action="Browse games"
            href="/games"
          />
        ) : (
          splits.map(({ match, community, model, gap }) => (
            <Link
              key={match.id}
              href={`/match/${match.id}`}
              className="flex flex-col gap-3.5 rounded-lg border border-line bg-ink-1 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-h3 text-fg">
                    {match.homeTeam.name} vs {match.awayTeam.name}
                  </span>
                  <span className="micro text-fg-faint">
                    {match.league} · {match.detailTime}
                  </span>
                </span>
                <span className="micro shrink-0 rounded-sm border border-warn/40 px-2 py-1 text-warn">
                  Split <span className="num">{gap}</span>
                </span>
                <ChevronRight size={16} strokeWidth={2} className="shrink-0 text-fg-faint" aria-hidden />
              </div>

              <SplitBar
                community={community}
                model={model}
                communityLabel={`Fans back ${match.homeTeam.name}`}
                modelLabel="Model confidence"
              />
            </Link>
          ))
        )}
      </main>
    </>
  );
}
