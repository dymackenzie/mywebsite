'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { PROJECTS, WORK_EXPERIENCE } from '@/app/data'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  VARIANTS_ITEM,
} from '@/components/ui/animations'

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-screen-md px-6 py-16">
      {/* Projects */}
      <motion.section
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <motion.h1
          variants={VARIANTS_SECTION}
          className="font-serif text-4xl font-semibold text-ink mb-10"
        >
          Projects
        </motion.h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={VARIANTS_ITEM} className="group">
              <div className="relative rounded-xl overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
                <video
                  src={project.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base font-medium text-parchment hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.name}
                  </Link>
                </div>
              </div>
              <p className="text-sm text-ink-muted px-1">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Work Experience */}
      {/* <motion.section
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={VARIANTS_SECTION}
          className="font-serif text-3xl font-semibold text-ink mb-8"
        >
          Experience
        </motion.h2>

        <div className="space-y-0">
          {WORK_EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.id}
              variants={VARIANTS_ITEM}
              className={`flex items-start justify-between py-5 ${
                i < WORK_EXPERIENCE.length - 1 ? 'border-b border-stone-200/60' : ''
              }`}
            >
              <div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink hover:text-moss-600 transition-colors"
                >
                  {job.company}
                </a>
                <p className="text-sm text-ink-muted mt-0.5">{job.title}</p>
              </div>
              <p className="text-sm text-ink-faint shrink-0 ml-4">
                {job.start}–{job.end}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section> */}
    </div>
  )
}
