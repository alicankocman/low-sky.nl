'use client';

import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <>
      <Hero title={t('heroTitle')} description={t('heroDescription')} centered>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button href="/programs" variant="primary" size="large">
            {t('explorePrograms')}
          </Button>
          <Button href="/reflection?start=1" variant="secondary" size="large">
            {t('beginReflection')}
          </Button>
        </div>
      </Hero>

      <Section
        subtitle={t('approachSubtitle')}
        title={t('approachTitle')}
        description={t('approachDescription')}
        spacing="default"
      >
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          <Card delay={0}>
            <h3 className="text-h4 font-serif text-ink-950 mb-4 leading-snug">{t('cardAwarenessTitle')}</h3>
            <p className="text-body text-ink-600 leading-relaxed">{t('cardAwarenessBody')}</p>
          </Card>

          <Card delay={0.1}>
            <h3 className="text-h4 font-serif text-ink-950 mb-4 leading-snug">{t('cardIntentionTitle')}</h3>
            <p className="text-body text-ink-600 leading-relaxed">{t('cardIntentionBody')}</p>
          </Card>

          <Card delay={0.2}>
            <h3 className="text-h4 font-serif text-ink-950 mb-4 leading-snug">{t('cardPresenceTitle')}</h3>
            <p className="text-body text-ink-600 leading-relaxed">{t('cardPresenceBody')}</p>
          </Card>
        </div>
      </Section>

      <Section background="accent" spacing="default">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-h2 lg:text-h1 font-serif text-ink-950 mb-6 leading-tight"
            >
              {t('journeyTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-body-lg text-ink-600 mb-10 leading-relaxed"
            >
              {t('journeyBody')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button href="/reflection?start=1" variant="primary" size="large">
                {t('startDialogue')}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-sage-200 p-12 lg:p-16"
          >
            <blockquote className="text-h4 font-serif text-ink-800 italic leading-relaxed mb-6">
              &quot;{t('quote')}&quot;
            </blockquote>
            <p className="text-body-sm text-ink-500">— {t('quoteAuthor')}</p>
          </motion.div>
        </div>
      </Section>

      <Section spacing="default" centered>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-6 leading-tight">{t('ctaTitle')}</h2>
          <p className="text-body-lg text-ink-600 mb-10 leading-relaxed">{t('ctaBody')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              {t('viewPrograms')}
            </Button>
            <Button href="/contact" variant="ghost" size="large">
              {t('getInTouch')}
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
