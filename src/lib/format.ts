import type { Match } from '@/types';

/**
 * Mock fixtures carry a display string like "Today • 8:00 PM". The design shows
 * the kickoff as a 24-hour time in mono, with the day as a separate label.
 */
export function parseKickoff(detailTime: string): { day: string; time: string } {
  const [rawDay, rawTime] = detailTime.split('•').map((part) => part.trim());
  if (!rawTime) return { day: '', time: detailTime };

  const match = rawTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { day: rawDay ?? '', time: rawTime };

  const [, hour, minute, meridiem] = match;
  let hours = Number(hour) % 12;
  if (meridiem.toUpperCase() === 'PM') hours += 12;

  return { day: rawDay ?? '', time: `${String(hours).padStart(2, '0')}:${minute}` };
}

const DAY_ORDER = ['today', 'tomorrow'];

/** Sortable kickoff key: day first, then time of day. */
export function kickoffSortKey(detailTime: string): number {
  const { day, time } = parseKickoff(detailTime);
  const dayRank = DAY_ORDER.indexOf(day.toLowerCase());
  const [hours, minutes] = time.split(':').map(Number);
  const minuteOfDay = Number.isFinite(hours) ? hours * 60 + (minutes || 0) : 0;
  return (dayRank === -1 ? DAY_ORDER.length : dayRank) * 1440 + minuteOfDay;
}

const DAY_NAMES: Record<string, string> = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};

/** Group heading for a fixture: "Later today", "Tomorrow", or the weekday. */
export function groupLabel(detailTime: string): string {
  const { day } = parseKickoff(detailTime);
  const key = day.toLowerCase();
  if (key === 'today') return 'Later today';
  if (key === 'tomorrow') return 'Tomorrow';
  return DAY_NAMES[key.slice(0, 3)] ?? day;
}

export function isToday(detailTime: string): boolean {
  return parseKickoff(detailTime).day.toLowerCase() === 'today';
}

/**
 * Which side to render at full strength. Only a two-sided numeric score can be
 * ranked; F1 positions and a one-innings cricket score cannot, so those render
 * without a leader rather than guessing one.
 */
export function scoreEmphasis(match: Match): { home: boolean; away: boolean } {
  const home = Number(match.homeScore);
  const away = Number(match.awayScore);
  if (Number.isFinite(home) && Number.isFinite(away)) {
    return { home: home >= away, away: away > home };
  }
  return { home: match.homeScore !== undefined, away: match.awayScore !== undefined };
}

/** Points between the crowd's call and the model's confidence on the home side. */
export function splitPoints(match: Match): number {
  return Math.abs(match.communityVotes.home - match.aiWinProbability.home);
}

/** A split wide enough to be worth surfacing. Threshold comes from DESIGN.md 6.1. */
export const SPLIT_THRESHOLD = 15;

export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function durationToSeconds(duration: string): number {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + (seconds || 0);
}
