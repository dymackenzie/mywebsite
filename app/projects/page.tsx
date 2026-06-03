'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { PROJECTS } from '@/app/data'
import { PageHeader } from '@/components/ui/page-header'
import { cldVideo, cldPoster } from '@/lib/cloudinary'
import {
  VARIANTS_CONTAINER,
  VARIANTS_ITEM,
} from '@/components/ui/animations'

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-16">
      <PageHeader
        index="04"
        eyebrow="Selected work"
        title="Projects"
        lead="Things I've built — for the love of the game."
        meta={`${String(PROJECTS.length).padStart(2, '0')} builds`}
      />

      <motion.div
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2"
      >
        {PROJECTS.map((project, i) => (
          <motion.div key={project.id} variants={VARIANTS_ITEM} className="group">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="block"
            >
              <div
                className="relative overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(40,35,28,0.06),0_20px_44px_-26px_rgba(40,35,28,0.5)] ring-1 ring-ink/5"
                style={{ aspectRatio: '16/9' }}
              >
                <video
                  src={cldVideo(project.video, { width: 800 })}
                  poster={cldPoster(project.video, { width: 800 })}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/15" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-parchment/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden
                    className="text-parchment/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-parchment"
                  >
                    &#8599;
                  </span>
                </div>

                <h2 className="absolute bottom-0 left-0 p-4 font-serif text-xl font-medium text-parchment">
                  {project.name}
                </h2>
              </div>
            </Link>
            <p className="mt-3 px-1 text-sm leading-relaxed text-ink-muted">
              {project.description}
            </p>
            {project.longDescription && (
              <p className="mt-2 px-1 text-sm leading-relaxed text-ink/60">
                {project.longDescription}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
