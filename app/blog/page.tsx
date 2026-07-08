import type { Metadata } from "next"
import { BlogList } from "@/components/blog-list"
import { client } from "@/sanity/lib/client"
import { postsQuery, categoriesQuery, tagsQuery } from "@/sanity/lib/queries"
import type { Post, Category, Tag } from "@/lib/types"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about technology, programming, productivity, and storytelling.",
}

export const dynamic = "force-dynamic"
export const revalidate = 60

async function getData() {
  try {
    const [posts, categories, tags] = await Promise.all([
      client.fetch<Post[]>(postsQuery),
      client.fetch<Category[]>(categoriesQuery),
      client.fetch<Tag[]>(tagsQuery),
    ])

    return {
      posts,
      categories,
      tags,
    }
  } catch {
    return {
      posts: [],
      categories: [],
      tags: [],
    }
  }
}

export default async function BlogPage() {
  const { posts, categories, tags } = await getData()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">
            Essays
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
            Thoughts on technology, programming, productivity, and the art of
            storytelling.
          </p>
        </header>

        <BlogList posts={posts} categories={categories} tags={tags} />
      </div>
    </div>
  )
}
