import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectCard } from "@/components/ProjectCard";
import { LanguageProvider } from "@/providers/LanguageProvider";
import type { Project } from "@/types/portfolio";

const baseProject: Project = {
  id: "ecommerce-platform",
  title: {
    es: "Plataforma de E-Commerce",
    en: "E-Commerce Platform",
  },
  description: {
    es: "Una tienda full-stack con carrito, checkout y panel de administración.",
    en: "A full-stack storefront with cart, checkout and admin dashboard.",
  },
  keyFeatures: {
    es: ["Búsqueda instantánea", "Checkout con Stripe", "Panel de administración"],
    en: ["Instant search", "Stripe checkout", "Admin dashboard"],
  },
  tags: ["Next.js", "TypeScript", "PostgreSQL"],
  repoUrl: "https://github.com/agustinbeltrame/ecommerce-platform",
  demoUrl: "https://demo.example.com",
  featured: true,
  order: 1,
};

function renderCard(project: Project = baseProject) {
  return render(
    <LanguageProvider>
      <ProjectCard project={project} />
    </LanguageProvider>,
  );
}

describe("ProjectCard", () => {
  it("renders title, description, key features and technology tags (FR-004)", () => {
    renderCard();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: baseProject.title.es,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseProject.description.es)).toBeInTheDocument();

    const features = screen.getAllByRole("listitem").map(
      (item) => item.textContent,
    );
    for (const feature of baseProject.keyFeatures.es) {
      expect(features).toContain(feature);
    }

    const tagList = screen.getByLabelText(
      `Technologies used in ${baseProject.title.es}`,
    );
    within(tagList).getByText("Next.js");
    within(tagList).getByText("TypeScript");
    within(tagList).getByText("PostgreSQL");
  });

  it("opens demo and repository links in a new secure tab (FR-009, SC-003)", () => {
    renderCard();

    const demoLink = screen.getByRole("link", {
      name: `View live demo for ${baseProject.title.es}`,
    });
    expect(demoLink).toHaveAttribute("href", baseProject.demoUrl);
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");

    const repoLink = screen.getByRole("link", {
      name: `View source code repository for ${baseProject.title.es}`,
    });
    expect(repoLink).toHaveAttribute("href", baseProject.repoUrl);
    expect(repoLink).toHaveAttribute("target", "_blank");
    expect(repoLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("omits the demo button gracefully when demoUrl is missing (FR-006)", () => {
    const withoutDemo: Project = { ...baseProject };
    delete withoutDemo.demoUrl;
    renderCard(withoutDemo);

    expect(
      screen.queryByRole("link", {
        name: `View live demo for ${baseProject.title.es}`,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `View source code repository for ${baseProject.title.es}`,
      }),
    ).toBeInTheDocument();
  });

  it("omits the repository button gracefully when repoUrl is missing (FR-006)", () => {
    const withoutRepo: Project = { ...baseProject };
    delete withoutRepo.repoUrl;
    renderCard(withoutRepo);

    expect(
      screen.queryByRole("link", {
        name: `View source code repository for ${baseProject.title.es}`,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `View live demo for ${baseProject.title.es}`,
      }),
    ).toBeInTheDocument();
  });

  it("treats blank URLs as missing resources (edge case)", () => {
    renderCard({ ...baseProject, demoUrl: "   ", repoUrl: "" });

    expect(
      screen.queryByRole("link", { name: /View live demo/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /View source code/i }),
    ).not.toBeInTheDocument();
  });

  it("renders additional secure links when extraLinks are provided", () => {
    renderCard({
      ...baseProject,
      extraLinks: [
        {
          label: {
            es: "Repositorio del Frontend",
            en: "Frontend Repo",
          },
          url: "https://github.com/example/frontend",
          icon: "Github",
        },
      ],
    });

    const extraLink = screen.getByRole("link", {
      name: `View Repositorio del Frontend for ${baseProject.title.es}`,
    });
    expect(extraLink).toHaveAttribute(
      "href",
      "https://github.com/example/frontend",
    );
    expect(extraLink).toHaveAttribute("target", "_blank");
    expect(extraLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no extra links when the field is absent", () => {
    renderCard();

    expect(
      screen.queryByText("Repositorio del Frontend"),
    ).not.toBeInTheDocument();
  });
});
