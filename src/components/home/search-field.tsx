'use client';

import { Search } from 'lucide-react';

export function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="shrink-0 px-5">
      <label className="flex h-11 items-center gap-2.5 rounded-md border border-line bg-ink-1 px-3.5">
        <Search size={16} strokeWidth={1.75} className="shrink-0 text-fg-faint" aria-hidden />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search teams, leagues, players"
          aria-label="Search teams, leagues, players"
          className="w-full bg-transparent text-body-sm text-fg placeholder:text-fg-faint focus:outline-none"
        />
      </label>
    </div>
  );
}
