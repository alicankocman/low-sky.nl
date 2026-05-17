'use client';

import { useEffect, useState, useCallback } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { HomeGuidedIntroChat } from '@/components/onboarding/HomeGuidedIntroChat';

const STORAGE_KEY = 'lowsky_leadership_welcome_v1';

type WelcomeState = 'unknown' | 'open' | 'dismissed' | 'completed';

const FAB_BUTTON_CLASS =
  'group flex items-center gap-2.5 border-2 border-sage-300/90 bg-gradient-to-r from-sand-100 to-sand-50 pl-1 pr-3.5 py-1.5 text-ink-900 shadow-[0_18px_40px_-16px_rgba(79,90,73,0.22),0_6px_16px_-8px_rgba(26,26,26,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-sage-500 hover:shadow-[0_22px_44px_-14px_rgba(79,90,73,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50';

export function LeadershipEntryLayer() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('LeadershipLayer');
  const [hydrated, setHydrated] = useState(false);
  const [welcome, setWelcome] = useState<WelcomeState>('unknown');

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'completed') {
        setWelcome('completed');
      } else if (v === 'dismissed') {
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
    setWelcome('completed');
  }, []);

  const openDialogueNow = useCallback(() => {
    completeWelcome();
    router.push('/reflection?start=1');
  }, [completeWelcome, router]);

  const showWelcomeCard = hydrated && pathname === '/' && welcome === 'open';

  const showFab =
    hydrated &&
    !pathname.startsWith('/reflection') &&
    (pathname !== '/' || welcome === 'dismissed' || welcome === 'completed');

  const homeGuidedFab = pathname === '/' && (welcome === 'dismissed' || welcome === 'completed');

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
            className="fixed bottom-5 left-3 right-3 z-40 md:left-auto md:right-10 md:max-w-[min(26rem,calc(100vw-2rem))] pointer-events-auto max-h-[min(90vh,36rem)]"
          >
            <div className="relative flex overflow-hidden max-h-[min(90vh,36rem)] text-ink-900 border-2 border-sage-300/80 bg-gradient-to-br from-sand-100 via-sand-50 to-sage-50/35 backdrop-blur-md shadow-[0_22px_48px_-18px_rgba(79,90,73,0.28),0_10px_28px_-14px_rgba(26,26,26,0.1)]">
              <div
                className="w-1.5 shrink-0 self-stretch bg-gradient-to-b from-sage-500 via-sage-600 to-sage-700"
                aria-hidden
              />

              <div className="min-w-0 flex-1 flex flex-col min-h-0">
                <div className="flex items-start justify-between gap-3 px-5 pt-4 shrink-0">
                  <div className="min-w-0 pr-2">
                    <p className="font-sans text-caption font-semibold uppercase tracking-wider text-sage-800">
                      {t('guidedStart')}
                    </p>
                    <button
                      type="button"
                      onClick={openDialogueNow}
                      className="mt-1.5 text-left font-sans text-body-sm text-sage-800 underline-offset-4 hover:text-sage-950 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 rounded-sm"
                    >
                      {t('openDialogue')}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={dismissWelcome}
                    className="group shrink-0 -mr-1 -mt-1 flex h-9 w-9 items-center justify-center text-ink-600 transition-colors hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50"
                    aria-label={t('dismissAria')}
                  >
                    <span className="relative block h-3 w-3" aria-hidden>
                      <span className="absolute left-1/2 top-1/2 h-px w-[0.875rem] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current transition-transform group-hover:rotate-[40deg]" />
                      <span className="absolute left-1/2 top-1/2 h-px w-[0.875rem] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current transition-transform group-hover:-rotate-[40deg]" />
                    </span>
                  </button>
                </div>

                <div className="px-5 pb-4 min-h-0 flex-1 flex flex-col">
                  <HomeGuidedIntroChat
                    key={locale}
                    onDismiss={dismissWelcome}
                    onBeginReflection={openDialogueNow}
                  />
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
            {homeGuidedFab ? (
              <button
                type="button"
                onClick={() => setWelcome('open')}
                className={FAB_BUTTON_CLASS}
                aria-label={t('fabOpenAria')}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center bg-sage-700 font-serif text-lg font-light leading-none text-sand-50 transition-colors duration-300 group-hover:bg-sage-800"
                  aria-hidden
                >
                  {'\u201C'}
                </span>
                <span className="text-left py-0.5 pr-0.5">
                  <span className="block font-serif text-body-sm font-normal text-ink-950 leading-snug tracking-tight">
                    {t('fabGuidedTitle')}
                  </span>
                  <span className="block font-sans text-caption font-semibold uppercase tracking-wider text-sage-800 mt-0.5">
                    {t('fabGuidedSubtitle')}
                  </span>
                </span>
              </button>
            ) : (
              <Link href="/reflection?start=1" className={FAB_BUTTON_CLASS}>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center bg-sage-700 font-serif text-lg font-light leading-none text-sand-50 transition-colors duration-300 group-hover:bg-sage-800"
                  aria-hidden
                >
                  {'\u201C'}
                </span>
                <span className="text-left py-0.5 pr-0.5">
                  <span className="block font-serif text-body-sm font-normal text-ink-950 leading-snug tracking-tight">
                    {t('fabDialogueTitle')}
                  </span>
                  <span className="block font-sans text-caption font-semibold uppercase tracking-wider text-sage-800 mt-0.5">
                    {t('fabDialogueSubtitle')}
                  </span>
                </span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
