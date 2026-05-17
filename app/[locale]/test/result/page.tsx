'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { determinePersonalityKey, type PersonalityKey } from '@/lib/personality';

type Profile = {
  title: string;
  description: string;
  strengths: string[];
  growth: string[];
};

export default function ResultPage() {
  const router = useRouter();
  const t = useTranslations('TestResult');
  const [trait, setTrait] = useState<PersonalityKey | null>(null);

  useEffect(() => {
    const answersJson = sessionStorage.getItem('testAnswers');
    if (!answersJson) {
      router.push('/test');
      return;
    }
    const answers = JSON.parse(answersJson) as Record<number, string>;
    setTrait(determinePersonalityKey(answers));
  }, [router]);

  const profile = useMemo(
    () => (trait ? (t.raw(`profiles.${trait}`) as Profile) : null),
    [trait, t]
  );

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-body text-ink-600">{t('loading')}</p>
      </div>
    );
  }

  return (
    <>
      <Hero subtitle={t('heroSubtitle')} title={profile.title} description={profile.description} centered />

      <Section spacing="default">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <h3 className="text-h3 font-serif text-ink-950 mb-4">{t('strengthsTitle')}</h3>
            <p className="text-body text-ink-600 mb-6">{t('strengthsIntro')}</p>
            <div className="space-y-4">
              {profile.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="text-sage-700 font-medium mt-1">✓</span>
                  <span className="text-body text-ink-700">{strength}</span>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-h3 font-serif text-ink-950 mb-4">{t('growthTitle')}</h3>
            <p className="text-body text-ink-600 mb-6">{t('growthIntro')}</p>
            <div className="space-y-4">
              {profile.growth.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="flex gap-4"
                >
                  <span className="text-sage-700 font-medium mt-1">→</span>
                  <span className="text-body text-ink-700">{area}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section background="accent" spacing="default" centered>
        <div className="max-w-3xl">
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-4">{t('ctaTitle')}</h2>
          <p className="text-body-lg text-ink-600 mb-8">{t('ctaBody')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              {t('explorePrograms')}
            </Button>
            <Button href="/contact" variant="secondary" size="large">
              {t('discussResults')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
