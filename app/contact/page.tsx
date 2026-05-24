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
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
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
              className="group rounded-[1.75rem] border border-border bg-card p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-6 space-y-2">
                <h2 className="text-lg font-semibold text-foreground">{item.name}</h2>
                <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
