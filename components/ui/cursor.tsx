'use client'

import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react'

/**
 * A refined custom cursor: a precise center dot plus a ring that trails on a
 * soft spring. Over interactive elements the ring expands; over media tagged
 * `data-cursor="view"` it swells into a small mono "VIEW" badge.
 *
 * Mounts only on precise pointers (mouse) and bails entirely for touch or
 * reduced-motion users, leaving the system cursor untouched.
 */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<'default' | 'link' | 'view'>('default')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 450, damping: 34, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 450, damping: 34, mass: 0.6 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-ready')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const el = e.target as Element | null
      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null

      if (interactive?.dataset.cursor === 'view') setVariant('view')
      else if (interactive) setVariant('link')
      else setVariant('default')
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('cursor-ready')
    }
  }, [reduce, x, y])

  if (!enabled) return null

  const ringSize = variant === 'view' ? 64 : variant === 'link' ? 44 : 30

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    >
      {/* trailing ring — outer node tracks the point, inner node centers + scales */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="flex items-center justify-center rounded-full border mix-blend-multiply"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: ringSize,
            height: ringSize,
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
        >
          <AnimatePresence>
            {variant === 'view' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="text-[0.55rem] uppercase tracking-[0.2em] text-parchment"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                View
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* precise center dot */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-ink"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{ opacity: visible && variant !== 'view' ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  )
}
