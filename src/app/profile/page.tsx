'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ChevronDown, Play, Plus, Settings } from 'lucide-react';
import { useState } from 'react';
import { CommentarySheet } from '@/components/match/commentary-sheet';
import { AvatarUpload } from '@/components/profile/avatar-upload';
import { FavouritesSheet } from '@/components/profile/favourites-sheet';
import { HighlightsSheet } from '@/components/profile/highlights-sheet';
import { useFan } from '@/components/profile/profile-store';
import { useCalls } from '@/components/markets/calls-store';
import { Avatar } from '@/components/ui/avatar';
import { Waveform } from '@/components/ui/waveform';
import { INITIAL_USER, LEADERBOARD_DATA } from '@/data/mockData';
import { LANGUAGE_NAMES } from '@/data/languages';
import type { LanguageCode } from '@/types';

export default function ProfilePage() {
  const [language, setLanguage] = useState<LanguageCode>(INITIAL_USER.commentaryLanguage);
  const [voice, setVoice] = useState(INITIAL_USER.commentaryVoice);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [picking, setPicking] = useState<'teams' | 'players' | null>(null);
  const [managing, setManaging] = useState(false);
  const { submitted } = useCalls();
  const { fan } = useFan();

  const correct = submitted.filter((prediction) => prediction.status === 'won').length;
  // Read off the leaderboard rather than the profile's own field, so the two
  // screens cannot show the fan two different ranks.
  const rank =
    [...LEADERBOARD_DATA]
      .sort((a, b) => b.points - a.points)
      .findIndex((entry) => entry.isCurrentUser) + 1;
  const stats = [
    { label: 'Fan points', value: INITIAL_USER.points.toLocaleString('en-GB'), win: false, href: undefined },
    { label: 'Calls made', value: String(submitted.length), win: false, href: '/calls' },
    { label: 'Current streak', value: String(INITIAL_USER.streak), win: INITIAL_USER.streak > 0, href: undefined },
    { label: 'Calls correct', value: String(INITIAL_USER.predictionsWon + correct), win: false, href: '/calls' },
  ];

  const saved = fan.highlights.length;
  const cap = INITIAL_USER.highlightCap;

  return (
    <>
      <header className="flex shrink-0 items-center justify-between px-5 pb-4 pt-3">
        <h1 className="text-h1 text-fg">Profile</h1>
        <Link href="/settings" className="text-fg-muted" aria-label="Preferences">
          <Settings size={20} strokeWidth={1.75} aria-hidden />
        </Link>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-5 pb-5">
        <section className="flex items-center gap-3.5">
          <AvatarUpload name={INITIAL_USER.name} />
          <span className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-h2 text-fg">{INITIAL_USER.name}</span>
            <span className="text-body-sm text-fg-muted">
              {INITIAL_USER.handle} · rank <span className="num">{rank}</span>
            </span>
          </span>
        </section>

        <section className="grid grid-cols-2 gap-2">
          {stats.map((stat) => {
            const body = (
              <>
                <span className="micro text-fg-faint">{stat.label}</span>
                <span className={clsx('num text-num-lg', stat.win ? 'text-win' : 'text-fg')}>
                  {stat.value}
                </span>
              </>
            );
            const className =
              'flex flex-col gap-1.5 rounded-lg border border-line bg-ink-1 p-4';

            // A count is only worth tapping when there is a list behind it.
            return stat.href ? (
              <Link key={stat.label} href={stat.href} className={className}>
                {body}
              </Link>
            ) : (
              <div key={stat.label} className={className}>
                {body}
              </div>
            );
          })}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="micro text-fg-faint">Commentary</h2>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-3 rounded-lg border border-line bg-ink-1 p-4"
          >
            <Waveform />
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-body-sm text-fg">
                {LANGUAGE_NAMES[language]} · {voice}
              </span>
              <span className="micro text-fg-faint">Used on every match you open</span>
            </span>
            <ChevronDown size={16} strokeWidth={2} className="text-fg-faint" aria-hidden />
          </button>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="micro text-fg-faint">Favourites</h2>
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-ink-1 p-4">
            <FavouriteRow label="Teams" items={fan.teams} onAdd={() => setPicking('teams')} />
            <FavouriteRow
              label="Players"
              items={fan.players}
              people
              onAdd={() => setPicking('players')}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="micro text-fg-faint">Highlights</h2>
            <span className="num text-num-sm text-fg-muted">
              {saved} / {cap} saved
            </span>
          </div>

          {/* The cap is visible before the fan hits it, never surfaced as an
              error after the fact (DESIGN.md 8 Profile). */}
          <div className="h-0.5 w-full rounded-full bg-ink-3">
            <span
              className="block h-0.5 rounded-full bg-violet-500"
              style={{ width: `${(saved / cap) * 100}%` }}
            />
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-line bg-ink-1 p-4">
            {fan.highlights.slice(0, 4).map((highlight) => (
              <div key={highlight.id} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-violet-950">
                  <Waveform />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-body-sm text-fg">{highlight.title}</span>
                  <span className="micro truncate text-fg-faint">
                    {highlight.matchTitle} · {LANGUAGE_NAMES[highlight.language]} ·{' '}
                    {highlight.voice}
                  </span>
                </span>
                <span className="num shrink-0 text-num-sm text-fg-muted">
                  {highlight.duration}
                </span>
                <Play size={16} strokeWidth={1.75} className="shrink-0 text-violet-300" aria-hidden />
              </div>
            ))}

            <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
              <span className="text-body-sm text-fg-muted">
                Oldest saves clear first once you hit {cap}.
              </span>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="shrink-0 text-label text-violet-300"
              >
                Manage
              </button>
            </div>
          </div>
        </section>
      </main>

      {picking && <FavouritesSheet kind={picking} onClose={() => setPicking(null)} />}

      {managing && <HighlightsSheet onClose={() => setManaging(false)} />}

      {sheetOpen && (
        <CommentarySheet
          language={language}
          voice={voice}
          onApply={(nextLanguage, nextVoice) => {
            setLanguage(nextLanguage);
            setVoice(nextVoice);
          }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
}

/** Players are people and get an identity disc. A team is a crest slot, so it
 *  keeps the mono short-name fallback (DESIGN.md 5). */
function FavouriteRow({
  label,
  items,
  people = false,
  onAdd,
}: {
  label: string;
  items: string[];
  people?: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="micro w-[46px] shrink-0 text-fg-faint">{label}</span>
      <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
        {items.map((item) => (
          <span
            key={item}
            className="flex h-8 shrink-0 items-center gap-2 rounded-full border border-line bg-ink-2 pl-1 pr-3"
          >
            <Avatar name={item} size={22} tone={people ? 'identity' : 'neutral'} />
            <span className="text-label text-fg-muted">{item}</span>
          </span>
        ))}
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${label.toLowerCase()}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-fg-muted"
        >
          <Plus size={14} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
