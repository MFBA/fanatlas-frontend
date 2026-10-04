'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { SplitBar } from '@/components/match/split-bar';
import { formatMultiplier } from '@/lib/markets';
import type { TotalsLine, TotalsMarket } from '@/types';

export type TotalsSelection = { line: number; side: 'over' | 'under' };

/**
 * The goal-line ladder (DESIGN.md 7.7.1).
 *
 * One line at 2.5 forces a binary on a market that is really a curve, so the
 * whole range renders and the fan picks where on it they want to be. The header
 * reads off the anchor line only, so a number on screen always belongs to a row
 * the fan can see.
 */
export function TotalsLadder({
  market,
  selection,
  onSelect,
  compact = false,
  readOnly = false,
}: {
  market: TotalsMarket;
  selection: TotalsSelection | null;
  onSelect: (selection: TotalsSelection | null) => void;
  /** List cards show three rows around the anchor behind a Show all row. */
  compact?: boolean;
  /** Past kickoff the ladder is a record of how the match was priced. */
  readOnly?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const anchor = market.lines.find((row) => row.line === market.anchorLine) ?? market.lines[0];
  const collapsed = compact && !expanded;

  const visible = collapsed ? windowAround(market.lines, market.anchorLine, 3) : market.lines;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-2.5">
        <SplitBar
          community={anchor.communityOver}
          model={anchor.modelOver}
          communityLabel={`Fans say over ${anchor.line}`}
          modelLabel="Model confidence"
          labelled={false}
        />
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-body-sm text-violet-300">
            <span className="num">{anchor.communityOver}%</span> of fans say over{' '}
            <span className="num">{anchor.line}</span>
          </span>
          <span className="shrink-0 text-label text-fg-muted">
            Model <span className="num">{anchor.modelOver}%</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {visible.map((row) => (
          <LadderRow
            key={row.line}
            row={row}
            unit={market.unit}
            isAnchor={row.line === market.anchorLine}
            selection={selection}
            onSelect={onSelect}
            readOnly={readOnly}
          />
        ))}

        {collapsed && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex h-9 items-center justify-center rounded-md border border-line text-label text-violet-300"
          >
            Show all {market.lines.length} lines
          </button>
        )}
      </div>
    </div>
  );
}

/** Three rows centred on the anchor, shifted inward at either end of the ladder. */
function windowAround(lines: TotalsLine[], anchorLine: number, size: number): TotalsLine[] {
  const index = lines.findIndex((row) => row.line === anchorLine);
  const start = Math.min(Math.max(0, index - Math.floor(size / 2)), Math.max(0, lines.length - size));
  return lines.slice(start, start + size);
}

function LadderRow({
  row,
  unit,
  isAnchor,
  selection,
  onSelect,
  readOnly,
}: {
  row: TotalsLine;
  unit: string;
  isAnchor: boolean;
  selection: TotalsSelection | null;
  onSelect: (selection: TotalsSelection | null) => void;
  readOnly: boolean;
}) {
  const selectedSide = selection?.line === row.line ? selection.side : null;

  return (
    <div
      className={clsx(
        'relative flex min-h-16 items-center gap-2.5 rounded-md border bg-ink-2 px-3 py-2.5',
        isAnchor ? 'border-violet-800' : 'border-line',
      )}
    >
      {isAnchor && (
        <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-violet-500" aria-hidden />
      )}

      <div className="flex w-14 shrink-0 flex-col gap-0.5">
        {/* A basketball line is 220.5, not 2.5. Mono is fixed-width, so a
            five-character line at num-lg runs straight into the Under button. */}
        <span
          className={clsx(
            'num',
            String(row.line).length > 3 ? 'text-[15px] leading-5' : 'text-num-lg',
            isAnchor ? 'text-violet-300' : 'text-fg',
          )}
        >
          {row.line}
        </span>
        <span className="micro text-fg-faint">{unit}</span>
      </div>

      <CallButton
        side="under"
        line={row.line}
        unit={unit}
        multiplier={row.underMultiplier}
        selected={selectedSide === 'under'}
        onSelect={onSelect}
        readOnly={readOnly}
      />

      <CrowdTrack communityOver={row.communityOver} modelOver={row.modelOver} />

      <CallButton
        side="over"
        line={row.line}
        unit={unit}
        multiplier={row.overMultiplier}
        selected={selectedSide === 'over'}
        onSelect={onSelect}
        readOnly={readOnly}
      />
    </div>
  );
}

/**
 * An indicator, not a control. It carries no drag affordance, no shadow and no
 * pointer cursor: a knob that looks draggable and is not is worse than no knob.
 * The two call buttons either side are what the fan actually taps.
 */
function CrowdTrack({ communityOver, modelOver }: { communityOver: number; modelOver: number }) {
  // The knob is 16px wide, so its centre has to travel between 8px and 8px
  // from either end or a 99% row pushes half of it outside the track.
  const along = (percent: number) => `calc(8px + (100% - 16px) * ${percent / 100})`;

  return (
    <div className="relative flex h-4 flex-1 items-center" aria-hidden>
      <span className="mx-2 h-1 flex-1 rounded-full bg-ink-3" />
      <span
        className="absolute left-2 h-1 rounded-full bg-violet-500"
        style={{ width: `calc((100% - 16px) * ${communityOver / 100})` }}
      />
      <span
        className="absolute h-3.5 w-0.5 -translate-x-1/2 bg-fg"
        style={{ left: along(modelOver) }}
      />
      <span
        className="absolute size-4 -translate-x-1/2 rounded-full border-2 border-ink-2 bg-violet-500"
        style={{ left: along(communityOver) }}
      />
    </div>
  );
}

function CallButton({
  side,
  line,
  unit,
  multiplier,
  selected,
  onSelect,
  readOnly,
}: {
  side: 'over' | 'under';
  line: number;
  unit: string;
  multiplier: number;
  selected: boolean;
  onSelect: (selection: TotalsSelection | null) => void;
  readOnly: boolean;
}) {
  const label = side === 'over' ? 'Over' : 'Under';

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={readOnly}
      // One call per match on this market: tapping another line moves the
      // selection rather than adding to it, so `Submit 2 calls` stays true.
      onClick={() => onSelect(selected ? null : { line, side })}
      className={clsx(
        'flex h-11 w-[76px] shrink-0 flex-col justify-center gap-[3px] rounded-sm border px-2',
        side === 'over' ? 'items-end' : 'items-start',
        selected ? 'border-violet-600 bg-violet-600' : 'border-line',
      )}
    >
      {/* The line is already in its own column at num-lg, and repeating it here
          wraps to two lines the moment a sport runs three-digit totals
          (220.5 points, 300.5 runs). One place, one number. */}
      <span className={clsx('micro', selected ? 'text-violet-50' : 'text-fg-muted')}>{label}</span>
      <span className={clsx('num text-num-md', selected ? 'text-white' : 'text-fg')}>
        {formatMultiplier(multiplier)}
      </span>
      <span className="sr-only">
        {label} {line} {unit.toLowerCase()}
      </span>
    </button>
  );
}
