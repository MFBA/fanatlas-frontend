'use client';

import clsx from 'clsx';
import { Check, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Sheet } from '@/components/ui/sheet';
import { useFan } from '@/components/profile/profile-store';
import { marketsForMatch } from '@/data/markets';
import { MOCK_MATCHES } from '@/data/mockData';

/**
 * The picker behind the `+` on each favourites row. The catalogue is built
 * from the fixtures already loaded rather than a second hand-authored list, so
 * a team can never appear here that the app cannot then show a match for.
 */
function catalogue(kind: 'teams' | 'players') {
  const names = new Set<string>();

  for (const match of MOCK_MATCHES) {
    if (kind === 'teams') {
      names.add(match.homeTeam.name);
      names.add(match.awayTeam.name);
    } else {
      // Markets are built per match rather than stored on it, so the player
      // list has to come through the same builder the markets screen uses.
      for (const outcome of marketsForMatch(match.id)?.firstScorer?.outcomes ?? []) {
        if (outcome.teamShortName) names.add(outcome.name);
      }
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
}

export function FavouritesSheet({
  kind,
  onClose,
}: {
  kind: 'teams' | 'players';
  onClose: () => void;
}) {
  const { fan, toggleFavourite } = useFan();
  const [query, setQuery] = useState('');

  const all = useMemo(() => catalogue(kind), [kind]);
  const visible = all.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));
  const chosen = fan[kind];

  return (
    <Sheet
      title={kind === 'teams' ? 'Teams' : 'Players'}
      subtitle={`${chosen.length} followed. Tap to add or remove.`}
      onClose={onClose}
    >
      <div className="shrink-0 px-5 pb-4">
        <label className="flex h-11 items-center gap-2.5 rounded-md border border-line bg-ink-2 px-3.5">
          <Search size={16} strokeWidth={1.75} className="shrink-0 text-fg-faint" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={kind === 'teams' ? 'Search teams' : 'Search players'}
            aria-label={kind === 'teams' ? 'Search teams' : 'Search players'}
            className="w-full bg-transparent text-body-sm text-fg placeholder:text-fg-faint focus:outline-none"
          />
        </label>
      </div>

      <div className="flex flex-col px-5">
        {visible.length === 0 && (
          <p className="py-4 text-body-sm text-fg-muted">Nothing matches that.</p>
        )}

        {visible.map((name, index) => {
          const selected = chosen.includes(name);
          return (
            <div key={name}>
              {index > 0 && <div className="h-px bg-line" />}
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => toggleFavourite(kind, name)}
                className="flex w-full items-center gap-3 py-3"
              >
                {/* A player is a person, a team is a crest slot (DESIGN.md 5). */}
                <Avatar name={name} size={28} tone={kind === 'players' ? 'identity' : 'neutral'} />
                <span className="flex-1 truncate text-body text-fg">{name}</span>
                <span
                  className={clsx(
                    'flex size-5 shrink-0 items-center justify-center rounded-full',
                    selected ? 'bg-violet-600' : 'border border-line-strong',
                  )}
                >
                  {selected && <Check size={12} strokeWidth={3} className="text-white" />}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}
