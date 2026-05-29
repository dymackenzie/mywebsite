'use client'

import { motion } from 'motion/react'
import { VideoTile } from '@/components/ui/video-tile'
import { VIDEOS } from '@/app/data'
import { VARIANTS_CONTAINER, VARIANTS_SECTION } from '@/components/ui/animations'

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6">
      <motion.div
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <motion.h1
          variants={VARIANTS_SECTION}
          className="font-serif text-4xl font-semibold text-ink"
        >
          Videos
        </motion.h1>
        <motion.p variants={VARIANTS_SECTION} className="mt-2 text-ink-muted">
          stories told in motion
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((video) => {
          const isInstagram = !video.youtube.includes('youtu')
          return (
            <VideoTile
              key={video.id}
              title={video.title}
              description={video.description}
              date={video.date}
              youtube={isInstagram ? '' : video.youtube}
              preview={video.preview}
              poster={video.poster}
              isInstagram={isInstagram}
              instagramUrl={isInstagram ? video.youtube : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
