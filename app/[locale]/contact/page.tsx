'use client';

import { useState } from 'react';
import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <>
        <Hero
          subtitle={t('thankYouSubtitle')}
          title={t('thankYouTitle')}
          description={t('thankYouDescription')}
          centered
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              {t('thankViewPrograms')}
            </Button>
            <Button href="/reflection?start=1" variant="ghost" size="large">
              {t('thankStartReflection')}
            </Button>
          </div>
        </Hero>
      </>
    );
  }

  return (
    <>
      <Hero subtitle={t('heroSubtitle')} title={t('heroTitle')} description={t('heroDescription')} />

      <Section spacing="default">
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white border border-sand-200 p-8 lg:p-10"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium text-ink-700 mb-2">
                  {t('nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                  placeholder={t('namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-body-sm font-medium text-ink-700 mb-2">
                  {t('emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                  placeholder={t('emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-body-sm font-medium text-ink-700 mb-2">
                  {t('interestLabel')}
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                >
                  <option value="">{t('interestPlaceholder')}</option>
                  <option value="new-personal-leadership">{t('interestNpl')}</option>
                  <option value="leadership-in-residence">{t('interestLir')}</option>
                  <option value="assessment-discussion">{t('interestAssessment')}</option>
                  <option value="general">{t('interestGeneral')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-body-sm font-medium text-ink-700 mb-2">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors resize-none"
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="large">
                  {t('sendMessage')}
                </Button>
              </div>

              <p className="text-body-sm text-ink-500 pt-4 border-t border-sand-200">{t('privacyNote')}</p>
            </div>
          </motion.form>
        </div>
      </Section>

      <Section background="accent" centered spacing="default">
        <div className="max-w-2xl">
          <h3 className="text-h3 font-serif text-ink-950 mb-3">{t('emailDirectTitle')}</h3>
          <p className="text-body text-ink-600 mb-4">
            {t('emailDirectBodyBefore')}{' '}
            <a href="mailto:hello@low-sky.nl" className="text-sage-700 hover:text-sage-900 underline">
              hello@low-sky.nl
            </a>
          </p>
          <p className="text-body-sm text-ink-500">{t('emailDirectResponse')}</p>
        </div>
      </Section>
    </>
  );
}
