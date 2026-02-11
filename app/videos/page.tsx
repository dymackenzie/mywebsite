 'use client'

import { motion } from 'motion/react'
import { VIDEOS } from '@/app/data'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { VARIANTS_CONTAINER, VARIANTS_SECTION, TRANSITION_SECTION } from '@/components/ui/animations'

export default function VideosPage() {
  return (
    <motion.main className="max-w-none" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <motion.section className="mt-6" variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h3 className="mb-5 text-lg font-medium text-black dark:text-white">Videos</h3>

        <div className="space-y-4">
          <AnimatedBackground
            enableHover
            className="rounded-2xl bg-gradient-to-r from-zinc-100 via-white/70 to-white/5 dark:from-indigo-900/20 dark:to-zinc-900/20"
            transition={{ type: 'spring', bounce: 0.16, duration: 0.36 }}
          >
            {VIDEOS.map((video) => (
              <motion.a
                key={video.id}
                data-id={video.id}
                href={video.youtube}
                target="_blank"
                rel="noreferrer"
                className="relative block w-full rounded-lg no-underline p-0"
                variants={VARIANTS_SECTION}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0 px-4 py-3 pr-24">
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title} className="w-36 h-20 object-cover rounded-md flex-shrink-0" />
                  ) : null}

                  <div className="min-w-0">
                    <div className="block text-base font-[450] text-zinc-900 dark:text-zinc-50 md:truncate">
                      {video.title}
                    </div>
                    {video.description ? (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 md:truncate">{video.description}</p>
                    ) : null}
                  </div>
                </div>

                {video.date ? (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 text-sm text-zinc-500 dark:text-zinc-400">{video.date}</span>
                ) : null}
              </motion.a>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>
    </motion.main>
  )
}
