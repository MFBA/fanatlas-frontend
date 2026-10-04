import type { SportType } from '@/types';

/**
 * Notifications a fan would actually get in this product: a call settling, a
 * match they follow starting, a rank move, a streak. No marketing, no
 * `come back` nags, and nothing that promises money (DESIGN.md 10).
 */
export type NotificationKind = 'call' | 'kickoff' | 'rank' | 'streak' | 'commentary';

export interface FanNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** Already-formatted, because there is no backend clock in this build. */
  time: string;
  href?: string;
  sport?: SportType;
}

export const NOTIFICATIONS: FanNotification[] = [
  {
    id: 'ntf-1',
    kind: 'call',
    title: 'Your call landed',
    body: 'Over 2.5 goals in Liverpool vs Arsenal. 162 fan points added.',
    time: '12m ago',
    href: '/calls',
    sport: 'football',
  },
  {
    id: 'ntf-2',
    kind: 'kickoff',
    title: 'Arsenal vs Chelsea locks in 20 minutes',
    body: 'Four markets are still open on this one.',
    time: '38m ago',
    href: '/predict',
    sport: 'football',
  },
  {
    id: 'ntf-3',
    kind: 'rank',
    title: 'You moved up to rank 5',
    body: 'Two places since this morning. 180 points behind fourth.',
    time: '2h ago',
    href: '/leaderboard',
  },
  {
    id: 'ntf-4',
    kind: 'commentary',
    title: 'Terrace commentary is live',
    body: 'Celtics vs Mavericks is being called in English now.',
    time: '3h ago',
    href: '/match/bos-dal-02',
    sport: 'basketball',
  },
  {
    id: 'ntf-5',
    kind: 'streak',
    title: 'Five calls in a row',
    body: 'Your streak is the longest it has been this season.',
    time: 'Yesterday',
    href: '/profile',
  },
  {
    id: 'ntf-6',
    kind: 'call',
    title: 'A call did not land',
    body: 'Correct score 2-1 in Monaco qualifying. No points lost, the stake was points committed.',
    time: 'Yesterday',
    href: '/calls',
    sport: 'f1',
  },
];
