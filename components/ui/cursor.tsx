'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, [data-cursor]'

const RING = 30
const SCALE = { default: 1, link: 1.47, view: 2.13 }

type Variant = keyof typeof SCALE

/**
 * A precise dot with a ring trailing on a spring behind it. Over links the ring
 * opens up; over media tagged `data-cursor="view"` it fills into a VIEW badge.
 * Mouse only — touch and reduced-motion keep the system cursor.
 */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 450, damping: 34, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 450, damping: 34, mass: 0.6 })

  const seen = useRef(false)

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-ready')

    // Movement only touches motion values, so dragging the mouse across the
    // page doesn't re-render anything.
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!seen.current) {
        seen.current = true
        setVisible(true)
      }
    }

    // `pointerover` fires once per element entered rather than once per pixel,
    // which is the difference between one DOM walk and hundreds a second.
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest(
        INTERACTIVE
      ) as HTMLElement | null
      if (!el) setVariant('default')
      else setVariant(el.dataset.cursor === 'view' ? 'view' : 'link')
    }

    const leave = () => {
      seen.current = false
      setVisible(false)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('cursor-ready')
    }
  }, [reduce, x, y])

  if (!enabled) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{ width: RING, height: RING }}
        >
          {/* scaled rather than resized — width/height would relayout each frame */}
          <motion.span
            className="absolute inset-0 rounded-full border"
            animate={{
              scale: SCALE[variant],
              opacity: visible ? 1 : 0,
              borderColor:
                variant === 'view'
                  ? 'rgba(43,42,38,0)'
                  : variant === 'link'
                    ? 'rgba(82,120,69,0.7)'
                    : 'rgba(43,42,38,0.4)',
              backgroundColor:
                variant === 'view' ? 'rgba(43,42,38,0.92)' : 'rgba(43,42,38,0)',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          />

          <AnimatePresence>
            {variant === 'view' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[0.55rem] uppercase tracking-[0.2em] text-parchment"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                View
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          animate={{ opacity: visible && variant !== 'view' ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  )
}
