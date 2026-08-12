'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { CinematicClip } from '@/components/ui/cinematic-clip'
import { FieldLabel } from '@/components/ui/field-label'
import { LazyVideo } from '@/components/ui/lazy-video'
import { HERO_CLIP, STORY_CLIPS, WORK_EXPERIENCE } from '@/app/data'
import { cldPoster, cldVideo } from '@/lib/cloudinary'

const EASE = [0.22, 1, 0.36, 1] as const

function clip(id: string) {
  return STORY_CLIPS.find((c) => c.id === id)!
}

/**
 * Nothing on this page is scroll-linked. Every entrance is a one-shot fade
 * driven by an IntersectionObserver, so scrolling costs the compositor a
 * scroll and nothing else.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Chapters />
      <Experience />
    </>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const poster = HERO_CLIP.poster ?? cldPoster(HERO_CLIP.src, { width: 1280 })

  // Wait one tick to learn the viewport, then ask Cloudinary for a matching
  // cut. Phones were pulling the full-resolution master otherwise.
  const [deliveryWidth, setDeliveryWidth] = useState<number | null>(null)
  useEffect(() => {
    setDeliveryWidth(window.innerWidth >= 768 ? 1440 : 720)
  }, [])

  return (
    <section className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 sm:pt-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
        data-cursor="view"
        style={{ backgroundImage: `url(${poster})` }}
        className="relative h-[82vh] max-h-[860px] min-h-[480px] w-full overflow-hidden rounded-2xl bg-cover bg-center shadow-[0_2px_4px_rgba(40,35,28,0.08),0_40px_80px_-40px_rgba(40,35,28,0.6)] ring-1 ring-ink/5"
      >
        {deliveryWidth && (
          <LazyVideo
            eager
            src={cldVideo(HERO_CLIP.src, {
              width: deliveryWidth,
              quality: 'auto:good',
            })}
            poster={poster}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* An even scrim rather than a bottom-weighted one — the name sits in
            the middle now, and the clip cuts between bright and dark frames. */}
        <div className="pointer-events-none absolute inset-0 bg-ink/30" />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h1 className="text-center font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium leading-[1.1] text-parchment">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: '0.4em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              Hi, I&apos;m Mackenzie
            </motion.span>
          </h1>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center gap-3">
        <span className="field-note text-ink-faint">Scroll</span>
        <motion.span
          aria-hidden
          className="text-ink-faint"
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          &darr;
        </motion.span>
      </div>
    </section>
  )
}

