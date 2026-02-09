"use client"

import React, { useEffect, useRef, useState } from 'react'

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function Fwog() {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const posRef = useRef({ x: 50, y: 50 })
  const dirRef = useRef({ x: 1, y: 0 })
  const speedRef = useRef(120) // px per second
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)
  const [runningSrc] = useState('/fwog_running_scaled_100x.gif')
  const [idleSrc] = useState('/fwog_scaled_100x.gif')
  const [src, setSrc] = useState(runningSrc)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const size = 100 // px visual size

    function step(ts: number) {
      if (lastRef.current == null) lastRef.current = ts
      const dt = (ts - lastRef.current) / 1000
      lastRef.current = ts

      if (!paused) {
        posRef.current.x += dirRef.current.x * speedRef.current * dt
        posRef.current.y += dirRef.current.y * speedRef.current * dt

        // bounce off edges
        const w = window.innerWidth
        const h = window.innerHeight
        if (posRef.current.x < 0) posRef.current.x = 0, dirRef.current.x *= -1
        if (posRef.current.y < 0) posRef.current.y = 0, dirRef.current.y *= -1
        if (posRef.current.x > w - size) posRef.current.x = w - size, dirRef.current.x *= -1
        if (posRef.current.y > h - size) posRef.current.y = h - size, dirRef.current.y *= -1
      }

      // apply transform (keep upright). flip horizontally to face direction.
      const x = posRef.current.x
      const y = posRef.current.y
      const flip = dirRef.current.x < 0 ? -1 : 1
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${flip})`

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [paused])

  useEffect(() => {
    let directionTimer: number | null = null
    let changeTimer: number | null = null

    function pickDirection() {
      const angle = rand(0, Math.PI * 2)
      dirRef.current.x = Math.cos(angle)
      dirRef.current.y = Math.sin(angle)
      // keep a constant speed; configured by initial value in speedRef
    }

    function scheduleChange() {
      const delay = rand(1500, 6000)
      directionTimer = window.setTimeout(() => {
        // small chance to pause
        if (Math.random() < 0.50) {
          setPaused(true)
          setSrc(idleSrc)
          const pauseFor = rand(1800, 3000)
          changeTimer = window.setTimeout(() => {
            setPaused(false)
            setSrc(runningSrc)
            pickDirection()
            scheduleChange()
          }, pauseFor)
        } else {
          pickDirection()
          scheduleChange()
        }
      }, delay)
    }

    pickDirection()
    scheduleChange()

    return () => {
      if (directionTimer) clearTimeout(directionTimer)
      if (changeTimer) clearTimeout(changeTimer)
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
        className="pointer-events-none select-none will-change-transform opacity-50"
        style={{ position: 'absolute', left: 0, top: 0, transform: 'translate3d(50px,50px,0)' }}
      />
    </div>
  )
}
