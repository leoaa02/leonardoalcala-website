import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Clock } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { postBySlugQuery, postsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { PortableTextRenderer } from "@/components/portable-text-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { ShareButtons } from "@/components/share-buttons"
import { ArticleCard } from "@/components/article-card"
import type { Post } from "@/lib/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Demo post for when Sanity is not configured
const demoPost: Post = {
  _id: "demo",
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
  author: {
    _id: "author1",
    name: "Leonardo Alcala",
  },
  body: [
    {
      _type: "block",
      _key: "1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "1a",
          text: "Next.js 15 brings significant improvements to the developer experience and performance. In this article, we will explore the key features and how to leverage them in your projects.",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "2",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "2a",
          text: "The App Router",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "3",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "3a",
          text: "The App Router is a new paradigm for building React applications. It leverages React Server Components and provides a more intuitive way to handle routing, layouts, and data fetching.",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "4",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "4a",
          text: "Server Components",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "5",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "5a",
          text: "React Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving performance. They also enable direct database access and other server-side operations.",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "6",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "6a",
          text: "Improved Caching",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "7",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "7a",
          text: "Next.js 15 introduces more granular caching controls with the new caching APIs. You can now use revalidateTag with cache profiles for stale-while-revalidate behavior.",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "8",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "8a",
          text: "Conclusion",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "9",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "9a",
          text: "Next.js 15 represents a significant step forward in web development. The combination of the App Router, Server Components, and improved caching makes it easier than ever to build fast, scalable applications.",
        },
      ],
      markDefs: [],
    },
  ],
  relatedPosts: [
    {
      _id: "2",
      title: "The Art of Writing Clean Code",
      slug: { _type: "slug", current: "writing-clean-code" },
      excerpt: "Learn principles and practices for writing maintainable, readable code.",
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch<Post>(postBySlugQuery, { slug })
    return post || (slug === "building-modern-web-apps" ? demoPost : null)
  } catch {
    return slug === "building-modern-web-apps" ? demoPost : null
  }
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<Post[]>(postsQuery)
    return posts?.map((post) => ({ slug: post.slug.current })) || []
  } catch {
    return [{ slug: "building-modern-web-apps" }]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://leonardoalcala.com"}/blog/${post.slug.current}`

  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mt-8">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="text-sm font-medium uppercase tracking-wider text-primary"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author && <span>By {post.author.name}</span>}
            {post.publishedAt && (
              <>
                <span>·</span>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                </time>
              </>
            )}
            {post.readingTime && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              </>
            )}
          </div>

          <div className="mt-4">
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <figure className="mt-10">
            <img
              src={urlFor(post.mainImage).width(1200).height(630).url()}
              alt={post.mainImage.alt || post.title}
              className="rounded-lg"
            />
          </figure>
        )}

        {/* Content with TOC */}
        <div className="mt-12 flex gap-12">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            {post.body && <PortableTextRenderer value={post.body} />}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-border pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table of Contents - hidden on mobile */}
          {post.body && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <TableOfContents content={post.body} />
            </aside>
          )}
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-serif text-2xl font-semibold">Related Articles</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {post.relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
