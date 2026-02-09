"use client"

import { motion } from 'motion/react'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { VARIANTS_CONTAINER } from '@/components/ui/animations'

export default function GalleryView({ images }: { images: { src: string; width?: number; height?: number }[] }) {
  return (
    <motion.main className="max-w-none" variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
      <div className="mt-6">
        <GalleryGrid images={images} />
      </div>
    </motion.main>
  )
}
