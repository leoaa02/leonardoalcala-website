import type { Metadata } from "next"
import { format } from "date-fns"
import { client } from "@/sanity/lib/client"
import { notesQuery } from "@/sanity/lib/queries"
import type { Note } from "@/lib/types"

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short thoughts, ideas, and reflections - a digital garden of notes.",
}

const demoNotes: Note[] = [
  {
    _id: "1",
    content:
      "The best code is the code you don't have to write. Before starting any feature, ask yourself: is this really necessary? Sometimes the best solution is to simplify the problem.",
    publishedAt: new Date().toISOString(),
    tags: [
      { _id: "tag1", title: "Programming", slug: { _type: "slug", current: "programming" } },
    ],
  },
  {
    _id: "2",
    content:
      "I've been experimenting with time-blocking lately. Dedicating specific hours to deep work has dramatically improved my productivity. The key is protecting those blocks from interruptions.",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag2", title: "Productivity", slug: { _type: "slug", current: "productivity" } },
    ],
  },
  {
    _id: "3",
    content:
      "Reading 'Show Your Work' by Austin Kleon. His point about sharing your process, not just the finished product, resonates with me. Documentation and transparency build trust.",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag3", title: "Reading", slug: { _type: "slug", current: "reading" } },
    ],
  },
  {
    _id: "4",
    content:
      "The relationship between constraints and creativity is fascinating. Some of my best work has come from projects with strict limitations. Constraints force you to think differently.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag4", title: "Creativity", slug: { _type: "slug", current: "creativity" } },
    ],
  },
  {
    _id: "5",
    content:
      "TypeScript tip: Use discriminated unions for state management. Having a 'status' field that determines the shape of your data makes impossible states unrepresentable.",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag5", title: "TypeScript", slug: { _type: "slug", current: "typescript" } },
    ],
  },
  {
    _id: "6",
    content:
      "Walking away from a problem often leads to the solution. The subconscious mind continues working on it. I've lost count of how many bugs I've solved while taking a shower.",
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { _id: "tag6", title: "Problem Solving", slug: { _type: "slug", current: "problem-solving" } },
    ],
  },
]

async function getNotes(): Promise<Note[]> {
  try {
    const notes = await client.fetch<Note[]>(notesQuery)
    return notes && notes.length > 0 ? notes : demoNotes
  } catch {
    return demoNotes
  }
}

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Notes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Short thoughts, ideas, and reflections. A digital garden where I
            plant seeds of ideas.
          </p>
        </header>

        <div className="space-y-8">
          {notes.map((note) => (
            <article
              key={note._id}
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-sm"
            >
              <p className="text-foreground leading-relaxed">{note.content}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                )}
                {note.publishedAt && (
                  <time
                    dateTime={note.publishedAt}
                    className="text-sm text-muted-foreground"
                  >
                    {format(new Date(note.publishedAt), "MMM d, yyyy")}
                  </time>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
