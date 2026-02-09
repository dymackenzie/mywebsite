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

  return images
}

export default function GalleryPage() {
  const images = getPublicImages()

  return <GalleryView images={images} />
}
