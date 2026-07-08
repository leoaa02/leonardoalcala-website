import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-[2px] w-16 bg-[var(--rust)]" />
          <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--rust)]">
            Writer — Copywriter
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-medium leading-[0.95] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Leonardo Alcala
          </h1>

          <p className="mt-6 text-xl italic leading-8 text-[var(--ink-soft)] sm:text-2xl">
            Technology, ideas and stories worth sharing.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-24 bg-[var(--green)]" />

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[var(--ink)]">
            I write about technology, software development, artificial intelligence, marketing, creativity, and the process of building a meaningful career and life.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/blog">
                Read Essays
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
