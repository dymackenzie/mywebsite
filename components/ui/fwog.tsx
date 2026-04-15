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
  const headerBoundsRef = useRef({ left: 0, top: 0, width: 0 })
  const laneTopRef = useRef(50)

  useEffect(() => {
    const size = 100 // px visual size

    function updateHeaderBounds() {
      const header = document.getElementById('site-header')
      if (!header) return

      const rect = header.getBoundingClientRect()
      headerBoundsRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
      }

      laneTopRef.current = Math.max(0, rect.top + rect.height / 2 - 50)

      const minX = rect.left
      const maxX = rect.left + Math.max(0, rect.width - size)
      targetXRef.current = clamp(targetXRef.current, minX, maxX)

      if (posRef.current.x === 50 && posRef.current.y === 50) {
        posRef.current.x = minX
        posRef.current.y = laneTopRef.current
      }

      posRef.current.x = clamp(posRef.current.x, minX, maxX)
      posRef.current.y = laneTopRef.current
    }

    function handlePointerClick(event: MouseEvent) {
      const { left, width } = headerBoundsRef.current
      const minX = left
      const maxX = left + Math.max(0, width - size)
      targetXRef.current = clamp(event.clientX - size / 2, minX, maxX)
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
      className="fixed inset-0 z-0 overflow-hidden"
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        width={100}
        height={100}
        className="pointer-events-none select-none will-change-transform opacity-15"
        style={{ position: 'absolute', left: 0, top: 0, transform: 'translate3d(50px,50px,0)' }}
      />
    </div>
  )
}
