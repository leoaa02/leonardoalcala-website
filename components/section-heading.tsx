import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
