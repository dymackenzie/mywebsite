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
  /** Start buffering and playing immediately instead of waiting for the clip
   *  to approach the viewport. For the one clip that is already on screen. */
  eager?: boolean
}

export function LazyVideo({
  src,
  poster,
  className = '',
  stillOnMobile = false,
  eager = false,
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

  return <Clip src={src} poster={poster} className={className} eager={eager} />
}

function Clip({
  src,
  poster,
  className,
  eager,
}: Omit<LazyVideoProps, 'stillOnMobile'>) {
  const ref = useRef<HTMLVideoElement>(null)

  // Autoplay is requested from JS rather than via the `autoPlay` attribute.
  // React applies props in source order, so the attribute lands before `muted`
  // and Safari judges the clip ineligible against a still-unmuted element —
  // that is the play button iOS was showing on the hero.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let playing = false
    const start = () => {
      el.muted = true
      el.play().then(
        () => {
          playing = true
          detachRetries()
        },
        () => {}
      )
    }

    // iOS can refuse the first attempt while the clip is still loading, and
    // refuse it outright in Low Power Mode until the user touches something.
    // Only the eager clip listens for that touch — an off-screen clip must
    // stay paused no matter where the page is tapped.
    const retry = () => {
      if (!playing) start()
    }
    const detachRetries = () => {
      el.removeEventListener('canplay', retry)
      document.removeEventListener('pointerdown', retry)
    }

    if (eager) {
      el.addEventListener('canplay', retry)
      document.addEventListener('pointerdown', retry, { passive: true })
      start()
      return detachRetries
    }

    // Nothing downloads until the clip is nearly on screen, and it stops
    // decoding the moment it leaves — half a dozen loops running at once is
    // what makes scrolling stutter.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = 'auto'
          start()
        } else {
          playing = false
          el.pause()
        }
      },
      { rootMargin: '200px 0px' }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      detachRetries()
    }
  }, [eager])

  return (
    <video
      ref={ref}
      muted
      src={src}
      poster={poster}
      loop
      playsInline
      disableRemotePlayback
      preload={eager ? 'auto' : 'none'}
      className={className}
    />
  )
}
