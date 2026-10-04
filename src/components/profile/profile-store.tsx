'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_USER, SAVED_HIGHLIGHTS } from '@/data/mockData';
import type { SavedHighlight } from '@/types';

/**
 * Everything the fan owns on their device: picture, favourites, saved
 * highlights, preferences, and which notifications they have seen. Kept beside
 * the calls store and in localStorage for the same reason: there is no backend
 * in this build, and state that resets on navigation reads as a bug.
 *
 * One record rather than a key per field, so a reload cannot restore half a
 * profile.
 */

export type FanState = {
  photo: string | null;
  teams: string[];
  players: string[];
  highlights: SavedHighlight[];
  readNotifications: string[];
  soundEnabled: boolean;
  notificationsEnabled: boolean;
};

const INITIAL: FanState = {
  photo: null,
  teams: INITIAL_USER.favoriteTeams,
  players: INITIAL_USER.favoritePlayers,
  highlights: SAVED_HIGHLIGHTS,
  readNotifications: [],
  soundEnabled: INITIAL_USER.soundEnabled,
  notificationsEnabled: INITIAL_USER.notificationsEnabled,
};

type FanContext = {
  fan: FanState;
  ready: boolean;
  setPhoto: (dataUrl: string | null) => void;
  toggleFavourite: (kind: 'teams' | 'players', name: string) => void;
  setPreference: (key: 'soundEnabled' | 'notificationsEnabled', value: boolean) => void;
  saveHighlight: (highlight: SavedHighlight) => void;
  removeHighlight: (id: string) => void;
  markNotificationsRead: (ids: string[]) => void;
};

const Context = createContext<FanContext | null>(null);
const KEY = 'fanatlas.fan';
const LEGACY_PHOTO_KEY = 'fanatlas.avatar';

export function FanProvider({ children }: { children: React.ReactNode }) {
  const [fan, setFan] = useState<FanState>(INITIAL);
  // Hydrated after mount so stored state cannot mismatch the server render.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored) {
        // Spread over the defaults so a record written by an older build is
        // still readable after a field is added.
        setFan({ ...INITIAL, ...(JSON.parse(stored) as Partial<FanState>) });
      } else {
        const legacyPhoto = window.localStorage.getItem(LEGACY_PHOTO_KEY);
        if (legacyPhoto) setFan({ ...INITIAL, photo: legacyPhoto });
      }
    } catch {
      // A blocked or corrupt store is not worth failing the screen over.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(fan));
      window.localStorage.removeItem(LEGACY_PHOTO_KEY);
    } catch {
      // Private mode, or the quota is full. State still holds for this session.
    }
  }, [fan, ready]);

  const setPhoto = useCallback((photo: string | null) => {
    setFan((current) => ({ ...current, photo }));
  }, []);

  const toggleFavourite = useCallback((kind: 'teams' | 'players', name: string) => {
    setFan((current) => {
      const list = current[kind];
      return {
        ...current,
        [kind]: list.includes(name) ? list.filter((entry) => entry !== name) : [...list, name],
      };
    });
  }, []);

  const setPreference = useCallback(
    (key: 'soundEnabled' | 'notificationsEnabled', value: boolean) => {
      setFan((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  /** At the cap the oldest save clears first, which is the rule the Profile
   *  card states in words. Never an error after the fact (DESIGN.md 8). */
  const saveHighlight = useCallback((highlight: SavedHighlight) => {
    setFan((current) => {
      if (current.highlights.some((entry) => entry.id === highlight.id)) return current;
      const next = [highlight, ...current.highlights];
      return { ...current, highlights: next.slice(0, INITIAL_USER.highlightCap) };
    });
  }, []);

  const removeHighlight = useCallback((id: string) => {
    setFan((current) => ({
      ...current,
      highlights: current.highlights.filter((entry) => entry.id !== id),
    }));
  }, []);

  const markNotificationsRead = useCallback((ids: string[]) => {
    setFan((current) => ({
      ...current,
      readNotifications: [...new Set([...current.readNotifications, ...ids])],
    }));
  }, []);

  const value = useMemo(
    () => ({
      fan,
      ready,
      setPhoto,
      toggleFavourite,
      setPreference,
      saveHighlight,
      removeHighlight,
      markNotificationsRead,
    }),
    [
      fan,
      ready,
      setPhoto,
      toggleFavourite,
      setPreference,
      saveHighlight,
      removeHighlight,
      markNotificationsRead,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFan(): FanContext {
  const context = useContext(Context);
  if (!context) throw new Error('useFan must be used inside FanProvider');
  return context;
}
