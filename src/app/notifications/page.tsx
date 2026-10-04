'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Bell, ChevronLeft, Flame, Target, Trophy } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Waveform } from '@/components/ui/waveform';
import { useFan } from '@/components/profile/profile-store';
import { NOTIFICATIONS, type NotificationKind } from '@/data/notifications';

/** The waveform is the commentary mark, so it stands in for an icon here. */
const GLYPH: Record<NotificationKind, React.ReactNode> = {
  call: <Target size={16} strokeWidth={1.75} />,
  kickoff: <Bell size={16} strokeWidth={1.75} />,
  rank: <Trophy size={16} strokeWidth={1.75} />,
  streak: <Flame size={16} strokeWidth={1.75} />,
  commentary: <Waveform />,
};

/**
 * Leaving the screen is the read receipt, not opening it. Clearing the unread
 * tint while the fan is still reading the list takes away the only thing
 * telling them which rows are new.
 */
export default function NotificationsPage() {
  const { fan, ready, markNotificationsRead } = useFan();
  const unreadIds = NOTIFICATIONS.filter(
    (entry) => !fan.readNotifications.includes(entry.id),
  ).map((entry) => entry.id);

  // Held in a ref so the cleanup sees the ids as they were on screen.
  const pending = useRef<string[]>([]);
  pending.current = unreadIds;

  useEffect(
    () => () => {
      if (pending.current.length > 0) markNotificationsRead(pending.current);
    },
    [markNotificationsRead],
  );

  return (
    <>
      <header className="flex shrink-0 items-center gap-3 px-5 pb-4 pt-3">
        <Link href="/" aria-label="Back home" className="text-fg-muted">
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
        </Link>
        <h1 className="text-h1 text-fg">Notifications</h1>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto pb-5">
        {NOTIFICATIONS.map((entry) => {
          const unread = ready && !fan.readNotifications.includes(entry.id);

          return (
            <Link
              key={entry.id}
              href={entry.href ?? '/'}
              className={clsx(
                'flex items-start gap-3 border-b border-line px-5 py-3.5',
                unread && 'bg-violet-950',
              )}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-2 text-fg-muted">
                {GLYPH[entry.kind]}
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-body-sm text-fg">{entry.title}</span>
                <span className="text-body-sm text-fg-muted">{entry.body}</span>
                <span className="micro text-fg-faint">{entry.time}</span>
              </span>

              {unread && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />}
            </Link>
          );
        })}
      </main>
    </>
  );
}
