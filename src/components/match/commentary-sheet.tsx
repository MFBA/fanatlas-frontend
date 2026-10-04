'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';
import { Waveform } from '@/components/ui/waveform';
import { LANGUAGES, voicesFor } from '@/data/languages';
import type { LanguageCode } from '@/types';

export function CommentarySheet({
  language,
  voice,
  onApply,
  onClose,
}: {
  language: LanguageCode;
  voice: string;
  onApply: (language: LanguageCode, voice: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink-0/65"
      />

      <div className="relative flex flex-col rounded-t-xl border-t border-line-strong bg-ink-1 pb-6 pt-3 shadow-2">
        <div className="flex justify-center pb-4">
          <span className="h-1 w-9 rounded-full bg-line-strong" />
        </div>

        <div className="flex flex-col gap-1 px-5 pb-4">
          <h2 className="text-h2 text-fg">Commentary</h2>
          <p className="text-body-sm text-fg-muted">Language and voice apply to every match.</p>
        </div>

        <div className="px-5 pb-2.5">
          <span className="micro text-fg-faint">Language</span>
        </div>

        <div className="flex flex-col px-5 pb-5">
          {LANGUAGES.map((entry, index) => {
            const selected = entry.id === language;
            return (
              <div key={entry.id}>
                {index > 0 && <div className="h-px bg-line" />}
                <button
                  type="button"
                  disabled={!entry.shipped}
                  onClick={() => entry.shipped && onApply(entry.id, voicesFor(entry.id)[0].name)}
                  className="flex h-13 w-full items-center gap-3 py-3.5"
                >
                  <span className={clsx('flex-1 text-body', entry.shipped ? 'text-fg' : 'text-fg-faint')}>
                    {entry.name}
                  </span>
                  {entry.shipped ? (
                    <>
                      <span className="micro text-fg-faint">{entry.voices} voices</span>
                      <span
                        className={clsx(
                          'flex size-5 items-center justify-center rounded-full',
                          selected ? 'bg-violet-600' : 'border border-line-strong',
                        )}
                      >
                        {selected && <Check size={12} strokeWidth={3} className="text-white" />}
                      </span>
                    </>
                  ) : (
                    <span className="micro rounded-sm border border-warn/40 px-2 py-1 text-warn">
                      Soon
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-5 pb-2.5">
          <span className="micro text-fg-faint">
            {LANGUAGES.find((entry) => entry.id === language)?.name} voice
          </span>
          <span className="micro text-fg-faint">Tap to preview</span>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 pb-5">
          {voicesFor(language).map((entry) => {
            const selected = entry.name === voice;
            return (
              <button
                key={entry.name}
                type="button"
                onClick={() => onApply(language, entry.name)}
                className={clsx(
                  'flex h-[68px] flex-col justify-between rounded-md p-3',
                  selected
                    ? 'border border-violet-700 bg-violet-900'
                    : 'border border-line bg-ink-2',
                )}
              >
                <span className={clsx('text-body-sm font-medium', selected ? 'text-violet-50' : 'text-fg')}>
                  {entry.name}
                </span>
                <span className="flex items-center justify-between">
                  <span className={clsx('micro', selected ? 'text-violet-300' : 'text-fg-faint')}>
                    {entry.blurb}
                  </span>
                  {selected && <Waveform />}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-5">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-md bg-violet-600 text-label text-white"
          >
            Use {LANGUAGES.find((entry) => entry.id === language)?.name}, {voice}
          </button>
        </div>
      </div>
    </div>
  );
}
