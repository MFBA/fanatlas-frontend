'use client';

import clsx from 'clsx';

export type MatchTab = 'commentary' | 'markets' | 'stats';

/** Only tabs with something behind them are shown. */
export function TabRow({
  tabs,
  active,
  onSelect,
}: {
  tabs: { id: MatchTab; label: string }[];
  active: MatchTab;
  onSelect: (tab: MatchTab) => void;
}) {
  return (
    <div role="tablist" className="flex shrink-0 gap-6 border-b border-line px-5">
      {tabs.map(({ id, label }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className={clsx(
              '-mb-px pb-3 text-label',
              isActive ? 'border-b-2 border-violet-500 text-fg' : 'text-fg-faint',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
