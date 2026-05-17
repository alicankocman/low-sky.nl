'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTranslations, useLocale } from 'next-intl';

export default function ReflectionPage() {
  const t = useTranslations('Reflection');
  const router = useRouter();
  const locale = useLocale();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('start') === '1') {
      setHasStarted(true);
      router.replace('/reflection');
    }
  }, [router]);

  if (hasStarted) {
    return <ChatInterface key={locale} onReset={() => setHasStarted(false)} />;
  }

  return (
    <>
      <Hero subtitle={t('heroSubtitle')} title={t('heroTitle')} description={t('heroDescription')} centered />

      <Section spacing="default">
        <div className="max-w-3xl mx-auto">
          <Card>
            <h3 className="text-h3 font-serif text-ink-950 mb-4">{t('howTitle')}</h3>

            <div className="space-y-4 text-body text-ink-600 mb-8">
              <p>{t('howP1')}</p>
              <p>{t('howP2')}</p>
              <p>
                {t('howP3Before')}
                <strong className="text-ink-800">{t('howP3Strong')}</strong>
                {t('howP3After')}
              </p>

              <div className="bg-sage-50 border-2 border-sage-200 p-6 mt-6">
                <h4 className="text-h4 font-serif text-ink-950 mb-3">{t('privacyTitle')}</h4>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">{t('privacy1')}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">{t('privacy2')}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">{t('privacy3')}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">{t('privacy4')}</span>
                  </div>
                </div>
              </div>

              <p className="text-body-sm text-ink-500 pt-4 border-t border-sand-200">{t('timeNote')}</p>
            </div>

            <Button onClick={() => setHasStarted(true)} variant="primary" size="large">
              {t('beginDialogue')}
            </Button>
          </Card>
        </div>
      </Section>

      <Section background="accent" spacing="default" centered>
        <div className="max-w-3xl">
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-4 leading-tight">{t('programsTitle')}</h2>
          <p className="text-body-lg text-ink-600 mb-8 leading-relaxed">{t('programsBody')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              {t('viewPrograms')}
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
