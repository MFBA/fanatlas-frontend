import type { SportType } from '@/types';

/** Where the fan left the commentary feed. Position is seconds into the audio. */
export const CONTINUE_LISTENING = {
  matchId: 'ars-che-05',
  positionSeconds: 754,
  language: 'EN',
  voice: 'Terrace',
};

export const SPORTS: { id: SportType; label: string }[] = [
  { id: 'football', label: 'Football' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'f1', label: 'F1' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'tennis', label: 'Tennis' },
];
