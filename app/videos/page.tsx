'use client'

import { VideoTile } from '@/components/ui/video-tile'
import { VIDEOS } from '@/app/data'
import { PageHeader } from '@/components/ui/page-header'

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6">
      <PageHeader
        index="03"
        eyebrow="Reel"
        title="Videos"
        lead="Stories told in motion — recaps, films, and the occasional love letter."
        meta={`${String(VIDEOS.length).padStart(2, '0')} films`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((video) => {
          const isInstagram = !video.youtube.includes('youtu')
          return (
            <VideoTile
              key={video.id}
              title={video.title}
              description={video.description}
              date={video.date}
              youtube={isInstagram ? '' : video.youtube}
              preview={video.preview}
              poster={video.poster}
              isInstagram={isInstagram}
              instagramUrl={isInstagram ? video.youtube : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
