import { SPLIT_THRESHOLD } from '@/lib/format';

/**
 * The signature graphic (DESIGN.md 6.1). Violet fill is the crowd, the white
 * tick is the model. Hatching means one thing only: they disagree by more than
 * the threshold.
 */
export function SplitBar({
  community,
  model,
  communityLabel,
  modelLabel,
  labelled = true,
}: {
  community: number;
  model: number;
  communityLabel: string;
  modelLabel: string;
  /** The totals ladder writes its own caption, so it takes the bar bare. */
  labelled?: boolean;
}) {
  const gap = Math.abs(community - model);
  const disagrees = gap > SPLIT_THRESHOLD;
  const hatchLeft = Math.min(community, model);

  return (
    <div className="flex flex-col gap-3.5">
      <div
        className="relative h-2 rounded-full bg-ink-3"
        role="img"
        aria-label={`${communityLabel}: ${community} percent. ${modelLabel}: ${model} percent.`}
      >
        <span
          className="absolute left-0 top-0 h-2 rounded-full bg-violet-500"
          style={{ width: `${community}%` }}
        />
        {disagrees && (
          <span
            className="absolute top-0 h-2"
            style={{
              left: `${hatchLeft}%`,
              width: `${gap}%`,
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(245,244,247,0.28) 0 2px, rgba(0,0,0,0) 2px 6px)',
            }}
          />
        )}
        <span
          className="absolute -top-[3px] h-3.5 w-0.5 bg-fg"
          style={{ left: `${model}%` }}
          aria-hidden
        />
      </div>

      {labelled && (
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[3px]">
          <span className="num text-num-md text-violet-300">{community}%</span>
          <span className="micro text-fg-faint">{communityLabel}</span>
        </div>
        <div className="flex flex-col items-end gap-[3px]">
          <span className="num text-num-md text-fg">{model}%</span>
          <span className="micro text-fg-faint">{modelLabel}</span>
        </div>
      </div>
      )}
    </div>
  );
}
