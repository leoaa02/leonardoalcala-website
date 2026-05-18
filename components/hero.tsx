import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
            Minimal editorial essays and ideas
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Leonardo Alcala
          </h1>
          <p className="mt-6 text-2xl leading-10 text-muted-foreground sm:text-3xl">
            Building ideas, one article at a time.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            I write about technology, software development, artificial intelligence, marketing, creativity, and the process of building a meaningful career and life.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
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
