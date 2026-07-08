import type { Metadata } from "next"
import { SectionHeading } from "@/components/section-heading"
import { PortableTextRenderer } from "@/components/portable-text-renderer"
import { client } from "@/sanity/lib/client"
import { nowPageQuery } from "@/sanity/lib/queries"
import type { NowPage } from "@/lib/types"

export const metadata: Metadata = {
  title: "Now",
  description: "What I am building, learning, and exploring currently.",
}

const defaultNowPage: NowPage = {
  _id: "default-now",
  title: "What I’m focused on today",
  subtitle: "A brief, editorial snapshot of my current work, learning, and the ideas I’m following closely.",
  content: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Designing a cleaner essay-first website experience, sharing notes from my creative process, and building a portfolio that emphasizes thoughtful ideas over a laundry list of features.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Studying systems thinking, the psychology of habit formation, and the intersection of writing with product strategy.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Reading essays about technology and culture, refining my own voice, and collecting ideas for future essays and digital experiments.",
        },
      ],
    },
  ],
}

async function getNowPage(): Promise<NowPage> {
  try {
    const page = await client.fetch<NowPage>(nowPageQuery)
    return page || defaultNowPage
  } catch {
    return defaultNowPage
  }
}

export default async function NowPage() {
  const nowPage = await getNowPage()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Now"
          title={nowPage.title}
          description={nowPage.subtitle ?? "A brief, editorial snapshot of my current work, learning, and the ideas I’m following closely."}
        />

        <div className="mt-12 space-y-10">
          <div className="border border-[var(--rule)] bg-[var(--paper)] p-8">
            <PortableTextRenderer value={nowPage.content ?? []} />
          </div>
        </div>
      </div>
    </div>
  )
}
