"use client"

import React, { useEffect, useRef, useState } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function Fwog() {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const posRef = useRef({ x: 50, y: 50 })
  const targetXRef = useRef(50)
  const facingRef = useRef(1)
  const speedRef = useRef(75) // px per second
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)
  const [runningSrc] = useState('/fwog_running_scaled_100x.gif')
  const [idleSrc] = useState('/fwog_scaled_100x.gif')
  const [src, setSrc] = useState(runningSrc)
  const [visualSize, setVisualSize] = useState(100)
  const headerBoundsRef = useRef({ left: 0, top: 0, width: 0 })
  const laneTopRef = useRef(50)

  useEffect(() => {
    // desired max size, will scale down to fit header height
    const maxSize = 100

    function updateHeaderBounds() {
      const header = document.getElementById('site-header')
      if (!header) return

      const rect = header.getBoundingClientRect()
      const size = Math.min(maxSize, Math.max(24, Math.floor(rect.height - 8)))
      setVisualSize(size)
      // When FWOG is rendered inside the header, coordinates should be relative
      headerBoundsRef.current = {
        left: 0,
        top: 0,
        width: rect.width,
      }

      const maxY = Math.max(0, rect.height - size)
      laneTopRef.current = clamp(rect.height / 2 - size / 2, 0, maxY)

      const minX = 0
      const maxX = Math.max(0, rect.width - size)
      targetXRef.current = clamp(targetXRef.current, minX, maxX)

      if (posRef.current.x === 50 && posRef.current.y === 50) {
        posRef.current.x = minX
        posRef.current.y = laneTopRef.current
      }

      posRef.current.x = clamp(posRef.current.x, minX, maxX)
      posRef.current.y = laneTopRef.current
    }

    function handlePointerClick(event: MouseEvent) {
      const header = document.getElementById('site-header')
      if (!header) return
      const rect = header.getBoundingClientRect()
      const size = Math.min(maxSize, Math.max(24, Math.floor(rect.height - 8)))
      const minX = 0
      const maxX = Math.max(0, rect.width - size)
      targetXRef.current = clamp(event.clientX - rect.left - size / 2, minX, maxX)
    }

    updateHeaderBounds()
    window.addEventListener('resize', updateHeaderBounds)
    window.addEventListener('click', handlePointerClick)

    return () => {
      window.removeEventListener('resize', updateHeaderBounds)
      window.removeEventListener('click', handlePointerClick)
    }
  }, [])

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    function step(ts: number) {
      if (lastRef.current == null) lastRef.current = ts
      const dt = (ts - lastRef.current) / 1000
      lastRef.current = ts

      const prevX = posRef.current.x
      const deltaToTarget = targetXRef.current - posRef.current.x
      const maxStep = speedRef.current * dt

      if (Math.abs(deltaToTarget) <= maxStep) {
        posRef.current.x = targetXRef.current
      } else {
        posRef.current.x += Math.sign(deltaToTarget) * maxStep
      }
      posRef.current.y = laneTopRef.current

      const dx = posRef.current.x - prevX
      if (Math.abs(dx) > 0.1) {
        facingRef.current = dx < 0 ? -1 : 1
      }

      const x = posRef.current.x
      const y = posRef.current.y
      const flip = facingRef.current
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${flip})`

      const isMoving = Math.abs(targetXRef.current - posRef.current.x) > 0.4
      const nextSrc = isMoving ? runningSrc : idleSrc
      setSrc((current) => (current === nextSrc ? current : nextSrc))

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [idleSrc, runningSrc])

    return (
    <div
      aria-hidden
      style={{ pointerEvents: 'none' }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        width={visualSize}
        height={visualSize}
        className="pointer-events-none select-none will-change-transform opacity-15"
        style={{ position: 'absolute', left: 0, top: 0, transform: 'translate3d(50px,50px,0)', width: `${visualSize}px`, height: `${visualSize}px` }}
      />
    </div>
  )
}
