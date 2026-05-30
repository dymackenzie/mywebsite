import { SOCIAL_LINKS, EMAIL } from '@/app/data'

export function Footer() {
  return (
    <footer className="border-t border-stone-200/60 mt-24 py-10">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-muted">
            {/* &copy; {new Date().getFullYear()} Mackenzie Dy */}
          </p>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(({ label, link }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
              >
                {label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
