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

const demoPosts: Post[] = [
  {
    _id: "1",
    title: "Building Modern Web Applications with Next.js 15",
    slug: { _type: "slug", current: "building-modern-web-apps" },
    excerpt:
      "Explore the latest features in Next.js 15 and learn how to build performant, scalable web applications with the App Router.",
    publishedAt: new Date().toISOString(),
    readingTime: 8,
    categories: [
      { _id: "cat1", title: "Development", slug: { _type: "slug", current: "development" } },
    ],
  },
  {
    _id: "2",
    title: "The Art of Writing Clean Code",
    slug: { _type: "slug", current: "writing-clean-code" },
    excerpt:
      "Learn principles and practices for writing maintainable, readable code that stands the test of time.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    categories: [
      { _id: "cat2", title: "Programming", slug: { _type: "slug", current: "programming" } },
    ],
  },
  {
    _id: "3",
    title: "Productivity Systems That Actually Work",
    slug: { _type: "slug", current: "productivity-systems" },
    excerpt:
      "A deep dive into productivity methodologies and how to build sustainable habits for creative work.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    categories: [
      { _id: "cat3", title: "Productivity", slug: { _type: "slug", current: "productivity" } },
    ],
  },
]

const demoProjects: Project[] = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    slug: { _type: "slug", current: "ecommerce-platform" },
    description:
      "A full-featured e-commerce platform built with Next.js, featuring inventory management, checkout, and merchant tooling.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "2",
    title: "Task Management App",
    slug: { _type: "slug", current: "task-management" },
    description:
      "A collaborative task management app with boards, priorities, and polished interactions for teams.",
    technologies: ["React", "Node.js", "Socket.io"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "3",
    title: "Markdown Note Taking App",
    slug: { _type: "slug", current: "markdown-notes" },
    description:
      "A minimal note-taking app with Markdown, tagging, and local-first storage for personal knowledge work.",
    technologies: ["Electron", "React", "SQLite"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
]

const demoNotes: Note[] = [
  {
    _id: "1",
    content:
      "The best code is the code you don't have to write. Before starting any feature, ask yourself: is this really necessary?",
    publishedAt: new Date().toISOString(),
    tags: [
      { _id: "tag1", title: "Programming", slug: { _type: "slug", current: "programming" } },
    ],
  },
  {
    _id: "2",
    content:
      "Time-blocking has improved my focus. Protecting deep work blocks is the difference between output and distraction.",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag2", title: "Productivity", slug: { _type: "slug", current: "productivity" } },
    ],
  },
  {
    _id: "3",
    content:
      "Sharing process matters. Writing about progress makes ideas clearer and helps others follow along.",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag3", title: "Writing", slug: { _type: "slug", current: "writing" } },
    ],
  },
]

const demoReadingList: Reading[] = [
  {
    _id: "1",
    title: "Show Your Work!",
    author: "Austin Kleon",
    description:
      "A practical guide to sharing process, making ideas visible, and building an audience through generosity.",
    href: "https://en.wikipedia.org/wiki/Show_Your_Work!",
    external: true,
  },
  {
    _id: "2",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    description:
      "Collected essays on wealth, happiness, and decision making that feel at home in an intellectual digital garden.",
    href: "https://nav.al/almanack",
    external: true,
  },
  {
    _id: "3",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description:
      "A foundational look at how we think, decide, and develop habits — useful for builders, writers, and makers.",
    href: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
    external: true,
  },
]

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<Post[]>(featuredPostsQuery)
    return posts && posts.length > 0 ? posts.slice(0, 3) : demoPosts
  } catch {
    return demoPosts
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<Project[]>(featuredProjectsQuery)
    return projects && projects.length > 0 ? projects.slice(0, 3) : demoProjects
  } catch {
    return demoProjects
  }
}

async function getNotes(): Promise<Note[]> {
  try {
    const notes = await client.fetch<Note[]>(notesQuery)
    return notes && notes.length > 0 ? notes.slice(0, 3) : demoNotes
  } catch {
    return demoNotes
  }
}

async function getReadingList(): Promise<Reading[]> {
  try {
    const readings = await client.fetch<Reading[]>(readingQuery)
    return readings && readings.length > 0 ? readings.slice(0, 3) : demoReadingList
  } catch {
    return demoReadingList
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

      <FeaturedArticles posts={posts} />

      <section className="border-t border-border bg-background/75 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Notes"
            title="Short thoughts, observations, and ideas"
            description="A small collection of notes from my work, learning, and experiments in technology and creative thinking."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {notes.map((note) => (
              <article
                key={note._id}
                className="rounded-[1.75rem] border border-border bg-card p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <p className="text-sm leading-7 text-muted-foreground">{note.content}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>{new Date(note.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  {note.tags?.length ? (
                    <span className="rounded-full border border-border bg-muted px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {note.tags[0].title}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-primary transition hover:bg-muted"
            >
              View all notes
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work and experiments"
            description="A handpicked portfolio of projects that demonstrate craftsmanship, attention to detail, and thoughtful product design."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-primary transition hover:bg-muted"
            >
              View all projects
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background/75 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reading"
            title="Ideas I’m exploring"
            description="A small, thoughtful selection of books and essays that are shaping the way I build, write, and think."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {readingList.map((item) => (
              <ReadingCard key={item._id} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-sm">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Join the newsletter
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              I’m building a thoughtful space for essays, notes, and ideas. If you want to stay updated, reach out and I’ll let you know when new work is published.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Contact me
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-primary transition hover:bg-muted"
              >
                Browse essays
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
