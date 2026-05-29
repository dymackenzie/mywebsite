'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

export type GalleryImage = {
  src: string
  width: number
  height: number
}

type LightboxProps = {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index]
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 text-parchment/60 hover:text-parchment text-3xl"
      >
        &times;
      </button>
      <button
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 text-parchment/60 hover:text-parchment text-4xl px-4 py-2"
      >
        &#8249;
      </button>
      <button
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 text-parchment/60 hover:text-parchment text-4xl px-4 py-2"
      >
        &#8250;
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.src}
          alt=""
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  )
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const shouldReduceMotion = useReducedMotion()
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  // Split into 3 columns for masonry
  const columns: GalleryImage[][] = [[], [], []]
  images.forEach((img, i) => columns[i % 3].push(img))

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-2 sm:gap-3">
            {col.map((img) => {
              const globalIdx = images.indexOf(img)
              const aspectRatio = img.width / img.height
              return (
                <motion.button
                  key={img.src}
                  onClick={() => setLightboxIdx(globalIdx)}
                  className="group relative w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500"
                  style={{ aspectRatio: `${aspectRatio}` }}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { scale: 1.025, rotate: 0.4, zIndex: 10 }
                  }
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    className="object-cover transition-all duration-500 group-hover:brightness-95"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    loading="lazy"
                  />
                </motion.button>
              )
            })}
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i! - 1 + images.length) % images.length)}
          onNext={() => setLightboxIdx((i) => (i! + 1) % images.length)}
        />
      )}
    </>
  )
}
