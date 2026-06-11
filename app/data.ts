type Project = {
  name: string
  description: string
  longDescription?: string
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
      'Minecraft in terminal.',
    longDescription:
      'Built in C++ with raytracing, Terminecraft is a simple Minecraft clone that runs in the terminal. It features procedurally generated terrain and block manipulation, all rendered using ASCII characters. The project was a fun experiment in graphics programming and performance optimization.',
    link: 'https://github.com/dymackenzie/terminecraft',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770630478/terminecraft_iluaxf.mp4',
    id: 'project1',
  },
  {
    name: 'Typo',
    description: 
      '2D typing roguelike.',
    longDescription:
      'Typo is a 2D typing dungeon game built with the Godot engine in C#. It features a unique gameplay loop where players must type out words to defeat enemies to gain points to upgrade abilities. The game includes multiple enemy types, power-ups, and a scoring system to keep players engaged.',
    link: 'https://dymackenzie.itch.io/typo',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770630479/typo_wit7vk.mp4',
    id: 'project2',
  },
  {
    name: 'Immigr8',
    description: 
    'An Android networking app.',
    longDescription:
      'Immigr8 is an Android app built with Java designed to connect immigrants with each other and with resources in their new community. It was developed with a team of four others, receiving Best Designed App at the Game of Apps competition.',
    link: 'https://github.com/dymackenzie/Immigr8',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770631712/immigr8_product_dppzmb.mp4',
    id: 'project5',
  },
  {
    name: 'Poopyhead',
    description: 'A multiplayer online card game.',
    longDescription:
      'Poopyhead is a multiplayer online card game built with React and Node.js. Built as a passion project, it features real-time gameplay where players can join rooms and compete against each other. The game includes a variety of cards with different effects, and the backend is powered by WebSockets for seamless communication between players.',
    link: 'https://poopyhead-mcq8.onrender.com',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1779998419/poopyhead_tfnb9j.mp4',
    id: 'project6',
  },
  {
    name: 'Python Chess Engine',
    description: "A chess engine built in Python.",
    longDescription:
      "This chess engine is a simple implementation of the minimax algorithm with alpha-beta pruning, built using Python's Tkinter library for the graphical user interface. It allows users to play against the computer, which evaluates moves based on a basic heuristic. The project was a great way to learn about game development and AI algorithms.",
    link: 'https://github.com/dymackenzie/chess-engine',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770630479/chess_qxgajq.mp4',
    id: 'project3',
  },
  {
    name: 'Physics Engine',
    description: '2D physics engine.',
    longDescription:
      'This physics engine is a simple implementation of basic 2D physics principles, built from scratch in Java. It allows users to simulate and visualize the behavior of objects under the influence of forces like gravity and friction.',
    link: 'https://github.com/dymackenzie/physics_engine',
    video:
      'https://res.cloudinary.com/dy5qhfyed/video/upload/v1770631928/physics_po08qk.mp4',
    id: 'project4',
  },
]

export const VIDEOS: Video[] = [
  {
    title: 'sponsorship video for Zocker',
    description: 'an edit for my brother sponsored by Zocker',
    youtube: 'https://youtu.be/oDpwF3i9SDU',
    date: '2026-06-11',
    id: 'video11',
    preview: '',
    poster: '',
  },
  {
    title: 'nwPlus Hiring 2026',
    description: '2026 nwPlus hiring video',
    youtube: 'https://www.instagram.com/p/DWZn5cEkk4m/',
    date: '2026-03-27',
    id: 'video10',
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
    id: 'work4',
  },
  {
    company: 'Lucid Vision Labs',
    title: 'Software Engineer',
    start: '2024',
    end: 'Present',
    link: 'https://thinklucid.com/',
    id: 'work3',
  },
  {
    company: 'nwPlus',
    title: 'Media Coordinator',
    start: '2025',
    end: '2026',
    link: 'https://nwplus.io',
    id: 'work2',
  },
  {
    company: 'Kumon',
    title: 'Math and English Tutor',
    start: '2022',
    end: '2023',
    link: 'https://www.kumon.com/ca-en/',
    id: 'work1',
  },
]

export const HERO_CLIP: CinematicClip = {
  id: 'hero-dawn',
  src: 'https://res.cloudinary.com/dy5qhfyed/video/upload/v1780305038/assorted_clips_ixrmdi.mp4',
  caption: '',
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
