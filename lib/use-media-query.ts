'use client'

import { useEffect, useState } from 'react'

// Always false on the server and on first paint, so anything gated behind this
// is opt-in on the client rather than something we have to undo.
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const DESKTOP = '(min-width: 768px)'
