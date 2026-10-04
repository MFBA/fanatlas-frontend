import type { LanguageCode } from '@/types';

/**
 * Four languages in shipping order, gated ones listed rather than hidden:
 * expansion markets are gated on exactly these shipping, so a fan in one
 * should be able to see the language exists (DESIGN.md 7.6).
 *
 * Names render in their own language with correct diacritics. Never flags, and
 * never a two-letter code as the primary label.
 */
export const LANGUAGES: { id: LanguageCode; name: string; voices: number; shipped: boolean }[] = [
  { id: 'en', name: 'English', voices: 4, shipped: true },
  { id: 'es', name: 'Español', voices: 3, shipped: true },
  { id: 'pt', name: 'Português', voices: 0, shipped: false },
  { id: 'fr', name: 'Français', voices: 0, shipped: false },
];

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
};

/** Personas are named for register, never for a nationality or an accent. */
export const VOICES: Partial<Record<LanguageCode, { name: string; blurb: string }[]>> = {
  en: [
    { name: 'Terrace', blurb: 'UK matchday' },
    { name: 'Broadcast', blurb: 'US network' },
    { name: 'Lagos', blurb: 'West African' },
    { name: 'Analyst', blurb: 'Measured, tactical' },
  ],
  es: [
    { name: 'Clásico', blurb: 'Spain, matchday' },
    { name: 'Norte', blurb: 'Liga MX' },
    { name: 'Analista', blurb: 'Measured, tactical' },
  ],
};

export function voicesFor(language: LanguageCode) {
  return VOICES[language] ?? [];
}
