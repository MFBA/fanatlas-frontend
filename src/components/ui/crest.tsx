'use client';

import clsx from 'clsx';
import { useState } from 'react';
import type { Team } from '@/types';

/**
 * Real crest where the fixture has a working one, falling back to the mono
 * short name on an ink-2 disc. The fallback is load-bearing: crest URLs are
 * external and some fixtures have none that resolve.
 */
export function Crest({ team, size = 28 }: { team: Team; size?: number }) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(team.logo) && !failed;

  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-ink-2"
      style={{ width: size, height: size }}
      title={team.name}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={team.logo}
          alt=""
          aria-hidden
          loading="lazy"
          onError={() => setFailed(true)}
          className="object-contain"
          style={{ width: size * 0.68, height: size * 0.68 }}
        />
      ) : (
        <span className={clsx('num text-fg-muted', size <= 24 ? 'text-[8px]' : 'text-[9px]')}>
          {team.shortName}
        </span>
      )}
    </span>
  );
}

/** Two crests side by side. Never overlapped: it clips the short-name fallback. */
export function CrestPair({ home, away, size = 24 }: { home: Team; away: Team; size?: number }) {
  return (
    <span className="flex shrink-0 gap-1">
      <Crest team={home} size={size} />
      <Crest team={away} size={size} />
    </span>
  );
}
