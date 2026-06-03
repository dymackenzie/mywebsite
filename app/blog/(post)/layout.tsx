import Link from 'next/link'

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-screen-md px-6 py-16">
      <Link
        href="/blog"
        className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-ink"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        Writings
      </Link>

      <article
        className="prose prose-stone max-w-none
          prose-headings:font-serif prose-headings:text-ink prose-headings:font-semibold
          prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-2
          prose-p:text-ink-muted prose-p:leading-relaxed
          prose-a:text-moss-600 prose-a:underline prose-a:decoration-stone-300 prose-a:underline-offset-2 hover:prose-a:text-moss-700
          prose-strong:text-ink
          prose-blockquote:border-stone-300 prose-blockquote:text-ink-muted prose-blockquote:not-italic
          prose-img:rounded-xl prose-img:w-full
          prose-figcaption:text-center prose-figcaption:text-ink-faint
          prose-hr:border-stone-200"
      >
        {children}
      </article>
    </div>
  )
}
