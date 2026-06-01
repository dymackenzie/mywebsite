'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { PROJECTS } from '@/app/data'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  VARIANTS_ITEM,
} from '@/components/ui/animations'

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-screen-md px-6 py-16">
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
    </div>
  )
}
