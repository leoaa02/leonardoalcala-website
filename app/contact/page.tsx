import type { Metadata } from "next"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Leonardo Alcala - I'd love to hear from you.",
}

const socialLinks = [
  {
    name: "Email",
    href: "mailto:hello@leonardoalcala.com",
    icon: Mail,
    description: "hello@leonardoalcala.com",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    description: "@leonardoalcala",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    description: "Leonardo Alcala",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
    description: "@leonardoalcala",
  },
]

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question, want to collaborate, or just say hello? I&apos;d love to
            hear from you.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-xl font-semibold">Connect</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You can also find me on these platforms.
            </p>
            <div className="mt-6 space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <social.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{social.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {social.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
