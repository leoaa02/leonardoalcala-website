import Link from "next/link"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import type { Post } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"

interface ArticleCardProps {
  post: Post
  featured?: boolean
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.75rem] border border-border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        featured ? "lg:flex lg:items-stretch" : ""
      }`}
    >
      {post.mainImage && (
        <Link
          href={`/blog/${post.slug.current}`}
          className={`relative overflow-hidden bg-muted ${
            featured ? "lg:w-[45%]" : "aspect-[16/9]"
          }`}
        >
          <img
            src={urlFor(post.mainImage).width(900).height(560).url()}
            alt={post.mainImage.alt || post.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <div className={`flex flex-col justify-between p-6 ${featured ? "lg:w-[55%]" : ""}`}>
        <div className="space-y-4">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="text-xs font-medium uppercase tracking-[0.3em] text-primary"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <Link href={`/blog/${post.slug.current}`}>
            <h3
              className={`font-serif font-semibold leading-tight text-foreground transition-colors group-hover:text-primary ${
                featured ? "text-3xl" : "text-2xl"
              }`}
            >
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <p className="text-sm leading-7 text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="font-medium text-muted-foreground">
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </time>
          )}

          {post.readingTime && (
            <span className="font-medium text-muted-foreground">{post.readingTime} min read</span>
          )}

          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary"
          >
            Read article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
