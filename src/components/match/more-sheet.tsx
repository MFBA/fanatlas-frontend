'use client';

import { Bookmark, Share2, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { useFan } from '@/components/profile/profile-store';
import { INITIAL_USER } from '@/data/mockData';
import type { LanguageCode, Match } from '@/types';

/**
 * The match overflow. Three actions, all of which work without a backend:
 * saving a moment writes to the fan's own store, sharing uses the platform
 * sheet, and commentary hands straight to the sheet that already owns language
 * and voice.
 */
export function MoreSheet({
  match,
  language,
  voice,
  onOpenCommentary,
  onClose,
}: {
  match: Match;
  language: LanguageCode;
  voice: string;
  onOpenCommentary: () => void;
  onClose: () => void;
}) {
  const { fan, saveHighlight } = useFan();
  const [note, setNote] = useState<string | null>(null);

  const cap = INITIAL_USER.highlightCap;
  const atCap = fan.highlights.length >= cap;
  const lines = match.commentaryTranscript ?? [];
  const latest = lines[lines.length - 1];

  function handleSave() {
    saveHighlight({
      id: `hl-${match.id}-${Date.now()}`,
      matchId: match.id,
      title: latest?.text.slice(0, 48) ?? `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      language,
      voice,
      duration: '0:30',
    });
    setNote(
      atCap
        ? `Saved. You were at ${cap}, so the oldest save cleared.`
        : 'Saved to your moments.',
    );
  }

  async function handleShare() {
    const url = typeof window === 'undefined' ? '' : window.location.href;
    const title = `${match.homeTeam.name} vs ${match.awayTeam.name}`;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setNote('Link copied.');
    } catch {
      // A dismissed share sheet is not an error worth reporting.
    }
  }

  return (
    <Sheet title="Match options" subtitle={match.league} onClose={onClose}>
      <div className="flex flex-col px-5">
        <Action
          icon={<Bookmark size={18} strokeWidth={1.75} aria-hidden />}
          label="Save this moment"
          hint={`${fan.highlights.length} of ${cap} saved`}
          onClick={handleSave}
        />
        <div className="h-px bg-line" />
        <Action
          icon={<SlidersHorizontal size={18} strokeWidth={1.75} aria-hidden />}
          label="Commentary"
          hint="Language and voice"
          onClick={() => {
            onClose();
            onOpenCommentary();
          }}
        />
        <div className="h-px bg-line" />
        <Action
          icon={<Share2 size={18} strokeWidth={1.75} aria-hidden />}
          label="Share match"
          hint="Send the link"
          onClick={handleShare}
        />

        {note && <p className="pt-3 text-body-sm text-violet-300">{note}</p>}
      </div>
    </Sheet>
  );
}

function Action({
  icon,
  label,
  hint,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-3 py-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-2 text-fg-muted">
        {icon}
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-body text-fg">{label}</span>
        <span className="text-body-sm text-fg-faint">{hint}</span>
      </span>
    </button>
  );
}
