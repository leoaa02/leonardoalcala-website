import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Leonardo Alcala
          </h1>
          <p className="mt-4 font-serif text-xl italic text-primary sm:text-2xl">
            Technology, writing and creativity.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I build digital experiences and share ideas about technology,
            programming, productivity and storytelling. Welcome to my corner of
            the internet where I document my journey and discoveries.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
