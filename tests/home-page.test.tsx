import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { LanguageProvider } from "@/providers/LanguageProvider";

/**
 * Integration guard for the single-source-of-contact rule:
 * email copy and social links must appear exactly once (in #contact).
 */
function renderHome() {
  return render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>,
  );
}

describe("Home page contact channels", () => {
  it("renders the email copy button exactly once", () => {
    renderHome();

    const copyButtons = screen.getAllByRole("button", {
      name: "Copiar dirección de email al portapapeles",
    });
    expect(copyButtons).toHaveLength(1);
  });

  it("renders GitHub and LinkedIn links exactly once with secure attributes", () => {
    renderHome();

    const githubLinks = screen.getAllByRole("link", {
      name: "Visitar el perfil de GitHub de Agustín",
    });
    expect(githubLinks).toHaveLength(1);
    expect(githubLinks[0]).toHaveAttribute("target", "_blank");
    expect(githubLinks[0]).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLinks = screen.getAllByRole("link", {
      name: "Conectar con Agustín en LinkedIn",
    });
    expect(linkedinLinks).toHaveLength(1);
    expect(linkedinLinks[0]).toHaveAttribute("target", "_blank");
    expect(linkedinLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the education section with the FIUBA entry", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { level: 2, name: "Educación" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ingeniería Informática"),
    ).toBeInTheDocument();
  });
});
