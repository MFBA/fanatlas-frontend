'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CommentarySheet } from '@/components/match/commentary-sheet';
import { useFan } from '@/components/profile/profile-store';
import { Waveform } from '@/components/ui/waveform';
import { INITIAL_USER } from '@/data/mockData';
import { LANGUAGE_NAMES } from '@/data/languages';
import type { LanguageCode } from '@/types';

/**
 * Preferences live behind the Profile gear, not inline on Profile itself
 * (DESIGN.md 8). Language and voice are not duplicated here: this screen opens
 * the one commentary sheet, which stays the single place they are chosen.
 */
export default function SettingsPage() {
  const { fan, setPreference } = useFan();
  const [language, setLanguage] = useState<LanguageCode>(INITIAL_USER.commentaryLanguage);
  const [voice, setVoice] = useState(INITIAL_USER.commentaryVoice);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <header className="flex shrink-0 items-center gap-3 px-5 pb-4 pt-3">
        <Link href="/profile" aria-label="Back to profile" className="text-fg-muted">
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
        </Link>
        <h1 className="text-h1 text-fg">Preferences</h1>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-5 pb-5">
        <section className="flex flex-col gap-3">
          <h2 className="micro text-fg-faint">Commentary</h2>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-3 rounded-lg border border-line bg-ink-1 p-4"
          >
            <Waveform />
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-body-sm text-fg">
                {LANGUAGE_NAMES[language]} · {voice}
              </span>
              <span className="micro text-fg-faint">Used on every match you open</span>
            </span>
            <ChevronRight size={16} strokeWidth={2} className="text-fg-faint" aria-hidden />
          </button>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="micro text-fg-faint">On this device</h2>
          <div className="flex flex-col rounded-lg border border-line bg-ink-1 px-4">
            <Toggle
              label="Match sound"
              hint="Commentary audio starts when you open a live match."
              checked={fan.soundEnabled}
              onChange={(value) => setPreference('soundEnabled', value)}
            />
            <div className="h-px bg-line" />
            <Toggle
              label="Notifications"
              hint="Calls settling, locks coming up, rank moves."
              checked={fan.notificationsEnabled}
              onChange={(value) => setPreference('notificationsEnabled', value)}
            />
          </div>
          <p className="text-body-sm text-fg-faint">
            Both settings are stored on this device only.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="micro text-fg-faint">Account</h2>
          <div className="flex flex-col rounded-lg border border-line bg-ink-1 p-4">
            <span className="text-body-sm text-fg">{INITIAL_USER.name}</span>
            <span className="micro pt-1 text-fg-faint">{INITIAL_USER.email}</span>
          </div>
        </section>
      </main>

      {sheetOpen && (
        <CommentarySheet
          language={language}
          voice={voice}
          onApply={(nextLanguage, nextVoice) => {
            setLanguage(nextLanguage);
            setVoice(nextVoice);
          }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
}

/** 44px row, 44px hit area, label does the talking. No icon per row. */
function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 py-4"
    >
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-body-sm text-fg">{label}</span>
        <span className="text-body-sm text-fg-faint">{hint}</span>
      </span>
      <span
        className={clsx(
          'flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors',
          checked ? 'bg-violet-600' : 'bg-ink-3',
        )}
      >
        <span
          className={clsx(
            'size-5 rounded-full bg-fg transition-transform',
            checked && 'translate-x-4',
          )}
        />
      </span>
    </button>
  );
}
