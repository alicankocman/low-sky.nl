import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-sand-200/60 bg-sand-50">
      <div className="max-w-container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <h3 className="text-xl font-serif text-ink-900 mb-1.5 leading-none tracking-tight">
              Low Sky
            </h3>
            <p className="text-xs text-ink-600 mb-4 tracking-wide leading-tight font-medium">
              Center For Human & Context Development
            </p>
            <p className="text-base text-ink-600 max-w-xs leading-relaxed">
              A journey of self-discovery and intentional growth.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase text-ink-700 font-semibold mb-3 tracking-wider">
              Navigate
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-base text-ink-500 hover:text-ink-900 transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-base text-ink-500 hover:text-ink-900 transition-colors inline-block">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/test" className="text-base text-ink-500 hover:text-ink-900 transition-colors inline-block">
                  Self-Discovery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-ink-500 hover:text-ink-900 transition-colors inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase text-ink-700 font-semibold mb-3 tracking-wider">
              Connect
            </h4>
            <a 
              href="mailto:hello@low-sky.nl" 
              className="text-base text-ink-500 hover:text-ink-900 transition-colors inline-block"
            >
              hello@low-sky.nl
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-sand-200/60">
          <p className="text-xs text-ink-400 text-center tracking-wide">
            © {currentYear} Low Sky
          </p>
        </div>
      </div>
    </footer>
  )
}
