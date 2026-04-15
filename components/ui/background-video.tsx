'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type BackgroundVideoProps = {
  src: string
  poster?: string
  className?: string
  videoClassName?: string
  overlayClassName?: string
  showOverlay?: boolean
}

export function BackgroundVideo({
  src,
  poster,
  className,
  videoClassName,
  overlayClassName,
  showOverlay = true,
}: BackgroundVideoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className={cn('absolute inset-0 h-full w-full overflow-hidden', className)}>
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className={cn('h-full w-full object-cover', videoClassName)}
        aria-hidden="true"
      />
      {showOverlay ? (
        <div
          className={cn(
            'absolute inset-0 h-full w-full bg-gradient-to-b from-zinc-950/20 via-zinc-950/10 to-zinc-950/35 dark:from-zinc-950/35 dark:via-zinc-950/20 dark:to-zinc-950/55',
            overlayClassName,
          )}
        />
      ) : null}
    </div>
  )
}
