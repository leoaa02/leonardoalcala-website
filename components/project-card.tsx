import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"

interface ProjectCardProps {
  project: Project
  accentIndex?: number
}

const accentColors = ["var(--green)", "var(--rust)", "var(--gold)"]

export function ProjectCard({ project, accentIndex = 0 }: ProjectCardProps) {
  const accentColor = accentColors[accentIndex % accentColors.length]

  return (
    <article className="group relative overflow-hidden border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] transition duration-200 hover:-translate-y-0.5">
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accentColor }} />
      {project.mainImage && (
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-alt)]">
          <img
            src={urlFor(project.mainImage).width(800).height(500).url()}
            alt={project.mainImage.alt || project.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em]" style={{ color: accentColor }}>
            Project
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--ink)]">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-sm leading-7 text-[var(--ink-soft)] line-clamp-4">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
          {project.technologies?.map((tech) => (
            <span key={tech} className="border border-[var(--rule)] bg-[var(--paper-alt)] px-3 py-1">
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
              className="inline-flex items-center gap-2 text-[var(--green)] transition hover:text-[var(--rust)]"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
