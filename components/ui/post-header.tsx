import { LikeButton } from '@/components/ui/like-button'
import { formatDate } from '@/lib/date'
import type { PostMeta } from '@/app/blog/posts'

export function PostHeader({ meta }: { meta: PostMeta }) {
  return (
    <>
      {meta.cover && (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={meta.cover} alt={meta.title} className="rounded-xl" />
        </figure>
      )}

      <h1>{meta.title}</h1>

      <div className="flex items-center gap-4 text-sm text-ink-faint mt-2 mb-8">
        <span>{formatDate(meta.date)}</span>
        {meta.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-stone-100 text-ink-muted rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
        <LikeButton uid={meta.uid} />
      </div>
    </>
  )
}
