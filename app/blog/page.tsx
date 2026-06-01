import { getPosts } from './posts'
import { BlogIndex } from '@/components/ui/blog-index'

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogIndex posts={posts} />
}
