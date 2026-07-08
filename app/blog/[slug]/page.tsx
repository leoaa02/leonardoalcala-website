import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
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
export const dynamic = "force-dynamic"
export const revalidate = 60

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch<Post>(postBySlugQuery, { slug })
  } catch {
    return null
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
          className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-soft)] hover:text-[var(--green)]"
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
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.01em] sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-soft)]">
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
          <div className="mt-10 overflow-hidden border border-[var(--rule)] bg-[var(--paper-alt)]">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.mainImage.alt || post.title}
              width={1600}
              height={900}
              className="h-72 w-full object-cover sm:h-80"
            />
          </div>
        )}

        {/* Content with TOC */}
        <div className="mt-12 flex gap-12">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            {post.body && <PortableTextRenderer value={post.body} />}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-[var(--rule)] pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="border border-[var(--rule)] bg-[var(--paper)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-soft)]"
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
          <section className="mt-16 border-t border-[var(--rule)] pt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium">Related Articles</h2>
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
