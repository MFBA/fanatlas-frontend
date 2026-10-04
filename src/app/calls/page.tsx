'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useCalls } from '@/components/markets/calls-store';
import { EmptyState } from '@/components/home/empty-state';
import type { Prediction } from '@/types';

type Scope = 'open' | 'settled';

/**
 * Where a submitted call actually goes. Without this screen a fan can commit
 * points and never see them settle, which is the one thing the product is
 * keeping score of.
 */
export default function CallsPage() {
  const [scope, setScope] = useState<Scope>('open');
  const { submitted, ready } = useCalls();

  const open = submitted.filter((call) => call.status === 'pending' || call.status === 'locked');
  const settled = submitted.filter((call) => call.status === 'won' || call.status === 'lost');
  const rows = scope === 'open' ? open : settled;

  const committed = open.reduce((sum, call) => sum + call.pointsCommitted, 0);
  const won = settled.filter((call) => call.status === 'won');
  const points = won.reduce((sum, call) => sum + call.pointsAtStake, 0);

  return (
    <>
      <header className="flex shrink-0 flex-col gap-3.5 px-5 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" aria-label="Back to profile" className="text-fg-muted">
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
          </Link>
          <h1 className="text-h1 text-fg">Your calls</h1>
        </div>

        <div className="flex h-9 rounded-full border border-line bg-ink-2 p-0.5">
          {(['open', 'settled'] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={scope === id}
              onClick={() => setScope(id)}
              className={clsx(
                'flex flex-1 items-center justify-center rounded-full text-label capitalize',
                scope === id ? 'bg-violet-600 text-white' : 'text-fg-muted',
              )}
            >
              {id} <span className="num pl-1.5">{id === 'open' ? open.length : settled.length}</span>
            </button>
          ))}
        </div>

        {/* One honest summary line per scope. Points, never money (DESIGN.md 10). */}
        <p className="text-body-sm text-fg-muted">
          {scope === 'open' ? (
            <>
              <span className="num">{committed.toLocaleString('en-GB')}</span> points committed and
              waiting
            </>
          ) : (
            <>
              <span className="num">{won.length}</span> of{' '}
              <span className="num">{settled.length}</span> landed ·{' '}
              <span className="num text-win">{points.toLocaleString('en-GB')}</span> points returned
            </>
          )}
        </p>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto pb-5">
        {ready && rows.length === 0 ? (
          <EmptyState
            message={
              scope === 'open'
                ? 'No calls waiting. Markets stay open until kickoff.'
                : 'Nothing settled yet. Calls move here once the match finishes.'
            }
            action="Open Predict"
            href="/predict"
          />
        ) : (
          rows.map((call) => <CallRow key={call.id} call={call} />)
        )}
      </main>
    </>
  );
}

const STATUS: Record<Prediction['status'], { label: string; className: string }> = {
  pending: { label: 'Open', className: 'border-line text-fg-muted' },
  locked: { label: 'Locked', className: 'border-warn/40 text-warn' },
  won: { label: 'Landed', className: 'border-win/40 text-win' },
  lost: { label: 'Missed', className: 'border-line text-fg-faint' },
};

function CallRow({ call }: { call: Prediction }) {
  const status = STATUS[call.status];

  return (
    <Link
      href={`/match/${call.matchId}`}
      className="flex items-center gap-3 border-b border-line px-5 py-3.5"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-body-sm text-fg">{call.label}</span>
        <span className="micro truncate text-fg-faint">
          {call.matchTitle} · {call.timestamp}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1">
        <span className={clsx('micro rounded-sm border px-2 py-1', status.className)}>
          {status.label}
        </span>
        {/* An open call shows what it is reaching for. A settled one shows what
            actually came back, because `120 → 252` on a miss reads as a payout
            the fan never got. */}
        {call.status === 'won' ? (
          <span className="num text-num-sm text-win">+{call.pointsAtStake}</span>
        ) : call.status === 'lost' ? (
          <span className="num text-num-sm text-fg-faint">0 of {call.pointsCommitted}</span>
        ) : (
          <span className="num text-num-sm text-fg-muted">
            {call.pointsCommitted} → {call.pointsAtStake}
          </span>
        )}
      </span>
    </Link>
  );
}
