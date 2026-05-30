'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { CinematicClip } from '@/components/ui/cinematic-clip'
import { HERO_CLIP, STORY_CLIPS, EMAIL } from '@/app/data'

function clip(id: string) {
  return STORY_CLIPS.find((c) => c.id === id)!
}

function PhaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-faint"
    >
      <span className="h-px w-8 bg-stone-300" />
      {children}
    </motion.div>
  )
}

/** A quiet paragraph woven between the clips. */
function Words({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-xl text-center text-base leading-relaxed text-ink-muted"
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      {/* ───────────── HERO — contained clip, profile beneath ───────────── */}
      <section className="mx-auto max-w-screen-md px-6 pt-12 md:pt-16">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl"
        >
          <video
            src={HERO_CLIP.src}
            poster={HERO_CLIP.poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* ───────── STORY FEED — words woven through a day in nature ───────── */}
      <div className="mx-auto max-w-screen-md space-y-20 px-6 py-20 md:py-24">
        {/* words — what I do, with profile alongside */}
        <motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-10"
        >
          <p className="text-base leading-relaxed text-ink-muted">
            Two things I can do that make a difference: tell stories and solve
            problems. Stories, when told right, can change a person&apos;s mind,
            and problems, when fixed, can change a person&apos;s direction.
          </p>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src="/profile.jpg"
              alt="Mackenzie Dy standing in the mountains under a cloudy sky"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 360px, 100vw"
            />
          </div>
        </motion.section>

        {/* the ascent — into the trees, above the clouds */}
        <section>
          <PhaseLabel>the ascent</PhaseLabel>
          <div className="grid grid-cols-12 items-end gap-5">
            <CinematicClip
              {...clip('trail')}
              from="left"
              captionBelow
              className="col-span-12 aspect-[3/4] sm:col-span-7"
            />
            <CinematicClip
              {...clip('peak')}
              from="right"
              captionBelow
              className="col-span-12 aspect-[4/5] sm:col-span-5 sm:mb-10"
            />
          </div>
        </section>

        {/* words — everything in moderation */}
        <Words>
          I believe everything is better in moderation, so while not working, I
          love to hike, run, photograph, boulder, and live life to its fullest.
        </Words>

        {/* midday — where the water runs */}
        <section>
          <PhaseLabel>midday</PhaseLabel>
          <CinematicClip
            {...clip('river')}
            from="up"
            captionBelow
            className="mx-auto aspect-video w-full sm:w-3/4"
          />
        </section>

        {/* the long afternoon — keep moving, a little higher */}
        <section>
          <PhaseLabel>the long afternoon</PhaseLabel>
          <div className="grid grid-cols-12 items-start gap-5">
            <CinematicClip
              {...clip('run')}
              from="left"
              captionBelow
              className="col-span-12 aspect-video sm:col-span-7 sm:mt-10"
            />
            <CinematicClip
              {...clip('climb')}
              from="right"
              captionBelow
              className="col-span-12 aspect-[4/5] sm:col-span-5"
            />
          </div>
        </section>
      </div>

      {/* ───────── dusk — golden hour, contained close ───────── */}
      <section className="mx-auto max-w-screen-md px-6">
        <CinematicClip
          {...clip('sunset')}
          from="up"
          className="aspect-[16/9] w-full"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center font-serif text-lg italic text-ink-faint md:text-xl"
        >
          and the day folds into gold.
        </motion.p>
      </section>

      {/* ───────── CLOSING — a quiet hello ───────── */}
      <section className="mx-auto max-w-screen-md px-6 pb-24 pt-16">
        <Words>
          If you want to say hello or talk about something interesting, reach me
          at{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="underline decoration-stone-300 underline-offset-2 transition-colors hover:text-ink"
          >
            {EMAIL}
          </a>
        </Words>
      </section>
    </>
  )
}
