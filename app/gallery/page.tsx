import fs from 'fs'
import path from 'path'
import GalleryView from '@/components/gallery/GalleryView'
import { imageSize } from 'image-size'

function getPublicImages() {
  const publicImagesDir = path.join(process.cwd(), 'public', 'images')
  let files: string[] = []

  try {
    files = fs.readdirSync(publicImagesDir)
  } catch (e) {
    return []
  }

  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']
  const images = files
    .filter((f) => allowed.includes(path.extname(f).toLowerCase()))
    .map((f) => {
      const abs = path.join(publicImagesDir, f)
        let size: { width: number; height: number } | null = null
        try {
          size = imageSize(abs) as { width: number; height: number }
        } catch (e) {
          // fall back to null, client will measure onLoad
        }
      return { src: `/images/${f}`, width: size?.width, height: size?.height }
    })

  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = images[i]
    images[i] = images[j]
    images[j] = tmp
  }

  return images
}

export default function GalleryPage() {
  const images = getPublicImages()

  return <GalleryView images={images} />
}
