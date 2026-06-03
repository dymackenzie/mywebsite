import { LikeButton } from '@/components/ui/like-button'
import { formatDate } from '@/lib/date'
import type { PostMeta } from '@/app/blog/posts'

export function PostHeader({ meta }: { meta: PostMeta }) {
  return (
    <>
      {meta.cover && (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meta.cover}
            alt={meta.title}
            className="rounded-xl ring-1 ring-ink/5"
          />
        </figure>
      )}

      <h1>{meta.title}</h1>

      <div className="flex flex-wrap items-center gap-4 mt-3 mb-8">
        <span className="field-note">{formatDate(meta.date)}</span>
        {meta.tags?.map((tag) => (
          <span key={tag} className="field-note text-ink-muted">
            / {tag}
          </span>
        ))}
        <LikeButton uid={meta.uid} />
      </div>
    </>
  )
}
