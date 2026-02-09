 'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { BLOG_POSTS } from '@/app/data'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { VARIANTS_CONTAINER, VARIANTS_ITEM, VARIANTS_SECTION, TRANSITION_SECTION } from '@/components/ui/animations'

export default function BlogIndexPage() {
  const [query, setQuery] = useState('')

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  function highlightText(text: string, q: string) {
    if (!q) return text
    const pattern = new RegExp(`(${escapeRegExp(q)})`, 'gi')
    const parts = text.split(pattern)
    return parts.map((part, i) =>
      pattern.test(part) ? (
        <span
          key={i}
          className="bg-yellow-100 text-zinc-800 dark:bg-yellow-600/30 dark:text-zinc-900 px-0.5 rounded"
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    )
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return BLOG_POSTS
    return BLOG_POSTS.filter((post) => {
      if (post.title.toLowerCase().includes(q)) return true
      if (post.tags && post.tags.some((t) => t.toLowerCase().includes(q))) return true
      return false
    })
  }, [query])

  return (
    <motion.main
      className="prose max-w-none"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <div className="mt-0">
        <motion.div
          className="mb-3 flex items-center justify-between"
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div>
            <motion.h2 variants={VARIANTS_ITEM} className="text-lg font-medium text-black dark:text-white">
              Writings
            </motion.h2>
            <motion.p variants={VARIANTS_ITEM} className="text-xs text-zinc-500 dark:text-zinc-400">{BLOG_POSTS.length} posts</motion.p>
          </div>
          <motion.div variants={VARIANTS_ITEM} className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or tag"
              className="w-full md:w-56 mt-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              aria-label="Search posts"
            />
          </motion.div>
        </motion.div>

        <AnimatedBackground
          enableHover
          className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
          transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
        >
          {filtered.map((post) => {
              const date = post.date ? new Date(post.date) : null
              const month = date
                ? date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
                : ''
              const day = date ? date.getDate() : ''

              return (
                <motion.a
                  key={post.uid}
                  href={post.link}
                  data-id={post.uid}
                  className="-mx-3 rounded-xl px-0 py-5 flex items-center justify-between text-sm text-zinc-800 dark:text-zinc-100 no-underline"
                  variants={VARIANTS_ITEM}
                >
                  <div className="flex items-start gap-5 w-full">
                    <div className="flex-shrink-0 w-16 text-right">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{month}</div>
                      <div className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-50">{day}</div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="font-semibold">{highlightText(post.title, query)}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{post.description}</div>
                      {post.tags && (
                        <div className="mt-1 flex gap-1">
                          {post.tags.map((t) => (
                            <span key={t} className="text-xs text-zinc-500 dark:text-zinc-400">#{highlightText(t, query)}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              )
            })}
            
        </AnimatedBackground>
      </div>
    </motion.main>
  )
}
