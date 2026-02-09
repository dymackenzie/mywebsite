"use client"

import React, { useState, useCallback } from 'react'
import Image from 'next/image'

type ImageItem = { src: string; width?: number; height?: number }

export default function GalleryGrid({ images }: { images: ImageItem[] | string[] }) {
  if (!images || images.length === 0) {
    return <div className="text-sm text-zinc-500">No images found in /public/images</div>
  }

  const [ratios, setRatios] = useState<Record<string, number>>({})

  const handleLoad = useCallback((src: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (!img || !img.naturalWidth) return
    const ratio = img.naturalHeight / img.naturalWidth
    setRatios((r) => {
      if (r[src]) return r
      return { ...r, [src]: ratio }
    })
  }, [])

  return (
    <div className="gallery-columns">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((img, i) => {
          const src = typeof img === 'string' ? img : img.src
          const providedRatio = typeof img === 'string' ? undefined : img.width && img.height ? img.height / img.width : undefined
          const ratio = ratios[src] ?? providedRatio
          const paddingBottom = `${ratio * 100}%`

          return (
            <div key={`${src}-${i}`} className="break-inside-avoid mb-4 rounded-lg shadow-sm overflow-hidden bg-zinc-50 dark:bg-zinc-900">
              <div style={{ position: 'relative', width: '100%', paddingBottom }}>
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  onLoad={handleLoad(src)}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <style jsx>{`
        .gallery-columns > div {
          column-gap: 1rem;
        }
        .break-inside-avoid {
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
      `}</style>
    </div>
  )
}
