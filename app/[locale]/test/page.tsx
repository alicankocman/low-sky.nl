'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Question = {
  id: number;
  question: string;
  options: { value: string; label: string }[];
};

export default function TestPage() {
  const t = useTranslations('Test');
  const questions = t.raw('questions') as Question[];
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [started, setStarted] = useState(false);

  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswered = answers[questions[currentQuestion]?.id];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      sessionStorage.setItem('testAnswers', JSON.stringify(answers));
      router.push('/test/result');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!started) {
    return (
      <>
        <Hero subtitle={t('heroSubtitle')} title={t('heroTitle')} description={t('heroDescription')} centered />

        <Section spacing="default">
          <div className="max-w-3xl mx-auto">
            <Card>
              <h3 className="text-h3 font-serif text-ink-950 mb-4">{t('beforeTitle')}</h3>

              <div className="space-y-4 text-body text-ink-600 mb-8">
                <p>{t('beforeP1')}</p>

                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="text-sage-700 font-medium">•</span>
                    <span>{t('beforeLi1')}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sage-700 font-medium">•</span>
                    <span>{t('beforeLi2')}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sage-700 font-medium">•</span>
                    <span>{t('beforeLi3')}</span>
                  </div>
                </div>

                <p className="text-body-sm text-ink-500 pt-3 border-t border-sand-200">{t('beforePrivacy')}</p>
              </div>

              <Button onClick={() => setStarted(true)} variant="primary" size="large">
                {t('begin')}
              </Button>
            </Card>
          </div>
        </Section>
      </>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <div className="pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-caption uppercase tracking-wider text-ink-500">
                {t('questionProgress', { current: currentQuestion + 1, total: questions.length })}
              </span>
              <span className="text-body-sm text-ink-600">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-sand-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-sage-600"
              />
            </div>
          </div>

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-h3 lg:text-h2 font-serif text-ink-950 mb-8">{question.question}</h2>

            <div className="space-y-4 mb-10">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnswer(option.value)}
                  className={`
                    w-full text-left p-6 border-2 transition-all duration-200
                    ${
                      answers[question.id] === option.value
                        ? 'border-sage-600 bg-sage-50'
                        : 'border-sand-200 bg-white hover:border-sage-300 hover:bg-sand-50'
                    }
                  `}
                >
                  <span className="text-body text-ink-800">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button onClick={handlePrevious} variant="ghost" disabled={currentQuestion === 0}>
                {t('previous')}
              </Button>

              <Button onClick={handleNext} variant="primary" disabled={!currentAnswered}>
                {isLastQuestion ? t('viewResults') : t('next')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
