'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { Post } from '@/app/blog/posts'
import { BlogSearch } from '@/components/ui/blog-search'
import { PageHeader } from '@/components/ui/page-header'
import { formatDate } from '@/lib/date'
import { VARIANTS_CONTAINER, VARIANTS_ITEM } from '@/components/ui/animations'

/**
 * One list, newest first. `getPosts()` already sorts by date, so there is no
 * sorting, pinning, or like-count fetching to do here — the index stays quiet
 * and the hearts live on the posts themselves.
 */
export function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <div className="mx-auto max-w-screen-md px-6 py-16">
      <PageHeader
        index="01"
        eyebrow="Journal"
        title="Writings"
        lead="Thoughts worth keeping."
        meta={`${String(posts.length).padStart(2, '0')} entries`}
        action={<BlogSearch posts={posts} />}
      />

      <motion.ul
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="divide-y divide-stone-200/60"
      >
        {posts.map((post) => (
          <motion.li key={post.uid} variants={VARIANTS_ITEM}>
            <Link href={post.link} className="group flex items-start gap-4 py-5">
              {post.cover && (
                <div
                  data-cursor="view"
                  className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-ink/5"
                >
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="96px"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-serif font-medium leading-snug text-ink transition-colors group-hover:text-moss-600">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">
                    {post.description}
                  </p>
                )}
                <span className="field-note mt-2 block">
                  {formatDate(post.date)}
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
