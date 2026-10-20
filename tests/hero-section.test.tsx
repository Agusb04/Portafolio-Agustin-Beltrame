import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/HeroSection";
import { LanguageProvider } from "@/providers/LanguageProvider";
import type { Profile } from "@/types/portfolio";

const profile: Profile = {
  name: "Agustín Beltrame",
  role: {
    es: "Estudiante de Ingeniería Informática / Desarrollador de Software",
    en: "Computer Engineering Student / Software Developer",
  },
  headline: {
    es: "Estudiante de Ingeniería Informática en UBA (FIUBA) | Desarrollo Backend",
    en: "Computer Engineering Student at UBA (FIUBA) | Backend Development",
  },
  bio: {
    es: "Estudiante de Ingeniería Informática en UBA interesado en ingeniería de software.",
    en: "Computer Engineering student at UBA interested in software engineering.",
  },
  location: "Buenos Aires, Argentina",
  avatarUrl: "/avatar.webp",
  cvUrl: "/cv.pdf",
  availableForWork: true,
  languages: {
    es: ["Español (Nativo)", "Inglés (B2)"],
    en: ["Spanish (Native)", "English (B2)"],
  },
  coreTechnologies: ["C++", "Go", "TypeScript"],
};

function renderHero(props: { profile: Profile } = { profile }) {
  return render(
    <LanguageProvider>
      <HeroSection {...props} />
    </LanguageProvider>,
  );
}

describe("HeroSection", () => {
  it("renders the developer name as the main heading", () => {
    renderHero();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: new RegExp(profile.name),
      }),
    ).toBeInTheDocument();
  });

  it("renders role, headline and availability badge", () => {
    renderHero();
    expect(screen.getByText(profile.role.es)).toBeInTheDocument();
    expect(screen.getByText(profile.headline.es)).toBeInTheDocument();
    expect(screen.getByText("Disponible para trabajar")).toBeInTheDocument();
  });

  it("links the CV call to action to profile.cvUrl in a new secure tab", () => {
    renderHero();
    const cvLink = screen.getByRole("link", {
      name: new RegExp(`Download ${profile.name}'s resume as PDF`, "i"),
    });
    expect(cvLink).toHaveAttribute("href", profile.cvUrl);
    expect(cvLink).toHaveAttribute("target", "_blank");
    expect(cvLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links the contact call to action to the #contact section", () => {
    renderHero();
    expect(
      screen.getByRole("link", { name: "Contáctame" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("renders the avatar with a descriptive alt text", () => {
    renderHero();
    expect(
      screen.getByRole("img", { name: `Portrait of ${profile.name}` }),
    ).toBeInTheDocument();
  });

  it("does not duplicate contact channels that live in #contact", () => {
    renderHero();

    expect(
      screen.queryByRole("button", {
        name: "Copiar dirección de email al portapapeles",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /GitHub profile/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /LinkedIn/i }),
    ).not.toBeInTheDocument();
  });

  it("hides the availability badge when the developer is unavailable", () => {
    renderHero({ profile: { ...profile, availableForWork: false } });
    expect(
      screen.queryByText("Disponible para trabajar"),
    ).not.toBeInTheDocument();
  });

  it("renders languages and core technologies when provided", () => {
    renderHero();

    const languagesLabel = screen.getByText("Idiomas:");
    expect(languagesLabel.parentElement).toHaveTextContent(
      "Español (Nativo) · Inglés (B2)",
    );

    const techList = screen.getByLabelText("Core technologies");
    expect(techList).toHaveTextContent("C++");
    expect(techList).toHaveTextContent("Go");
    expect(techList).toHaveTextContent("TypeScript");
  });

  it("omits languages and technology chips when the fields are absent", () => {
    const minimal: Profile = { ...profile };
    delete minimal.languages;
    delete minimal.coreTechnologies;
    renderHero({ profile: minimal });

    expect(screen.queryByText(/Idiomas:/)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("Core technologies"),
    ).not.toBeInTheDocument();
  });
});
