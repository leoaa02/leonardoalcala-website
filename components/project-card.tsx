import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md">
      {project.mainImage && (
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={urlFor(project.mainImage).width(600).height(375).url()}
            alt={project.mainImage.alt || project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
        {project.description && (
          <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center gap-3">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
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
