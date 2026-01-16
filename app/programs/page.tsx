'use client'

import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'
import { ProgramCard } from '@/components/ui/ProgramCard'
import { Button } from '@/components/ui/Button'

const programs = [
  {
    title: 'New Personal Leadership',
    description: "A foundational program for emerging leaders who want to build self-awareness, clarify their values, and develop a personal leadership philosophy. Through guided reflection and practical exercises, you'll discover your unique approach to leadership.",
    duration: '8 weeks',
    format: 'Cohort-based',
    href: '/programs/new-personal-leadership',
  },
  {
    title: 'Leadership in Residence',
    description: 'An immersive experience for established leaders seeking deeper transformation. This residency combines intensive self-inquiry, peer learning, and one-on-one mentorship to help you evolve your leadership practice and navigate complex challenges.',
    duration: '6 months',
    format: 'Hybrid',
    href: '/programs/leadership-in-residence',
  },
]

export default function ProgramsPage() {
  return (
    <>
      <Hero
        subtitle="Programs"
        title="Two paths, one journey"
        description="Whether you're beginning your leadership practice or deepening an existing one, our programs meet you where you are."
      />

      <Section spacing="default">
        <div className="space-y-8 lg:space-y-10">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.title}
              {...program}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      <Section background="accent" spacing="default" centered>
        <div className="max-w-3xl">
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-4 leading-tight">
            Not sure which program is right for you?
          </h2>
          <p className="text-body-lg text-ink-600 mb-8 leading-relaxed">
            Start with our self-discovery assessment to gain insight into your leadership style and needs. 
            Or reach out—we're happy to discuss your goals and help you choose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/test" variant="primary" size="large">
              Take the Assessment
            </Button>
            <Button href="/contact" variant="secondary" size="large">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
