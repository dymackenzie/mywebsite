'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type CinematicClipProps = {
  src: string
  poster?: string
  caption?: string
  /** Tailwind classes controlling size / aspect / placement of the tile. */
  className?: string
  /** Slide-in direction as the clip scrolls into view. */
  from?: 'left' | 'right' | 'up'
  /** Rounded corners (default true). Hero uses square edges. */
  rounded?: boolean
  /** Render caption beneath the clip instead of on hover. */
  captionBelow?: boolean
  priority?: boolean
}

export function CinematicClip({
  src,
  poster,
  caption,
  className = '',
  from = 'up',
  rounded = true,
  captionBelow = false,
  priority = false,
}: CinematicClipProps) {
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play only while on screen — keeps a page full of clips light.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const offset =
    from === 'left' ? { x: -48 } : from === 'right' ? { x: 48 } : { y: 36 }

  return (
    <motion.figure
      className={`relative m-0 ${className}`}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`group relative h-full w-full overflow-hidden ${
          rounded ? 'rounded-2xl' : ''
        }`}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.025, rotate: -0.4, y: -6 }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={priority}
          preload={priority ? 'auto' : 'metadata'}
          className={`absolute inset-0 h-full w-full object-cover ${
            rounded ? 'rounded-2xl' : ''
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent ${
            rounded ? 'rounded-2xl' : ''
          }`}
        />

        {caption && !captionBelow && (
          <figcaption className="absolute bottom-3 left-4 font-serif text-sm italic text-parchment/0 transition-colors duration-500 group-hover:text-parchment/90">
            {caption}
          </figcaption>
        )}
      </motion.div>

      {caption && captionBelow && (
        <figcaption className="mt-2 font-serif text-sm italic text-ink-faint">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
