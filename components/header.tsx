'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const NAV_LINKS = [
  { href: '/blog', label: 'Writings', primary: true },
  { href: '/gallery', label: 'Photographs' },
  { href: '/videos', label: 'Videos' },
  { href: '/projects', label: 'Projects' },
]

export function Header() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-parchment/70 backdrop-blur-md">
      <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-3 leading-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fwog_scaled_100x.gif"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="h-9 w-auto shrink-0 opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:h-10"
            />
            <span className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-tight text-ink">
                Mackenzie Dy
              </span>
              <span className="field-note mt-0.5">
                a window into my mindspace
              </span>
            </span>
          </Link>

          <nav className="hidden sm:block">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map(({ href, label, primary }, i) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-baseline gap-1.5"
                    >
                      <span
                        className={`field-note transition-colors duration-200 ${
                          isActive ? 'text-moss-600' : 'text-ink-faint'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`link-underline text-sm transition-colors duration-200 ${
                          primary
                            ? isActive
                              ? 'font-medium text-moss-700'
                              : 'font-medium text-moss-600 group-hover:text-moss-700'
                            : isActive
                              ? 'font-medium text-ink'
                              : 'text-ink-muted group-hover:text-ink'
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center text-ink-muted transition-colors hover:text-ink sm:hidden"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-stone-200/60 sm:hidden"
          >
            <ul className="mx-auto max-w-screen-xl px-4 py-2">
              {NAV_LINKS.map(({ href, label, primary }, i) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 py-3"
                    >
                      <span
                        className={`field-note ${
                          isActive ? 'text-moss-600' : 'text-ink-faint'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`text-base transition-colors duration-200 ${
                          primary
                            ? isActive
                              ? 'font-medium text-moss-700'
                              : 'font-medium text-moss-600'
                            : isActive
                              ? 'font-medium text-ink'
                              : 'text-ink-muted'
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
