'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

type Post = {
  title: string
  description: string
  link: string
  uid: string
  tags?: string[]
}

type Props = {
  posts: Post[]
}

export function BlogSearch({ posts }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? posts.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        )
      })
    : posts

  const openModal = useCallback(() => {
    setOpen(true)
    setQuery('')
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Keyboard: Esc closes, / opens
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) closeModal()
      if (e.key === '/' && !open && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault()
        openModal()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, openModal, closeModal])

  // Trap focus within modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal()
  }

  return (
    <>
      <button
        onClick={openModal}
        aria-label="Search posts"
        className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
            style={{ background: 'rgba(43,42,38,0.6)' }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Search posts"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-lg bg-parchment rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200/80">
                <svg
                  className="h-4 w-4 text-ink-faint shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search writings…"
                  className="flex-1 bg-transparent text-sm text-ink placeholder-ink-faint outline-none"
                />
                <button
                  onClick={closeModal}
                  className="text-xs text-ink-faint hover:text-ink-muted border border-stone-200 rounded px-1.5 py-0.5"
                >
                  Esc
                </button>
              </div>

              <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-ink-faint">
                    No results
                  </li>
                )}
                {filtered.map((post) => (
                  <li key={post.uid} role="option" aria-selected="false">
                    <Link
                      href={post.link}
                      onClick={closeModal}
                      className="flex flex-col gap-0.5 px-4 py-3 hover:bg-stone-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-ink">{post.title}</span>
                      {post.description && (
                        <span className="text-xs text-ink-muted line-clamp-1">
                          {post.description}
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-ink-faint bg-stone-100 rounded-full px-2 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
