'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

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
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 text-parchment/60 hover:text-parchment text-3xl z-60 p-2"
      >
        &times;
      </button>
      <button
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 text-parchment/60 hover:text-parchment text-4xl px-6 py-3 z-60"
      >
        &#8249;
      </button>
      <button
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 text-parchment/60 hover:text-parchment text-4xl px-6 py-3 z-60"
      >
        &#8250;
      </button>
      <div
        className="relative p-4"
        style={{ boxSizing: 'border-box', height: 'calc(100vh - 4rem)', width: 'calc(100vw - 4rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-full h-full" style={{ width: '100%', height: '100%' }}>
          <Image
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            className="object-contain block"
            sizes="90vw"
            priority
            style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

function shuffle(arr: GalleryImage[]): GalleryImage[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const shouldReduceMotion = useReducedMotion()
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  // Start with the server order (avoids hydration mismatch), then shuffle on
  // the client so the gallery is freshly randomized each visit.
  const [ordered, setOrdered] = useState<GalleryImage[]>(images)
  useEffect(() => {
    setOrdered(shuffle(images))
  }, [images])

  // Split into 3 columns for masonry
  const columns: GalleryImage[][] = [[], [], []]
  ordered.forEach((img, i) => columns[i % 3].push(img))

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-2 sm:gap-3">
            {col.map((img) => {
              const globalIdx = ordered.indexOf(img)
              const aspectRatio = img.width / img.height
              return (
                <motion.button
                  key={img.src}
                  onClick={() => setLightboxIdx(globalIdx)}
                  data-cursor="view"
                  className="group relative w-full overflow-hidden rounded-lg ring-1 ring-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500"
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
          images={ordered}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i! - 1 + ordered.length) % ordered.length)}
          onNext={() => setLightboxIdx((i) => (i! + 1) % ordered.length)}
        />
      )}
    </>
  )
}
