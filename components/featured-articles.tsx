import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { SectionHeading } from "@/components/section-heading"
import type { Post } from "@/lib/types"

interface FeaturedArticlesProps {
  posts: Post[]
}

export function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="border-t border-[var(--rule)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Essays"
            title="Featured essays"
            description="Recent long-form reflections selected for their depth and clarity."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--green)] transition hover:bg-[var(--paper-alt)]"
          >
            View all essays
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:gap-8">
          {posts.slice(0, 1).map((post) => (
            <ArticleCard key={post._id} post={post} featured accentIndex={0} />
          ))}

          <div className="grid gap-6 md:grid-cols-2">
            {posts.slice(1, 3).map((post, index) => (
              <ArticleCard key={post._id} post={post} accentIndex={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
