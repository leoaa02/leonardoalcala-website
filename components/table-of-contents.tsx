"use client"

import { useEffect, useState } from "react"
import type { PortableTextBlock } from "@portabletext/types"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: PortableTextBlock[]
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [headings, setHeadings] = useState<TocItem[]>([])

  useEffect(() => {
    // Extract headings from portable text content
    const extractedHeadings: TocItem[] = []
    
    content.forEach((block) => {
      if (block._type === "block" && block.style?.match(/^h[2-4]$/)) {
        const text = block.children
          ?.map((child: { text?: string }) => child.text || "")
          .join("") || ""
        
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")

        extractedHeadings.push({
          id,
          text,
          level: parseInt(block.style.replace("h", ""), 10),
        })
      }
    })

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 rounded border border-[var(--rule)] bg-[var(--paper)] p-4">
      <h4 className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">
        On this page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(heading.id)
                element?.scrollIntoView({ behavior: "smooth" })
              }}
              className={`block text-sm transition-colors hover:text-[var(--ink)] ${
                activeId === heading.id
                  ? "font-medium text-[var(--green)]"
                  : "text-[var(--ink-soft)]"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
