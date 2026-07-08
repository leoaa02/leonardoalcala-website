import type { Metadata } from "next"
import { Github, Linkedin, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Leonardo Alcala - email leonardoalcalaavi@gmail.com or connect on LinkedIn and GitHub.",
}

const contactLinks = [
  {
    name: "Email",
    href: "mailto:leonardoalcalaavi@gmail.com",
    icon: Mail,
    description: "leonardoalcalaavi@gmail.com",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/leonardo-alcala-192042233",
    icon: Linkedin,
    description: "linkedin.com/in/leonardo-alcala-192042233",
  },
  {
    name: "GitHub",
    href: "https://github.com/leoaa02",
    icon: Github,
    description: "github.com/leoaa02",
  },
]

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">
            Contact
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
            If you want to get in touch, email me directly or connect with me on LinkedIn and GitHub.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-3">
          {contactLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[var(--rule)] bg-[var(--paper)] p-6 transition duration-200 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-[var(--rule)] bg-[var(--paper-alt)] text-[var(--ink-soft)] transition group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--paper)]">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-6 space-y-2">
                <h2 className="text-lg font-[family-name:var(--font-display)] text-[var(--ink)]">{item.name}</h2>
                <p className="text-sm leading-7 text-[var(--ink-soft)]">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
