import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { imageSize } from 'image-size'
import type { GalleryImage } from '@/components/ui/gallery-grid'

/**
 * The gallery is read straight off disk at build time.
 *
 *   public/images/*.webp            → loose frames
 *   public/images/<slug>/*.webp     → a named series at /gallery/<slug>
 *   public/images/<slug>/series.json → optional { title, blurb, cover, order }
 *
 * Adding a series is making a folder; nothing needs registering anywhere.
 */

export type GallerySeries = {
  slug: string
  title: string
  blurb?: string
  cover: GalleryImage
  images: GalleryImage[]
}

type SeriesMeta = {
  title?: string
  blurb?: string
  /** Filename within the folder, e.g. "KEN07001.webp". */
  cover?: string
  /** Lower sorts first; series without one fall to the end, sorted by title. */
  order?: number
}

const IMAGES_DIR = join(process.cwd(), 'public', 'images')
const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i

/** Every image in one directory, with its intrinsic dimensions. */
function readImages(absDir: string, urlPrefix: string): GalleryImage[] {
  return readdirSync(absDir)
    .filter((file) => IMAGE_RE.test(file))
    .sort()
    .map((file) => {
      try {
        const dimensions = imageSize(join(absDir, file))
        return {
          src: `${urlPrefix}/${file}`,
          width: dimensions.width ?? 1200,
          height: dimensions.height ?? 800,
        }
      } catch {
        return null
      }
    })
    .filter((img): img is GalleryImage => img !== null)
}

function readMeta(absDir: string): SeriesMeta {
  try {
    return JSON.parse(
      readFileSync(join(absDir, 'series.json'), 'utf8')
    ) as SeriesMeta
  } catch {
    return {}
  }
}

/** "coast-trail" → "Coast Trail" — the fallback when there is no series.json. */
function titleFromSlug(slug: string) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

export function getSeries(): GallerySeries[] {
  const slugs = readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const found: (GallerySeries & { order?: number })[] = []

  for (const slug of slugs) {
    const absDir = join(IMAGES_DIR, slug)
    const images = readImages(absDir, `/images/${slug}`)
    if (images.length === 0) continue

    const meta = readMeta(absDir)
    const cover =
      images.find((img) => img.src === `/images/${slug}/${meta.cover}`) ??
      images[0]

    found.push({
      slug,
      title: meta.title ?? titleFromSlug(slug),
      blurb: meta.blurb,
      cover,
      images,
      order: meta.order,
    })
  }

  return found.sort((a, b) => {
    const ao = a.order ?? Infinity
    const bo = b.order ?? Infinity
    return ao === bo ? a.title.localeCompare(b.title) : ao - bo
  })
}

export function getSeriesBySlug(slug: string): GallerySeries | undefined {
  return getSeries().find((series) => series.slug === slug)
}

/** The loose frames plus every series' frames, for the "All frames" grid. */
export function getAllFrames(): GalleryImage[] {
  return [
    ...readImages(IMAGES_DIR, '/images'),
    ...getSeries().flatMap((series) => series.images),
  ]
}
