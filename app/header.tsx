'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import useClickOutside from '@/hooks/useClickOutside'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  useClickOutside(menuRef, () => {
    setIsMenuOpen(false)
  })

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Mackenzie Dy
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Software Engineer and Camera Lover
        </TextEffect>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
                <motion.div
                  key="header-backdrop"
                  aria-hidden={true}
                  className="fixed inset-0 z-40 bg-black/25 dark:bg-black/40 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.nav
                key="header-menu"
                id="header-menu"
                  className="absolute right-0 top-10 z-50 w-40 origin-top p-2 text-right text-black dark:text-white md:hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
              <Link
                href="/gallery"
                className="block rounded px-2 py-1 text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Photographs
              </Link>
              <Link
                href="/projects"
                className="block rounded px-2 py-1 text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="block rounded px-2 py-1 text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Writings
              </Link>
            </motion.nav>
            </>
          )}
        </AnimatePresence>

        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="/gallery"
            className="text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Photographs
          </Link>
          <Link
            href="/projects"
            className="text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Writings
          </Link>
        </nav>
      </div>
    </header>
  )
}
