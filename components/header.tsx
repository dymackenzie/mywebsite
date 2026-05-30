'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/gallery', label: 'Photographs' },
  { href: '/videos', label: 'Videos' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Writings' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="relative border-b border-stone-200/60">
      <div className="mx-auto max-w-screen-xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 leading-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fwog_scaled_100x.gif"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="h-10 opacity-50 w-auto shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-ink tracking-tight">
                Mackenzie Dy
              </span>
              <span className="text-xs text-ink-muted">a small window into my mindspace</span>
            </span>
          </Link>

          <nav>
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`text-sm transition-colors duration-200 ${
                        isActive
                          ? 'text-ink font-medium'
                          : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
