'use client'

import { useState } from 'react'
import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <>
        <Hero
          subtitle="Thank You"
          title="We've received your message"
          description="We'll get back to you within 2 business days. In the meantime, feel free to explore our programs or take the self-discovery assessment."
          centered
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              View Programs
            </Button>
            <Button href="/test" variant="ghost" size="large">
              Take Assessment
            </Button>
          </div>
        </Hero>
      </>
    )
  }

  return (
    <>
      <Hero
        subtitle="Get in Touch"
        title="Let's start a conversation"
        description="Whether you have questions about our programs, want to discuss your assessment results, or simply want to connect, we're here to listen."
      />

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
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium text-ink-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-body-sm font-medium text-ink-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Interest */}
              <div>
                <label htmlFor="interest" className="block text-body-sm font-medium text-ink-700 mb-2">
                  I'm interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="new-personal-leadership">New Personal Leadership</option>
                  <option value="leadership-in-residence">Leadership in Residence</option>
                  <option value="assessment-discussion">Discussing my assessment results</option>
                  <option value="general">General inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-body-sm font-medium text-ink-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-sand-200 bg-white text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us a bit about yourself and what brings you here..."
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="large">
                  Send Message
                </Button>
              </div>

              <p className="text-body-sm text-ink-500 pt-4 border-t border-sand-200">
                We respect your privacy. Your information will never be shared with third parties.
              </p>
            </div>
          </motion.form>
        </div>
      </Section>

      {/* Alternative Contact */}
      <Section background="accent" centered spacing="default">
        <div className="max-w-2xl">
          <h3 className="text-h3 font-serif text-ink-950 mb-3">
            Prefer to email directly?
          </h3>
          <p className="text-body text-ink-600 mb-4">
            You can reach us at{' '}
            <a href="mailto:hello@low-sky.nl" className="text-sage-700 hover:text-sage-900 underline">
              hello@low-sky.nl
            </a>
          </p>
          <p className="text-body-sm text-ink-500">
            We typically respond within 2 business days.
          </p>
        </div>
      </Section>
    </>
  )
}
