'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

const questions = [
  {
    id: 1,
    question: 'When facing a difficult decision, I tend to:',
    options: [
      { value: 'reflect', label: 'Take time alone to reflect deeply' },
      { value: 'discuss', label: 'Talk it through with trusted people' },
      { value: 'analyze', label: 'Gather data and analyze options' },
      { value: 'intuition', label: 'Trust my gut feeling' },
    ],
  },
  {
    id: 2,
    question: 'What energizes me most as a leader?',
    options: [
      { value: 'vision', label: 'Creating and sharing a compelling vision' },
      { value: 'people', label: 'Supporting and developing others' },
      { value: 'systems', label: 'Building systems and processes' },
      { value: 'impact', label: 'Seeing tangible results and impact' },
    ],
  },
  {
    id: 3,
    question: 'In moments of conflict, I usually:',
    options: [
      { value: 'mediate', label: 'Try to understand all perspectives' },
      { value: 'direct', label: 'Address it directly and clearly' },
      { value: 'pause', label: 'Step back and give it time' },
      { value: 'solve', label: 'Focus on finding solutions' },
    ],
  },
  {
    id: 4,
    question: 'I feel most aligned when:',
    options: [
      { value: 'authentic', label: 'I can be completely authentic' },
      { value: 'growing', label: 'I\'m learning and growing' },
      { value: 'contributing', label: 'I\'m contributing to something meaningful' },
      { value: 'creating', label: 'I\'m creating something new' },
    ],
  },
  {
    id: 5,
    question: 'What do you value most in leadership?',
    options: [
      { value: 'integrity', label: 'Integrity and consistency' },
      { value: 'empathy', label: 'Empathy and understanding' },
      { value: 'clarity', label: 'Clarity and direction' },
      { value: 'courage', label: 'Courage and boldness' },
    ],
  },
]

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [started, setStarted] = useState(false)

  const isLastQuestion = currentQuestion === questions.length - 1
  const currentAnswered = answers[questions[currentQuestion]?.id]

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Store results and navigate to results page
      sessionStorage.setItem('testAnswers', JSON.stringify(answers))
      router.push('/test/result')
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (!started) {
    return (
      <>
        <Hero
          subtitle="Self-Discovery"
          title="Know yourself, lead yourself"
          description="This assessment is an invitation to pause and reflect. There are no right answers—only your truth."
          centered
        />

        <Section spacing="default">
          <div className="max-w-3xl mx-auto">
            <Card>
              <h3 className="text-h3 font-serif text-ink-950 mb-4">
                Before you begin
              </h3>
              
              <div className="space-y-4 text-body text-ink-600 mb-8">
                <p>
                  This assessment takes approximately 10 minutes. Find a quiet space where you can be honest with yourself.
                </p>
                
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="text-sage-700 font-medium">•</span>
                    <span>Answer based on how you naturally are, not how you think you should be</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sage-700 font-medium">•</span>
                    <span>Trust your first instinct—don't overthink</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sage-700 font-medium">•</span>
                    <span>There are no wrong answers, only different paths</span>
                  </div>
                </div>

                <p className="text-body-sm text-ink-500 pt-3 border-t border-sand-200">
                  Your responses are private and will be used only to generate your personalized insights.
                </p>
              </div>

              <Button onClick={() => setStarted(true)} variant="primary" size="large">
                Begin Assessment
              </Button>
            </Card>
          </div>
        </Section>
      </>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <>
      <div className="pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-caption uppercase tracking-wider text-ink-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-body-sm text-ink-600">
                {Math.round(progress)}%
              </span>
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

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-h3 lg:text-h2 font-serif text-ink-950 mb-8">
              {question.question}
            </h2>

            <div className="space-y-4 mb-10">
              {question.options.map((option) => (
                <button
                  key={option.value}
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

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrevious}
                variant="ghost"
                disabled={currentQuestion === 0}
              >
                ← Previous
              </Button>

              <Button
                onClick={handleNext}
                variant="primary"
                disabled={!currentAnswered}
              >
                {isLastQuestion ? 'View Results' : 'Next →'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
