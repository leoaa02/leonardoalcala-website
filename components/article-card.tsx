import Link from "next/link"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import type { Post } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"

interface ArticleCardProps {
  post: Post
  featured?: boolean
  accentIndex?: number
}

const accentMap = [
  { label: "Chapter", color: "var(--green)" },
  { label: "Chapter", color: "var(--rust)" },
  { label: "Chapter", color: "var(--gold)" },
]

export function ArticleCard({ post, featured = false, accentIndex = 0 }: ArticleCardProps) {
  const accent = accentMap[accentIndex % accentMap.length]

  return (
    <article
      className={`group relative overflow-hidden border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] transition duration-200 hover:-translate-y-0.5 ${
        featured ? "lg:flex lg:items-stretch" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accent.color }} />

      {post.mainImage && (
        <Link
          href={`/blog/${post.slug.current}`}
          className={`relative overflow-hidden bg-[var(--paper-alt)] ${featured ? "lg:w-[44%]" : "aspect-[16/9]"}`}
        >
          <img
            src={urlFor(post.mainImage).width(900).height(560).url()}
            alt={post.mainImage.alt || post.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <div className={`flex flex-col justify-between p-6 ${featured ? "lg:w-[56%]" : ""}`}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em]"
              style={{ color: accent.color }}
            >
              {accent.label} {String(accentIndex + 1).padStart(2, "0")}
            </span>
            {post.categories?.slice(0, 1).map((category) => (
              <span key={category._id} className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                {category.title}
              </span>
            ))}
          </div>

          <Link href={`/blog/${post.slug.current}`}>
            <h3
              className={`font-[family-name:var(--font-display)] font-medium leading-[1.05] text-[var(--ink)] transition-colors group-hover:text-[var(--green)] ${
                featured ? "text-3xl" : "text-2xl"
              }`}
            >
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <p className="text-sm leading-7 text-[var(--ink-soft)] line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="font-[family-name:var(--font-mono)]">
              {format(new Date(post.publishedAt), "MMM d, yyyy")}
            </time>
          )}

          {post.readingTime && (
            <span className="font-[family-name:var(--font-mono)]">{post.readingTime} min read</span>
          )}

          <Link href={`/blog/${post.slug.current}`} className="inline-flex items-center gap-1 text-[var(--green)] transition hover:text-[var(--rust)]">
            Read article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
