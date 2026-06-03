'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from 'motion/react'

type VelocityMarqueeProps = {
  children: string
  /** Idle drift in % of track width per second. Sign sets resting direction. */
  baseVelocity?: number
  className?: string
  /** Outlined (stroke-only) text instead of filled. Reads as a ghost band. */
  outline?: boolean
}

/**
 * A band of oversized serif text that streams sideways. At rest it drifts; as
 * the page scrolls it surges in the scroll direction and shears — the faster
 * you fling the page, the more it leans. Reduced-motion users get a static row.
 */
export function VelocityMarquee({
  children,
  baseVelocity = -3,
  className = '',
  outline = false,
}: VelocityMarqueeProps) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  // Scroll speed → a multiplier on the idle drift.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 6], {
    clamp: false,
  })
  // Scroll speed → a shear, so the band leans into the motion.
  const skew = useTransform(smoothVelocity, [-1200, 0, 1200], [10, 0, -10], {
    clamp: true,
  })

  // The track holds four copies; wrap keeps one copy always covering the frame.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((_t, delta) => {
    if (reduce) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    // Let the scroll direction take over the drift direction.
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const items = Array.from({ length: 4 })

  return (
    <div
      aria-hidden
      className={`relative flex w-full flex-nowrap overflow-hidden ${className}`}
    >
      <motion.div
        className="flex flex-nowrap whitespace-nowrap will-change-transform"
        style={reduce ? undefined : { x, skewX: skew }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            className={`block pr-10 font-serif italic leading-none text-[clamp(2.5rem,11vw,9rem)] ${
              outline ? 'marquee-outline' : 'text-ink/90'
            }`}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
