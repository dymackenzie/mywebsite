'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { LazyVideo } from '@/components/ui/lazy-video'
import { cldPoster, cldVideo } from '@/lib/cloudinary'

const EASE = [0.22, 1, 0.36, 1] as const

type CinematicClipProps = {
  src: string
  poster?: string
  caption?: string
  /** Sizing / aspect / grid placement for the tile. */
  className?: string
  rounded?: boolean
  captionBelow?: boolean
  /** Largest width the tile is actually rendered at, doubled for retina.
   *  Cloudinary transcodes to this rather than shipping the master. */
  width?: number
}

/**
 * A looping clip that fades in once as it enters. Deliberately nothing here is
 * scroll-linked: every per-frame measurement on the home page was a per-frame
 * layout read, and a column of them is what made scrolling stutter.
 */
export function CinematicClip({
  src,
  poster,
  caption,
  className = '',
  rounded = true,
  captionBelow = false,
  width = 720,
}: CinematicClipProps) {
  const reduce = useReducedMotion()
  const radius = rounded ? 'rounded-2xl' : ''

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const entered = reduce || inView

  return (
    <figure ref={ref} className={`relative m-0 ${className}`}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.9, ease: EASE }}
        data-cursor="view"
        whileHover={reduce ? {} : { scale: 1.025, rotate: -0.4 }}
        className={`group relative h-full w-full overflow-hidden shadow-[0_1px_2px_rgba(40,35,28,0.06),0_18px_40px_-24px_rgba(40,35,28,0.5)] ring-1 ring-ink/5 ${radius}`}
      >
        <LazyVideo
          src={cldVideo(src, { width })}
          poster={poster ?? cldPoster(src, { width: 640 })}
          stillOnMobile
          className={`absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-100 ${radius}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent ${radius}`}
        />

        {caption && !captionBelow && (
          <figcaption className="field-note absolute bottom-4 left-4 translate-y-1 text-parchment/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-parchment/90">
            {caption}
          </figcaption>
        )}
      </motion.div>

      {caption && captionBelow && (
        <figcaption className="field-note mt-3 text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
