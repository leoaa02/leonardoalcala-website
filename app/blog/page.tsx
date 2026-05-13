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
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thoughts on technology, programming, productivity, and the art of
            storytelling.
          </p>
        </header>

        <BlogList posts={posts} categories={categories} tags={tags} />
      </div>
    </div>
  )
}
