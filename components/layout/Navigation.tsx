'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/test', label: 'Self-Discovery' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-sand-50/95 backdrop-blur-md border-b border-sand-200/60"
      >
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-50 group flex-shrink-0"
              onClick={closeMenu}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xl font-serif text-ink-900 group-hover:text-ink-700 transition-colors leading-none tracking-tight">
                  Low Sky
                </span>
                <span className="text-xs text-ink-600 leading-none tracking-wide hidden lg:block font-medium">
                  Center For Human & Context Development
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-7">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`
                          text-base font-normal transition-colors relative
                          ${isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800'}
                        `}
                      >
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute -bottom-[17px] left-0 right-0 h-px bg-ink-900/20"
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              
              {/* CTA Button */}
              <Link
                href="/contact"
                className="px-5 py-2 text-sm text-ink-900 border border-ink-900/20 hover:border-ink-900/40 hover:bg-sand-100 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-px bg-ink-900 block"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-px bg-ink-900 block"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-px bg-ink-900 block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={closeMenu}
          >
            <div className="absolute inset-0 bg-ink-950/20 backdrop-blur-sm" />
            
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[57px] left-0 right-0 bg-sand-50 border-b border-sand-200/60"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="max-w-container mx-auto px-6 py-5">
                <ul className="space-y-px">
                  {links.map((link, index) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`
                            block px-3 py-2.5 text-lg transition-colors
                            ${isActive ? 'text-ink-900 bg-sand-100' : 'text-ink-600 hover:text-ink-900 hover:bg-sand-100/50'}
                          `}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
                
                <div className="mt-4 pt-3 border-t border-sand-200/60">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block w-full px-5 py-2.5 text-center text-base text-ink-900 border border-ink-900/20 hover:border-ink-900/40 hover:bg-sand-100 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
