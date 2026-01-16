'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
  centered?: boolean
}

export function Hero({ title, subtitle, description, children, centered = false }: HeroProps) {
  return (
    <section className={`pt-28 pb-20 lg:pt-36 lg:pb-24 px-6 lg:px-12 ${centered ? 'text-center' : ''}`}>
      <div className={`max-w-container mx-auto ${centered ? 'flex flex-col items-center' : ''}`}>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-caption uppercase tracking-wider text-sage-700 mb-6"
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className={`text-h1 lg:text-display font-serif text-ink-950 mb-8 leading-tight ${
            centered ? 'max-w-4xl' : 'max-w-5xl'
          }`}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className={`text-body-lg text-ink-600 leading-relaxed ${
              centered ? 'max-w-prose' : 'max-w-prose-wide'
            }`}
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
