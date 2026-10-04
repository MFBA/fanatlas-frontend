'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { FixtureRow } from '@/components/games/fixture-row';
import { Group } from '@/components/games/group';
import { GroupHeader } from '@/components/games/group-header';
import { LiveRow } from '@/components/games/live-row';
import { EmptyState } from '@/components/home/empty-state';
import { SearchField } from '@/components/home/search-field';
import { SportRail } from '@/components/home/sport-rail';
import { SPORTS } from '@/data/home';
import { MOCK_MATCHES } from '@/data/mockData';
import { groupLabel, kickoffSortKey } from '@/lib/format';
import type { Match, SportType } from '@/types';

function groupByDay(matches: Match[]) {
  const groups = new Map<string, Match[]>();
  for (const match of matches) {
    const label = groupLabel(match.detailTime);
    groups.set(label, [...(groups.get(label) ?? []), match]);
  }
  return [...groups.entries()];
}

export default function GamesPage() {
  const [sport, setSport] = useState<SportType>('football');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  // Rendered after mount so the server and client never disagree on the date.
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    );
  }, []);

  const { live, byDay } = useMemo(() => {
    const term = query.trim().toLowerCase();
    // Search looks across every sport, because a fan searching `Ferrari` does
    // not care which chip is selected.
    const inScope = MOCK_MATCHES.filter((match) =>
      term
        ? [match.homeTeam.name, match.awayTeam.name, match.league].some((field) =>
            field.toLowerCase().includes(term),
          )
        : match.sport === sport,
    );
    const upcoming = inScope
      .filter((match) => match.status === 'upcoming')
      .sort((a, b) => kickoffSortKey(a.detailTime) - kickoffSortKey(b.detailTime));

    return {
      live: inScope.filter((match) => match.status === 'live'),
      byDay: groupByDay(upcoming),
    };
  }, [sport, query]);

  const sportLabel = SPORTS.find((entry) => entry.id === sport)?.label ?? 'this sport';

  const sections = [
    ...(live.length > 0 ? [{ key: 'live', title: 'Live', live: true, matches: live }] : []),
    ...byDay.map(([title, matches]) => ({ key: title, title, live: false, matches })),
  ];

  return (
    <>
      <header className="flex shrink-0 items-end justify-between px-5 pb-4 pt-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-h1 text-fg">Games</h1>
          <p className="text-body-sm text-fg-muted">{today || ' '}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSearching((open) => !open);
            setQuery('');
          }}
          className="pb-1 text-fg-muted"
          aria-label={searching ? 'Close search' : 'Search games'}
          aria-expanded={searching}
        >
          {searching ? (
            <X size={20} strokeWidth={1.75} aria-hidden />
          ) : (
            <Search size={20} strokeWidth={1.75} aria-hidden />
          )}
        </button>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col overflow-y-auto pb-6">
        <div className="sticky top-0 z-20 shrink-0 bg-ink-0 pb-5">
          {searching ? (
            <SearchField value={query} onChange={setQuery} />
          ) : (
            <SportRail selected={sport} onSelect={setSport} />
          )}
        </div>

        {sections.map((section, index) => (
          <section key={section.key} className={clsx('shrink-0', index > 0 && 'pt-5')}>
            <GroupHeader title={section.title} count={section.matches.length} live={section.live} />
            <Group>
              {section.matches.map((match) =>
                section.live ? (
                  <LiveRow key={match.id} match={match} />
                ) : (
                  <FixtureRow key={match.id} match={match} />
                ),
              )}
            </Group>
          </section>
        ))}

        {sections.length === 0 && (
          <EmptyState
            message={
              query.trim()
                ? `Nothing matches "${query.trim()}".`
                : `No ${sportLabel.toLowerCase()} matches on the schedule.`
            }
            action={query.trim() ? 'Clear search' : 'Browse football'}
            onAction={() => {
              if (query.trim()) {
                setQuery('');
                setSearching(false);
              } else {
                setSport('football');
              }
            }}
          />
        )}
      </main>
    </>
  );
}
