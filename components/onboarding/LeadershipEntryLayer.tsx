'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'lowsky_leadership_welcome_v1';

type WelcomeState = 'unknown' | 'open' | 'dismissed';

export function LeadershipEntryLayer() {
  const pathname = usePathname();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [welcome, setWelcome] = useState<WelcomeState>('unknown');

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'dismissed' || v === 'completed') {
        setWelcome('dismissed');
      } else {
        setWelcome('open');
      }
    } catch {
      setWelcome('open');
    }
    setHydrated(true);
  }, []);

  const dismissWelcome = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'dismissed');
    } catch {
      /* ignore */
    }
    setWelcome('dismissed');
  }, []);

  const completeWelcome = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'completed');
    } catch {
      /* ignore */
    }
    setWelcome('dismissed');
  }, []);

  const showWelcomeCard =
    hydrated && pathname === '/' && welcome === 'open';

  const showFab =
    hydrated &&
    pathname !== '/reflection' &&
    (pathname !== '/' || welcome === 'dismissed');

  return (
    <>
      <AnimatePresence>
        {showWelcomeCard && (
          <motion.div
            role="dialog"
            aria-labelledby="leadership-entry-title"
            aria-describedby="leadership-entry-desc"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-3 right-3 z-40 md:left-auto md:right-10 md:max-w-[min(22rem,calc(100vw-2rem))] pointer-events-auto"
          >
            <div className="relative flex overflow-hidden text-ink-900 border-2 border-sage-300/80 bg-gradient-to-br from-sand-100 via-sand-50 to-sage-50/35 backdrop-blur-md shadow-[0_22px_48px_-18px_rgba(79,90,73,0.28),0_10px_28px_-14px_rgba(26,26,26,0.1)]">
              <div
                className="w-1.5 shrink-0 self-stretch bg-gradient-to-b from-sage-500 via-sage-600 to-sage-700"
                aria-hidden
              />

              <div className="min-w-0 flex-1 px-5 py-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="font-sans text-caption font-semibold uppercase tracking-wider text-sage-800">
                    Guided start
                  </p>
                  <button
                    type="button"
                    onClick={dismissWelcome}
                    className="group shrink-0 -mr-1 -mt-1 flex h-9 w-9 items-center justify-center text-ink-600 transition-colors hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50"
                    aria-label="Dismiss guided start"
                  >
                    <span className="relative block h-3 w-3" aria-hidden>
                      <span className="absolute left-1/2 top-1/2 h-px w-[0.875rem] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current transition-transform group-hover:rotate-[40deg]" />
                      <span className="absolute left-1/2 top-1/2 h-px w-[0.875rem] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current transition-transform group-hover:-rotate-[40deg]" />
                    </span>
                  </button>
                </div>

                <h2
                  id="leadership-entry-title"
                  className="font-serif text-h4 font-light leading-snug tracking-tight text-ink-950 mb-2"
                >
                  A short reflection
                </h2>
                <p
                  id="leadership-entry-desc"
                  className="font-sans text-body-sm text-ink-700 leading-relaxed mb-4"
                >
                  Answer a few open prompts in your own words—about ten quiet
                  minutes. You receive a written reflection, not a score, and an
                  optional program suggestion when you choose to finish.
                </p>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      completeWelcome();
                      router.push('/reflection?start=1');
                    }}
                    className="font-sans w-full py-3 px-4 text-body-sm font-semibold tracking-wide text-sand-50 bg-sage-700 border-2 border-sage-700 shadow-sm shadow-sage-900/15 hover:bg-sage-800 hover:border-sage-800 active:bg-sage-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50"
                  >
                    Open dialogue
                  </button>
                  <button
                    type="button"
                    onClick={dismissWelcome}
                    className="font-sans text-center text-body-sm text-ink-700 hover:text-ink-950 py-2 transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    Explore the site first
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFab && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-3 z-40 md:right-10 pointer-events-auto"
          >
            <Link
              href="/reflection?start=1"
              className="group flex items-center gap-2.5 border-2 border-sage-300/90 bg-gradient-to-r from-sand-100 to-sand-50 pl-1 pr-3.5 py-1.5 text-ink-900 shadow-[0_18px_40px_-16px_rgba(79,90,73,0.22),0_6px_16px_-8px_rgba(26,26,26,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-sage-500 hover:shadow-[0_22px_44px_-14px_rgba(79,90,73,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-sage-700 font-serif text-lg font-light leading-none text-sand-50 transition-colors duration-300 group-hover:bg-sage-800"
                aria-hidden
              >
                {'\u201C'}
              </span>
              <span className="text-left py-0.5 pr-0.5">
                <span className="block font-serif text-body-sm font-normal text-ink-950 leading-snug tracking-tight">
                  Dialogue
                </span>
                <span className="block font-sans text-caption font-semibold uppercase tracking-wider text-sage-800 mt-0.5">
                  Reflective chat
                </span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
