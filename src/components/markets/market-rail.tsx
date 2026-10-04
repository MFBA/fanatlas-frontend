'use client';

import clsx from 'clsx';
import { MARKET_LABELS } from '@/data/markets';
import type { MarketId } from '@/types';

/**
 * Navigation inside the card. The active chip is a violet-900 tint, never a
 * solid fill: the solid fill belongs to the outcome the fan has selected, so
 * selection never competes with navigation (DESIGN.md 7.7).
 */
export function MarketRail({
  markets,
  active,
  onSelect,
  counts,
}: {
  markets: MarketId[];
  active: MarketId;
  onSelect: (market: MarketId) => void;
  /** Markets the fan has a live call on get a dot. */
  counts?: Partial<Record<MarketId, boolean>>;
}) {
  return (
    <div role="tablist" aria-label="Market" className="no-scrollbar flex gap-1.5 overflow-x-auto">
      {markets.map((market) => {
        const isActive = market === active;
        return (
          <button
            key={market}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(market)}
            className={clsx(
              'flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium',
              isActive
                ? 'border-violet-700 bg-violet-900 text-violet-200'
                : 'border-line bg-ink-2 text-fg-muted',
            )}
          >
            {MARKET_LABELS[market]}
            {counts?.[market] && <span className="size-1.5 rounded-full bg-violet-400" />}
          </button>
        );
      })}
    </div>
  );
}
