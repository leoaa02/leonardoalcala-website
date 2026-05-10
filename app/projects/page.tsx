import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"
import { client } from "@/sanity/lib/client"
import { projectsQuery } from "@/sanity/lib/queries"
import type { Project } from "@/lib/types"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of projects - web applications, tools, and experiments.",
}

const demoProjects: Project[] = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    slug: { _type: "slug", current: "ecommerce-platform" },
    description:
      "A full-featured e-commerce platform built with Next.js, featuring product management, cart functionality, and Stripe payments.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "2",
    title: "Task Management App",
    slug: { _type: "slug", current: "task-management" },
    description:
      "A collaborative task management application with real-time updates, project boards, and team features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "3",
    title: "Developer Portfolio Template",
    slug: { _type: "slug", current: "portfolio-template" },
    description:
      "An open-source portfolio template for developers, featuring a blog, project showcase, and contact form.",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "4",
    title: "CLI Tool for API Testing",
    slug: { _type: "slug", current: "api-testing-cli" },
    description:
      "A command-line tool for testing REST APIs with support for environment variables, collections, and automated testing.",
    technologies: ["Node.js", "Commander.js", "Axios"],
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    _id: "5",
    title: "Markdown Note Taking App",
    slug: { _type: "slug", current: "markdown-notes" },
    description:
      "A minimal note-taking app with Markdown support, full-text search, and local-first data storage.",
    technologies: ["Electron", "React", "SQLite", "CodeMirror"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    _id: "6",
    title: "Weather Dashboard",
    slug: { _type: "slug", current: "weather-dashboard" },
    description:
      "A beautiful weather dashboard showing current conditions, forecasts, and historical data with interactive charts.",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
    projectUrl: "https://example.com",
    featured: false,
  },
]

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery)
    return projects && projects.length > 0 ? projects : demoProjects
  } catch {
    return demoProjects
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of projects I&apos;ve built, from web applications to
            developer tools.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
