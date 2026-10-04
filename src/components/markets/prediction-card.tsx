'use client';

import Link from 'next/link';
import { CrestPair } from '@/components/ui/crest';
import { useCalls } from '@/components/markets/calls-store';
import { MarketsPanel } from '@/components/markets/markets-panel';
import { marketsForMatch, totalsLabel } from '@/data/markets';
import { parseKickoff } from '@/lib/format';
import type { Call, Match } from '@/types';

/**
 * One card per match, one market at a time, so the Predict list stays
 * scannable (DESIGN.md 7.4 and 7.7).
 */
export function PredictionCard({
  match,
  compact = true,
}: {
  match: Match;
  /** The full markets screen shows the whole ladder; the list shows three rows. */
  compact?: boolean;
}) {
  const { open } = useCalls();
  const calls = open[match.id] ?? {};
  const { time } = parseKickoff(match.detailTime);

  if (match.status !== 'upcoming') {
    return <LockedCard match={match} callCount={Object.keys(calls).length} />;
  }

  return (
    <article className="flex flex-col gap-3.5 rounded-lg border border-line bg-ink-1 p-4">
      <Link href={`/match/${match.id}`} className="flex items-center gap-3">
        <CrestPair home={match.homeTeam} away={match.awayTeam} size={24} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-h3 text-fg">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </span>
          <span className="micro text-fg-faint">{match.league}</span>
        </span>
        <span className="num shrink-0 text-num-sm text-fg-faint">{time}</span>
      </Link>

      <MarketsPanel match={match} compact={compact} />
    </article>
  );
}

/**
 * Past kickoff the card states the lock rather than silently disabling
 * controls, because a submitted call cannot change after kickoff and a greyed
 * button does not say that (DESIGN.md 7.4).
 */
function LockedCard({ match, callCount }: { match: Match; callCount: number }) {
  return (
    <article className="flex items-center gap-3 rounded-lg border border-line bg-ink-1 px-4 py-3.5">
      <CrestPair home={match.homeTeam} away={match.awayTeam} size={24} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-body-sm text-fg-muted">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </span>
        <span className="micro text-fg-faint">
          {callCount === 1 ? '1 call locked at kickoff' : `${callCount} calls locked at kickoff`}
        </span>
      </span>
      <span className="micro shrink-0 rounded-sm border border-warn px-2 py-1 text-warn">
        Locked
      </span>
    </article>
  );
}

/**
 * The label and multiplier a submitted call carries. Resolved against the same
 * generated market the fan tapped, so the receipt cannot disagree with the card.
 */
export function resolveCall(match: Match, call: Call): { label: string; multiplier: number } {
  const markets = marketsForMatch(match.id);

  switch (call.market) {
    case 'match_result': {
      const multipliers = match.multipliers;
      const label =
        call.side === 'draw'
          ? 'Draw'
          : `${call.side === 'home' ? match.homeTeam.name : match.awayTeam.name} to win`;
      return { label, multiplier: multipliers[call.side] ?? 1 };
    }
    case 'total_goals': {
      const unit = totalsLabel(match.sport).replace('Total ', '');
      const row = markets?.totals?.lines.find((line) => line.line === call.line);
      return {
        label: `${call.side === 'over' ? 'Over' : 'Under'} ${call.line} ${unit}`,
        multiplier:
          (call.side === 'over' ? row?.overMultiplier : row?.underMultiplier) ?? 1,
      };
    }
    case 'correct_score': {
      const outcome = markets?.correctScore?.outcomes.find(
        (entry) => entry.home === call.home && entry.away === call.away,
      );
      return {
        label: `Correct score ${call.home}-${call.away}`,
        multiplier: outcome?.multiplier ?? 1,
      };
    }
    case 'first_scorer': {
      const outcome = markets?.firstScorer?.outcomes.find((entry) => entry.id === call.playerId);
      return {
        label: outcome ? `${outcome.name} first scorer` : 'First scorer',
        multiplier: outcome?.multiplier ?? 1,
      };
    }
  }
}
