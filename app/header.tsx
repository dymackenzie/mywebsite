'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Mackenzie Dy
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Software Engineer and Camera Lover
        </TextEffect>
      </div>

      <nav className="flex gap-4 items-center">
        <Link
          href="/gallery"
          className="text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Gallery
        </Link>
        <Link
          href="/projects"
          className="text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="text-zinc-700 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Writings
        </Link>
      </nav>
    </header>
  )
}
