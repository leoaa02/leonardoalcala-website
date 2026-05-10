import { Hero } from "@/components/hero"
import { FeaturedArticles } from "@/components/featured-articles"
import { client } from "@/sanity/lib/client"
import { featuredPostsQuery, postsQuery } from "@/sanity/lib/queries"
import type { Post } from "@/lib/types"

// Demo data for when Sanity is not configured
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
  },
  {
    _id: "2",
    title: "The Art of Writing Clean Code",
    slug: { _type: "slug", current: "writing-clean-code" },
    excerpt:
      "Learn principles and practices for writing maintainable, readable code that stands the test of time.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    categories: [
      { _id: "cat2", title: "Programming", slug: { _type: "slug", current: "programming" } },
    ],
  },
  {
    _id: "3",
    title: "Productivity Systems That Actually Work",
    slug: { _type: "slug", current: "productivity-systems" },
    excerpt:
      "A deep dive into productivity methodologies and how to build sustainable habits for creative work.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    categories: [
      { _id: "cat3", title: "Productivity", slug: { _type: "slug", current: "productivity" } },
    ],
  },
]

async function getPosts(): Promise<Post[]> {
  try {
    // Try to get featured posts first
    let posts = await client.fetch<Post[]>(featuredPostsQuery)
    
    // If no featured posts, get regular posts
    if (!posts || posts.length === 0) {
      posts = await client.fetch<Post[]>(postsQuery)
    }
    
    return posts && posts.length > 0 ? posts.slice(0, 3) : demoPosts
  } catch {
    // Return demo data if Sanity is not configured
    return demoPosts
  }
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <>
      <Hero />
      <FeaturedArticles posts={posts} />
    </>
  )
}
