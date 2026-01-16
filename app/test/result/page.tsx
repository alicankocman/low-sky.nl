'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

// Simple personality type determination based on answers
function determinePersonality(answers: Record<number, string>) {
  const values = Object.values(answers)
  
  // Count different traits
  const traits = {
    reflective: values.filter(v => ['reflect', 'pause', 'authentic'].includes(v)).length,
    analytical: values.filter(v => ['analyze', 'systems', 'clarity'].includes(v)).length,
    collaborative: values.filter(v => ['discuss', 'people', 'empathy'].includes(v)).length,
    visionary: values.filter(v => ['intuition', 'vision', 'creating'].includes(v)).length,
  }

  // Determine primary trait
  const primary = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0]
  
  const profiles = {
    reflective: {
      title: 'The Reflective Leader',
      description: 'You lead from a place of deep inner awareness and authenticity. Your strength lies in your ability to pause, reflect, and bring genuine presence to your leadership.',
      strengths: [
        'Deep self-awareness and emotional intelligence',
        'Authentic and genuine in your interactions',
        'Thoughtful decision-making process',
        'Creates space for others to reflect and grow',
      ],
      growth: [
        'Balance reflection with timely action',
        'Share your internal process with others',
        'Trust that your authentic voice is enough',
      ],
    },
    analytical: {
      title: 'The Systematic Leader',
      description: 'You bring clarity and structure to complexity. Your ability to see patterns, build systems, and think strategically creates stability and direction for those you lead.',
      strengths: [
        'Strong analytical and strategic thinking',
        'Creates clear processes and frameworks',
        'Data-informed decision making',
        'Brings order to chaos',
      ],
      growth: [
        'Balance logic with intuition and emotion',
        'Create space for ambiguity and emergence',
        'Connect systems thinking to human impact',
      ],
    },
    collaborative: {
      title: 'The Relational Leader',
      description: 'You understand that leadership is fundamentally about people. Your empathy, listening skills, and ability to develop others creates environments where everyone can thrive.',
      strengths: [
        'High emotional intelligence and empathy',
        'Natural mentor and developer of people',
        'Creates psychological safety',
        'Builds strong, trusting relationships',
      ],
      growth: [
        'Balance care for others with self-care',
        'Practice making difficult decisions',
        'Set healthy boundaries',
      ],
    },
    visionary: {
      title: 'The Visionary Leader',
      description: "You see possibilities others miss and inspire people toward a compelling future. Your intuition and creative thinking helps teams imagine and create what doesn't yet exist.",
      strengths: [
        'Strong intuition and future-thinking',
        'Inspires and motivates others',
        'Comfortable with ambiguity',
        'Drives innovation and change',
      ],
      growth: [
        'Balance vision with practical execution',
        'Stay grounded in present reality',
        'Translate inspiration into actionable steps',
      ],
    },
  }

  return profiles[primary as keyof typeof profiles]
}

export default function ResultPage() {
  const router = useRouter()
  const [personality, setPersonality] = useState<any>(null)

  useEffect(() => {
    const answersJson = sessionStorage.getItem('testAnswers')
    if (!answersJson) {
      router.push('/test')
      return
    }

    const answers = JSON.parse(answersJson)
    const result = determinePersonality(answers)
    setPersonality(result)
  }, [router])

  if (!personality) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-body text-ink-600">Loading your results...</p>
      </div>
    )
  }

  return (
    <>
      <Hero
        subtitle="Your Results"
        title={personality.title}
        description={personality.description}
        centered
      />

      <Section spacing="default">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Strengths */}
          <Card>
            <h3 className="text-h3 font-serif text-ink-950 mb-4">
              Your Strengths
            </h3>
            <p className="text-body text-ink-600 mb-6">
              These are the qualities that naturally emerge in your leadership:
            </p>
            <div className="space-y-4">
              {personality.strengths.map((strength: string, index: number) => (
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

          {/* Growth Areas */}
          <Card>
            <h3 className="text-h3 font-serif text-ink-950 mb-4">
              Growth Edges
            </h3>
            <p className="text-body text-ink-600 mb-6">
              Areas to explore as you continue your leadership journey:
            </p>
            <div className="space-y-4">
              {personality.growth.map((area: string, index: number) => (
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
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-4">
            Continue your journey
          </h2>
          <p className="text-body-lg text-ink-600 mb-8">
            Understanding your leadership style is just the beginning. Our programs are designed to help you 
            deepen your strengths and expand into new capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              Explore Programs
            </Button>
            <Button href="/contact" variant="secondary" size="large">
              Discuss Your Results
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
