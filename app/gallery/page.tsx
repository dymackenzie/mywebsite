import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { imageSize } from 'image-size'
import { Metadata } from 'next'
import { GalleryGrid, GalleryImage } from '@/components/ui/gallery-grid'

export const metadata: Metadata = {
  title: 'Photographs',
  description: 'A collection of photographs by Mackenzie Dy.',
}

function getImages(): GalleryImage[] {
  const dir = join(process.cwd(), 'public', 'images')
  const files = readdirSync(dir).filter((f) =>
    /\.(jpe?g|png|webp|gif)$/i.test(f)
  )

  return files
    .map((file) => {
      try {
        const dimensions = imageSize(join(dir, file))
        return {
          src: `/images/${file}`,
          width: dimensions.width ?? 1200,
          height: dimensions.height ?? 800,
        }
      } catch {
        return null
      }
    })
    .filter((img): img is GalleryImage => img !== null)
}

export default function GalleryPage() {
  const images = getImages()

  return (
    <div className="mx-auto max-w-screen-md px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-semibold text-ink">Photographs</h1>
        <p className="mt-2 text-ink-muted">
          {images.length} photographs — moments captured in stillness
        </p>
      </div>

      <GalleryGrid images={images} />
    </div>
  )
}
