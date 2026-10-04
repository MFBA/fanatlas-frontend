'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useFan } from '@/components/profile/profile-store';
import { Avatar } from '@/components/ui/avatar';
import { LEADERBOARD_DATA } from '@/data/mockData';
import type { LeaderboardUser } from '@/types';

type Scope = 'global' | 'friends' | 'weekly';

const SCOPES: { id: Scope; label: string }[] = [
  { id: 'global', label: 'Global' },
  { id: 'friends', label: 'Friends' },
  { id: 'weekly', label: 'Weekly' },
];

/**
 * Friends and Weekly are the same fans re-ranked. There is no backend in this
 * build, so rather than show three identical lists the scopes slice and
 * re-rank the one dataset, which is at least internally consistent.
 */
function forScope(scope: Scope): LeaderboardUser[] {
  const source =
    scope === 'friends'
      ? LEADERBOARD_DATA.filter((entry) => entry.isCurrentUser || entry.rank % 2 === 0)
      : LEADERBOARD_DATA;

  const ordered =
    scope === 'weekly'
      ? [...source].sort((a, b) => b.streak - a.streak || b.winRate - a.winRate)
      : [...source].sort((a, b) => b.points - a.points);

  return ordered.map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export default function LeaderboardPage() {
  const [scope, setScope] = useState<Scope>('global');
  const rows = forScope(scope);
  const you = rows.find((entry) => entry.isCurrentUser);

  // The fan's own row pins to the bottom only while their real row is off screen.
  const youRef = useRef<HTMLDivElement>(null);
  const [youVisible, setYouVisible] = useState(true);
  useEffect(() => {
    const node = youRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setYouVisible(entry.isIntersecting), {
      threshold: 0.9,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [scope]);

  return (
    <>
      <header className="flex shrink-0 flex-col gap-3.5 px-5 pb-4 pt-3">
        <h1 className="text-h1 text-fg">Ranks</h1>
        <div className="flex h-9 rounded-full border border-line bg-ink-2 p-0.5">
          {SCOPES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={scope === id}
              onClick={() => setScope(id)}
              className={clsx(
                'flex flex-1 items-center justify-center rounded-full text-label',
                scope === id ? 'bg-violet-600 text-white' : 'text-fg-muted',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto pb-4">
        {rows.map((entry) => (
          <div key={entry.id} ref={entry.isCurrentUser ? youRef : undefined}>
            <LeaderboardRow entry={entry} />
          </div>
        ))}
      </main>

      {you && !youVisible && (
        <div className="shrink-0 border-t border-line-strong bg-ink-1 shadow-2">
          <LeaderboardRow entry={you} />
        </div>
      )}
    </>
  );
}

/** No medals, no trophy emoji. Top three are simply violet (DESIGN.md 7.8). */
function LeaderboardRow({ entry }: { entry: LeaderboardUser }) {
  const { fan } = useFan();
  const photo = entry.isCurrentUser ? fan.photo ?? entry.avatar : entry.avatar;

  return (
    <article
      className={clsx(
        'relative flex h-[60px] items-center gap-3 border-b border-line px-5',
        entry.isCurrentUser && 'bg-violet-950',
      )}
    >
      {entry.isCurrentUser && (
        <span className="absolute inset-y-0 left-0 w-0.5 bg-violet-500" aria-hidden />
      )}

      <span
        className={clsx(
          'num w-8 shrink-0 text-right text-num-md',
          entry.rank <= 3 ? 'text-violet-300' : 'text-fg-muted',
        )}
      >
        {entry.rank}
      </span>

      <Avatar name={entry.name} src={photo} size={32} />

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-body-sm text-fg">{entry.name}</span>
        <span className="micro text-fg-faint">
          {entry.country}
          {entry.tier ? ` · ${entry.tier}` : ''}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="num text-num-md text-fg">{entry.points.toLocaleString('en-GB')}</span>
        <span className="num text-num-sm text-fg-muted">{entry.winRate}%</span>
      </span>
    </article>
  );
}
