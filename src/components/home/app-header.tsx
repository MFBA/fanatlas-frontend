'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { BrandMark } from '@/components/icons/brand-mark';
import { useFan } from '@/components/profile/profile-store';
import { NOTIFICATIONS } from '@/data/notifications';
import { Avatar } from '@/components/ui/avatar';
import type { UserProfile } from '@/types';

export function AppHeader({ user }: { user: UserProfile }) {
  const { fan, ready } = useFan();
  // The dot is the fan's real unread count, not a prop set to `true` forever.
  const unread =
    ready && NOTIFICATIONS.some((entry) => !fan.readNotifications.includes(entry.id));

  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-sm bg-violet-600 text-white">
          <BrandMark className="size-3.5" />
        </span>
        <span className="text-[15px] font-semibold tracking-[0.14em] text-fg">FANATLAS</span>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/notifications" className="relative text-fg-muted" aria-label="Notifications">
          <Bell size={20} strokeWidth={1.75} aria-hidden />
          {unread && (
            <span className="absolute -right-px -top-px size-1.5 rounded-full border-2 border-ink-0 bg-violet-500" />
          )}
        </Link>
        <Link href="/profile" aria-label={`Profile, ${user.name}`}>
          <Avatar name={user.name} src={fan.photo} size={32} />
        </Link>
      </div>
    </header>
  );
}
