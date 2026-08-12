import { Metadata } from 'next'
import { GalleryGrid } from '@/components/ui/gallery-grid'
import { FieldLabel } from '@/components/ui/field-label'
import { PageHeader } from '@/components/ui/page-header'
import { SeriesRow } from '@/components/ui/series-row'
import { getAllFrames, getSeries } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Photographs',
  description: 'A collection of photographs by Mackenzie Dy.',
}

export default function GalleryPage() {
  const series = getSeries()
  const images = getAllFrames()

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16">
      <PageHeader
        index="02"
        eyebrow="Gallery"
        title="Photographs"
        lead="Capturing life through my camera — Sony a6700 with a 18-50 mm f/2.8 lens."
        meta={`${String(images.length).padStart(2, '0')} frames`}
      />

      {series.length > 0 && (
        <section className="mb-16">
          <div className="mb-6">
            <FieldLabel>Series</FieldLabel>
          </div>
          <SeriesRow series={series} />
        </section>
      )}

      <section>
        {series.length > 0 && (
          <div className="mb-6">
            <FieldLabel>All frames</FieldLabel>
          </div>
        )}
        <GalleryGrid images={images} />
      </section>
    </div>
  )
}
