import type { ReactNode } from 'react'

type FieldLabelProps = {
  /** Optional leading index, e.g. "01" — rendered before an em dash. */
  index?: string
  children: ReactNode
  /** Show the short leading hairline tick. Default true. */
  rule?: boolean
  className?: string
}

/**
 * The signature mono "field note" eyebrow used above sections, on captions,
 * and in meta rows. One consistent treatment site-wide (see `.field-note` in
 * globals.css): uppercase, tracked, tabular, with an optional index + tick.
 */
export function FieldLabel({
  index,
  children,
  rule = true,
  className = '',
}: FieldLabelProps) {
  return (
    <span className={`field-note inline-flex items-center gap-3 ${className}`}>
      {rule && (
        <span aria-hidden className="h-px w-8 bg-stone-300" />
      )}
      {index && (
        <>
          <span className="text-ink-muted">{index}</span>
          <span aria-hidden className="text-stone-300">
            &mdash;
          </span>
        </>
      )}
      <span>{children}</span>
    </span>
  )
}
