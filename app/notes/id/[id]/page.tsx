import { format } from "date-fns"
import { client } from "@/sanity/lib/client"
import { noteByIdQuery } from "@/sanity/lib/queries"
import type { Note } from "@/lib/types"

type Props = {
  params: { id: string }
}

async function getNote(id: string): Promise<Note | null> {
  try {
    const note = await client.fetch<Note | null>(noteByIdQuery, { id })
    if (!note) console.info("[Notes] note not found", id)
    return note
  } catch (err) {
    console.error("[Notes] failed to fetch note", err)
    return null
  }
}

export default async function NoteByIdPage({ params }: Props) {
  const note = await getNote(params.id)

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
