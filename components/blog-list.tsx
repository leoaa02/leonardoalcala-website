"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ArticleCard } from "@/components/article-card"
import type { Post, Category, Tag } from "@/lib/types"

interface BlogListProps {
  posts: Post[]
  categories: Category[]
  tags: Tag[]
}

const POSTS_PER_PAGE = 6

export function BlogList({ posts, categories, tags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        !selectedCategory ||
        post.categories?.some((cat) => cat._id === selectedCategory)

      // Tag filter
      const matchesTag =
        !selectedTag || post.tags?.some((tag) => tag._id === selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [posts, searchQuery, selectedCategory, selectedTag])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
    setCurrentPage(1)
  }

  const handleTagClick = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? null : tagId)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Sidebar */}
      <aside className="lg:w-64 lg:shrink-0">
        <div className="sticky top-24 space-y-8">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9"
              />
            </div>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                      selectedCategory === category._id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    onClick={() => handleTagClick(tag._id)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      selectedTag === tag._id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {paginatedPosts.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No articles found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-10">
              {paginatedPosts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
