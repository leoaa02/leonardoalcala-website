"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigationItems } from "@/lib/navigation"

export function Navigation({
  className,
  mobile = false,
  onItemClick,
}: {
  className?: string
  mobile?: boolean
  onItemClick?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className={cn(mobile ? "space-y-2" : "flex items-center gap-2", className)}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "block px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] transition-colors duration-200",
              mobile
                ? "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
              isActive && "text-[var(--green)]"
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}
