'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CinematicClip } from '@/components/ui/cinematic-clip'
import { FieldLabel } from '@/components/ui/field-label'
import { Parallax } from '@/components/ui/parallax'
import { HERO_CLIP, STORY_CLIPS, WORK_EXPERIENCE } from '@/app/data'
import { cldPoster, cldVideo } from '@/lib/cloudinary'

const EASE = [0.22, 1, 0.36, 1] as const

function clip(id: string) {
  return STORY_CLIPS.find((c) => c.id === id)!
}

export default function Home() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const duskOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.18, 0.6])

  return (
    <>
      {!reduce && (
        <>
          {/* reading progress — a clay hairline that fills as you descend */}
          <motion.div
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-clay-400/70"
          />
          {/* dusk falls across the page as you go */}
          <motion.div
            aria-hidden
            style={{ opacity: duskOpacity }}
            className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-t from-clay-900/40 via-transparent to-moss-900/15"
          />
        </>
      )}

      <Hero />
      <About />
      <Chapters />
      <Experience />
    </>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const poster = HERO_CLIP.poster ?? cldPoster(HERO_CLIP.src, { width: 1280 })

  // Wait one tick to learn the viewport, then ask Cloudinary for a matching
  // cut. Phones were pulling the full-resolution master otherwise.
  const [deliveryWidth, setDeliveryWidth] = useState<number | null>(null)
  useEffect(() => {
    setDeliveryWidth(window.innerWidth >= 768 ? 1440 : 720)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const overlayY = useTransform(scrollYProgress, [0, 0.8], [0, -90])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const darken = useTransform(scrollYProgress, [0.2, 1], [0, 0.6])

  return (
    <section
      ref={ref}
      className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 sm:pt-8"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
        data-cursor="view"
        style={{ backgroundImage: `url(${poster})` }}
        className="relative h-[82vh] max-h-[860px] min-h-[480px] w-full overflow-hidden rounded-2xl bg-cover bg-center shadow-[0_2px_4px_rgba(40,35,28,0.08),0_40px_80px_-40px_rgba(40,35,28,0.6)] ring-1 ring-ink/5"
      >
        {deliveryWidth && (
          <video
            src={cldVideo(HERO_CLIP.src, {
              width: deliveryWidth,
              quality: 'auto:good',
            })}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* legibility scrims: heavier at the bottom, a touch at the top */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/40 to-transparent" />

        {!reduce && (
          <motion.div
            aria-hidden
            style={{ opacity: darken }}
            className="pointer-events-none absolute inset-0 bg-ink"
          />
        )}

        <motion.div
          style={reduce ? undefined : { y: overlayY, opacity: overlayOpacity }}
          className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-10"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="flex items-center justify-between text-parchment"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-parchment/80">
              {HERO_CLIP.caption ?? 'Field Notes'}
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-parchment/60">
              Portfolio &mdash; 2026
            </span>
          </motion.div>

          <div className="max-w-2xl">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-parchment/70"
            >
              <span aria-hidden className="h-px w-8 bg-parchment/40" />
              01 &mdash; Introduction
            </motion.span>

            <h1 className="mt-4 font-serif text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.1] text-parchment">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: '0.4em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              >
                Hi, I&apos;m Mackenzie
              </motion.span>
            </h1>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: EASE }}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <Link
                href="/blog"
                data-cursor
                className="group inline-flex items-center gap-2"
              >
                <span className="link-underline relative text-sm text-parchment">
                  Read my thoughts
                </span>
                <span
                  aria-hidden
                  className="text-clay-200 transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { opacity: overlayOpacity }}
        className="mt-6 flex items-center gap-3"
      >
        <span className="field-note text-ink-faint">Scroll</span>
        <motion.span
          aria-hidden
          className="text-ink-faint"
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          &darr;
        </motion.span>
      </motion.div>
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
          {/* taller than the frame so the drift never exposes an edge */}
          <Parallax distance={28} className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Image
              src="/profile.jpg"
              alt="Mackenzie Dy standing in the mountains under a cloudy sky"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 300px, 100vw"
            />
          </Parallax>
        </motion.div>
      </motion.div>
    </section>
  )
}

/** An oversized stroked numeral drifting behind a chapter, for depth. */
function GhostNumeral({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <Parallax
      distance={40}
      className={`pointer-events-none absolute select-none ${className}`}
    >
      <span
        aria-hidden
        className="marquee-outline block font-serif text-[clamp(9rem,30vw,24rem)] font-semibold leading-none opacity-[0.18]"
      >
        {children}
      </span>
    </Parallax>
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

function Chapters() {
  return (
    <div className="mx-auto mt-28 max-w-screen-md space-y-20 px-6">
      <section className="relative overflow-visible">
        <GhostNumeral className="-left-10 -top-24 sm:-left-24">03</GhostNumeral>
        <div className="relative">
          <FieldLabel index="03">The ascent</FieldLabel>
          <div className="mt-8 grid grid-cols-12 items-end gap-5">
            <CinematicClip
              {...clip('peak')}
              from="left"
              reveal
              parallax={40}
              captionBelow
              className="col-span-12 aspect-[4/5] sm:col-span-7"
            />
            <CinematicClip
              {...clip('trail')}
              from="right"
              reveal
              parallax={-56}
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

      <section className="relative overflow-visible">
        <GhostNumeral className="-right-10 -top-24 sm:-right-20">04</GhostNumeral>
        <div className="relative">
          <FieldLabel index="04">Midday</FieldLabel>
          <CinematicClip
            {...clip('river')}
            from="up"
            reveal
            parallax={36}
            captionBelow
            className="mx-auto mt-8 aspect-video w-full sm:w-3/4"
          />
        </div>
      </section>

      <section className="relative overflow-visible">
        <GhostNumeral className="-left-10 -top-28 sm:-left-20">05</GhostNumeral>
        <div className="relative">
          <FieldLabel index="05">The long afternoon</FieldLabel>
          <div className="mt-8 grid grid-cols-12 items-start gap-5">
            <CinematicClip
              {...clip('run')}
              from="left"
              reveal
              parallax={48}
              captionBelow
              className="col-span-12 aspect-video sm:col-span-7 sm:mt-10"
            />
            <CinematicClip
              {...clip('climb')}
              from="right"
              reveal
              parallax={-40}
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
