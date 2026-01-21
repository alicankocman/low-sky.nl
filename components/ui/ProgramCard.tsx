'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProgramCardProps {
  title: string
  description: string
  duration: string
  format: string
  href: string
  delay?: number
}

export function ProgramCard({
  title,
  description,
  duration,
  format,
  href,
  delay = 0,
}: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Link href={href} className="block group">
        <div className="bg-white border border-sand-200 p-10 lg:p-16 transition-all duration-300 group-hover:shadow-lg group-hover:border-sage-300">
          <h3 className="text-h3 font-serif text-ink-950 mb-6 group-hover:text-sage-800 transition-colors leading-tight">
            {title}
          </h3>
          
          <p className="text-body text-ink-600 mb-8 leading-relaxed max-w-prose-wide">
            {description}
          </p>

          <div className="flex items-center gap-10 text-body-sm text-ink-500 mb-8">
            <div>
              <span className="text-caption uppercase tracking-wider text-ink-400 block mb-1">
                Duration
              </span>
              <span>{duration}</span>
            </div>
            <div>
              <span className="text-caption uppercase tracking-wider text-ink-400 block mb-1">
                Format
              </span>
              <span>{format}</span>
            </div>
          </div>

          <div className="text-sage-700 group-hover:text-sage-900 transition-colors font-medium">
            Get in Touch →
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
