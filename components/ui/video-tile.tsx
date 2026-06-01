'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { VideoLightbox } from '@/components/ui/video-lightbox'

type VideoTileProps = {
  title: string
  description?: string
  date?: string
  youtube: string         // full URL (or empty for instagram)
  preview?: string        // Cloudinary muted loop URL
  poster?: string         // still frame fallback
  isInstagram?: boolean   // opens external link instead of lightbox
  instagramUrl?: string
}

function extractYouTubeThumbnail(url: string): string {
  const match = url.match(/(?:youtu\.be\/|watch\?v=|embed\/)([A-Za-z0-9_-]{11})/)
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
  }
  return ''
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  } catch {
    return dateStr
  }
}

export function VideoTile({
  title,
  description,
  date,
  youtube,
  preview,
  poster,
  isInstagram = false,
  instagramUrl,
}: VideoTileProps) {
  const shouldReduceMotion = useReducedMotion()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Pause video when offscreen for performance
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const thumbnail = poster || (youtube ? extractYouTubeThumbnail(youtube) : '')

  const handleClick = () => {
    if (isInstagram && instagramUrl) {
      window.open(instagramUrl, '_blank', 'noopener,noreferrer')
    } else if (youtube) {
      setLightboxOpen(true)
    }
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="group relative w-full overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500"
        style={{ aspectRatio: '16/9' }}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.03, rotate: 0.3, zIndex: 10 }}
      >
        {preview ? (
          <video
            ref={videoRef}
            src={preview}
            poster={thumbnail || undefined}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
        ) : thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="absolute inset-0 rounded-xl bg-stone-300" />
        )}

        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-serif text-sm font-medium text-parchment leading-snug line-clamp-2">
            {title}
          </p>
          {description && (
            <p className="text-xs text-parchment/70 mt-0.5 line-clamp-1">{description}</p>
          )}
          {date && (
            <p className="text-xs text-parchment/50 mt-1">{formatDate(date)}</p>
          )}
        </div>

        {!isInstagram && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-parchment/20 backdrop-blur-sm">
              <svg className="h-5 w-5 text-parchment ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </motion.button>

      {lightboxOpen && youtube && (
        <VideoLightbox youtubeId={youtube} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  )
}
