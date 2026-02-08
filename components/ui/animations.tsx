'use client'

export const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

export const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const VARIANTS_ITEM = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

export const TRANSITION_SECTION = { duration: 0.35 }
