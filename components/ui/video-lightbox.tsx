'use client'

import { useEffect } from 'react'

type Props = {
  youtubeId: string
  onClose: () => void
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|watch\?v=|embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export function VideoLightbox({ youtubeId, onClose }: Props) {
  const id = extractYouTubeId(youtubeId) ?? youtubeId

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
      onClick={onClose}
    >
      <button
        aria-label="Close video"
        onClick={onClose}
        className="absolute top-4 right-4 text-parchment/60 hover:text-parchment text-3xl leading-none"
      >
        &times;
      </button>
      <div
        className="relative w-full max-w-4xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-xl"
        />
      </div>
    </div>
  )
}
