import { buildScorelines, buildTotalsMarket, toMultiplier } from '@/lib/markets';
import { MOCK_MATCHES } from '@/data/mockData';
import type { MarketId, MatchMarkets, ScorerOutcome, SportType } from '@/types';

/**
 * One seed per match, one ladder shape per sport. Everything else on the
 * Predict screen is computed from these by `src/lib/markets.ts`, so a demo
 * cannot show a 4.5 line that is somehow likelier than a 3.5 one.
 */

type SportTotals = { unit: string; lines: number[]; label: string };

/**
 * The market set is a property of the sport, not a fixed four. A correct-score
 * grid is meaningless for F1 and a first-scorer list is meaningless for tennis,
 * so a match carries what its sport actually has.
 */
const SPORT_TOTALS: Record<SportType, SportTotals> = {
  football: { unit: 'Goals', label: 'Total goals', lines: [0.5, 1.5, 2.5, 3.5, 4.5] },
  basketball: {
    unit: 'Points',
    label: 'Total points',
    lines: [205.5, 210.5, 215.5, 220.5, 225.5],
  },
  cricket: { unit: 'Runs', label: 'Total runs', lines: [260.5, 280.5, 300.5, 320.5, 340.5] },
  f1: { unit: 'Overtakes', label: 'Total overtakes', lines: [4.5, 6.5, 8.5, 10.5, 12.5] },
  tennis: { unit: 'Games', label: 'Total games', lines: [18.5, 20.5, 22.5, 24.5, 26.5] },
};

const MARKET_SETS: Record<SportType, MarketId[]> = {
  football: ['match_result', 'total_goals', 'correct_score', 'first_scorer'],
  basketball: ['match_result', 'total_goals'],
  cricket: ['match_result', 'total_goals'],
  f1: ['match_result', 'total_goals'],
  tennis: ['match_result', 'total_goals'],
};

/**
 * `expected` is the model's expected total. `overBias` is how many probability
 * points the crowd sits above the model on over at the anchor line: positive
 * because fans reliably want goals. Liverpool vs Arsenal carries the largest
 * bias because it is the fixture the split promo points at.
 */
const SEEDS: Record<string, { expected: number; overBias: number; sd?: number }> = {
  'liv-ars-01': { expected: 2.9, overBias: 14 },
  'bos-dal-02': { expected: 219, overBias: 9, sd: 17 },
  'f1-monaco-03': { expected: 6.2, overBias: -11 },
  'ind-aus-04': { expected: 298, overBias: 12, sd: 52 },
  'ars-che-05': { expected: 2.6, overBias: 20 },
  'rma-bar-06': { expected: 3.1, overBias: 16 },
  'mil-int-07': { expected: 2.2, overBias: 18 },
  'ind-aus-odi-08': { expected: 311, overBias: 7, sd: 52 },
};

const DEFAULT_SEED = { expected: 2.6, overBias: 12 };

/** First-scorer lists are football-only, so only the football fixtures carry one. */
const SCORERS: Record<string, { name: string; team: string; share: number }[]> = {
  'liv-ars-01': [
    { name: 'Mohamed Salah', team: 'LIV', share: 26 },
    { name: 'Bukayo Saka', team: 'ARS', share: 19 },
    { name: 'Dominik Szoboszlai', team: 'LIV', share: 14 },
    { name: 'Kai Havertz', team: 'ARS', share: 12 },
    { name: 'Cody Gakpo', team: 'LIV', share: 9 },
    { name: 'Gabriel Martinelli', team: 'ARS', share: 8 },
  ],
  'ars-che-05': [
    { name: 'Bukayo Saka', team: 'ARS', share: 24 },
    { name: 'Cole Palmer', team: 'CHE', share: 21 },
    { name: 'Kai Havertz', team: 'ARS', share: 15 },
    { name: 'Nicolas Jackson', team: 'CHE', share: 13 },
    { name: 'Gabriel Martinelli', team: 'ARS', share: 10 },
    { name: 'Enzo Fernandez', team: 'CHE', share: 6 },
  ],
  'rma-bar-06': [
    { name: 'Kylian Mbappe', team: 'RMA', share: 29 },
    { name: 'Robert Lewandowski', team: 'BAR', share: 20 },
    { name: 'Vinicius Junior', team: 'RMA', share: 17 },
    { name: 'Lamine Yamal', team: 'BAR', share: 13 },
    { name: 'Jude Bellingham', team: 'RMA', share: 9 },
    { name: 'Raphinha', team: 'BAR', share: 6 },
  ],
  'mil-int-07': [
    { name: 'Rafael Leao', team: 'ACM', share: 23 },
    { name: 'Lautaro Martinez', team: 'INT', share: 22 },
    { name: 'Christian Pulisic', team: 'ACM', share: 16 },
    { name: 'Marcus Thuram', team: 'INT', share: 14 },
    { name: 'Olivier Giroud', team: 'ACM', share: 8 },
    { name: 'Hakan Calhanoglu', team: 'INT', share: 7 },
  ],
};

function buildScorers(matchId: string): ScorerOutcome[] | undefined {
  const players = SCORERS[matchId];
  if (!players) return undefined;

  const outcomes: ScorerOutcome[] = players.map((player, index) => ({
    id: `${matchId}-p${index}`,
    name: player.name,
    teamShortName: player.team,
    // A player's real chance of scoring first is well under their share of the
    // crowd, which is exactly why the market is worth showing.
    multiplier: toMultiplier((player.share / 100) * 0.62),
    communityShare: player.share,
  }));

  const anyoneElse = 100 - players.reduce((sum, player) => sum + player.share, 0);
  outcomes.push({
    id: `${matchId}-none`,
    name: 'No scorer (0-0)',
    teamShortName: '',
    multiplier: toMultiplier(0.08),
    communityShare: Math.max(1, anyoneElse),
  });

  return outcomes;
}

export function marketsForMatch(matchId: string): MatchMarkets | undefined {
  const match = MOCK_MATCHES.find((entry) => entry.id === matchId);
  if (!match) return undefined;

  const seed = SEEDS[matchId] ?? DEFAULT_SEED;
  const totalsShape = SPORT_TOTALS[match.sport];
  const set = MARKET_SETS[match.sport];
  const communitySkew = match.communityVotes.home - match.aiWinProbability.home;
  const scorers = set.includes('first_scorer') ? buildScorers(matchId) : undefined;

  return {
    matchResult: { multipliers: match.multipliers },
    totals: set.includes('total_goals')
      ? buildTotalsMarket({ ...seed, lines: totalsShape.lines, unit: totalsShape.unit })
      : undefined,
    correctScore: set.includes('correct_score')
      ? {
          outcomes: buildScorelines({
            expected: seed.expected,
            modelHome: match.aiWinProbability.home,
            modelAway: match.aiWinProbability.away,
            communitySkew,
          }),
        }
      : undefined,
    firstScorer: scorers ? { outcomes: scorers } : undefined,
  };
}

export function marketIdsForSport(sport: SportType): MarketId[] {
  return MARKET_SETS[sport];
}

export function totalsLabel(sport: SportType): string {
  return SPORT_TOTALS[sport].label;
}

export const MARKET_LABELS: Record<MarketId, string> = {
  match_result: 'Match result',
  total_goals: 'Total goals',
  correct_score: 'Correct score',
  first_scorer: 'First scorer',
};
