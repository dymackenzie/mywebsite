'use client'

import { useEffect, useRef } from 'react'
import { DESKTOP, useMediaQuery } from '@/lib/use-media-query'

type LazyVideoProps = {
  src: string
  poster: string
  className?: string
  /** Serve the poster still on phones instead. Autoplay is unreliable there
   *  and the clips are most of the page weight. */
  stillOnMobile?: boolean
}

export function LazyVideo({
  src,
  poster,
  className = '',
  stillOnMobile = false,
}: LazyVideoProps) {
  const desktop = useMediaQuery(DESKTOP)
  const showVideo = !stillOnMobile || desktop

  if (!showVideo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className={className}
      />
    )
  }

  return <Clip src={src} poster={poster} className={className} />
}

function Clip({ src, poster, className }: Omit<LazyVideoProps, 'stillOnMobile'>) {
  const ref = useRef<HTMLVideoElement>(null)

  // Nothing downloads until the clip is nearly on screen, and it stops decoding
  // the moment it leaves — half a dozen loops running at once is what makes
  // scrolling stutter.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = 'auto'
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  )
}
