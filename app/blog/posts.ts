import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export type PostMeta = {
  title: string
  description: string
  date: string
  uid: string
  tags?: string[]
  cover?: string
  pinned?: boolean
  featuredMain?: boolean
}

export type Post = PostMeta & {
  slug: string
  link: string
}

/**
 * Build the metadata export for a blog post. Each `page.mdx` calls this once,
 * and the same object drives both the Next.js `<head>` and the blog index.
 */
export function definePost(meta: PostMeta) {
  return {
    ...meta,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  }
}

const POSTS_DIR = join(process.cwd(), 'app', 'blog', '(post)')

/**
 * Read every post under `app/blog/(post)/<slug>/page.mdx`, pulling its listing
 * data straight from the `metadata` export so adding a post is just one file.
 */
export async function getPosts(): Promise<Post[]> {
  const slugs = readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(`./(post)/${slug}/page.mdx`)) as {
        metadata: PostMeta
      }
      return {
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        uid: metadata.uid,
        tags: metadata.tags,
        cover: metadata.cover,
        pinned: metadata.pinned,
        featuredMain: metadata.featuredMain,
        slug,
        link: `/blog/${slug}`,
      }
    })
  )

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
