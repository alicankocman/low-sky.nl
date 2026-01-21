'use client'

import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Leadership begins with understanding yourself"
        description="A space for reflection, growth, and intentional transformation. Discover who you are, clarify what matters, and step into the leader you're becoming."
        centered
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button href="/programs" variant="primary" size="large">
            Explore Programs
          </Button>
          <Button href="/reflection" variant="secondary" size="large">
            Begin Reflection
          </Button>
        </div>
      </Hero>

      {/* Philosophy Section */}
      <Section
        subtitle="Our Approach"
        title="Thoughtful growth, not quick fixes"
        description="We believe leadership is a personal journey, not a checklist. It requires patience, curiosity, and the courage to look inward before leading outward."
        spacing="default"
      >
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          <Card delay={0}>
            <h3 className="text-h4 font-serif text-ink-950 mb-4 leading-snug">
              Self-Awareness
            </h3>
            <p className="text-body text-ink-600 leading-relaxed">
              Understanding your patterns, values, and triggers is the foundation of authentic leadership.
            </p>
          </Card>

          <Card delay={0.1}>
            <h3 className="text-h4 font-serif text-ink-950 mb-4 leading-snug">
              Intentionality
            </h3>
            <p className="text-body text-ink-600 leading-relaxed">
              Leading with purpose requires clarity about what you stand for and where you're going.
            </p>
          </Card>

          <Card delay={0.2}>
            <h3 className="text-h4 font-serif text-ink-950 mb-4 leading-snug">
              Presence
            </h3>
            <p className="text-body text-ink-600 leading-relaxed">
              True influence comes from being fully engaged with yourself, your team, and the moment.
            </p>
          </Card>
        </div>
      </Section>

      {/* Journey Section */}
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
              Your journey starts with curiosity
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-body-lg text-ink-600 mb-10 leading-relaxed"
            >
              Before choosing a program, we invite you to explore who you are through our self-discovery assessment. 
              There are no right answers—only honest reflection.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button href="/reflection" variant="primary" size="large">
                Start the Dialogue
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
              "The privilege of a lifetime is to become who you truly are."
            </blockquote>
            <p className="text-body-sm text-ink-500">
              — Carl Jung
            </p>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="default" centered>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-6 leading-tight">
            Ready to explore?
          </h2>
          <p className="text-body-lg text-ink-600 mb-10 leading-relaxed">
            Whether you're just beginning your leadership journey or deepening an existing practice, 
            we're here to support your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              View Programs
            </Button>
            <Button href="/contact" variant="ghost" size="large">
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
