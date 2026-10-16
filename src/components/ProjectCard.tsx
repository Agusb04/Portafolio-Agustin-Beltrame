import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/social-icons";
import type { Project } from "@/types/portfolio";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, keyFeatures, tags, repoUrl, demoUrl, extraLinks } =
    project;
  const hasDemo = Boolean(demoUrl && demoUrl.trim().length > 0);
  const hasRepo = Boolean(repoUrl && repoUrl.trim().length > 0);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-lg font-semibold break-words">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">
        {description}
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {keyFeatures.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm break-words"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            {feature}
          </li>
        ))}
      </ul>

      <ul
        aria-label={`Technologies used in ${title}`}
        className="mt-4 flex flex-wrap gap-2"
      >
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground break-words"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {hasDemo && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo for ${title}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            Live Demo
          </a>
        )}
        {hasRepo && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code repository for ${title}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            <GithubIcon className="h-4 w-4" />
            Source Code
          </a>
        )}
        {extraLinks?.map((link) => {
          const LinkIconComponent =
            link.icon === "Github" ? GithubIcon : ExternalLink;
          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${link.label} for ${title}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <LinkIconComponent className="h-4 w-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    </article>
  );
}
