'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { SPORTS } from '@/data/home';
import { SportMark } from '@/components/icons/sport-mark';
import type { SportType } from '@/types';

/**
 * The active chip is not enlarged: a size change on selection shifts the row.
 */
export function SportRail({
  selected,
  onSelect,
}: {
  selected: SportType;
  onSelect: (sport: SportType) => void;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);

  // Keep the chosen sport on screen when it sits past the edge of the rail.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  }, [selected]);

  return (
    <div
      role="tablist"
      aria-label="Sport"
      className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5"
    >
      {SPORTS.map(({ id, label }) => {
        const isActive = id === selected;
        return (
          <button
            key={id}
            ref={isActive ? activeRef : undefined}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className={clsx(
              'flex h-9 shrink-0 items-center gap-2 rounded-full pl-3 pr-3.5 text-label',
              isActive
                ? 'bg-violet-600 text-white'
                : 'border border-line bg-ink-2 text-fg-muted',
            )}
          >
            <span className={isActive ? undefined : 'opacity-[0.55]'}>
              <SportMark sport={id} size={18} />
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
