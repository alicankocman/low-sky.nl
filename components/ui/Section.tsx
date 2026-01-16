'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  title?: string
  subtitle?: string
  description?: string
  children: ReactNode
  background?: 'default' | 'accent' | 'dark'
  spacing?: 'default' | 'large' | 'small'
  centered?: boolean
}

export function Section({
  title,
  subtitle,
  description,
  children,
  background = 'default',
  spacing = 'default',
  centered = false,
}: SectionProps) {
  const bgClasses = {
    default: 'bg-sand-50',
    accent: 'bg-sage-50',
    dark: 'bg-ink-950 text-sand-50',
  }

  const spacingClasses = {
    small: 'py-16 lg:py-20',
    default: 'py-20 lg:py-24',
    large: 'py-24 lg:py-32',
  }

  return (
    <section className={`${bgClasses[background]} ${spacingClasses[spacing]} px-6 lg:px-12`}>
      <div className="max-w-container mx-auto">
        {(title || subtitle || description) && (
          <div className={`mb-16 lg:mb-20 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-caption uppercase tracking-wider mb-4 ${
                  background === 'dark' ? 'text-sage-300' : 'text-sage-700'
                }`}
              >
                {subtitle}
              </motion.p>
            )}
            
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-h2 lg:text-h1 font-serif mb-6 leading-tight ${
                  background === 'dark' ? 'text-sand-50' : 'text-ink-950'
                }`}
              >
                {title}
              </motion.h2>
            )}

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-body-lg leading-relaxed ${
                  background === 'dark' ? 'text-sand-200' : 'text-ink-600'
                }`}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <div>
          {children}
        </div>
      </div>
    </section>
  )
}
