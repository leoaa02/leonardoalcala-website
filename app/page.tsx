import Link from "next/link"
import { Hero } from "@/components/hero"
import { FeaturedArticles } from "@/components/featured-articles"
import { SectionHeading } from "@/components/section-heading"
import { ReadingCard } from "@/components/reading-card"
import { ProjectCard } from "@/components/project-card"
import { client } from "@/sanity/lib/client"
import {
  featuredPostsQuery,
  featuredProjectsQuery,
  notesQuery,
  readingQuery,
} from "@/sanity/lib/queries"
import type { Note, Post, Project, Reading } from "@/lib/types"

export const dynamic = "force-dynamic"
export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<Post[]>(featuredPostsQuery)
    return posts?.slice(0, 3) ?? []
  } catch {
    return []
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<Project[]>(featuredProjectsQuery)
    return projects?.slice(0, 3) ?? []
  } catch {
    return []
  }
}

async function getNotes(): Promise<Note[]> {
  try {
    const notes = await client.fetch<Note[]>(notesQuery)
    return notes?.slice(0, 3) ?? []
  } catch {
    return []
  }
}

async function getReadingList(): Promise<Reading[]> {
  try {
    const readings = await client.fetch<Reading[]>(readingQuery)
    return readings?.slice(0, 3) ?? []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [posts, projects, notes, readingList] = await Promise.all([
    getPosts(),
    getProjects(),
    getNotes(),
    getReadingList(),
  ])

  return (
    <>
      <Hero />

      <section className="border-t border-[var(--rule)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Work"
            title="Selected projects"
            description="A handpicked portfolio of projects that demonstrate craftsmanship, attention to detail, and thoughtful frontend development."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} accentIndex={index} />
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link href="/projects" className="border border-[var(--rule)] bg-[var(--paper)] px-5 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--green)] transition hover:bg-[var(--paper-alt)]">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      <FeaturedArticles posts={posts} />

      <section className="border-t border-[var(--rule)] bg-[var(--paper-alt)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Notes"
            title="Short thoughts, observations, and ideas"
            description="A small collection of notes from my work, learning, and experiments in technology and creative thinking."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {notes.map((note, index) => (
              <article
                key={note._id}
                className="relative border border-[var(--rule)] bg-[var(--paper)] p-6 transition duration-200 hover:-translate-y-0.5"
              >
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: ["var(--green)", "var(--rust)", "var(--gold)"][index % 3] }} />
                <p className="text-sm leading-7 text-[var(--ink-soft)]">{note.content}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                  <span>{new Date(note.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  {note.tags?.length ? (
                    <span className="border border-[var(--rule)] bg-[var(--paper-alt)] px-3 py-1 text-[10px]">
                      {note.tags[0].title}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link href="/notes" className="border border-[var(--rule)] bg-[var(--paper)] px-5 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--green)] transition hover:bg-[var(--paper-alt)]">
              View all notes
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--rule)] bg-[var(--paper-alt)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reading"
            title="Ideas I’m exploring"
            description="A small, thoughtful selection of books and essays that are shaping the way I build, write, and think."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {readingList.map((item, index) => (
              <ReadingCard key={item._id} {...item} accentIndex={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--rule)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[var(--rule)] bg-[var(--paper)] p-10 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.01em] text-[var(--ink)] sm:text-4xl">
              Join the newsletter
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
              I’m building a thoughtful space for essays, notes, and ideas. If you want to stay updated, reach out and I’ll let you know when new work is published.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-6 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--paper)] transition hover:bg-[var(--green)]">
                Contact me
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center border border-[var(--ink)] bg-transparent px-6 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink)] transition hover:bg-[var(--paper-alt)]">
                Browse essays
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
