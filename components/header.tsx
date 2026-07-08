"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Navigation } from "@/components/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--rule)] bg-[var(--paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="block font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--green)]">
            Leonardo Alcala
          </span>
        </Link>

        {/* Desktop Navigation + Theme Toggle */}
        <div className="hidden items-center gap-6 md:flex">
          <Navigation />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center border border-[var(--rule)] bg-[var(--paper)] p-2 text-[var(--ink-soft)] transition hover:bg-[var(--paper-alt)] hover:text-[var(--ink)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--rule)] bg-[var(--paper)] px-4 py-4 md:hidden">
          <Navigation mobile onItemClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}