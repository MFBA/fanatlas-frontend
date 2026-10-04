'use client';

import { useMemo, useState } from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { AppHeader } from '@/components/home/app-header';
import { ContinueListening } from '@/components/home/continue-listening';
import { EmptyState } from '@/components/home/empty-state';
import { LiveNowRail } from '@/components/home/live-now';
import { SearchField } from '@/components/home/search-field';
import { SportRail } from '@/components/home/sport-rail';
import { SplitPromo } from '@/components/home/split-promo';
import { UpcomingList } from '@/components/home/upcoming';
import { CONTINUE_LISTENING, SPORTS } from '@/data/home';
import { INITIAL_USER, MOCK_MATCHES } from '@/data/mockData';
import { isToday, kickoffSortKey, SPLIT_THRESHOLD, splitPoints } from '@/lib/format';
import type { Match, SportType } from '@/types';

function matchesQuery(match: Match, query: string) {
  if (!query) return true;
  const haystack = [match.homeTeam.name, match.awayTeam.name, match.league].join(' ').toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export default function HomePage() {
  const [sport, setSport] = useState<SportType>('football');
  const [query, setQuery] = useState('');

  const searching = query.trim().length > 0;

  const { live, upcoming } = useMemo(() => {
    const inScope = MOCK_MATCHES.filter(
      (match) => match.sport === sport && matchesQuery(match, query),
    );
    return {
      live: inScope.filter((match) => match.status === 'live'),
      upcoming: inScope
        .filter((match) => match.status === 'upcoming')
        .sort((a, b) => kickoffSortKey(a.detailTime) - kickoffSortKey(b.detailTime))
        .slice(0, 3),
    };
  }, [sport, query]);

  const resume = MOCK_MATCHES.find((match) => match.id === CONTINUE_LISTENING.matchId);

  const splitCount = useMemo(
    () =>
      MOCK_MATCHES.filter(
        (match) => match.status !== 'finished' && splitPoints(match) > SPLIT_THRESHOLD,
      ).length,
    [],
  );

  const sportLabel = SPORTS.find((entry) => entry.id === sport)?.label ?? 'this sport';
  const allToday = upcoming.every((match) => isToday(match.detailTime));
  const nothingToShow = live.length === 0 && upcoming.length === 0;

  return (
    <>
      <AppHeader user={INITIAL_USER} />

      <main className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto pb-4">
        <SearchField value={query} onChange={setQuery} />
        <SportRail selected={sport} onSelect={setSport} />

        {live.length > 0 && (
          <section className="flex shrink-0 flex-col gap-3">
            <SectionHeader title="Live now" action="See all" live />
            <LiveNowRail matches={live} />
          </section>
        )}

        {!searching && resume && (
          <section className="flex shrink-0 flex-col gap-3">
            <SectionHeader title="Continue listening" />
            <ContinueListening
              match={resume}
              positionSeconds={CONTINUE_LISTENING.positionSeconds}
              language={CONTINUE_LISTENING.language}
            />
          </section>
        )}

        {upcoming.length > 0 && (
          <section className="flex shrink-0 flex-col gap-3">
            <SectionHeader
              title={searching ? 'Matches' : allToday ? 'Upcoming today' : 'Upcoming'}
              action="See all"
            />
            <UpcomingList matches={upcoming} />
          </section>
        )}

        {nothingToShow && (
          <EmptyState
            message={
              searching
                ? `No ${sportLabel.toLowerCase()} matches for that search.`
                : `No ${sportLabel.toLowerCase()} matches scheduled today.`
            }
            action={searching ? 'Clear search' : 'Browse all sports'}
            onAction={() => (searching ? setQuery('') : setSport('football'))}
          />
        )}

        {!searching && <SplitPromo count={splitCount} />}
      </main>
    </>
  );
}
