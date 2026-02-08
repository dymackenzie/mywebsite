 'use client'

import { motion } from 'motion/react'
import { VARIANTS_CONTAINER, VARIANTS_ITEM } from '@/components/ui/animations'

export default function GalleryPage() {
  const placeholders = Array.from({ length: 6 }).map((_, i) => ({ id: i + 1 }))

  return (
    <motion.main className="prose max-w-none" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {placeholders.map((p) => (
          <motion.div
            key={p.id}
            variants={VARIANTS_ITEM}
            className="h-40 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-sm text-zinc-600"
          >
            Image {p.id}
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}
