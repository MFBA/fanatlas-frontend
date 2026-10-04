import type { Match } from '@/types';

const ROWS: { key: keyof NonNullable<Match['stats']>; label: string; suffix?: string }[] = [
  { key: 'possession', label: 'Possession', suffix: '%' },
  { key: 'shotsOnTarget', label: 'Shots on target' },
  { key: 'corners', label: 'Corners' },
  { key: 'fouls', label: 'Fouls' },
];

export function StatsPanel({ stats }: { stats: NonNullable<Match['stats']> }) {
  return (
    <div className="flex flex-col gap-5 px-5">
      {ROWS.map(({ key, label, suffix }) => {
        const pair = stats[key];
        if (!pair) return null;
        const [home, away] = pair;
        const total = home + away || 1;

        return (
          <div key={key} className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="num text-num-md text-fg">
                {home}
                {suffix}
              </span>
              <span className="micro text-fg-faint">{label}</span>
              <span className="num text-num-md text-fg-muted">
                {away}
                {suffix}
              </span>
            </div>
            <div className="flex h-1.5 gap-1">
              <span className="flex justify-end" style={{ width: `${(home / total) * 100}%` }}>
                <span className="block h-1.5 w-full rounded-full bg-violet-500" />
              </span>
              <span className="flex" style={{ width: `${(away / total) * 100}%` }}>
                <span className="block h-1.5 w-full rounded-full bg-ink-3" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
