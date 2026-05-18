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
    <div className={cn(mobile ? "space-y-1" : "flex items-center gap-4", className)}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "block rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
              mobile
                ? "text-foreground/90 hover:bg-muted hover:text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
              isActive && "bg-muted text-foreground"
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}
