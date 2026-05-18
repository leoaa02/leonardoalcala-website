import Link from "next/link"

interface ReadingCardProps {
  title: string
  author?: string
  description?: string
  href: string
  external?: boolean
}

export function ReadingCard({ title, author, description, href, external }: ReadingCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Reading</p>
          <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
            {title}
          </h3>
        </div>
        {author ? (
          <span className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            {author}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
      ) : null}
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary"
      >
        Learn more
      </Link>
    </article>
  )
}
