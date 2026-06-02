import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { imageSize } from 'image-size'
import { Metadata } from 'next'
import { GalleryGrid, GalleryImage } from '@/components/ui/gallery-grid'
import { PageHeader } from '@/components/ui/page-header'

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
    <div className="mx-auto max-w-screen-xl px-6 py-16">
      <PageHeader
        index="02"
        eyebrow="Gallery"
        title="Photographs"
        lead="Moments caught in stillness — wherever the light happened to fall."
        meta={`${String(images.length).padStart(2, '0')} frames`}
      />

      <GalleryGrid images={images} />
    </div>
  )
}
