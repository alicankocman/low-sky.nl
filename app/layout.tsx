import type { Metadata } from 'next'
import { Inter, Crimson_Pro } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { LeadershipEntryLayer } from '@/components/onboarding/LeadershipEntryLayer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Low Sky | Center For Human & Context Development',
  description: 'A journey of self-discovery and intentional growth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body className="bg-sand-50 text-ink-900 antialiased">
        <Navigation />
        <LeadershipEntryLayer />
        <main className="min-h-screen pb-28 md:pb-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
