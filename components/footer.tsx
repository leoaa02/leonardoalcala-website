import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { navigationItems } from "@/lib/navigation"

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-4">
            <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Leonardo Alcala
            </Link>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              A calm, editorial space for essays, notes, and thoughtful work on technology,
              creativity, and meaningful living.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Navigation</p>
              <div className="flex flex-wrap gap-3">
                {navigationItems.slice(0, 5).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Connect</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Leonardo Alcala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
