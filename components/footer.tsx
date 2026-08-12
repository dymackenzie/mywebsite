import { SOCIAL_LINKS, EMAIL } from '@/app/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-28 border-t border-stone-200/60">
      <div className="mx-auto max-w-screen-xl px-6 py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left: invitation + email */}
          <div className="md:col-span-7">
            <p className="field-note mb-5">Get in touch</p>
            {/* Sized against the viewport rather than in fixed steps — the
                address is one long unbreakable word and ran off the edge of a
                phone at a fixed text-3xl. */}
            <a
              href={`mailto:${EMAIL}`}
              data-cursor
              className="link-underline inline-block max-w-full font-serif text-[clamp(1.25rem,6vw,3rem)] leading-tight text-ink transition-colors hover:text-moss-700"
            >
              {EMAIL}
            </a>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-muted">
              Say hello, or tell me about something interesting. I read
              everything.
            </p>
          </div>

          {/* Right: indexed elsewhere links */}
          <nav className="md:col-span-5 md:justify-self-end">
            <p className="field-note mb-5">Elsewhere</p>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map(({ label, link }, i) => (
                <li key={label} className="flex items-baseline gap-3">
                  <span className="field-note text-ink-faint">0{i + 1}</span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="link-underline text-base text-ink-muted transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="field-rule mt-14" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="field-note">
            &copy; {year} Mackenzie Dy &mdash; Vol. 01
          </span>
          <a href="#top" className="field-note link-underline relative text-ink-muted">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
