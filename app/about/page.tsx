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
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rust)]">
            About
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
            Frontend Developer, QA Tester & Aspiring Journalist
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
            I am passionate about building meaningful digital experiences and
            telling stories that inform, inspire, and connect people. My work
            combines technology, quality assurance, and a deep interest in
            journalism, writing, and communication.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <section className="border border-[var(--rule)] bg-[var(--paper)] p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.01em] text-[var(--ink)]">
                Biography
              </h2>
              <div className="mt-6 space-y-4 text-[var(--ink-soft)]">
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

            <section className="grid gap-6 border border-[var(--rule)] bg-[var(--paper)] p-8">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.01em] text-[var(--ink)]">
                  Skills
                </h2>
                <p className="mt-3 text-sm text-[var(--ink-soft)]">
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
                    className="inline-flex border border-[var(--rule)] bg-[var(--paper-alt)] px-4 py-2 text-sm text-[var(--ink-soft)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="grid gap-6 border border-[var(--rule)] bg-[var(--paper)] p-8">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.01em] text-[var(--ink)]">
                  Profile
                </h2>
              </div>
              <p className="leading-8 text-[var(--ink-soft)]">
                I am a multidisciplinary professional with a strong interest in
                software development, quality assurance, journalism, and creative
                writing. I enjoy building elegant web experiences, analyzing
                complex topics, and telling stories that have a meaningful impact.
              </p>
              <p className="leading-8 text-[var(--ink-soft)]">
                My approach blends technical rigor with thoughtful design and
                clear communication. I strive to create digital products that feel
                intuitive, dependable, and resonant.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden border border-[var(--rule)] bg-[var(--paper)]">
              <Image
                src="/me.jpg"
                alt="Portrait of Leonardo Alcala"
                width={1200}
                height={1500}
                className="h-96 w-full object-cover"
              />
            </div>

            <section className="border border-[var(--rule)] bg-[var(--paper)] p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.01em] text-[var(--ink)]">
                Interests
              </h2>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
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
                    className="border border-[var(--rule)] bg-[var(--paper-alt)] px-4 py-2 text-sm text-[var(--ink-soft)]"
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
