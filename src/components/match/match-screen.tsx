'use client';

import { ChevronDown, ChevronLeft, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AudioBar } from '@/components/match/audio-bar';
import { MarketsPanel } from '@/components/markets/markets-panel';
import { CommentaryFeed } from '@/components/match/commentary-feed';
import { CommentarySheet } from '@/components/match/commentary-sheet';
import { MoreSheet } from '@/components/match/more-sheet';
import { Scoreboard } from '@/components/match/scoreboard';
import { SplitBar } from '@/components/match/split-bar';
import { StatsPanel } from '@/components/match/stats-panel';
import { TabRow, type MatchTab } from '@/components/match/tab-row';
import { SPLIT_THRESHOLD } from '@/lib/format';
import type { LanguageCode, Match } from '@/types';

export function MatchScreen({ match }: { match: Match }) {
  const router = useRouter();
  const [tab, setTab] = useState<MatchTab>('commentary');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [voice, setVoice] = useState('Terrace');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const lines = match.commentaryTranscript ?? [];
  const tabs: { id: MatchTab; label: string }[] = [
    ...(lines.length > 0 ? [{ id: 'commentary' as const, label: 'Commentary' }] : []),
    { id: 'markets' as const, label: 'Markets' },
    ...(match.stats ? [{ id: 'stats' as const, label: 'Stats' }] : []),
  ];
  const activeTab = tabs.some((entry) => entry.id === tab) ? tab : tabs[0]?.id;

  const community = match.communityVotes.home;
  const model = match.aiWinProbability.home;
  const gap = Math.abs(community - model);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="text-fg-muted"
        >
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
        </button>
        <span className="micro text-fg-muted">{match.league}</span>
        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          aria-label="More"
          className="text-fg-muted"
        >
          <MoreVertical size={20} strokeWidth={1.75} aria-hidden />
        </button>
      </header>

      <Scoreboard match={match} />

      {tabs.length > 1 && <TabRow tabs={tabs} active={activeTab!} onSelect={setTab} />}

      <main className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto py-5">
        {activeTab === 'commentary' && (
          <>
            <section className="mx-5 flex flex-col gap-3.5 rounded-lg border border-line bg-ink-1 p-4">
              <div className="flex items-center justify-between">
                <span className="micro text-fg-faint">Community vs model</span>
                {gap > SPLIT_THRESHOLD && (
                  <span className="micro text-warn">Split {gap} pts</span>
                )}
              </div>
              <SplitBar
                community={community}
                model={model}
                communityLabel={`Fans back ${match.homeTeam.name}`}
                modelLabel="Model confidence"
              />
            </section>

            <section className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between px-5">
                <span className="micro text-fg-faint">Live commentary</span>
                <button
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  className="flex h-6.5 items-center gap-2 rounded-full border border-line bg-ink-2 pl-3 pr-2.5"
                >
                  <span className="text-[11px] font-medium text-fg">
                    {language === 'en' ? 'English' : 'Español'}
                  </span>
                  <span className="h-3 w-px bg-line" />
                  <span className="text-[11px] font-medium text-fg-muted">{voice}</span>
                  <ChevronDown size={12} strokeWidth={2.2} className="text-fg-faint" aria-hidden />
                </button>
              </div>
              <CommentaryFeed lines={lines} language={language} />
            </section>
          </>
        )}

        {activeTab === 'markets' && (
          <section className="mx-5 flex flex-col gap-3.5">
            {/* The full ladder lives here. The Predict list only ever shows the
                compact one, so the fan has one place to see every line. */}
            <MarketsPanel match={match} compact={false} />
            {match.status !== 'upcoming' && (
              <p className="text-body-sm text-fg-muted">
                Calls locked at kickoff. These lines are how the match was priced.
              </p>
            )}
          </section>
        )}

        {activeTab === 'stats' && match.stats && <StatsPanel stats={match.stats} />}

        {!activeTab && (
          <p className="px-5 text-body-sm text-fg-muted">
            Commentary starts when the match kicks off.
          </p>
        )}
      </main>

      {match.hasAudioCommentary && match.status === 'live' && (
        <AudioBar clock={lines[0]?.timestamp ?? match.detailTime} />
      )}

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

      {moreOpen && (
        <MoreSheet
          match={match}
          language={language}
          voice={voice}
          onOpenCommentary={() => setSheetOpen(true)}
          onClose={() => setMoreOpen(false)}
        />
      )}
    </>
  );
}
