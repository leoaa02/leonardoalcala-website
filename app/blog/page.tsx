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

const demoPosts: Post[] = [
  {
    _id: "1",
    title: "Building Modern Web Applications with Next.js 15",
    slug: { _type: "slug", current: "building-modern-web-apps" },
    excerpt:
      "Explore the latest features in Next.js 15 and learn how to build performant, scalable web applications with the App Router.",
    publishedAt: new Date().toISOString(),
    readingTime: 8,
    categories: [
      { _id: "cat1", title: "Development", slug: { _type: "slug", current: "development" } },
    ],
    tags: [
      { _id: "tag1", title: "Next.js", slug: { _type: "slug", current: "nextjs" } },
      { _id: "tag2", title: "React", slug: { _type: "slug", current: "react" } },
    ],
  },
  {
    _id: "2",
    title: "The Art of Writing Clean Code",
    slug: { _type: "slug", current: "writing-clean-code" },
    excerpt:
      "Learn principles and practices for writing maintainable, readable code that stands the test of time.",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    categories: [
      { _id: "cat2", title: "Programming", slug: { _type: "slug", current: "programming" } },
    ],
    tags: [
      { _id: "tag3", title: "Best Practices", slug: { _type: "slug", current: "best-practices" } },
    ],
  },
  {
    _id: "3",
    title: "Productivity Systems That Actually Work",
    slug: { _type: "slug", current: "productivity-systems" },
    excerpt:
      "A deep dive into productivity methodologies and how to build sustainable habits for creative work.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    categories: [
      { _id: "cat3", title: "Productivity", slug: { _type: "slug", current: "productivity" } },
    ],
    tags: [
      { _id: "tag4", title: "Habits", slug: { _type: "slug", current: "habits" } },
    ],
  },
  {
    _id: "4",
    title: "Introduction to TypeScript for JavaScript Developers",
    slug: { _type: "slug", current: "intro-typescript" },
    excerpt:
      "A comprehensive guide to getting started with TypeScript and understanding its benefits for large-scale applications.",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 10,
    categories: [
      { _id: "cat1", title: "Development", slug: { _type: "slug", current: "development" } },
    ],
    tags: [
      { _id: "tag5", title: "TypeScript", slug: { _type: "slug", current: "typescript" } },
    ],
  },
  {
    _id: "5",
    title: "Design Systems: From Concept to Implementation",
    slug: { _type: "slug", current: "design-systems" },
    excerpt:
      "How to create and maintain a design system that scales with your organization and improves developer experience.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    categories: [
      { _id: "cat1", title: "Development", slug: { _type: "slug", current: "development" } },
    ],
    tags: [
      { _id: "tag6", title: "Design", slug: { _type: "slug", current: "design" } },
    ],
  },
  {
    _id: "6",
    title: "The Power of Storytelling in Technical Writing",
    slug: { _type: "slug", current: "storytelling-technical-writing" },
    excerpt:
      "Learn how to use narrative techniques to make your technical content more engaging and memorable.",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    categories: [
      { _id: "cat4", title: "Writing", slug: { _type: "slug", current: "writing" } },
    ],
    tags: [
      { _id: "tag7", title: "Storytelling", slug: { _type: "slug", current: "storytelling" } },
    ],
  },
]

const demoCategories: Category[] = [
  { _id: "cat1", title: "Development", slug: { _type: "slug", current: "development" } },
  { _id: "cat2", title: "Programming", slug: { _type: "slug", current: "programming" } },
  { _id: "cat3", title: "Productivity", slug: { _type: "slug", current: "productivity" } },
  { _id: "cat4", title: "Writing", slug: { _type: "slug", current: "writing" } },
]

const demoTags: Tag[] = [
  { _id: "tag1", title: "Next.js", slug: { _type: "slug", current: "nextjs" } },
  { _id: "tag2", title: "React", slug: { _type: "slug", current: "react" } },
  { _id: "tag3", title: "Best Practices", slug: { _type: "slug", current: "best-practices" } },
  { _id: "tag4", title: "Habits", slug: { _type: "slug", current: "habits" } },
  { _id: "tag5", title: "TypeScript", slug: { _type: "slug", current: "typescript" } },
  { _id: "tag6", title: "Design", slug: { _type: "slug", current: "design" } },
]

async function getData() {
  try {
    const [posts, categories, tags] = await Promise.all([
      client.fetch<Post[]>(postsQuery),
      client.fetch<Category[]>(categoriesQuery),
      client.fetch<Tag[]>(tagsQuery),
    ])
    
    return {
      posts: posts && posts.length > 0 ? posts : demoPosts,
      categories: categories && categories.length > 0 ? categories : demoCategories,
      tags: tags && tags.length > 0 ? tags : demoTags,
    }
  } catch {
    return {
      posts: demoPosts,
      categories: demoCategories,
      tags: demoTags,
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
