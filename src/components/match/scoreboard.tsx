import { Crest } from '@/components/ui/crest';
import { parseKickoff, scoreEmphasis } from '@/lib/format';
import clsx from 'clsx';
import type { Match } from '@/types';

export function Scoreboard({ match }: { match: Match }) {
  const emphasis = scoreEmphasis(match);
  const isLive = match.status === 'live';
  const { time } = parseKickoff(match.detailTime);

  return (
    <div className="flex shrink-0 flex-col gap-4.5 px-5 pb-5 pt-6">
      <div className="flex items-center">
        <div className="flex flex-1 flex-col items-center gap-2.5">
          <Crest team={match.homeTeam} size={44} />
          <span className={clsx('text-body-sm', emphasis.home ? 'text-fg' : 'text-fg-muted')}>
            {match.homeTeam.name}
          </span>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2">
          {isLive ? (
            <div className="flex items-baseline gap-3">
              <span className={clsx('num text-display', emphasis.home ? 'text-fg' : 'text-fg-muted')}>
                {match.homeScore ?? '—'}
              </span>
              <span className="num text-h2 text-line-strong">:</span>
              <span className={clsx('num text-display', emphasis.away ? 'text-fg' : 'text-fg-muted')}>
                {match.awayScore ?? '—'}
              </span>
            </div>
          ) : (
            <span className="num text-display text-fg">{time}</span>
          )}

          <div className="flex items-center gap-[7px]">
            {isLive && <span className="size-1.5 animate-live-pulse rounded-full bg-live" />}
            <span className={clsx('num text-num-sm', isLive ? 'text-live' : 'text-fg-muted')}>
              {isLive ? match.detailTime : match.detailTime.split('•')[0].trim()}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2.5">
          <Crest team={match.awayTeam} size={44} />
          <span className={clsx('text-body-sm', emphasis.away ? 'text-fg' : 'text-fg-muted')}>
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {match.venue && (
        <div className="flex justify-center">
          <span className="micro text-fg-faint">{match.venue}</span>
        </div>
      )}
    </div>
  );
}
