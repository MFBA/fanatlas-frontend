import type { ScorelineOutcome, TotalsLine, TotalsMarket } from '@/types';

/**
 * Market numbers are derived, not authored. A hand-typed ladder drifts out of
 * agreement with itself the moment anyone edits one row: a 4.5 line cannot be
 * more likely than a 3.5 line, and a mock that says otherwise is the kind of
 * thing a founder spots in a demo. So every line on the ladder comes off one
 * expectation per match, and the whole ladder moves together.
 */

/** House edge folded into every multiplier so the book does not sum under 1. */
const MARGIN = 0.9;

function poissonPmf(lambda: number, k: number): number {
  // Computed in log space: 220! overflows a double long before basketball does.
  let logFactorial = 0;
  for (let i = 2; i <= k; i += 1) logFactorial += Math.log(i);
  return Math.exp(-lambda + k * Math.log(lambda) - logFactorial);
}

/**
 * P(X <= k). Poisson unless the caller supplies its own standard deviation.
 *
 * Goals really are close to Poisson. Cricket runs are not: a Poisson on a
 * 298-run innings implies a standard deviation of 17, when the real spread is
 * nearer 55, which is why an unmodified Poisson prices a 260 line at 99% and
 * makes four of the five rungs worthless. Sports that are overdispersed pass
 * their own `sd` instead.
 */
function totalCdf(expected: number, k: number, sd?: number): number {
  if (k < 0) return 0;
  if (sd !== undefined) return normalCdf((k + 0.5 - expected) / sd);
  // A 220-point basketball total needs the normal approximation; a 2.6-goal
  // football total needs the exact sum. The crossover is where they agree.
  if (expected > 30) return normalCdf((k + 0.5 - expected) / Math.sqrt(expected));

  let total = 0;
  for (let i = 0; i <= k; i += 1) total += poissonPmf(expected, i);
  return Math.min(1, total);
}

function normalCdf(z: number): number {
  // Abramowitz and Stegun 7.1.26, good to ~1e-7. Plenty for a display number.
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

/**
 * A probability turned into the multiplier a fan sees.
 *
 * The upper clamp is what stops a near-certain call pricing below 1.00x, which
 * would mean committing 100 points to win back 93. Floored at 1.02x for the
 * same reason: a call that cannot return more than it costs is not a call.
 */
export function toMultiplier(probability: number): number {
  const clamped = Math.min(0.88, Math.max(0.03, probability));
  return Math.max(1.02, Math.round((MARGIN / clamped) * 100) / 100);
}

export function formatMultiplier(multiplier: number): string {
  // Always two decimals and always the `x`, so a column of them lines up and
  // nothing reads as a bookmaker price (DESIGN.md 10).
  return `${multiplier.toFixed(2)}x`;
}

/**
 * The goal-line ladder. `overBias` is how far the crowd sits above the model in
 * probability points at the anchor, which is the disagreement the whole product
 * is about. It decays away from the anchor because fans have weak opinions
 * about whether a match goes over 4.5.
 */
export function buildTotalsMarket({
  expected,
  lines,
  unit,
  overBias,
  sd,
}: {
  expected: number;
  lines: number[];
  unit: string;
  overBias: number;
  /** Standard deviation for sports Poisson underdisperses. See `totalCdf`. */
  sd?: number;
}): TotalsMarket {
  const anchorLine = lines.reduce((best, line) =>
    Math.abs(line - expected) < Math.abs(best - expected) ? line : best,
  );

  const rows: TotalsLine[] = lines.map((line) => {
    const modelOver = 1 - totalCdf(expected, Math.floor(line), sd);
    const decay = 1 / (1 + Math.abs(line - anchorLine));
    const communityOver = Math.min(
      0.99,
      Math.max(0.01, modelOver + (overBias / 100) * decay),
    );

    return {
      line,
      overMultiplier: toMultiplier(modelOver),
      underMultiplier: toMultiplier(1 - modelOver),
      communityOver: Math.round(communityOver * 100),
      modelOver: Math.round(modelOver * 100),
    };
  });

  return { unit, anchorLine, lines: rows };
}

/**
 * Correct score. The two teams get independent Poisson rates split out of the
 * match total by the model's edge, which is crude but produces a scoreline list
 * that agrees with both the totals ladder and the match-result market.
 */
export function buildScorelines({
  expected,
  modelHome,
  modelAway,
  communitySkew,
  count = 8,
}: {
  expected: number;
  modelHome: number;
  modelAway: number;
  communitySkew: number;
  count?: number;
}): ScorelineOutcome[] {
  const edge = (modelHome - modelAway) / 400;
  const homeLambda = expected * (0.5 + edge);
  const awayLambda = expected * (0.5 - edge);

  const grid: ScorelineOutcome[] = [];
  for (let home = 0; home <= 5; home += 1) {
    for (let away = 0; away <= 5; away += 1) {
      const probability = poissonPmf(homeLambda, home) * poissonPmf(awayLambda, away);
      grid.push({
        home,
        away,
        multiplier: toMultiplier(probability),
        modelShare: probability,
        communityShare: 0,
      });
    }
  }

  const top = grid.sort((a, b) => b.modelShare - a.modelShare).slice(0, count);

  // Fans over-pick the scoreline that flatters the side they already back, so
  // the crowd distribution is the model's tilted by the same skew and renormalised.
  const weights = top.map(
    (outcome) => outcome.modelShare * (1 + (communitySkew / 100) * (outcome.home - outcome.away)),
  );
  const total = weights.reduce((sum, weight) => sum + Math.max(0, weight), 0) || 1;

  return top.map((outcome, index) => ({
    ...outcome,
    modelShare: Math.round(outcome.modelShare * 1000) / 10,
    communityShare: Math.round((Math.max(0, weights[index]) / total) * 1000) / 10,
  }));
}

export function formatScoreline(home: number, away: number): string {
  return `${home}-${away}`;
}