function About() {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto mt-28 max-w-screen-md px-6">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="grid grid-cols-1 items-center gap-8 sm:grid-cols-5 sm:gap-10"
      >
        <div className="sm:col-span-3">
          <FieldLabel index="02">Portrait</FieldLabel>
          <h2 className="mt-5 font-serif text-3xl text-ink md:text-4xl">
            Two things I can do that can change the world:
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Stories, when told right, can change a person&apos;s mind and
            problems, when fixed, can change a person&apos;s direction.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            I believe everything is better in moderation, so while not working I
            love to hike, run, photograph, boulder, and live life to its
            fullest. What you&apos;ll find here is the residue of that &mdash;
            the films, photographs, and things I&apos;ve built along the way.
          </p>
        </div>

        <motion.div
          whileHover={reduce ? undefined : { scale: 1.03, rotate: -1.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          data-cursor="view"
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-ink/5 sm:col-span-2"
        >
          <Image
            src="/profile.jpg"
            alt="Mackenzie Dy standing in the mountains under a cloudy sky"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 300px, 100vw"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

/** An oversized stroked numeral sitting behind a chapter, for depth. */
function GhostNumeral({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`marquee-outline pointer-events-none absolute select-none font-serif text-[clamp(9rem,30vw,24rem)] font-semibold leading-none opacity-[0.18] ${className}`}
    >
      {children}
    </span>
  )
}

/** A quiet paragraph woven between the chapters. */
function Words({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mx-auto max-w-xl text-center text-lg leading-relaxed text-ink-muted"
    >
      {children}
    </motion.p>
  )
}

/**
 * The clip chapters are desktop-only. Phones don't autoplay muted loops
 * reliably and the clips are most of the page weight, so below 768px the
 * sections are removed with CSS — `display: none` keeps the observers from
 * ever intersecting, so nothing downloads. A media-query hook would instead
 * pop the clips in after hydration, since it reads false on first paint.
 */
function Chapters() {
  return (
    <div className="mx-auto mt-28 max-w-screen-md space-y-20 px-6">
      <section className="relative hidden overflow-visible md:block">
        <GhostNumeral className="-left-10 -top-24 sm:-left-24">03</GhostNumeral>
        <div className="relative">
          <FieldLabel index="03">The ascent</FieldLabel>
          <div className="mt-8 grid grid-cols-12 items-end gap-5">
            <CinematicClip
              {...clip('peak')}
              width={720}
              captionBelow
              className="col-span-12 aspect-[4/5] sm:col-span-7"
            />
            <CinematicClip
              {...clip('trail')}
              width={540}
              captionBelow
              className="col-span-12 aspect-[3/4] sm:col-span-5 sm:mb-10"
            />
          </div>
        </div>
      </section>

      <Words>
        &ldquo;That is perhaps the most solid advice I have, by the way &mdash;
        show the inside of your head in public, so people can see if they would
        like to live in there.&rdquo;
      </Words>

      <section className="relative hidden overflow-visible md:block">
        <GhostNumeral className="-right-10 -top-24 sm:-right-20">04</GhostNumeral>
        <div className="relative">
          <FieldLabel index="04">Midday</FieldLabel>
          <CinematicClip
            {...clip('river')}
            width={720}
            captionBelow
            className="mx-auto mt-8 aspect-video w-full sm:w-3/4"
          />
        </div>
      </section>

      <section className="relative hidden overflow-visible md:block">
        <GhostNumeral className="-left-10 -top-28 sm:-left-20">05</GhostNumeral>
        <div className="relative">
          <FieldLabel index="05">The long afternoon</FieldLabel>
          <div className="mt-8 grid grid-cols-12 items-start gap-5">
            <CinematicClip
              {...clip('run')}
              width={720}
              captionBelow
              className="col-span-12 aspect-video sm:col-span-7 sm:mt-10"
            />
            <CinematicClip
              {...clip('climb')}
              width={540}
              captionBelow
              className="col-span-12 aspect-[4/5] sm:col-span-5"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Experience() {
  const reduce = useReducedMotion()

  return (
    <section className="relative mx-auto mt-28 max-w-screen-md overflow-visible px-6">
      <GhostNumeral className="-right-8 -top-24 sm:-right-16">06</GhostNumeral>
      <div className="relative">
        <div className="mb-8 flex items-end justify-between">
          <FieldLabel index="06">Experience</FieldLabel>
          <span className="field-note text-ink-faint">
            {String(WORK_EXPERIENCE.length).padStart(2, '0')} entries
          </span>
        </div>
        <ul>
          {WORK_EXPERIENCE.map((job, i) => (
            <motion.li
              key={job.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
            >
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="group grid grid-cols-12 items-baseline gap-3 border-t border-stone-200 py-5 transition-colors last:border-b hover:border-stone-300"
              >
                <span className="field-note col-span-2 text-ink-faint transition-colors group-hover:text-moss-600">
                  0{i + 1}
                </span>
                <span className="col-span-7 font-serif text-xl text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                  {job.company}
                  <span className="ml-3 hidden align-middle text-sm text-ink-muted sm:inline">
                    {job.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-muted sm:hidden">
                    {job.title}
                  </span>
                </span>
                <span className="field-note col-span-3 justify-self-end text-ink-muted">
                  {job.start}&ndash;{job.end}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
