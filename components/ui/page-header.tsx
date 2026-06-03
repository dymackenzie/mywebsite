import type { ReactNode } from 'react'
import { FieldLabel } from '@/components/ui/field-label'

type PageHeaderProps = {
  /** Two-digit index matching the nav order, e.g. "02". */
  index: string
  /** Small mono descriptor above the title. */
  eyebrow: string
  /** Large serif page title. */
  title: string
  /** Optional quiet line beneath the title. */
  lead?: string
  /** Optional right-aligned mono meta (e.g. a count). */
  meta?: ReactNode
  /** Optional element on the right of the eyebrow row (e.g. search). */
  action?: ReactNode
}

/**
 * The shared editorial masthead for inner pages — mono eyebrow + index, an
 * oversized serif title, optional lead/meta, and the recurring ticked rule.
 * Keeps every route in the same "field notes" voice as the home page.
 */
export function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  meta,
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-center justify-between gap-4">
        <FieldLabel index={index}>{eyebrow}</FieldLabel>
        {action}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <h1 className="font-serif text-4xl font-semibold leading-none text-ink sm:text-5xl">
          {title}
        </h1>
        {meta && (
          <span className="field-note shrink-0 pb-1 text-ink-faint">{meta}</span>
        )}
      </div>

      {lead && <p className="mt-4 max-w-xl text-ink-muted">{lead}</p>}

      <div className="field-rule mt-8" />
    </header>
  )
}
