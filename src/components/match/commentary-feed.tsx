import clsx from 'clsx';
import type { LanguageCode, Match } from '@/types';

type Line = NonNullable<Match['commentaryTranscript']>[number];

/** Minute rail (DESIGN.md 6.2): a 1px spine with the minute in the gutter. */
export function CommentaryFeed({
  lines,
  language,
}: {
  lines: Line[];
  /** Only Spanish has a translated mock transcript; the rest fall back to
   *  English rather than rendering an empty line. */
  language: LanguageCode;
}) {
  return (
    <div className="flex flex-col px-5">
      {lines.map((line, index) => {
        const minute = line.timestamp.split(':')[0];
        const last = index === lines.length - 1;
        return (
          <div key={line.id} className="flex gap-3.5">
            <span className="w-[34px] shrink-0 pt-px text-right">
              <span className={clsx('num text-num-sm', index === 0 ? 'text-violet-300' : 'text-fg-faint')}>
                {minute}&apos;
              </span>
            </span>

            <span className="flex w-[9px] shrink-0 flex-col items-center">
              <span
                className={clsx(
                  'mt-[3px] size-[9px] shrink-0 rounded-full',
                  line.isExcited ? 'bg-violet-500' : 'border border-line-strong',
                )}
              />
              {!last && <span className="w-px flex-1 bg-line" />}
            </span>

            <span className={clsx('flex flex-1 flex-col gap-1.5', last ? 'pb-0' : 'pb-5')}>
              <span className={clsx('text-body', index === 0 ? 'text-fg' : 'text-fg-muted')}>
                {language === 'es' && line.textEs ? line.textEs : line.text}
              </span>
              <span className="micro text-fg-faint">{line.speaker}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
