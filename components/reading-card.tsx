import Link from "next/link"

interface ReadingCardProps {
  title: string
  author?: string
  description?: string
  href: string
  external?: boolean
  accentIndex?: number
}

const accentColors = ["var(--green)", "var(--rust)", "var(--gold)"]

export function ReadingCard({ title, author, description, href, external, accentIndex = 0 }: ReadingCardProps) {
  const accentColor = accentColors[accentIndex % accentColors.length]

  return (
    <article className="group relative overflow-hidden border border-[var(--rule)] bg-[var(--paper)] p-6 transition duration-200 hover:-translate-y-0.5">
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accentColor }} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">Reading</p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium text-[var(--ink)]">
            {title}
          </h3>
        </div>
        {author ? (
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            {author}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{description}</p>
      ) : null}
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex items-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--green)] transition-colors hover:text-[var(--rust)]"
      >
        Learn more
      </Link>
    </article>
  )
}
