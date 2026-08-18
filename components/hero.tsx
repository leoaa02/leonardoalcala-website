import Link from "next/link"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-[2px] w-16 bg-[var(--rust)]" />
          <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--rust)]">
            Frontend Developer
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-medium leading-[0.95] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Leonardo Alcala
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl italic leading-8 text-[var(--ink-soft)] sm:text-2xl">
            I build thoughtful, modern web experiences with React, Next.js and JavaScript — combining development with a strong eye for design and user experience.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-24 bg-[var(--green)]" />

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read Essays</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <a
              href="https://www.linkedin.com/in/leonardo-alcala-192042233"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/leoaa02"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
