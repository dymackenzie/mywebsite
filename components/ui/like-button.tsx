'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  uid: string
}

export function LikeButton({ uid }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const [count, setCount] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)
  const [animating, setAnimating] = useState(false)

  const storageKey = `liked:${uid}`

  useEffect(() => {
    // Check if already liked
    try {
      setLiked(localStorage.getItem(storageKey) === '1')
    } catch {}

    // Fetch initial count
    fetch(`/api/likes/${uid}`)
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0))
  }, [uid, storageKey])

  const handleLike = async () => {
    if (liked) return

    // Optimistic
    setCount((c) => (c ?? 0) + 1)
    setLiked(true)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)

    try {
      localStorage.setItem(storageKey, '1')
    } catch {}

    try {
      const res = await fetch(`/api/likes/${uid}`, { method: 'POST' })
      const data = await res.json()
      setCount(data.count ?? (count ?? 0) + 1)
    } catch {
      // keep optimistic count
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      aria-label={liked ? `You liked this post (${count ?? 0} likes)` : `Like this post (${count ?? 0} likes)`}
      className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
        liked ? 'text-clay-500 cursor-default' : 'text-ink-muted hover:text-clay-500'
      }`}
    >
      <motion.span
        animate={
          animating && !shouldReduceMotion
            ? { scale: [1, 1.5, 1], rotate: [0, -15, 10, 0] }
            : { scale: 1 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="inline-block"
      >
        {liked ? '♥' : '♡'}
      </motion.span>
      <span>{count ?? '—'}</span>
    </button>
  )
}
