"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Navigation } from "@/components/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div>
            <span className="block font-serif text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              Leonardo Alcala
            </span>
          </div>
        </Link>

        {/* Desktop Navigation + Theme Toggle */}
        <div className="hidden items-center gap-6 md:flex">
          <Navigation />
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center rounded-full border border-border px-3 py-2 text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/95 px-4 py-4 md:hidden">
          <Navigation
            mobile
            onItemClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  )
}