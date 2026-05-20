import type { Metadata } from "next"
import { ReadingCard } from "@/components/reading-card"
import { SectionHeading } from "@/components/section-heading"
import { client } from "@/sanity/lib/client"
import { readingQuery } from "@/sanity/lib/queries"
import type { Reading } from "@/lib/types"

export const metadata: Metadata = {
  title: "Reading",
  description: "Books, essays, and ideas I am exploring right now.",
}

export const dynamic = "force-dynamic"
export const revalidate = 60

async function getReadingList(): Promise<Reading[]> {
  try {
    const readings = await client.fetch<Reading[]>(readingQuery)
    return readings ?? []
  } catch {
    return []
  }
}

export default async function ReadingPage() {
  const readingList = await getReadingList()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reading"
          title="What I am reading now"
          description="A curated collection of books and essays that shape how I think about technology, creativity, systems, and meaningful work."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {readingList.map((item) => (
            <ReadingCard key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
