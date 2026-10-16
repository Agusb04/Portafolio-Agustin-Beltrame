import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types/portfolio";

const baseProject: Project = {
  id: "ecommerce-platform",
  title: "E-Commerce Platform",
  description:
    "A full-stack storefront with cart, checkout and admin dashboard.",
  keyFeatures: ["Instant search", "Stripe checkout", "Admin dashboard"],
  tags: ["Next.js", "TypeScript", "PostgreSQL"],
  repoUrl: "https://github.com/agustinbeltrame/ecommerce-platform",
  demoUrl: "https://demo.example.com",
  featured: true,
  order: 1,
};

describe("ProjectCard", () => {
  it("renders title, description, key features and technology tags (FR-004)", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.getByRole("heading", { level: 3, name: baseProject.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseProject.description)).toBeInTheDocument();

    const features = screen.getAllByRole("listitem").map(
      (item) => item.textContent,
    );
    for (const feature of baseProject.keyFeatures) {
      expect(features).toContain(feature);
    }

    const tagList = screen.getByLabelText(
      `Technologies used in ${baseProject.title}`,
    );
    within(tagList).getByText("Next.js");
    within(tagList).getByText("TypeScript");
    within(tagList).getByText("PostgreSQL");
  });

  it("opens demo and repository links in a new secure tab (FR-009, SC-003)", () => {
    render(<ProjectCard project={baseProject} />);

    const demoLink = screen.getByRole("link", {
      name: `View live demo for ${baseProject.title}`,
    });
    expect(demoLink).toHaveAttribute("href", baseProject.demoUrl);
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");

    const repoLink = screen.getByRole("link", {
      name: `View source code repository for ${baseProject.title}`,
    });
    expect(repoLink).toHaveAttribute("href", baseProject.repoUrl);
    expect(repoLink).toHaveAttribute("target", "_blank");
    expect(repoLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("omits the demo button gracefully when demoUrl is missing (FR-006)", () => {
    const withoutDemo: Project = { ...baseProject };
    delete withoutDemo.demoUrl;
    render(<ProjectCard project={withoutDemo} />);

    expect(
      screen.queryByRole("link", {
        name: `View live demo for ${baseProject.title}`,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `View source code repository for ${baseProject.title}`,
      }),
    ).toBeInTheDocument();
  });

  it("omits the repository button gracefully when repoUrl is missing (FR-006)", () => {
    const withoutRepo: Project = { ...baseProject };
    delete withoutRepo.repoUrl;
    render(<ProjectCard project={withoutRepo} />);

    expect(
      screen.queryByRole("link", {
        name: `View source code repository for ${baseProject.title}`,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `View live demo for ${baseProject.title}`,
      }),
    ).toBeInTheDocument();
  });

  it("treats blank URLs as missing resources (edge case)", () => {
    render(
      <ProjectCard project={{ ...baseProject, demoUrl: "   ", repoUrl: "" }} />,
    );

    expect(
      screen.queryByRole("link", { name: /View live demo/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /View source code/i }),
    ).not.toBeInTheDocument();
  });

  it("renders additional secure links when extraLinks are provided", () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          extraLinks: [
            {
              label: "Frontend Repo",
              url: "https://github.com/example/frontend",
              icon: "Github",
            },
          ],
        }}
      />,
    );

    const extraLink = screen.getByRole("link", {
      name: `View Frontend Repo for ${baseProject.title}`,
    });
    expect(extraLink).toHaveAttribute(
      "href",
      "https://github.com/example/frontend",
    );
    expect(extraLink).toHaveAttribute("target", "_blank");
    expect(extraLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no extra links when the field is absent", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.queryByText("Frontend Repo")).not.toBeInTheDocument();
  });
});
