'use client';

import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

type ProgramItem = {
  title: string;
  description: string;
  duration: string;
  format: string;
  href: string;
};

export default function ProgramsPage() {
  const t = useTranslations('Programs');
  const items = t.raw('items') as ProgramItem[];

  return (
    <>
      <Hero subtitle={t('heroSubtitle')} title={t('heroTitle')} description={t('heroDescription')} />

      <Section spacing="default">
        <div className="space-y-8 lg:space-y-10">
          {items.map((program, index) => (
            <ProgramCard key={program.title} {...program} delay={index * 0.1} />
          ))}
        </div>
      </Section>

      <Section background="accent" spacing="default" centered>
        <div className="max-w-3xl">
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-4 leading-tight">{t('ctaTitle')}</h2>
          <p className="text-body-lg text-ink-600 mb-8 leading-relaxed">{t('ctaBody')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/reflection?start=1" variant="primary" size="large">
              {t('startReflection')}
            </Button>
            <Button href="/contact" variant="secondary" size="large">
              {t('contactUs')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
