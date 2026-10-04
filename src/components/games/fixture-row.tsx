import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { parseKickoff } from '@/lib/format';
import type { Match } from '@/types';

/** Every match carries the four markets from DESIGN.md 7.7. */
const MARKETS_PER_MATCH = 4;

export function FixtureRow({ match }: { match: Match }) {
  const { time } = parseKickoff(match.detailTime);

  return (
    <Link href={`/match/${match.id}`} className="flex h-14 w-full items-center gap-3 px-5">
      <span className="num w-11 shrink-0 text-body-sm text-fg-muted">{time}</span>
      <span className="h-7 w-px shrink-0 bg-line" />
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="truncate text-body-sm text-fg">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </span>
        <span className="micro truncate text-fg-faint">
          {match.league} &middot; {MARKETS_PER_MATCH} markets open
        </span>
      </span>
      <ChevronRight size={16} strokeWidth={2} className="shrink-0 text-fg-faint" aria-hidden />
    </Link>
  );
}
