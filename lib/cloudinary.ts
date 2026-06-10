/**
 * Helpers for Cloudinary delivery URLs.
 *
 * Source URLs in `app/data.ts` are stored bare, e.g.
 *   https://res.cloudinary.com/<cloud>/video/upload/v123/clip.mp4
 * These insert transformation flags after `/upload/` so Cloudinary transcodes
 * on the fly — auto format/quality and a width cap suited to where the clip is
 * shown — instead of shipping the full-resolution source every time.
 */

type VideoOpts = {
  /** Max delivered width in px. Pick the largest size the clip is shown at. */
  width?: number
  /**
   * Cloudinary quality string. Defaults to 'auto' (balanced).
   * Use 'auto:best' for the highest-quality delivery tier.
   */
  quality?: string
}

const UPLOAD = '/upload/'

function insertTransform(url: string, transform: string): string {
  const at = url.indexOf(UPLOAD)
  // Not a Cloudinary upload URL (or already transformed) — leave it untouched.
  if (at === -1) return url
  const head = url.slice(0, at + UPLOAD.length)
  const tail = url.slice(at + UPLOAD.length)
  return `${head}${transform}/${tail}`
}

/** Transformed video URL: auto format + configurable quality, optionally width-capped. */
export function cldVideo(url: string, { width, quality = 'auto' }: VideoOpts = {}): string {
  const parts = ['f_auto', `q_${quality}`]
  if (width) parts.push(`w_${width}`, 'c_limit')
  return insertTransform(url, parts.join(','))
}

/**
 * A still poster (JPEG) generated from a Cloudinary video, for use before the
 * video buffers. Swaps the `.mp4`/`.webm` extension for `.jpg` and applies the
 * same auto-format/quality + width cap.
 */
export function cldPoster(url: string, { width }: VideoOpts = {}): string {
  const parts = ['f_auto', 'q_auto']
  if (width) parts.push(`w_${width}`, 'c_limit')
  const withTransform = insertTransform(url, parts.join(','))
  return withTransform.replace(/\.(mp4|webm|mov)(\?.*)?$/i, '.jpg$2')
}
