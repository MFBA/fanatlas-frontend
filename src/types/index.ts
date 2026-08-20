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
  odds: {
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
}

export interface Prediction {
  id: string;
  matchId: string;
  matchTitle: string;
  predictionChoice: 'home' | 'draw' | 'away';
  chosenTeamName: string;
  amountWagered: number;
  potentialPayout: number;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  timestamp: string;
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
  commentaryLanguage: 'en' | 'es';
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
  badge?: string;
  isCurrentUser?: boolean;
}
