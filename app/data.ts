type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  date?: string
  tags?: string[]
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Terminecraft',
    description:
      'basic minecraft in terminal through raytracing',
    link: 'https://github.com/dymackenzie/terminecraft',
    video:
      '',
    id: 'project1',
  },
  {
    name: 'Typo',
    description: 'a 2D typing dungeon game made in Godot',
    link: 'https://github.com/dymackenzie/Typo',
    video:
      '',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Lucid Vision Labs',
    title: 'Junior Software Developer',
    start: '2024',
    end: 'Present',
    link: 'https://thinklucid.com/',
    id: 'work1',
  },
  {
    company: 'nwPlus',
    title: 'Media Coordinator',
    start: '2024',
    end: 'Present',
    link: 'https://nwplus.io',
    id: 'work2',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
    date: '2025-06-12',
    tags: ['design', 'ai', 'process'],
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
    date: '2024-11-02',
    tags: ['career', 'founder', 'personal'],
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
    date: '2024-07-18',
    tags: ['freelancing', 'process', 'advice'],
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
    date: '2024-02-05',
    tags: ['mdx', 'nextjs', 'seo'],
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/dymackenzie',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/mackenziedy',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/dymackenzie',
  },
]

export const EMAIL = 'mackenziedy@hotmail.com'
