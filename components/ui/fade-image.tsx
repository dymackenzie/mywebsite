'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * `next/image` that dissolves in once the file has actually decoded, instead of
 * snapping to full opacity the moment the browser has it. The surrounding tile
 * can finish its own entrance long before the photo arrives, which is what made
 * the gallery pop rather than fade.
 */
export function FadeImage({ className = '', src, ...props }: ImageProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // A cached image finishes loading before hydration attaches onLoad, so the
  // handler never fires and the tile would sit at opacity-0 forever. Re-runs on
  // src so a reused element fades its next image in too.
  useEffect(() => {
    setLoaded(ref.current?.complete ?? false)
  }, [src])

  const visible = loaded || reduce

  return (
    // `alt` arrives through the spread, which the a11y rule can't follow.
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      ref={ref}
      src={src}
      onLoad={() => setLoaded(true)}
      // One transition declaration covers the fade and the callers' hover
      // effects — a second `transition-*` utility from a caller would clobber
      // this one rather than compose with it.
      className={`transition-[opacity,filter,transform] duration-500 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      {...props}
    />
  )
}
