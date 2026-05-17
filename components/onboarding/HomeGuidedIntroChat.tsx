'use client';

import { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export type HomeGuidedIntroChatProps = {
  onDismiss: () => void;
  onBeginReflection: () => void;
};

type Line = { role: 'host' | 'guest'; text: string };

type Phase = 'welcome' | 'about_work' | 'invite' | 'done';

type PhaseCopy = Record<
  Exclude<Phase, 'done'>,
  { host: string; choices: { label: string; next: Phase | 'begin' | 'dismiss' }[] }
>;

function buildPhaseCopy(t: ReturnType<typeof useTranslations>): PhaseCopy {
  return {
    welcome: {
      host: t('welcomeHost'),
      choices: [{ label: t('welcomeChoice'), next: 'about_work' }],
    },
    about_work: {
      host: t('aboutHost'),
      choices: [{ label: t('aboutChoice'), next: 'invite' }],
    },
    invite: {
      host: t('inviteHost'),
      choices: [
        { label: t('inviteYes'), next: 'begin' },
        { label: t('inviteNo'), next: 'dismiss' },
      ],
    },
  };
}

export function HomeGuidedIntroChat({ onDismiss, onBeginReflection }: HomeGuidedIntroChatProps) {
  const t = useTranslations('Guided');
  const phaseCopy = useMemo(() => buildPhaseCopy(t), [t]);

  const [lines, setLines] = useState<Line[]>([{ role: 'host', text: phaseCopy.welcome.host }]);
  const [phase, setPhase] = useState<Phase>('welcome');
  const [handoffPending, setHandoffPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container || lines.length === 0) return;

    const align = () => {
      const target = container.querySelector(
        `[data-guided-line="${lines.length - 1}"]`
      ) as HTMLElement | null;
      if (!target) return;
      const cRect = container.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const nextTop = tRect.top - cRect.top + container.scrollTop - 4;
      container.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' });
    };

    const id = requestAnimationFrame(align);
    return () => cancelAnimationFrame(id);
  }, [lines]);

  const choices = phase === 'done' ? [] : phaseCopy[phase].choices;

  const handleChoice = (label: string, next: Phase | 'begin' | 'dismiss') => {
    if (handoffPending) return;
    setLines((prev) => [...prev, { role: 'guest', text: label }]);

    if (next === 'dismiss') {
      window.setTimeout(onDismiss, 200);
      setPhase('done');
      return;
    }

    if (next === 'begin') {
      setHandoffPending(true);
      setPhase('done');
      window.setTimeout(onBeginReflection, 320);
      return;
    }

    const block = phaseCopy[next as Exclude<Phase, 'done'>];
    setPhase(next as Phase);
    setLines((prev) => [...prev, { role: 'host', text: block.host }]);
  };

  return (
    <div className="min-w-0 flex-1 flex flex-col min-h-0 max-h-[min(20rem,45vh)]">
      <h2
        id="leadership-entry-title"
        className="font-serif text-h4 font-light leading-snug tracking-tight text-ink-950 mb-1 shrink-0"
      >
        {t('title')}
      </h2>
      <p id="leadership-entry-desc" className="sr-only">
        {t('srDescription')}
      </p>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2.5 mb-3"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line.role}`}
              data-guided-line={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={`flex ${line.role === 'guest' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={
                  line.role === 'host'
                    ? 'max-w-[96%] rounded-sm border border-sand-200/90 bg-white/90 px-3 py-2 text-body-sm text-ink-800 leading-relaxed'
                    : 'max-w-[96%] rounded-sm bg-sage-700 px-3 py-2 text-body-sm text-sand-50 leading-relaxed'
                }
              >
                {line.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {phase !== 'done' && choices.length > 0 && (
        <div className="space-y-2 shrink-0 pt-1 border-t border-sand-200/70">
          <p className="text-caption font-medium uppercase tracking-wider text-sage-800">{t('yourReply')}</p>
          <div className="flex flex-col gap-2">
            {choices.map((c) => (
              <button
                key={c.label}
                type="button"
                disabled={handoffPending}
                onClick={() => handleChoice(c.label, c.next)}
                className="font-sans w-full text-left py-2.5 px-3 text-body-sm text-ink-900 bg-white border-2 border-sand-200 hover:border-sage-500 hover:bg-sage-50/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 disabled:opacity-50"
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <button
              type="button"
              disabled={handoffPending}
              onClick={() => {
                if (handoffPending) return;
                setHandoffPending(true);
                onBeginReflection();
              }}
              className="font-sans w-full text-center text-body-sm text-sage-800 hover:text-sage-950 py-1.5 underline-offset-4 hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 rounded-sm"
            >
              {t('openDialogue')}
            </button>
            <button
              type="button"
              disabled={handoffPending}
              onClick={onDismiss}
              className="font-sans w-full text-center text-body-sm text-ink-600 hover:text-ink-950 py-1.5 underline-offset-4 hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 rounded-sm"
            >
              {t('exploreFirst')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
