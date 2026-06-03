'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { cldVideo, cldPoster } from '@/lib/cloudinary'

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
  /**
   * Scroll parallax depth. Positive drifts the tile up as the page scrolls,
   * negative drifts it down; pair opposite signs on adjacent tiles for depth.
   * 0 disables. Expressed in px of total travel across the viewport.
   */
  parallax?: number
  /** Wipe the clip open with a clip-path reveal as it enters. */
  reveal?: boolean
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
  parallax = 0,
  reveal = false,
}: CinematicClipProps) {
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const figureRef = useRef<HTMLElement>(null)

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

  // Scroll-linked parallax drift across the whole time the tile is in view.
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ['start end', 'end start'],
  })
  const driftY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  const offset =
    from === 'left' ? { x: -48 } : from === 'right' ? { x: 48 } : { y: 36 }

  // Direction the clip-path wipe opens from, matching the slide-in.
  const clipClosed =
    from === 'left'
      ? 'inset(0 100% 0 0 round var(--r))'
      : from === 'right'
        ? 'inset(0 0 0 100% round var(--r))'
        : 'inset(100% 0 0 0 round var(--r))'

  return (
    <motion.figure
      ref={figureRef}
      className={`relative m-0 ${className}`}
      style={parallax && !shouldReduceMotion ? { y: driftY } : undefined}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        data-cursor="view"
        className={`group relative h-full w-full overflow-hidden shadow-[0_1px_2px_rgba(40,35,28,0.06),0_18px_40px_-24px_rgba(40,35,28,0.5)] ring-1 ring-ink/5 ${
          rounded ? 'rounded-2xl' : ''
        }`}
        style={{ ['--r' as string]: rounded ? '1rem' : '0px' }}
        initial={
          shouldReduceMotion || !reveal
            ? false
            : { clipPath: clipClosed, scale: 1.08 }
        }
        whileInView={
          reveal
            ? { clipPath: 'inset(0 0 0 0 round var(--r))', scale: 1 }
            : undefined
        }
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.025, rotate: -0.4, y: -6 }
        }
      >
        <video
          ref={videoRef}
          src={cldVideo(src, { width: 1280 })}
          poster={poster ?? cldPoster(src, { width: 1280 })}
          muted
          loop
          playsInline
          autoPlay={priority}
          preload={priority ? 'auto' : 'none'}
          className={`absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-100 ${
            rounded ? 'rounded-2xl' : ''
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent ${
            rounded ? 'rounded-2xl' : ''
          }`}
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
    </motion.figure>
  )
}
