'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { BLOG_POSTS } from '@/app/data'
import { BlogSearch } from '@/components/ui/blog-search'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  VARIANTS_ITEM,
} from '@/components/ui/animations'

type Filter = 'latest' | 'top'

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function BlogPage() {
  const [filter, setFilter] = useState<Filter>('latest')
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    // Fetch all like counts for Top sort
    Promise.all(
      BLOG_POSTS.map((post) =>
        fetch(`/api/likes/${post.uid}`)
          .then((r) => r.json())
          .then((d) => [post.uid, d.count ?? 0] as [string, number])
          .catch(() => [post.uid, 0] as [string, number])
      )
    ).then((entries) => setLikeCounts(Object.fromEntries(entries)))
  }, [])

  const pinnedPosts = BLOG_POSTS.filter((p) => p.pinned)
  const mainPost = pinnedPosts.find((p) => p.featuredMain) ?? pinnedPosts[0]
  const secondaryPinned = pinnedPosts.filter((p) => p !== mainPost).slice(0, 2)

  const sortedPosts = [...BLOG_POSTS].sort((a, b) => {
    if (filter === 'top') {
      return (likeCounts[b.uid] ?? 0) - (likeCounts[a.uid] ?? 0)
    }
    return new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
  })

  return (
    <div className="mx-auto max-w-screen-md px-6 py-16">
      {/* Header */}
      <motion.div
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <motion.h1
            variants={VARIANTS_SECTION}
            className="font-serif text-4xl font-semibold text-ink"
          >
            Writings
          </motion.h1>
          <motion.p variants={VARIANTS_SECTION} className="mt-1 text-ink-muted">
            thoughts worth keeping
          </motion.p>
        </div>
        <motion.div variants={VARIANTS_SECTION}>
          <BlogSearch posts={BLOG_POSTS} />
        </motion.div>
      </motion.div>

      {/* Pinned section */}
      {pinnedPosts.length > 0 && (
        <motion.section
          variants={VARIANTS_CONTAINER}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.p
            variants={VARIANTS_SECTION}
            className="text-xs uppercase tracking-widest text-ink-faint mb-6"
          >
            Pinned
          </motion.p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Main pinned post */}
            {mainPost && (
              <motion.div variants={VARIANTS_ITEM} className="sm:col-span-2">
                <Link href={mainPost.link} className="group block">
                  {mainPost.cover && (
                    <div className="relative mb-4 w-full overflow-hidden rounded-xl aspect-[16/7]">
                      <Image
                        src={mainPost.cover}
                        alt={mainPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority
                      />
                    </div>
                  )}
                  <h2 className="font-serif text-2xl font-semibold text-ink group-hover:text-moss-600 transition-colors leading-snug">
                    {mainPost.title}
                  </h2>
                  {mainPost.description && (
                    <p className="mt-1 text-ink-muted">{mainPost.description}</p>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-sm text-ink-faint">
                    <span>{formatDate(mainPost.date)}</span>
                    {mainPost.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-stone-100 text-ink-muted rounded-full px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Secondary pinned posts */}
            {secondaryPinned.map((post) => (
              <motion.div key={post.uid} variants={VARIANTS_ITEM}>
                <Link href={post.link} className="group block">
                  {post.cover && (
                    <div className="relative mb-3 w-full overflow-hidden rounded-xl aspect-[4/3]">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 350px"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-moss-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1 text-sm text-ink-muted line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-ink-faint">
                    <span>{formatDate(post.date)}</span>
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-stone-100 text-ink-muted rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Filter + all posts list */}
      <section>
        <div className="mb-6 flex items-center gap-1 border-b border-stone-200/60 pb-4">
          {(['latest', 'top'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-sm transition-colors capitalize ${
                filter === f
                  ? 'bg-ink text-parchment'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.ul
          variants={VARIANTS_CONTAINER}
          initial="hidden"
          animate="visible"
          className="divide-y divide-stone-200/60"
        >
          {sortedPosts.map((post) => (
            <motion.li key={post.uid} variants={VARIANTS_ITEM}>
              <Link href={post.link} className="group flex items-start gap-4 py-5">
                {post.cover && (
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="96px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-medium text-ink group-hover:text-moss-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-0.5 text-sm text-ink-muted line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
                    <span>{formatDate(post.date)}</span>
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-stone-100 text-ink-muted rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto">
                      {likeCounts[post.uid] !== undefined
                        ? `♥ ${likeCounts[post.uid]}`
                        : ''}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </div>
  )
}
