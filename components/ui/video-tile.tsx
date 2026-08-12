'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { LazyVideo } from '@/components/ui/lazy-video'
import { VideoLightbox } from '@/components/ui/video-lightbox'
import { cldVideo } from '@/lib/cloudinary'

type VideoTileProps = {
  title: string
  description?: string
  date?: string
  /** Full YouTube URL, or empty for an Instagram entry. */
  youtube: string
  /** Cloudinary muted loop. Falls back to the still below when absent. */
  preview?: string
  poster?: string
  isInstagram?: boolean
  instagramUrl?: string
  /** Set on the first tile so the above-the-fold still isn't lazy-loaded. */
  priority?: boolean
}

function youtubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|watch\?v=|embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : ''
}

/**
 * Thumbnail quality ladder, sharpest first. `maxresdefault` is the 16:9 still
 * YouTube only generates for videos uploaded above 720p — it 404s otherwise,
 * which left a broken tile. `sddefault` (640x480) and `hqdefault` (480x360)
 * always exist; they're 4:3 with letterbox bars that `object-cover` crops back
 * off, so the fallbacks still frame correctly. Each `onError` steps down one
 * rung, so a missing `maxresdefault` lands on `sddefault` rather than dropping
 * straight to the softest still.
 */
const THUMBNAIL_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'] as const

function youtubeThumbnail(id: string, step: number) {
  const quality =
    THUMBNAIL_QUALITIES[Math.min(step, THUMBNAIL_QUALITIES.length - 1)]
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

function formatDate(date?: string) {
  if (!date) return ''
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  } catch {
    return date
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
  priority = false,
}: VideoTileProps) {
  const reduce = useReducedMotion()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [thumbStep, setThumbStep] = useState(0)

  const id = youtube ? youtubeId(youtube) : ''
  const still = poster || (id ? youtubeThumbnail(id, thumbStep) : '')

  const open = () => {
    if (isInstagram && instagramUrl) {
      window.open(instagramUrl, '_blank', 'noopener,noreferrer')
    } else if (youtube) {
      setLightboxOpen(true)
    }
  }

  return (
    <>
      <motion.button
        onClick={open}
        data-cursor="view"
        className="group relative w-full overflow-hidden rounded-xl text-left ring-1 ring-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500"
        style={{ aspectRatio: '16/9' }}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={reduce ? {} : { scale: 1.03, rotate: 0.3, zIndex: 10 }}
      >
        {preview ? (
          <LazyVideo
            src={cldVideo(preview, { width: 800 })}
            poster={still}
            stillOnMobile
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
        ) : still ? (
          <Image
            src={still}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            onError={() =>
              setThumbStep((step) =>
                Math.min(step + 1, THUMBNAIL_QUALITIES.length - 1)
              )
            }
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="absolute inset-0 rounded-xl bg-stone-300" />
        )}

        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {date && (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-parchment/60">
              {formatDate(date)}
            </p>
          )}
          <p className="mt-1.5 line-clamp-2 font-serif text-sm font-medium leading-snug text-parchment">
            {title}
          </p>
          {description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-parchment/70">
              {description}
            </p>
          )}
        </div>

        {!isInstagram && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-parchment/20 backdrop-blur-sm">
              <svg
                className="ml-0.5 h-5 w-5 text-parchment"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </motion.button>

      {lightboxOpen && youtube && (
        <VideoLightbox
          youtubeId={youtube}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
