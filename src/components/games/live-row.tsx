import Link from 'next/link';
import clsx from 'clsx';
import { Crest } from '@/components/ui/crest';
import { Waveform } from '@/components/ui/waveform';
import { scoreEmphasis } from '@/lib/format';
import type { Match, Team } from '@/types';

function Side({ team, score, leading }: { team: Team; score?: number | string; leading: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Crest team={team} size={22} />
      <span className={clsx('min-w-0 flex-1 truncate text-body-sm', leading ? 'text-fg' : 'text-fg-muted')}>
        {team.name}
      </span>
      <span className={clsx('num text-num-md', leading ? 'text-fg' : 'text-fg-muted')}>
        {score ?? '—'}
      </span>
    </div>
  );
}

/** Two-line scoreboard: both teams, both scores, then the clock column. */
export function LiveRow({ match }: { match: Match }) {
  const emphasis = scoreEmphasis(match);

  return (
    <Link href={`/match/${match.id}`} className="flex w-full items-center gap-3 px-5 py-3">
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <Side team={match.homeTeam} score={match.homeScore} leading={emphasis.home} />
        <Side team={match.awayTeam} score={match.awayScore} leading={emphasis.away} />
      </span>

      <span className="h-10 w-px shrink-0 bg-line" />

      <span className="flex w-[62px] shrink-0 flex-col items-center gap-[7px]">
        <span className="num text-num-sm text-live">{match.detailTime}</span>
        {match.hasAudioCommentary && <Waveform playing />}
      </span>
    </Link>
  );
}
