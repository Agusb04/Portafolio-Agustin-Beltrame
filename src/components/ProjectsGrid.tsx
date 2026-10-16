import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types/portfolio";

export interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="mx-auto max-w-6xl px-4 py-16 sm:py-24"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="max-w-2xl text-muted-foreground">
          A curated selection of key work — problem, solution, highlights and
          stack.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
