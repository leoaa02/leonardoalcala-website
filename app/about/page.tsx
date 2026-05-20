import Image from "next/image"
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { authorQuery } from "@/sanity/lib/queries"
import type { Author } from "@/lib/types"

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Leonardo Alcala — frontend developer, QA tester, and aspiring journalist building thoughtful digital experiences.",
}

const defaultAuthor: Author = {
  _id: "default",
  name: "Leonardo Alcala",
  skills: [
    "Frontend Development (HTML, CSS, JavaScript, TypeScript, React, Next.js)",
    "Manual QA Testing",
    "Responsive Web Design",
    "UI/UX Principles",
    "MySQL Databases",
    "Python Fundamentals",
    "Sanity CMS",
    "SEO Optimization",
    "Technical Writing",
    "Research and Analysis",
    "Storytelling",
    "Journalism and Media Communication",
    "Content Creation",
    "English (B2 Intermediate)",
    "Problem Solving",
    "Attention to Detail",
  ],
  interests: [
    "Technology and Software Development",
    "Journalism and Investigative Reporting",
    "Writing and Storytelling",
    "Artificial Intelligence",
    "Product Design",
    "Reading and Lifelong Learning",
    "Global News and Current Affairs",
    "Personal Branding",
    "Literature and Publishing",
    "Photography",
    "Fitness and Wellness",
    "Faith and Spiritual Growth",
  ],
  careerGoals:
    "I am a multidisciplinary professional with a strong interest in software development, quality assurance, journalism, and creative writing. I enjoy building elegant web experiences, analyzing complex topics, and telling stories that have a meaningful impact.",
}

async function getAuthor(): Promise<Author> {
  try {
    const author = await client.fetch<Author>(authorQuery)
    return author || defaultAuthor
  } catch {
    return defaultAuthor
  }
}

export default async function AboutPage() {
  const author = await getAuthor()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-14">
          <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
            About
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Frontend Developer, QA Tester & Aspiring Journalist
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            I am passionate about building meaningful digital experiences and
            telling stories that inform, inspire, and connect people. My work
            combines technology, quality assurance, and a deep interest in
            journalism, writing, and communication.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <section className="rounded-3xl border border-border bg-white/80 p-8 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:bg-zinc-950/80 dark:border-zinc-800">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                Biography
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  I am a multidisciplinary professional with a strong interest in
                  software development, quality assurance, journalism, and creative
                  writing. I enjoy building elegant web experiences, analyzing
                  complex topics, and telling stories that have a meaningful impact.
                </p>
                <p>
                  My work combines technical craft with a thoughtful editorial
                  perspective. I approach each project with clarity, precision,
                  and a desire to connect people through useful, well-designed
                  digital experiences.
                </p>
              </div>
            </section>

            <section className="grid gap-6 rounded-3xl border border-border bg-white/80 p-8 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:bg-zinc-950/80 dark:border-zinc-800">
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                  Skills
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Technologies and capabilities I employ to create thoughtful work.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  "Frontend Development (HTML, CSS, JavaScript, TypeScript, React, Next.js)",
                  "Manual QA Testing",
                  "Responsive Web Design",
                  "UI/UX Principles",
                  "MySQL Databases",
                  "Python Fundamentals",
                  "Sanity CMS",
                  "SEO Optimization",
                  "Technical Writing",
                  "Research and Analysis",
                  "Storytelling",
                  "Journalism and Media Communication",
                  "Content Creation",
                  "English (B2 Intermediate)",
                  "Problem Solving",
                  "Attention to Detail",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground dark:border-zinc-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="grid gap-6 rounded-3xl border border-border bg-white/80 p-8 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:bg-zinc-950/80 dark:border-zinc-800">
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                  Profile
                </h2>
              </div>
              <p className="text-muted-foreground leading-8">
                I am a multidisciplinary professional with a strong interest in
                software development, quality assurance, journalism, and creative
                writing. I enjoy building elegant web experiences, analyzing
                complex topics, and telling stories that have a meaningful impact.
              </p>
              <p className="text-muted-foreground leading-8">
                My approach blends technical rigor with thoughtful design and
                clear communication. I strive to create digital products that feel
                intuitive, dependable, and resonant.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-border bg-white/80 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:bg-zinc-950/80 dark:border-zinc-800">
              <Image
                src="/me.jpg"
                alt="Portrait of Leonardo Alcala"
                width={1200}
                height={1500}
                className="h-96 w-full object-cover"
              />
            </div>

            <section className="rounded-3xl border border-border bg-white/80 p-8 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:bg-zinc-950/80 dark:border-zinc-800">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                Interests
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Topics that shape how I build, write, and think.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Technology and Software Development",
                  "Journalism and Investigative Reporting",
                  "Writing and Storytelling",
                  "Artificial Intelligence",
                  "Product Design",
                  "Reading and Lifelong Learning",
                  "Global News and Current Affairs",
                  "Personal Branding",
                  "Literature and Publishing",
                  "Photography",
                  "Fitness and Wellness",
                  "Faith and Spiritual Growth",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground dark:border-zinc-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
