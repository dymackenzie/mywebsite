'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  VARIANTS_ITEM,
} from '@/components/ui/animations'

const TEASERS = [
  {
    href: '/gallery',
    label: 'Photographs',
    description: 'moments captured in stillness',
  },
  {
    href: '/videos',
    label: 'Videos',
    description: 'stories told in motion',
  },
  {
    href: '/blog',
    label: 'Writings',
    description: 'thoughts worth keeping',
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-md px-6 py-20">
      {/* Hero split */}
      <motion.div
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-start"
      >
        {/* Left: text */}
        <motion.div variants={VARIANTS_SECTION} className="space-y-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Hi I&apos;m Mackenzie!
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              Two things I can do that make a difference: tell stories and solve
              problems. Stories, when told right, can change a person&apos;s mind
              and problems, when fixed, can change a person&apos;s direction.
            </p>
            <p>
              I believe everything is better in moderation, so while not working,
              I love to hike, run, photograph, boulder, and live life to its
              fullest.
            </p>
          </div>
          <p className="text-sm text-ink-faint">
            If you want to say hello or talk about something interesting, reach
            me at{' '}
            <a
              href="mailto:mackenziedy@hotmail.com"
              className="underline decoration-stone-300 underline-offset-2 hover:text-ink transition-colors"
            >
              mackenziedy@hotmail.com
            </a>
          </p>
        </motion.div>

        {/* Right: ambient video + profile */}
        <motion.div variants={VARIANTS_SECTION} className="relative space-y-4">
          {/* Ambient video */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
            <video
              src="https://res.cloudinary.com/dy5qhfyed/video/upload/v1776219450/lower_assorted_clips_fi5eej.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
          </div>

          {/* Profile photo as small inset */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-stone-200">
              <Image
                src="/profile.jpg"
                alt="Mackenzie Dy standing in the mountains under a cloudy sky"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <span className="text-sm text-ink-muted">Mackenzie Dy</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Section teasers */}
      <motion.div
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
        className="mt-20"
      >
        <motion.h2
          variants={VARIANTS_SECTION}
          className="text-xs uppercase tracking-widest text-ink-faint mb-8"
        >
          Explore
        </motion.h2>
        <div className="grid grid-cols-1 gap-px bg-stone-200/60 sm:grid-cols-3">
          {TEASERS.map(({ href, label, description }) => (
            <motion.div key={href} variants={VARIANTS_ITEM}>
              <Link
                href={href}
                className="group flex flex-col gap-1 bg-parchment px-6 py-8 transition-colors hover:bg-stone-50"
              >
                <span className="font-serif text-xl font-medium text-ink group-hover:text-moss-600 transition-colors">
                  {label}
                </span>
                <span className="text-sm text-ink-muted">{description}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
