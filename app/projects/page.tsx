import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"
import { client } from "@/sanity/lib/client"
import { projectsQuery } from "@/sanity/lib/queries"
import type { Project } from "@/lib/types"

const localProjects: Project[] = [
  {
    _id: "local-astro-buy",
    title: "Astro Buy",
    slug: { _type: "slug", current: "astro-buy" },
    description:
      "Modern ecommerce experience focused on clean UI, product browsing, and responsive shopping interactions.",
    technologies: ["React", "JavaScript", "CSS", "Ecommerce UI"],
    projectUrl: "https://astro-buy-eight.vercel.app/",
    githubUrl: "https://github.com/leoaa02/ProyectoFinalEcommerce-Alcala",
  },
  {
    _id: "local-sonic-flow",
    title: "Sonic Flow",
    slug: { _type: "slug", current: "sonic-flow" },
    description:
      "Music platform inspired web experience with immersive design and modern frontend interactions.",
    technologies: ["React", "Vite", "JavaScript", "UI Design"],
    projectUrl: "https://sonic-flow-lake.vercel.app/",
    githubUrl: "https://github.com/leoaa02/Proyecto-SonicFlow",
  },
  {
    _id: "local-cafe-del-sol",
    title: "Cafe del Sol",
    slug: { _type: "slug", current: "cafe-del-sol" },
    description:
      "Coffee shop landing page focused on branding, atmosphere, and responsive visual presentation.",
    technologies: ["HTML", "CSS", "JavaScript"],
    projectUrl: "https://leoaa02.github.io/Cafe-del-Sol--Sample-Project/",
    githubUrl: "https://github.com/leoaa02/Cafe-del-Sol--Sample-Project",
  },
  {
    _id: "local-name-webpage",
    title: "Name Webpage",
    slug: { _type: "slug", current: "name-webpage" },
    description:
      "Personal landing page project showcasing design, brand presence, and an elegant responsive interface.",
    technologies: ["React", "Vercel", "JavaScript", "UI Design"],
    projectUrl: "https://name-webpage.vercel.app/",
    githubUrl: "https://github.com/leoaa02/name-webpage",
  },
  {
    _id: "local-planify",
    title: "Planify",
    slug: { _type: "slug", current: "planify" },
    description:
      "Project planning dashboard designed for task management, team workflows, and modern project visibility.",
    technologies: ["React", "Vercel", "JavaScript", "UI Design"],
    projectUrl: "https://planify-proyect-knrd9qz8g-leoaa02s-projects.vercel.app/",
    githubUrl: "https://github.com/leoaa02/planify-proyect",
  },
]

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
    // merge local projects, avoid duplicates by slug
    const existingSlugs = new Set((projects ?? []).map((p) => p.slug?.current))
    const merged = [...(projects ?? [])]
    for (const lp of localProjects) {
      if (!existingSlugs.has(lp.slug.current)) merged.push(lp)
    }
    return merged
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
