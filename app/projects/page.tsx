 'use client'

import { motion } from 'motion/react'
import ProjectVideo from '@/components/ui/project-video'
import { PROJECTS } from '@/app/data'
import { VARIANTS_CONTAINER, VARIANTS_SECTION, TRANSITION_SECTION } from '@/components/ui/animations'

export default function ProjectsPage() {
  return (
    <motion.main
      className="prose max-w-none"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        className="mt-6"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Selected Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <motion.div key={project.id} className="space-y-2" variants={VARIANTS_SECTION}>
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50 no-underline"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
