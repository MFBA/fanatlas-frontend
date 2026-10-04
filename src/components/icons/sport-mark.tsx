import type { SportType } from '@/types';

/**
 * Full-colour sport marks (DESIGN.md 5). The one sanctioned exception to the
 * one-accent rule: a mark depicts a real object, so it carries that object's
 * real colours. Everything around it stays violet or neutral, and an inactive
 * chip drops the whole mark's opacity rather than desaturating it to grey, so
 * the sport is still recognisable when it is not selected.
 *
 * Emoji are still banned. These are on the same 24px grid as the rest of the
 * icon set, so they hold the row height and render identically on every OS.
 */

/** Chequered flag, generated so the grid stays even rather than hand-placed. */
function flagChecks() {
  const squares: React.ReactNode[] = [];
  for (let col = 0; col < 6; col += 1) {
    for (let row = 0; row < 4; row += 1) {
      if ((col + row) % 2 === 0) continue;
      squares.push(
        <rect
          key={`${col}-${row}`}
          x={6.6 + col * 2.4}
          y={3.6 + row * 2.4}
          width={2.4}
          height={2.4}
          fill="#16151C"
        />,
      );
    }
  }
  return squares;
}

const MARKS: Record<SportType, React.ReactNode> = {
  football: (
    <>
      <circle cx="12" cy="12" r="9.3" fill="#F2F0F4" />
      <path d="M12 7.05l3.29 2.39-1.26 3.87H9.97L8.71 9.44z" fill="#16151C" />
      <g stroke="#16151C" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 7.05V3.3" />
        <path d="M15.29 9.44l3.55-1.17" />
        <path d="M14.03 13.31l2.2 3.02" />
        <path d="M9.97 13.31l-2.2 3.02" />
        <path d="M8.71 9.44L5.16 8.27" />
      </g>
      <circle cx="12" cy="12" r="9.3" fill="none" stroke="#B8B4C2" strokeWidth="0.7" />
    </>
  ),
  basketball: (
    <>
      <circle cx="12" cy="12" r="9.3" fill="#E2762F" />
      <g stroke="#1A1015" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M2.8 12h18.4" />
        <path d="M12 2.8v18.4" />
        <path d="M5.5 5.5c3.6 3.5 3.6 9.5 0 13" />
        <path d="M18.5 5.5c-3.6 3.5-3.6 9.5 0 13" />
      </g>
    </>
  ),
  cricket: (
    <>
      <path d="M14.6 6.6L19.3 1.9" stroke="#8A6234" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M12.3 8.1L16.2 12l-6.3 6.3a2.75 2.75 0 0 1-3.9-3.9z" fill="#C08A4B" />
      <circle cx="18.4" cy="17.6" r="4.1" fill="#D6423F" />
      <path
        d="M16 14.9c1.6 1.2 2.1 3.6 1.4 5.6"
        stroke="#FBEAEA"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  f1: (
    <>
      <path d="M5 2.6v18.8" stroke="#6E6A7A" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="6.6" y="3.6" width="14.4" height="9.6" fill="#F2F0F4" />
      {flagChecks()}
    </>
  ),
  tennis: (
    <>
      <circle cx="12" cy="12" r="9.3" fill="#D4E14B" />
      <g stroke="#F7F8EC" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M4.3 6.8c3.6 2.4 4.9 7.6 3.1 11.7" />
        <path d="M19.7 6.8c-3.6 2.4-4.9 7.6-3.1 11.7" />
      </g>
    </>
  ),
};

/** Never render above 20px, never as a background fill (DESIGN.md 5). */
export function SportMark({ sport, size = 18 }: { sport: SportType; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0"
      aria-hidden
      focusable="false"
    >
      {MARKS[sport]}
    </svg>
  );
}
