'use client';

import { Pause, Play } from 'lucide-react';
import { useState } from 'react';
import { Waveform } from '@/components/ui/waveform';
import { durationToSeconds, formatClock } from '@/lib/format';
import type { Match } from '@/types';

export function ContinueListening({
  match,
  positionSeconds,
  language,
}: {
  match: Match;
  positionSeconds: number;
  language: string;
}) {
  const [playing, setPlaying] = useState(false);
  const total = durationToSeconds(match.audioDuration ?? '0:00');
  const progress = total > 0 ? Math.min(positionSeconds / total, 1) : 0;

  return (
    <div className="mx-5 flex items-center gap-3.5 rounded-lg border border-line bg-ink-1 p-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-violet-800 bg-violet-950">
        <Waveform playing={playing} size="md" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="truncate text-h3 text-fg">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </h3>
        <span className="micro text-fg-faint">AI commentary &middot; {language}</span>
        <div className="mt-0.5 flex items-center gap-2.5">
          <span
            className="h-0.5 flex-1 rounded-full bg-ink-3"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={positionSeconds}
          >
            <span
              className="block h-0.5 rounded-full bg-violet-500"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
          <span className="num text-num-sm text-fg-faint">{formatClock(positionSeconds)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        aria-label={playing ? 'Pause commentary' : 'Resume commentary'}
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-ink-2 text-fg"
      >
        {playing ? (
          <Pause size={16} fill="currentColor" strokeWidth={0} aria-hidden />
        ) : (
          <Play size={16} fill="currentColor" strokeWidth={0} className="ml-0.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
