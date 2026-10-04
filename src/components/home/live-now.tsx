import Link from 'next/link';
import clsx from 'clsx';
import { Crest } from '@/components/ui/crest';
import { Waveform } from '@/components/ui/waveform';
import { scoreEmphasis } from '@/lib/format';
import type { Match, Team } from '@/types';

function TeamRow({
  team,
  score,
  leading,
}: {
  team: Team;
  score?: number | string;
  leading: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Crest team={team} size={28} />
      <span className={clsx('min-w-0 flex-1 truncate text-body-sm', leading ? 'text-fg' : 'text-fg-muted')}>
        {team.name}
      </span>
      <span className={clsx('num text-num-lg', leading ? 'text-fg' : 'text-fg-muted')}>
        {score ?? '\u2014'}
      </span>
    </div>
  );
}

export function LiveMatchCard({ match }: { match: Match }) {
  const emphasis = scoreEmphasis(match);

  return (
    <Link
      href={`/match/${match.id}`}
      className="block w-[264px] shrink-0 rounded-lg border border-line bg-ink-1 p-4"
    >
      <div className="flex flex-col gap-3">
        <TeamRow team={match.homeTeam} score={match.homeScore} leading={emphasis.home} />
        <TeamRow team={match.awayTeam} score={match.awayScore} leading={emphasis.away} />
      </div>

      <div className="my-3 h-px bg-line" />

      <div className="flex items-center gap-2">
        <span className="size-1.5 animate-live-pulse rounded-full bg-live" />
        <span className="micro text-live">Live</span>
        <span className="num text-num-sm text-fg-muted">{match.detailTime}</span>
        <span className="flex-1" />
        {match.hasAudioCommentary && <Waveform playing />}
      </div>
    </Link>
  );
}

/** Cards peek past the edge, which is what tells a fan the rail scrolls. */
export function LiveNowRail({ matches }: { matches: Match[] }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5">
      {matches.map((match) => (
        <LiveMatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
