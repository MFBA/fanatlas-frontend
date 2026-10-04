'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, House, Target, Trophy, User } from 'lucide-react';

const ITEMS = [
  { label: 'Home', href: '/', Icon: House },
  { label: 'Games', href: '/games', Icon: Compass },
  { label: 'Predict', href: '/predict', Icon: Target },
  { label: 'Ranks', href: '/leaderboard', Icon: Trophy },
  { label: 'Profile', href: '/profile', Icon: User },
] as const;

/** No pill behind the active item, no floating bar, no center action button. */
export function BottomNav() {
  const pathname = usePathname();

  // The match screen ends in an audio bar, not the tab bar.
  if (pathname.startsWith('/match/')) return null;

  return (
    <nav className="flex shrink-0 items-stretch border-t border-line-strong bg-ink-1 px-2 pb-3 pt-2.5">
      {ITEMS.map(({ label, href, Icon }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
        const content = (
          <>
            <Icon size={20} strokeWidth={1.75} aria-hidden />
            <span className="text-[11px] font-medium">{label}</span>
          </>
        );
        const className = clsx(
          'flex flex-1 flex-col items-center gap-1.5 pt-0.5',
          isActive ? 'text-violet-400' : 'text-fg-faint',
        );

        return (
          <Link
            key={label}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={className}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
