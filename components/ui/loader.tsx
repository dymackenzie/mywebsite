'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

/** A brief on-brand splash that holds the first paint until the page's media
 *  (notably the hero video) has had a moment to buffer, then dissolves. A hard
 *  cap guarantees it never overstays. */
export function Loader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const MIN = 350 // avoid a jarring flash on fast loads
    const MAX = 2200 // never hang, even if `load` never fires
    let minTimer: ReturnType<typeof setTimeout>

    const finish = () => {
      const elapsed = Date.now() - start
      minTimer = setTimeout(() => setDone(true), Math.max(0, MIN - elapsed))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    const cap = setTimeout(() => setDone(true), MAX)

    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(minTimer)
      clearTimeout(cap)
    }
  }, [])

  // Lock the page while the splash is up so nothing scrolls behind it.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('is-loading', !done)
    return () => root.classList.remove('is-loading')
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment"
        >
          <div className="flex flex-col items-center gap-5">
            <span className="font-serif text-2xl italic text-ink">
              Mackenzie Dy
            </span>
            <span className="relative block h-px w-32 overflow-hidden bg-stone-200">
              {!reduce && (
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/3 bg-clay-400"
                  animate={{ x: ['-120%', '320%'] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
