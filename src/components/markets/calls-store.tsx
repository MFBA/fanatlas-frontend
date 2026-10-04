'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_PREDICTIONS } from '@/data/mockData';
import type { Call, MarketId, Prediction } from '@/types';

/**
 * Open calls a fan has made but not submitted, keyed by match then market. One
 * call per market per match, which is what makes `Submit 3 calls` a true count
 * rather than a guess.
 *
 * Kept in localStorage so a call survives navigating to the match screen and
 * back. There is no backend in this build, and a selection that silently
 * disappears on navigation reads as a bug in a demo.
 */
export type OpenCalls = Record<string, Partial<Record<MarketId, Call>>>;

type CallsContext = {
  open: OpenCalls;
  submitted: Prediction[];
  setCall: (matchId: string, market: MarketId, call: Call | null) => void;
  callCount: number;
  submit: (describe: (matchId: string, call: Call) => Omit<Prediction, 'id' | 'timestamp'>) => void;
  ready: boolean;
};

const Context = createContext<CallsContext | null>(null);
const OPEN_KEY = 'fanatlas.open-calls';
const SUBMITTED_KEY = 'fanatlas.submitted-calls';

export function CallsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<OpenCalls>({});
  const [submitted, setSubmitted] = useState<Prediction[]>(INITIAL_PREDICTIONS);
  // Rendered empty on the server and hydrated after mount, so stored calls
  // never cause a hydration mismatch.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedOpen = window.localStorage.getItem(OPEN_KEY);
      if (storedOpen) setOpen(JSON.parse(storedOpen) as OpenCalls);

      // A submitted call has to survive a reload too, or Profile's call count
      // silently rolls back to the seed the moment the fan refreshes.
      const storedSubmitted = window.localStorage.getItem(SUBMITTED_KEY);
      if (storedSubmitted) setSubmitted(JSON.parse(storedSubmitted) as Prediction[]);
    } catch {
      // A blocked or corrupt store is not worth failing the screen over.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(OPEN_KEY, JSON.stringify(open));
      window.localStorage.setItem(SUBMITTED_KEY, JSON.stringify(submitted));
    } catch {
      // Private mode. The calls still work for this session.
    }
  }, [open, submitted, ready]);

  const setCall = useCallback((matchId: string, market: MarketId, call: Call | null) => {
    setOpen((current) => {
      const forMatch = { ...(current[matchId] ?? {}) };
      if (call) forMatch[market] = call;
      else delete forMatch[market];

      const next = { ...current };
      if (Object.keys(forMatch).length > 0) next[matchId] = forMatch;
      else delete next[matchId];
      return next;
    });
  }, []);

  const callCount = useMemo(
    () => Object.values(open).reduce((sum, markets) => sum + Object.keys(markets).length, 0),
    [open],
  );

  const submit = useCallback<CallsContext['submit']>(
    (describe) => {
      setOpen((current) => {
        const entries = Object.entries(current).flatMap(([matchId, markets]) =>
          Object.values(markets).map((call) => ({ matchId, call: call as Call })),
        );
        if (entries.length > 0) {
          const stamped = entries.map(({ matchId, call }, index) => ({
            ...describe(matchId, call),
            id: `call-${Date.now()}-${index}`,
            timestamp: 'Just now',
          }));
          setSubmitted((previous) => [...stamped, ...previous]);
        }
        return {};
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ open, submitted, setCall, callCount, submit, ready }),
    [open, submitted, setCall, callCount, submit, ready],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCalls(): CallsContext {
  const context = useContext(Context);
  if (!context) throw new Error('useCalls must be used inside CallsProvider');
  return context;
}
