import clsx from 'clsx';

const HEIGHTS = {
  sm: [5, 11, 7, 12, 4],
  md: [8, 17, 11, 19, 7],
} as const;

/**
 * The AI commentary mark. Bars animate only while audio is actually playing;
 * the resting state is a flat set at low opacity (DESIGN.md 6.3).
 */
export function Waveform({
  playing = false,
  size = 'sm',
  className,
}: {
  playing?: boolean;
  size?: keyof typeof HEIGHTS;
  className?: string;
}) {
  return (
    <span
      className={clsx('flex items-end gap-[2px]', className)}
      style={{ height: Math.max(...HEIGHTS[size]) }}
      aria-hidden
    >
      {HEIGHTS[size].map((height, index) => (
        <span
          key={index}
          className={clsx(
            'w-[2px] origin-bottom rounded-[1px] bg-violet-400',
            playing ? 'animate-wave-bar' : 'opacity-30',
          )}
          style={{
            height,
            animationDelay: playing ? `${index * 110}ms` : undefined,
          }}
        />
      ))}
    </span>
  );
}
