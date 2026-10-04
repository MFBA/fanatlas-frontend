import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CrestPair } from '@/components/ui/crest';
import { isToday, parseKickoff } from '@/lib/format';
import type { Match } from '@/types';

export function UpcomingList({ matches }: { matches: Match[] }) {
  return (
    <div className="mx-5 overflow-hidden rounded-lg border border-line bg-ink-1">
      {matches.map((match, index) => {
        const { day, time } = parseKickoff(match.detailTime);
        const meta = isToday(match.detailTime) ? match.league : `${match.league} · ${day}`;
        return (
          <div key={match.id}>
            {index > 0 && <div className="h-px bg-line" />}
            <Link href={`/match/${match.id}`} className="flex w-full items-center gap-3 px-4 py-3">
              <CrestPair home={match.homeTeam} away={match.awayTeam} />
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="truncate text-body-sm text-fg">
                  {match.homeTeam.name} vs {match.awayTeam.name}
                </span>
                <span className="micro truncate text-fg-faint">{meta}</span>
              </span>
              <span className="num text-num-md text-fg-muted">{time}</span>
              <ChevronRight size={16} strokeWidth={2} className="shrink-0 text-fg-faint" aria-hidden />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
