import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

/**
 * A tinted violet-950 surface, not a gradient panel. One ghost action.
 */
export function SplitPromo({ count }: { count: number }) {
  return (
    <section className="mx-5 flex flex-col gap-3 rounded-lg border border-violet-800 bg-violet-950 p-4">
      <h2 className="text-h3 text-violet-100">Where the crowd disagrees with the model</h2>
      <p className="text-body-sm text-violet-300">
        {count === 1
          ? 'One match today where fans and the model disagree.'
          : `${count} matches today where fans and the model disagree.`}
      </p>
      <Link href="/splits" className="mt-0.5 flex items-center gap-1.5 text-label text-violet-200">
        See today&apos;s splits
        <ChevronRight size={14} strokeWidth={2} aria-hidden />
      </Link>
    </section>
  );
}
