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

export const dynamic = "force-dynamic"
export const revalidate = 60

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery)
    return projects ?? []
  } catch {
    return []
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
