/**
 * Source URLs in `app/data.ts` are stored bare:
 *   https://res.cloudinary.com/<cloud>/video/upload/v123/clip.mp4
 * These slot transformation flags in after `/upload/` so Cloudinary transcodes
 * on the fly instead of us shipping the full-resolution master every time.
 */

type Opts = {
  /** Largest width the clip is actually displayed at. */
  width?: number
  /** Cloudinary quality string — 'auto', 'auto:good', 'auto:best'. */
  quality?: string
}

const UPLOAD = '/upload/'

function insertTransform(url: string, transform: string) {
  const at = url.indexOf(UPLOAD)
  if (at === -1) return url // not a Cloudinary upload URL — leave it alone
  return (
    url.slice(0, at + UPLOAD.length) +
    transform +
    '/' +
    url.slice(at + UPLOAD.length)
  )
}

export function cldVideo(url: string, { width, quality = 'auto' }: Opts = {}) {
  const parts = ['f_auto', `q_${quality}`]
  if (width) parts.push(`w_${width}`, 'c_limit')
  return insertTransform(url, parts.join(','))
}

/** A still frame from the same clip, for use as a poster or a mobile fallback. */
export function cldPoster(url: string, { width }: Opts = {}) {
  const parts = ['f_auto', 'q_auto']
  if (width) parts.push(`w_${width}`, 'c_limit')
  return insertTransform(url, parts.join(',')).replace(
    /\.(mp4|webm|mov)(\?.*)?$/i,
    '.jpg$2'
  )
}
