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

const demoReadingList: Reading[] = [
  {
    _id: "1",
    title: "The Fourth Turning",
    author: "William Strauss & Neil Howe",
    href: "https://en.wikipedia.org/wiki/The_Fourth_Turning",
    description:
      "A thoughtful essay on generational cycles, history, and how intellectual frameworks shape long-term decision-making.",
    external: true,
  },
  {
    _id: "2",
    title: "The Road to Character",
    author: "David Brooks",
    href: "https://en.wikipedia.org/wiki/The_Road_to_Character",
    description:
      "A reflective look at values, craftsmanship, and what it takes to stay grounded while building a meaningful life.",
    external: true,
  },
  {
    _id: "3",
    title: "Show Your Work!",
    author: "Austin Kleon",
    href: "https://en.wikipedia.org/wiki/Show_Your_Work!",
    description:
      "A practical guide for sharing process and progress with clarity and generosity, especially useful for writers and builders.",
    external: true,
  },
]

async function getReadingList(): Promise<Reading[]> {
  try {
    const readings = await client.fetch<Reading[]>(readingQuery)
    return readings && readings.length > 0 ? readings : demoReadingList
  } catch {
    return demoReadingList
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
