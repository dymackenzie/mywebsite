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

type Video = {
  title: string
  description?: string
  youtube: string
  thumbnail?: string
  date?: string
  id: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Terminecraft',
    description:
      'basic minecraft in terminal through raytracing',
    link: 'https://github.com/dymackenzie/terminecraft',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770630478/terminecraft_iluaxf.mp4',
    id: 'project1',
  },
  {
    name: 'Typo',
    description: 'a 2D typing dungeon game made in Godot',
    link: 'https://github.com/dymackenzie/Typo',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770630479/typo_wit7vk.mp4',
    id: 'project2',
  },
  {
    name: 'Immigr8',
    description: 'an Android social app that allows immigrants to network',
    link: 'https://github.com/dymackenzie/Immigr8',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770631712/immigr8_product_dppzmb.mp4',
    id: 'project5',
  },
  {
    name: 'Python Chess Engine',
    description: 'an alphabeta chess engine using Python\'s Tkinter',
    link: 'https://github.com/dymackenzie/chess-engine',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770630479/chess_qxgajq.mp4',
    id: 'project3',
  },
  {
    name: 'Physics Engine',
    description: 'a simple 2D physics engine from scratch in Java',
    link: 'https://github.com/dymackenzie/physics-engine',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770631928/physics_po08qk.mp4',
    id: 'project4',
  },
]

export const VIDEOS: Video[] = [
  {
    title: 'nwHacks 2026',
    description: 'cinematic recap of nwHacks 2026',
    youtube: 'https://youtu.be/ae8lVaB7HTQ',
    date: '2026-01-18',
    id: 'video7',
  },
  {
    title: 'what does it mean to live a full life?',
    description: '2025 year recap',
    youtube: 'https://youtu.be/27IG3CToopw',
    date: '2026-01-08',
    id: 'video6',
  },
  {
    title: 'HackCamp 2025',
    description: 'cinematic recap of HackCamp 2025',
    youtube: 'https://youtu.be/x0zixcHCqwE',
    date: '2025-11-16',
    id: 'video5',
  },
  {
    title: 'in another life, my mother...',
    description: 'happy birthday mom',
    youtube: 'https://youtu.be/mDu2dlZc2hM',
    date: '2025-06-27',
    id: 'video4',
  },
  {
    title: 'marathons, the power of friendship, and the importance of doing hard things',
    description: 'my BMO marathon experience',
    youtube: 'https://youtu.be/mqJv5trdNSM',
    date: '2025-05-08',
    id: 'video3',
  },
  {
    title: 'there is a season for everything',
    description: 'my first video with my new Sony and reflections on life',
    youtube: 'https://youtu.be/Sa-1iTL6eyA',
    date: '2025-04-09',
    id: 'video2',
  },
  {
    title: 'hey God, thank you',
    description: '2024 year recap',
    youtube: 'https://youtu.be/6JOTPnZS-cM',
    date: '2025-01-07',
    id: 'video1',
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
    title: 'What Does It Mean To Live A Full Life?',
    description: 'the script from my 2025 year recap video',
    link: '/blog/what-does-it-mean-to-live-a-full-life',
    uid: 'blog-1',
    date: '2026-02-09',
    tags: ['life'],
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
  {
    label: 'YouTube',
    link: 'https://www.youtube.com/@dy_mackenzie',
  },
]

export const EMAIL = 'mackenziedy@hotmail.com'