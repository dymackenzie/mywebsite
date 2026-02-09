'use client'

import Image from 'next/image'
import React from 'react'

export default function GalleryGrid({ images }: { images: string[] }) {
  if (!images || images.length === 0) {
    return <div className="text-sm text-zinc-500">No images found in /public/images</div>
  }

  return (
    <div className="gallery-columns">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((src) => (
          <div key={src} className="break-inside-avoid mb-4">
            <img
              src={src}
              alt="Gallery image"
              loading="lazy"
              className="w-full h-auto rounded-lg shadow-sm object-cover"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        /* small tweak to reduce column gap in some browsers */
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
