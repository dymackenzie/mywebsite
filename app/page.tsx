'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { CinematicClip } from '@/components/ui/cinematic-clip'
import { FieldLabel } from '@/components/ui/field-label'
import { HERO_CLIP, STORY_CLIPS, WORK_EXPERIENCE } from '@/app/data'
import { cldVideo, cldPoster } from '@/lib/cloudinary'

function clip(id: string) {
  return STORY_CLIPS.find((c) => c.id === id)!
}

const EASE = [0.22, 1, 0.36, 1] as const

/** A quiet paragraph woven between the chapters, with a gentle scroll drift. */
function Words({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Float the line up a touch as it travels through the viewport.
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-xl text-center text-lg leading-relaxed text-ink-muted"
      >
        {children}
      </motion.p>
    </motion.div>
  )
}

/** An oversized stroked numeral that drifts behind a chapter for depth. */
function GhostNumeral({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute select-none ${className}`}
    >
      <motion.span
        style={reduce ? undefined : { y, rotate }}
        className="marquee-outline block font-serif font-semibold leading-none text-[clamp(9rem,30vw,24rem)] opacity-[0.18]"
      >
        {children}
      </motion.span>
    </div>
  )
}

export default function Home() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const aboutImgRef = useRef<HTMLDivElement>(null)

  // Parallax: the ambient clip drifts a touch slower than the page.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Small drift relative to the clip's own height. The clip overflows its frame
  // by 10% on each side (see classes below), so ±5% never exposes a gap.
  const clipY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  // Cinematic push-in — the film eases closer as the hero scrolls away.
  const clipScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  // The overlay text lifts and dissolves into the film as you leave.
  const overlayY = useTransform(scrollYProgress, [0, 0.8], [0, -90])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  // The whole frame fades toward ink, like a shot fading out.
  const heroDarken = useTransform(scrollYProgress, [0.2, 1], [0, 0.6])
  // …and the frame rounds tighter / shrinks a hair as it recedes.
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  // Page-wide reading progress for the hairline at the very top.
  const { scrollYProgress: pageProgress } = useScroll()
  // Dusk falls across the whole page as you descend.
  const duskOpacity = useTransform(pageProgress, [0, 0.55, 1], [0, 0.18, 0.6])

  // The portrait drifts within its frame.
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutImgRef,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(aboutProgress, [0, 1], ['-8%', '8%'])

  return (
    <>
      {/* reading progress — a clay hairline that fills as you descend */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ scaleX: pageProgress }}
          className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-clay-400/70"
        />
      )}

      {/* dusk — a warm-to-cool wash that deepens toward the foot of the page */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ opacity: duskOpacity }}
          className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-t from-clay-900/40 via-transparent to-moss-900/15"
        />
      )}

      {/* ── Masthead + hero ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 sm:pt-8"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={reduce ? undefined : { scale: heroScale }}
          data-cursor="view"
          className="relative h-[82vh] min-h-[480px] max-h-[860px] w-full overflow-hidden rounded-2xl shadow-[0_2px_4px_rgba(40,35,28,0.08),0_40px_80px_-40px_rgba(40,35,28,0.6)] ring-1 ring-ink/5"
        >
          <motion.video
            src={cldVideo(HERO_CLIP.src, { width: 1920 })}
            poster={HERO_CLIP.poster ?? cldPoster(HERO_CLIP.src, { width: 1920 })}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={reduce ? undefined : { y: clipY, scale: clipScale }}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
          />

          {/* legibility scrims: heavier at the bottom, a touch at the top */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/40 to-transparent" />

          {/* scroll-driven fade to black */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ opacity: heroDarken }}
              className="pointer-events-none absolute inset-0 bg-ink"
            />
          )}

          {/* overlay content */}
          <motion.div
            style={reduce ? undefined : { y: overlayY, opacity: overlayOpacity }}
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-10"
          >
            {/* masthead rail, on the film */}
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

            {/* intro, anchored over the lower third */}
            <div className="max-w-3xl">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-parchment/70"
              >
                <span aria-hidden className="h-px w-8 bg-parchment/40" />
                01 &mdash; Introduction
              </motion.span>

              <h1 className="mt-4 font-serif font-semibold leading-[0.98] text-parchment text-[clamp(2rem,6.5vw,4.75rem)]">
                {['Hi, I\'m', 'Mackenzie'].map((line, i) => (
                  <motion.span
                    key={line}
                    className="block"
                    initial={reduce ? false : { opacity: 0, y: '0.4em' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: EASE }}
                  >
                    {line === 'Mackenzie' ? (
                      <span className="italic text-clay-200">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                ))}
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

        {/* scroll cue — fades away once you start descending */}
        <motion.div style={reduce ? undefined : { opacity: overlayOpacity }}>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
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
        </motion.div>
      </section>

      {/* ── About ───────────────────────────────────────────────────── */}
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
              I believe everything is better in moderation, so while not working
              I love to hike, run, photograph, boulder, and live life to its
              fullest. What you&apos;ll find here is the residue of that &mdash;
              the films, photographs, and things I&apos;ve built along the way.
            </p>
          </div>
          <motion.div
            ref={aboutImgRef}
            whileHover={reduce ? undefined : { scale: 1.03, rotate: -1.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            data-cursor="view"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-ink/5 sm:col-span-2"
          >
            <motion.div
              style={reduce ? undefined : { y: portraitY }}
              className="absolute inset-x-0 -top-[8%] h-[116%]"
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
        </motion.div>
      </section>

      {/* ── The day, in chapters ────────────────────────────────────── */}
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
          The best days start before the world is awake, when the trail is yours
          alone and the light is still deciding what to become.
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

      {/* ── Sunset closer — pinned, caption swells ──────────────────── */}
      <SunsetCloser />

      {/* ── Experience index ────────────────────────────────────────── */}
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
    </>
  )
}

/** The sunset clip pins to the viewport while its caption swells past. */
function SunsetCloser() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1])
  const captionScale = useTransform(scrollYProgress, [0.3, 0.9], [0.85, 1.15])
  const captionOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  if (reduce) {
    return (
      <section className="mx-auto mt-24 max-w-screen-md px-6">
        <CinematicClip
          {...clip('sunset')}
          from="up"
          className="aspect-[16/9] w-full"
        />
        <p className="mt-5 text-center font-serif text-xl italic text-ink-faint md:text-2xl">
          &mdash; and the day folds into gold.
        </p>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative mt-24 h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.figure
          style={{ scale }}
          className="relative m-0 aspect-[16/9] w-full max-w-screen-md overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(40,35,28,0.06),0_24px_50px_-28px_rgba(40,35,28,0.55)] ring-1 ring-ink/5"
        >
          <video
            src={cldVideo(clip('sunset').src, { width: 1280 })}
            poster={cldPoster(clip('sunset').src, { width: 1280 })}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </motion.figure>
        <motion.p
          style={{ scale: captionScale, opacity: captionOpacity }}
          className="mt-8 text-center font-serif text-2xl italic text-ink md:text-3xl"
        >
          &mdash; and the day folds into gold.
        </motion.p>
      </div>
    </section>
  )
}
