'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from 'motion/react'
import { DESKTOP, useMediaQuery } from '@/lib/use-media-query'

type ParallaxProps = {
  /** px of total travel across the viewport. Flip the sign on neighbouring
   *  tiles to get depth. */
  distance: number
  className?: string
  children: React.ReactNode
}

export function Parallax({ distance, className = '', children }: ParallaxProps) {
  const reduce = useReducedMotion()
  const desktop = useMediaQuery(DESKTOP)
  const ref = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)

  // Each scroll-linked transform costs a measurement per frame, and a phone
  // running nine at once is where the stutter came from.
  const drifts = Boolean(distance) && !reduce && desktop

  // The wrapper shape never changes — only the driver comes and goes. Swapping
  // the tree here instead would remount the children on the media-query flip,
  // leaving any observer they own pointed at a detached node.
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
      {drifts && <Drift trackRef={ref} distance={distance} y={y} />}
    </div>
  )
}

/** Renders nothing; just feeds `y` from the wrapper's progress through view. */
function Drift({
  trackRef,
  distance,
  y,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>
  distance: number
  y: MotionValue<number>
}) {
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    y.set(distance - progress * distance * 2)
  })

  return null
}
