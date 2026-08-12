import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GalleryGrid } from '@/components/ui/gallery-grid'
import { PageHeader } from '@/components/ui/page-header'
import { getSeries, getSeriesBySlug } from '@/lib/gallery'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getSeries().map((series) => ({ slug: series.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const series = getSeriesBySlug(slug)
  if (!series) return {}

  return {
    title: series.title,
    description:
      series.blurb ?? `Photographs from ${series.title} by Mackenzie Dy.`,
  }
}

export default async function SeriesPage({ params }: Params) {
  const { slug } = await params
  const series = getSeriesBySlug(slug)
  if (!series) notFound()

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16">
      <Link
        href="/gallery"
        data-cursor
        className="field-note mb-8 inline-flex items-center gap-2 transition-colors hover:text-ink"
      >
        <span aria-hidden>&larr;</span> Photographs
      </Link>

      <PageHeader
        index="02"
        eyebrow="Series"
        title={series.title}
        lead={series.blurb}
        meta={`${String(series.images.length).padStart(2, '0')} frames`}
      />

      <GalleryGrid images={series.images} />
    </div>
  )
}
