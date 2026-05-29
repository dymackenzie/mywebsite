'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function Fwog() {
  const [position, setPosition] = useState(16)
  const [isRunning, setIsRunning] = useState(false)
  const [facing, setFacing] = useState<'left' | 'right'>('right')
  const targetRef = useRef(position)
  const animFrameRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const moveTo = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = clientX - rect.left
    const clamped = Math.max(0, Math.min(rect.width - 32, relX - 16))
    targetRef.current = clamped
    setFacing(clamped > position ? 'right' : 'left')
    setIsRunning(true)
  }, [position])

  useEffect(() => {
    const onClick = (e: MouseEvent) => moveTo(e.clientX)
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [moveTo])

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        const diff = targetRef.current - prev
        if (Math.abs(diff) < 1) {
          setIsRunning(false)
          return targetRef.current
        }
        return prev + diff * 0.12
      })
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 overflow-hidden"
    >
      <div
        className="absolute bottom-0 transition-none opacity-30"
        style={{
          left: position,
          transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isRunning ? '/fwog_running_scaled_100x.gif' : '/fwog_scaled_100x.gif'}
          alt=""
          width={32}
          height={32}
          className="h-8 w-auto"
        />
      </div>
    </div>
  )
}
