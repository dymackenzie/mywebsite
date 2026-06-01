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

type SocialLink = {
  label: string
  link: string
}

type CinematicClip = {
  id: string
  src: string 
  poster?: string
  caption?: string
}

type Video = {
  title: string
  description?: string
  youtube: string
  thumbnail?: string
  date?: string
  id: string
  preview?: string
  poster?: string
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
    link: 'https://dymackenzie.itch.io/typo',
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
    name: 'Poopyhead',
    description: 'a multiplayer card game',
    link: 'https://poopyhead-mcq8.onrender.com',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1779998419/poopyhead_tfnb9j.mp4',
    id: 'project6',
  },
  {
    name: 'Python Chess Engine',
    description: "an alphabeta chess engine using Python's Tkinter",
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
    title: 'nwPlus Hiring 2026',
    description: '2026 nwPlus hiring video',
    youtube: 'https://www.instagram.com/p/DWZn5cEkk4m/',
    date: '2025-01-07',
    id: 'video1',
    preview: '',
    poster: 'posters/hiring.png',
  },
  {
    title: 'cmdf 2026',
    description: 'cinematic recap of cmdf 2026',
    youtube: 'https://youtu.be/zTsglLJ3bG8',
    date: '2026-03-08',
    id: 'video9',
    preview: '',
    poster: '',
  },
  {
    title: 'nwHacks 2026',
    description: 'cinematic recap of nwHacks 2026',
    youtube: 'https://youtu.be/ae8lVaB7HTQ',
    date: '2026-01-18',
    id: 'video8',
    preview: '',
    poster: '',
  },
  {
    title: 'what does it mean to live a full life?',
    description: '2025 year recap',
    youtube: 'https://youtu.be/27IG3CToopw',
    date: '2026-01-08',
    id: 'video7',
    preview: '',
    poster: '',
  },
  {
    title: 'HackCamp 2025',
    description: 'cinematic recap of HackCamp 2025',
    youtube: 'https://youtu.be/x0zixcHCqwE',
    date: '2025-11-16',
    id: 'video6',
    preview: '',
    poster: '',
  },
  {
    title: 'nwPlus Summer Retreat Master Chef',
    description: 'drama within the nwPlus summer retreat master chef competition',
    youtube:
      'https://www.instagram.com/reel/DQIyMmDkVMn/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA%3D%3D',
    date: '2025-10-22',
    id: 'video5',
    preview: '',
    poster: 'posters/pizza.png',
  },
  {
    title: 'in another life, my mother...',
    description: 'happy birthday mom',
    youtube: 'https://youtu.be/mDu2dlZc2hM',
    date: '2025-06-27',
    id: 'video4',
    preview: '',
    poster: '',
  },
  {
    title: 'marathons, the power of friendship, and the importance of doing hard things',
    description: 'my BMO marathon experience',
    youtube: 'https://youtu.be/mqJv5trdNSM',
    date: '2025-05-08',
    id: 'video3',
    preview: '',
    poster: '',
  },
  {
    title: 'there is a season for everything',
    description: 'my first video with my new Sony and reflections on life',
    youtube: 'https://youtu.be/Sa-1iTL6eyA',
    date: '2025-04-09',
    id: 'video2',
    preview: '',
    poster: '',
  },
  {
    title: 'hey God, thank you',
    description: '2024 year recap',
    youtube: 'https://youtu.be/6JOTPnZS-cM',
    date: '2025-01-07',
    id: 'video1',
    preview: '',
    poster: '',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'nwPlus',
    title: 'Software Engineer',
    start: '2026',
    end: 'Present',
    link: 'https://nwplus.io',
    id: 'work5',
  },
  {
    company: 'Lucid Vision Labs',
    title: 'Software Engineer',
    start: '2024',
    end: 'Present',
    link: 'https://thinklucid.com/',
    id: 'work1',
  },
  {
    company: 'nwPlus',
    title: 'Media Coordinator',
    start: '2025',
    end: '2026',
    link: 'https://nwplus.io',
    id: 'work2',
  },
]

export const HERO_CLIP: CinematicClip = {
  id: 'hero-dawn',
  src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305038/assorted_clips_ixrmdi.mp4',
  caption: 'first light',
}

export const STORY_CLIPS: CinematicClip[] = [
  { id: 'peak', src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305010/pano_i7ppeh.mp4', caption: 'above the clouds' },
  { id: 'trail', src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780307650/forest_v3jnkn.mp4', caption: 'into the trees' },
  { id: 'river', src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305010/water_bt6k8l.mp4', caption: 'where the water runs' },
  { id: 'run', src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305016/moving_hknj04.mp4', caption: 'keep moving' },
  { id: 'climb', src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305020/climb_v8shlq.mp4', caption: 'a little higher' },
  { id: 'sunset', src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305009/golden_nwti9d.mp4', caption: 'golden hour' },
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
