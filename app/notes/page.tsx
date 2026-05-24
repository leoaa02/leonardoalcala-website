import type { Metadata } from "next"
import { format } from "date-fns"
import { client } from "@/sanity/lib/client"
import { notesQuery } from "@/sanity/lib/queries"
import type { Note } from "@/lib/types"

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short thoughts, ideas, and reflections in a calm, editorial space.",
}

async function getNotes(): Promise<Note[]> {
  try {
    const notes = await client.fetch<Note[]>(notesQuery)
    // minimal debug: log number of notes fetched on server
    console.info("[Notes] fetched", (notes || []).length, "items")
    return notes || []
  } catch {
    console.error("[Notes] failed to fetch notes from Sanity")
    return []
  }
}

export const revalidate = 60

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
            Short thoughts, ideas, and reflections. A calm place where I
            plant seeds of ideas.
          </p>
        </header>

        <div className="space-y-8">
          {notes.map((note) => {
            const href = note.slug?.current ? `/notes/${note.slug.current}` : `/notes/id/${note._id}`
            return (
              <article
                key={note._id}
                className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-sm"
              >
                <a href={href} className="text-foreground no-underline">
                  <p className="text-foreground leading-relaxed">{note.content}</p>
                </a>
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
