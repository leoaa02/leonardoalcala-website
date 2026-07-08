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
      <aside className="lg:w-64 lg:shrink-0">
        <div className="sticky top-24 space-y-8">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-soft)]" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="border-[var(--rule)] bg-[var(--paper)] pl-9 text-[var(--ink)]"
              />
            </div>
          </div>

          {categories.length > 0 && (
            <div>
              <h3 className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className={`border px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] transition-colors ${
                      selectedCategory === category._id
                        ? "border-[var(--green)] bg-[var(--green)] text-[var(--paper)]"
                        : "border-[var(--rule)] bg-[var(--paper)] text-[var(--ink-soft)] hover:border-[var(--green)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <h3 className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    onClick={() => handleTagClick(tag._id)}
                    className={`border px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] transition-colors ${
                      selectedTag === tag._id
                        ? "border-[var(--rust)] bg-[var(--rust)] text-[var(--paper)]"
                        : "border-[var(--rule)] bg-[var(--paper)] text-[var(--ink-soft)] hover:border-[var(--rust)] hover:text-[var(--ink)]"
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

      <div className="flex-1">
        {paginatedPosts.length === 0 ? (
          <div className="border border-[var(--rule)] bg-[var(--paper)] p-8 text-center">
            <p className="text-[var(--ink-soft)]">No articles found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedPosts.map((post, index) => (
                <ArticleCard key={post._id} post={post} accentIndex={index} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border border-[var(--rule)] bg-[var(--paper)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-soft)] transition hover:bg-[var(--paper-alt)] disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 border font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] transition ${
                        currentPage === page
                          ? "border-[var(--green)] bg-[var(--green)] text-[var(--paper)]"
                          : "border-[var(--rule)] bg-[var(--paper)] text-[var(--ink-soft)] hover:border-[var(--green)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="border border-[var(--rule)] bg-[var(--paper)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-soft)] transition hover:bg-[var(--paper-alt)] disabled:opacity-50"
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
