import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import type { Post } from "@/lib/types"

interface FeaturedArticlesProps {
  posts: Post[]
}

export function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:gap-12">
          {posts.slice(0, 1).map((post) => (
            <ArticleCard key={post._id} post={post} featured />
          ))}
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.slice(1, 3).map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
