import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {project.mainImage && (
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={urlFor(project.mainImage).width(800).height(500).url()}
            alt={project.mainImage.alt || project.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-foreground">{project.title}</h3>
          {project.description && (
            <p className="text-sm leading-7 text-muted-foreground line-clamp-4">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          {project.technologies?.map((tech) => (
            <span key={tech} className="rounded-full bg-muted px-3 py-1">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary transition hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
              View project
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
