'use client';

import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

const BARS = [6, 13, 9, 14, 5, 11, 7, 12, 4, 10, 6, 12, 8, 5];

export function AudioBar({ clock }: { clock: string }) {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="flex h-19 shrink-0 items-center gap-3.5 border-t border-line-strong bg-ink-1 px-5 py-4">
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        aria-label={playing ? 'Pause commentary' : 'Play commentary'}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white"
      >
        {playing ? (
          <Pause size={16} fill="currentColor" strokeWidth={0} aria-hidden />
        ) : (
          <Play size={16} fill="currentColor" strokeWidth={0} className="ml-0.5" aria-hidden />
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-body-sm text-fg">AI commentary, live</span>
          <span className="num text-num-sm text-fg-faint">{clock}</span>
        </div>
        <div className="flex h-3.5 items-end gap-[2px]" aria-hidden>
          {BARS.map((height, index) => (
            <span
              key={index}
              className={
                playing
                  ? 'w-[2px] origin-bottom animate-wave-bar rounded-[1px] bg-violet-400'
                  : 'w-[2px] rounded-[1px] bg-violet-800'
              }
              style={{ height, animationDelay: playing ? `${index * 70}ms` : undefined }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
