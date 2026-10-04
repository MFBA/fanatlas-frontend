export type SportType = 'football' | 'basketball' | 'f1' | 'cricket' | 'tennis';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color?: string;
}

export interface MatchEvent {
  id: string;
  minute: string;
  type: 'goal' | 'card' | 'sub' | 'wicket' | 'lap' | 'basket' | 'overtake';
  teamId?: string;
  description: string;
  player?: string;
}

export interface Match {
  id: string;
  sport: SportType;
  league: string;
  status: 'live' | 'upcoming' | 'finished';
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number | string;
  awayScore?: number | string;
  detailTime: string; // e.g. "78'", "4th 2:45", "Q2 12:34", "32/1 (6.2)", "Today • 8:00 PM"
  venue?: string;
  liveBadgeCount?: number;
  hasAudioCommentary?: boolean;
  audioDuration?: string;
  aiWinProbability: {
    home: number;
    draw?: number;
    away: number;
  };
  communityVotes: {
    home: number;
    draw?: number;
    away: number;
  };
  /** Fan-point multipliers for the match-result market. Never called odds. */
  multipliers: {
    home: number;
    draw?: number;
    away: number;
  };
  commentaryTranscript?: Array<{
    id: string;
    timestamp: string;
    text: string;
    textEs?: string;
    speaker: string;
    isExcited?: boolean;
  }>;
  stats?: {
    possession?: [number, number];
    shotsOnTarget?: [number, number];
    fouls?: [number, number];
    corners?: [number, number];
  };
  /** Built by `src/data/markets.ts`, not authored per match. */
  markets?: MatchMarkets;
}

/**
 * The four markets. snake_case here and sentence case in the UI, per
 * DESIGN.md 7.7. Which markets a match carries is a property of the sport:
 * `correct_score` and `first_scorer` are football-only, and the totals market
 * counts goals, points, runs or overtakes depending on what is being played.
 */
export type MarketId = 'match_result' | 'correct_score' | 'first_scorer' | 'total_goals';

/** One rung of the goal-line ladder (DESIGN.md 7.7.1). */
export interface TotalsLine {
  /** Always a half number so the line cannot be pushed. */
  line: number;
  overMultiplier: number;
  underMultiplier: number;
  /** Share of fans calling over at this line, 0-100. */
  communityOver: number;
  /** Model probability of over at this line, 0-100. */
  modelOver: number;
}

export interface TotalsMarket {
  /** Sentence-case unit shown under each line number: Goals, Points, Runs. */
  unit: string;
  /** The line closest to the model's expectation. Drives the card header. */
  anchorLine: number;
  lines: TotalsLine[];
}

export interface ScorelineOutcome {
  home: number;
  away: number;
  multiplier: number;
  /** Share of fans on this scoreline, 0-100. */
  communityShare: number;
  modelShare: number;
}

export interface ScorerOutcome {
  id: string;
  name: string;
  teamShortName: string;
  multiplier: number;
  communityShare: number;
  /** Player headshot when the feed has one. Falls back to an identity disc. */
  photo?: string;
}

export interface MatchMarkets {
  matchResult: { multipliers: { home: number; draw?: number; away: number } };
  totals?: TotalsMarket;
  correctScore?: { outcomes: ScorelineOutcome[] };
  firstScorer?: { outcomes: ScorerOutcome[] };
}

/**
 * What a fan actually called. The market is the discriminant, so an outcome can
 * be a side, a scoreline, a player or a line-and-side without any of them
 * having to pretend to be the others.
 */
export type Call =
  | { market: 'match_result'; side: 'home' | 'draw' | 'away' }
  | { market: 'correct_score'; home: number; away: number }
  | { market: 'first_scorer'; playerId: string }
  | { market: 'total_goals'; line: number; side: 'over' | 'under' };

export interface Prediction {
  id: string;
  matchId: string;
  matchTitle: string;
  call: Call;
  /** Rendered label, e.g. "Over 2.5 goals". Sentence case. */
  label: string;
  multiplier: number;
  /**
   * Fan points, never money. `amountWagered` and `potentialPayout` were renamed
   * here because store review reads gambling vocabulary in the payload, not
   * only on the screen (DESIGN.md 10).
   */
  pointsCommitted: number;
  pointsAtStake: number;
  status: 'pending' | 'locked' | 'won' | 'lost';
  timestamp: string;
}

/** Four languages ship, two of them gated. Never a two-value toggle. */
export type LanguageCode = 'en' | 'es' | 'pt' | 'fr';

export interface SavedHighlight {
  id: string;
  matchId: string;
  title: string;
  matchTitle: string;
  language: LanguageCode;
  voice: string;
  duration: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  email: string;
  points: number;
  rank: number;
  tier: string;
  streak: number;
  winRate: number;
  predictionsTotal: number;
  predictionsWon: number;
  favoriteSports: SportType[];
  favoriteTeams: string[];
  commentaryLanguage: LanguageCode;
  commentaryVoice: string;
  favoritePlayers: string[];
  /** Saved commentary moments are capped per fan and the cap is shown, never
   *  surfaced as an error after the fact (DESIGN.md 8 Profile). */
  highlightCap: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  points: number;
  winRate: number;
  streak: number;
  country: string;
  /** Tier name only. No medals, no trophy emoji (DESIGN.md 7.8). */
  tier?: string;
  isCurrentUser?: boolean;
}
