'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  hover?: boolean
  delay?: number
}

export function Card({ children, hover = false, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`
        bg-white border border-sand-200 p-8 lg:p-12
        ${hover ? 'transition-shadow hover:shadow-lg' : ''}
      `}
    >
      {children}
    </motion.div>
  )
}
