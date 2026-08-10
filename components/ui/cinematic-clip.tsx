'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { LazyVideo } from '@/components/ui/lazy-video'
import { Parallax } from '@/components/ui/parallax'
import { cldPoster, cldVideo } from '@/lib/cloudinary'

const EASE = [0.22, 1, 0.36, 1] as const

type CinematicClipProps = {
  src: string
  poster?: string
  caption?: string
  /** Sizing / aspect / grid placement for the tile. */
  className?: string
  from?: 'left' | 'right' | 'up'
  rounded?: boolean
  captionBelow?: boolean
  /** Scroll drift in px; opposite signs on adjacent tiles reads as depth. */
  parallax?: number
  /** Wipe the tile open as it enters. */
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
  parallax = 0,
  reveal = false,
}: CinematicClipProps) {
  const reduce = useReducedMotion()
  const radius = rounded ? 'rounded-2xl' : ''

  // One observer feeds both the slide-in and the wipe. Both `animate` props
  // below must name an explicit target in each direction: left undefined,
  // Motion defers to the parent's state and the tile can sit at opacity 0
  // forever, which depends on whether Parallax wrapped it in a motion element.
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const entered = reduce || inView

  const hidden =
    from === 'left' ? { x: -48 } : from === 'right' ? { x: 48 } : { y: 36 }
  const shown = { opacity: 1, x: 0, y: 0 }

  const closed = {
    clipPath:
      from === 'left'
        ? 'inset(0 100% 0 0 round var(--r))'
        : from === 'right'
          ? 'inset(0 0 0 100% round var(--r))'
          : 'inset(100% 0 0 0 round var(--r))',
    scale: 1.08,
  }
  const open = { clipPath: 'inset(0 0 0 0 round var(--r))', scale: 1 }
  const wipes = reveal && !reduce

  return (
    <Parallax distance={parallax} className={`relative ${className}`}>
      <motion.figure
        ref={ref}
        className="relative m-0 h-full w-full"
        initial={reduce ? false : { opacity: 0, ...hidden }}
        animate={entered ? shown : { opacity: 0, ...hidden }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.div
          data-cursor="view"
          className={`group relative h-full w-full overflow-hidden shadow-[0_1px_2px_rgba(40,35,28,0.06),0_18px_40px_-24px_rgba(40,35,28,0.5)] ring-1 ring-ink/5 ${radius}`}
          style={{ ['--r' as string]: rounded ? '1rem' : '0px' }}
          initial={wipes ? closed : false}
          animate={wipes ? (inView ? open : closed) : undefined}
          transition={{ duration: 1.1, ease: EASE }}
          whileHover={reduce ? {} : { scale: 1.025, rotate: -0.4, y: -6 }}
        >
          <LazyVideo
            src={cldVideo(src, { width: 1280 })}
            poster={poster ?? cldPoster(src, { width: 900 })}
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
      </motion.figure>
    </Parallax>
  )
}
