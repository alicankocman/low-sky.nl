'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LocaleSwitcherProps = {
  className?: string;
  /** Slightly smaller control (e.g. footer) */
  compact?: boolean;
  /** Where the dropdown attaches (footer brand column is left-aligned) */
  menuAlign?: 'left' | 'right';
  /** e.g. close mobile drawer after picking a locale */
  onNavigate?: () => void;
};

export function LocaleSwitcher({
  className = '',
  compact = false,
  menuAlign = 'right',
  onNavigate,
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const labelFor = (loc: string) => (loc === 'en' ? t('langEn') : t('langNl'));
  const codeFor = (loc: string) => loc.toUpperCase();

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${t('language')}: ${labelFor(locale)}`}
        className={`
          flex items-center gap-1.5 rounded-md text-ink-600 hover:text-ink-900
          border border-sand-200/90 hover:border-sand-300 bg-white/80 hover:bg-white
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500
          focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50
          ${compact ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-sm'}
        `}
      >
        <GlobeIcon className="shrink-0 text-sage-700 opacity-90" />
        <span className="font-medium tabular-nums tracking-wide">{codeFor(locale)}</span>
        <span className="sr-only">{labelFor(locale)}</span>
        <span className="text-ink-400 text-[0.65rem] leading-none" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('language')}
          className={`absolute top-[calc(100%+6px)] z-[60] min-w-[10rem] py-1 rounded-md border border-sand-200 bg-white shadow-[0_12px_32px_-12px_rgba(26,26,26,0.18)] ${
            menuAlign === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {routing.locales.map((loc) => {
            const active = loc === locale;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <Link
                  href={pathname}
                  locale={loc}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={`
                    flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors
                    ${active ? 'bg-sage-50 text-ink-900 font-medium' : 'text-ink-600 hover:bg-sand-50 hover:text-ink-900'}
                  `}
                >
                  <span>{labelFor(loc)}</span>
                  <span className="text-caption text-ink-400 tabular-nums">{codeFor(loc)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
