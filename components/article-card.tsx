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
      className={`group flex flex-col gap-4 ${
        featured ? "md:flex-row md:gap-8" : ""
      }`}
    >
      {post.mainImage && (
        <Link
          href={`/blog/${post.slug.current}`}
          className={`relative overflow-hidden rounded-lg bg-muted ${
            featured ? "md:w-1/2" : "aspect-[16/9]"
          }`}
        >
          <img
            src={urlFor(post.mainImage).width(800).height(450).url()}
            alt={post.mainImage.alt || post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className={`flex flex-col justify-center ${featured ? "md:w-1/2" : ""}`}>
        {post.categories && post.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category._id}
                className="text-xs font-medium uppercase tracking-wider text-primary"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
        <Link href={`/blog/${post.slug.current}`}>
          <h3
            className={`font-serif font-semibold leading-tight transition-colors group-hover:text-primary ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-muted-foreground">
            {post.excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </time>
          )}
          {post.readingTime && (
            <>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
        {featured && (
          <Link
            href={`/blog/${post.slug.current}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read article
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  )
}
