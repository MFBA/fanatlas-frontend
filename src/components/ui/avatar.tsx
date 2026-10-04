'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

/**
 * One avatar for every person in the product: fan, player, leaderboard row.
 *
 * An uploaded picture wins. With no picture the fallback is the person's
 * initials on a flat identity tint picked from their name (DESIGN.md 5, v1.2),
 * never a grey disc, because a list of grey discs gives a fan nothing to
 * recognise their own row by. Team crests are not avatars and keep the mono
 * short-name fallback.
 */

export function initials(name: string, max = 2) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const letters = parts.length === 1 ? [parts[0][0], parts[0][1]] : parts.map((part) => part[0]);
  return letters.filter(Boolean).slice(0, max).join('').toUpperCase();
}

/** Nine tints at one lightness, so a list of avatars still reads as one family. */
const TINTS = [
  { bg: 'bg-id-violet', fg: 'text-id-violet-fg' },
  { bg: 'bg-id-indigo', fg: 'text-id-indigo-fg' },
  { bg: 'bg-id-azure', fg: 'text-id-azure-fg' },
  { bg: 'bg-id-teal', fg: 'text-id-teal-fg' },
  { bg: 'bg-id-green', fg: 'text-id-green-fg' },
  { bg: 'bg-id-amber', fg: 'text-id-amber-fg' },
  { bg: 'bg-id-rust', fg: 'text-id-rust-fg' },
  { bg: 'bg-id-rose', fg: 'text-id-rose-fg' },
  { bg: 'bg-id-plum', fg: 'text-id-plum-fg' },
] as const;

const TONES = {
  neutral: { bg: 'bg-ink-3', fg: 'text-fg-muted' },
  violet: { bg: 'bg-violet-900', fg: 'text-violet-200' },
} as const;

export type AvatarTone = 'identity' | keyof typeof TONES;

/** Same name, same colour, on every screen and every reload. */
export function tintFor(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return TINTS[hash % TINTS.length];
}

export function Avatar({
  name,
  src,
  size = 32,
  label,
  tone = 'identity',
  className,
}: {
  name: string;
  src?: string | null;
  size?: number;
  /** Overrides the initials, for outcomes that are not people (`0-0`). */
  label?: string;
  tone?: AvatarTone;
  className?: string;
}) {
  // A broken or expired image URL falls back rather than leaving a hole.
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  const showImage = Boolean(src) && !failed;
  const palette = tone === 'identity' ? tintFor(name) : TONES[tone];

  return (
    <span
      style={{ width: size, height: size }}
      className={clsx(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        showImage ? 'bg-ink-3' : palette.bg,
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatars are 32px
        // and one of them is a local data URL, so the optimiser has nothing to do.
        <img
          src={src as string}
          alt=""
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={clsx('num leading-none', palette.fg)}
          style={{ fontSize: Math.max(9, Math.round(size * 0.34)) }}
        >
          {label ?? initials(name)}
        </span>
      )}
    </span>
  );
}
