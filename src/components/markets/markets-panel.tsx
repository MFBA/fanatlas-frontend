'use client';

import { useMemo, useState } from 'react';
import { useCalls } from '@/components/markets/calls-store';
import { CorrectScoreMarket } from '@/components/markets/correct-score';
import { FirstScorerMarket } from '@/components/markets/first-scorer';
import { MarketRail } from '@/components/markets/market-rail';
import { MatchResultMarket } from '@/components/markets/match-result';
import { TotalsLadder } from '@/components/markets/totals-ladder';
import { marketIdsForSport, marketsForMatch } from '@/data/markets';
import type { MarketId, Match } from '@/types';

/**
 * The market rail and whichever market body is selected. Shared by the Predict
 * list card and the full markets screen: the two differ only in whether the
 * totals ladder is compact, so they should not differ in anything else.
 */
export function MarketsPanel({ match, compact }: { match: Match; compact: boolean }) {
  // Past kickoff a call cannot change, so the controls stop responding as well
  // as saying so. A screen that says LOCKED and still takes taps is worse than
  // one that does neither (DESIGN.md 7.4).
  const readOnly = match.status !== 'upcoming';
  const markets = useMemo(() => marketsForMatch(match.id), [match.id]);
  const available = useMemo(
    () => marketIdsForSport(match.sport).filter((id) => hasBody(id, markets)),
    [match.sport, markets],
  );
  const [active, setActive] = useState<MarketId>(available[0] ?? 'match_result');
  const { open, setCall } = useCalls();

  if (!markets || available.length === 0) return null;
  const calls = open[match.id] ?? {};

  return (
    <>
      <MarketRail
        markets={available}
        active={active}
        onSelect={setActive}
        counts={Object.fromEntries(Object.keys(calls).map((id) => [id, true]))}
      />

      {active === 'match_result' && (
        <MatchResultMarket
          match={match}
          readOnly={readOnly}
          selection={calls.match_result?.market === 'match_result' ? calls.match_result.side : null}
          onSelect={(side) =>
            setCall(match.id, 'match_result', side ? { market: 'match_result', side } : null)
          }
        />
      )}

      {active === 'total_goals' && markets.totals && (
        <TotalsLadder
          market={markets.totals}
          compact={compact}
          readOnly={readOnly}
          selection={
            calls.total_goals?.market === 'total_goals'
              ? { line: calls.total_goals.line, side: calls.total_goals.side }
              : null
          }
          onSelect={(selection) =>
            setCall(
              match.id,
              'total_goals',
              selection ? { market: 'total_goals', ...selection } : null,
            )
          }
        />
      )}

      {active === 'correct_score' && markets.correctScore && (
        <CorrectScoreMarket
          outcomes={markets.correctScore.outcomes}
          readOnly={readOnly}
          selection={
            calls.correct_score?.market === 'correct_score'
              ? { home: calls.correct_score.home, away: calls.correct_score.away }
              : null
          }
          onSelect={(selection) =>
            setCall(
              match.id,
              'correct_score',
              selection ? { market: 'correct_score', ...selection } : null,
            )
          }
        />
      )}

      {active === 'first_scorer' && markets.firstScorer && (
        <FirstScorerMarket
          outcomes={markets.firstScorer.outcomes}
          readOnly={readOnly}
          selection={
            calls.first_scorer?.market === 'first_scorer' ? calls.first_scorer.playerId : null
          }
          onSelect={(playerId) =>
            setCall(match.id, 'first_scorer', playerId ? { market: 'first_scorer', playerId } : null)
          }
        />
      )}
    </>
  );
}

function hasBody(market: MarketId, markets: ReturnType<typeof marketsForMatch>) {
  if (!markets) return false;
  if (market === 'total_goals') return Boolean(markets.totals);
  if (market === 'correct_score') return Boolean(markets.correctScore);
  if (market === 'first_scorer') return Boolean(markets.firstScorer);
  return true;
}
