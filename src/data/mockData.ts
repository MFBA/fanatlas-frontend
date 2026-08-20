import { Match, LeaderboardUser, UserProfile, Prediction } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-101',
  name: 'Hamza Khan',
  handle: '@hamza_fanatlas',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  email: 'hamza@fanatlas.app',
  points: 4850,
  rank: 14,
  tier: 'Diamond Oracle',
  streak: 5,
  winRate: 78.4,
  predictionsTotal: 46,
  predictionsWon: 36,
  favoriteSports: ['football', 'basketball', 'f1', 'cricket'],
  favoriteTeams: ['Arsenal', 'Celtics', 'Ferrari', 'India'],
  commentaryLanguage: 'en',
  soundEnabled: true,
  notificationsEnabled: true,
};

export const MOCK_MATCHES: Match[] = [
  {
    id: 'liv-ars-01',
    sport: 'football',
    league: 'Premier League',
    status: 'live',
    homeTeam: {
      id: 'liv',
      name: 'Liverpool',
      shortName: 'LIV',
      logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      color: '#C8102E'
    },
    awayTeam: {
      id: 'ars',
      name: 'Arsenal',
      shortName: 'ARS',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      color: '#EF0107'
    },
    homeScore: 2,
    awayScore: 1,
    detailTime: "78'",
    venue: 'Anfield, Liverpool',
    hasAudioCommentary: true,
    audioDuration: '24:15',
    aiWinProbability: {
      home: 68,
      draw: 22,
      away: 10,
    },
    communityVotes: {
      home: 62,
      draw: 15,
      away: 23,
    },
    odds: {
      home: 1.45,
      draw: 3.80,
      away: 5.50,
    },
    stats: {
      possession: [56, 44],
      shotsOnTarget: [7, 4],
      fouls: [8, 11],
      corners: [6, 3]
    },
    commentaryTranscript: [
      {
        id: 'c-1',
        timestamp: "77:40",
        speaker: 'FanAtlas AI Analyst',
        text: "Liverpool pressing relentlessly high in the final third! Salah threads a pinpoint pass through the inside-right channel to Szoboszlai!",
        textEs: "¡El Liverpool presiona implacablemente en el último tercio! ¡Salah filtra un pase milimétrico hacia Szoboszlai!",
        isExcited: true
      },
      {
        id: 'c-2',
        timestamp: "76:12",
        speaker: 'FanAtlas Tactician',
        text: "Arsenal looking to absorb the pressure and launch Saka on a rapid counter-transition down the flank.",
        textEs: "El Arsenal busca absorber la presión y lanzar a Saka en una rápida contra por la banda.",
        isExcited: false
      },
      {
        id: 'c-3',
        timestamp: "74:05",
        speaker: 'FanAtlas AI Analyst',
        text: "Crucial block by Saliba! That prevented what looked like a certain third goal for the Reds.",
        textEs: "¡Bloqueo crucial de Saliba! Evitó lo que parecía un seguro tercer gol para los Reds.",
        isExcited: true
      }
    ]
  },
  {
    id: 'bos-dal-02',
    sport: 'basketball',
    league: 'NBA',
    status: 'live',
    homeTeam: {
      id: 'bos',
      name: 'Celtics',
      shortName: 'BOS',
      logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
      color: '#007A33'
    },
    awayTeam: {
      id: 'dal',
      name: 'Mavericks',
      shortName: 'DAL',
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg',
      color: '#00538C'
    },
    homeScore: 112,
    awayScore: 108,
    detailTime: '4th 2:45',
    venue: 'TD Garden, Boston',
    hasAudioCommentary: true,
    audioDuration: '18:50',
    aiWinProbability: {
      home: 74,
      away: 26,
    },
    communityVotes: {
      home: 58,
      away: 42,
    },
    odds: {
      home: 1.35,
      away: 3.10,
    },
    stats: {
      possession: [50, 50],
      shotsOnTarget: [42, 39],
      fouls: [18, 20]
    },
    commentaryTranscript: [
      {
        id: 'cb-1',
        timestamp: "4th 2:45",
        speaker: 'Hoops AI',
        text: "Tatum drives baseline with the step-back jumper... SWISH! Celtics lead by 4 with under three minutes remaining!",
        textEs: "¡Tatum penetra por la línea de fondo con tiro en suspensión... ADENTRO! ¡Los Celtics lideran por 4 a falta de 3 minutos!",
        isExcited: true
      },
      {
        id: 'cb-2',
        timestamp: "4th 3:10",
        speaker: 'Hoops AI',
        text: "Luka with a dazzling no-look dime into the paint to Lively for the flush!",
        textEs: "¡Luka con una espectacular asistencia sin mirar para la volcada de Lively!",
        isExcited: true
      }
    ]
  },
  {
    id: 'f1-monaco-03',
    sport: 'f1',
    league: 'Formula 1',
    status: 'live',
    homeTeam: {
      id: 'fer',
      name: 'Ferrari',
      shortName: 'LEC',
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg',
      color: '#E80020'
    },
    awayTeam: {
      id: 'rbr',
      name: 'Red Bull',
      shortName: 'VER',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Red_Bull_Racing_logo.svg',
      color: '#3671C6'
    },
    homeScore: 'P1',
    awayScore: 'P2',
    detailTime: 'Q2 12:34',
    venue: 'Circuit de Monaco',
    hasAudioCommentary: true,
    audioDuration: '14:20',
    aiWinProbability: {
      home: 61,
      away: 39,
    },
    communityVotes: {
      home: 54,
      away: 46,
    },
    odds: {
      home: 1.60,
      away: 2.20,
    },
    commentaryTranscript: [
      {
        id: 'cf-1',
        timestamp: "Q2 12:34",
        speaker: 'Pit Lane AI',
        text: "Leclerc sets purple sectors in Sectors 1 and 2! Absolute mastery through the swimming pool chicane!",
        textEs: "¡Leclerc marca sectores morados en el 1 y 2! ¡Maestría absoluta en la chicana de la piscina!",
        isExcited: true
      }
    ]
  },
  {
    id: 'ind-aus-04',
    sport: 'cricket',
    league: 'ICC Tour',
    status: 'live',
    homeTeam: {
      id: 'ind',
      name: 'India',
      shortName: 'IND',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
      color: '#0085CA'
    },
    awayTeam: {
      id: 'aus',
      name: 'Australia',
      shortName: 'AUS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
      color: '#FFCD00'
    },
    homeScore: '32/1',
    awayScore: '(6.2)',
    detailTime: '32/1 (6.2)',
    venue: 'Melbourne Cricket Ground',
    hasAudioCommentary: true,
    audioDuration: '30:00',
    aiWinProbability: {
      home: 58,
      away: 42,
    },
    communityVotes: {
      home: 65,
      away: 35,
    },
    odds: {
      home: 1.72,
      away: 2.10,
    },
    commentaryTranscript: [
      {
        id: 'cc-1',
        timestamp: "6.2 ov",
        speaker: 'Cricket AI',
        text: "Fuller delivery outside off, driven elegantly through extra cover for a boundary four by Shubman Gill!",
        textEs: "¡Pelota plena afuera del off, impulsada elegantemente hacia extra cover para un cuatro de Gill!",
        isExcited: true
      }
    ]
  },
  // Upcoming matches matching the Figma layout
  {
    id: 'ars-che-05',
    sport: 'football',
    league: 'Premier League',
    status: 'upcoming',
    homeTeam: {
      id: 'ars',
      name: 'Arsenal',
      shortName: 'ARS',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      color: '#EF0107'
    },
    awayTeam: {
      id: 'che',
      name: 'Chelsea',
      shortName: 'CHE',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      color: '#034694'
    },
    detailTime: 'Today • 8:00 PM',
    venue: 'Emirates Stadium, London',
    hasAudioCommentary: true,
    audioDuration: '24:15',
    aiWinProbability: {
      home: 57,
      draw: 24,
      away: 19,
    },
    communityVotes: {
      home: 61,
      draw: 18,
      away: 21,
    },
    odds: {
      home: 1.85,
      draw: 3.50,
      away: 4.10,
    },
    commentaryTranscript: [
      {
        id: 'up-1',
        timestamp: "Pre-Match",
        speaker: 'FanAtlas AI Preview',
        text: "Welcome to Emirates Stadium for London Derby blockbuster: Arsenal vs Chelsea! Both squads eager for 3 points in title chase.",
        textEs: "¡Bienvenidos al Emirates Stadium para el gran derbi londinense: Arsenal vs Chelsea!",
        isExcited: true
      }
    ]
  },
  {
    id: 'rma-bar-06',
    sport: 'football',
    league: 'La Liga',
    status: 'upcoming',
    homeTeam: {
      id: 'rma',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      color: '#FEBE10'
    },
    awayTeam: {
      id: 'bar',
      name: 'Barcelona',
      shortName: 'BAR',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      color: '#A50044'
    },
    detailTime: 'Tomorrow • 10:15 PM',
    venue: 'Santiago Bernabéu, Madrid',
    hasAudioCommentary: true,
    aiWinProbability: {
      home: 52,
      draw: 26,
      away: 22,
    },
    communityVotes: {
      home: 49,
      draw: 20,
      away: 31,
    },
    odds: {
      home: 2.10,
      draw: 3.40,
      away: 3.20,
    }
  },
  {
    id: 'mil-int-07',
    sport: 'football',
    league: 'Serie A',
    status: 'upcoming',
    homeTeam: {
      id: 'acm',
      name: 'AC Milan',
      shortName: 'MIL',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
      color: '#FB090B'
    },
    awayTeam: {
      id: 'int',
      name: 'Inter Milan',
      shortName: 'INT',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
      color: '#010E80'
    },
    detailTime: 'Tomorrow • 6:45 PM',
    venue: 'San Siro, Milan',
    hasAudioCommentary: true,
    aiWinProbability: {
      home: 36,
      draw: 32,
      away: 32,
    },
    communityVotes: {
      home: 40,
      draw: 25,
      away: 35,
    },
    odds: {
      home: 2.70,
      draw: 3.10,
      away: 2.65,
    }
  },
  {
    id: 'ind-aus-odi-08',
    sport: 'cricket',
    league: '3rd ODI',
    status: 'upcoming',
    homeTeam: {
      id: 'ind',
      name: 'India',
      shortName: 'IND',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
      color: '#0085CA'
    },
    awayTeam: {
      id: 'aus',
      name: 'Australia',
      shortName: 'AUS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
      color: '#FFCD00'
    },
    detailTime: 'Sun • 2:00 PM',
    venue: 'Sydney Cricket Ground',
    hasAudioCommentary: true,
    aiWinProbability: {
      home: 54,
      away: 46,
    },
    communityVotes: {
      home: 68,
      away: 32,
    },
    odds: {
      home: 1.80,
      away: 2.00,
    }
  }
];

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'u-1',
    name: 'Alex Vance',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    points: 14250,
    winRate: 88.5,
    streak: 12,
    country: 'US',
    badge: '👑 Grand Master'
  },
  {
    rank: 2,
    id: 'u-2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    points: 12890,
    winRate: 84.1,
    streak: 9,
    country: 'UK',
    badge: '⚡ Apex Predictor'
  },
  {
    rank: 3,
    id: 'u-3',
    name: 'Carlos Mendez',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    points: 11400,
    winRate: 81.3,
    streak: 7,
    country: 'ES',
    badge: '🔥 Streak Legend'
  },
  {
    rank: 4,
    id: 'u-4',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    points: 9850,
    winRate: 79.8,
    streak: 6,
    country: 'US'
  },
  {
    rank: 14,
    id: 'usr-101',
    name: 'Hamza Khan (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    points: 4850,
    winRate: 78.4,
    streak: 5,
    country: 'US',
    badge: '💎 Diamond Oracle',
    isCurrentUser: true
  }
];

export const INITIAL_PREDICTIONS: Prediction[] = [
  {
    id: 'pred-1',
    matchId: 'liv-ars-01',
    matchTitle: 'Liverpool vs Arsenal',
    predictionChoice: 'home',
    chosenTeamName: 'Liverpool',
    amountWagered: 250,
    potentialPayout: 362,
    odds: 1.45,
    status: 'pending',
    timestamp: 'Today 19:40'
  },
  {
    id: 'pred-2',
    matchId: 'bos-dal-02',
    matchTitle: 'Celtics vs Mavericks',
    predictionChoice: 'home',
    chosenTeamName: 'Celtics',
    amountWagered: 300,
    potentialPayout: 405,
    odds: 1.35,
    status: 'pending',
    timestamp: 'Today 20:15'
  }
];
