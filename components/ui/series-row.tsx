import Link from 'next/link'
import type { GallerySeries } from '@/lib/gallery'
import { FadeImage } from '@/components/ui/fade-image'

/** The named collections above the full frame grid on /gallery. */
export function SeriesRow({ series }: { series: GallerySeries[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {series.map((s, i) => (
        <Link key={s.slug} href={`/gallery/${s.slug}`} className="group block">
          <div
            data-cursor="view"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-200/40 ring-1 ring-ink/5"
          >
            <FadeImage
              src={s.cover.src}
              alt={s.title}
              fill
              className="object-cover group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, 33vw"
              priority={i < 3}
            />
          </div>
          <h2 className="mt-3 font-serif text-lg leading-snug text-ink transition-colors group-hover:text-moss-600">
            {s.title}
          </h2>
          {s.blurb && (
            <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">
              {s.blurb}
            </p>
          )}
          <span className="field-note mt-2 block">
            {String(s.images.length).padStart(2, '0')} frames
          </span>
        </Link>
      ))}
    </div>
  )
}
