import type { Metadata } from "next"
import { format } from "date-fns"
import { client } from "@/sanity/lib/client"
import { noteBySlugQuery } from "@/sanity/lib/queries"
import type { Note } from "@/lib/types"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await client.fetch<Note | null>(noteBySlugQuery, { slug: params.slug })

  return {
    title: note ? `Note · ${format(new Date(note.publishedAt), "MMM d, yyyy")}` : "Note",
  }
}

async function getNoteBySlug(slug: string): Promise<Note | null> {
  try {
    const note = await client.fetch<Note | null>(noteBySlugQuery, { slug })
    if (!note) console.info("[Notes] note not found by slug", slug)
    return note
  } catch (err) {
    console.error("[Notes] failed to fetch note by slug", err)
    return null
  }
}

export default async function NoteBySlugPage({ params }: Props) {
  const note = await getNoteBySlug(params.slug)

  if (!note) {
    return (
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl">Note not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <article className="prose max-w-none">
          <p className="text-foreground leading-relaxed">{note.content}</p>
          {note.publishedAt && (
            <time dateTime={note.publishedAt} className="text-sm text-muted-foreground block mt-4">
              {format(new Date(note.publishedAt), "MMM d, yyyy")}
            </time>
          )}
        </article>
      </div>
    </div>
  )
}
