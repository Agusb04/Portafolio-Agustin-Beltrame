import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header developerName="Agustín Beltrame" />
    </ThemeProvider>,
  );
}

describe("Header", () => {
  it("renders the developer name as a link back to the top section", () => {
    renderHeader();

    expect(
      screen.getByRole("link", { name: "Agustín Beltrame" }),
    ).toHaveAttribute("href", "#about");
  });

  it("renders anchor links to the main sections for smooth navigation (FR-011)", () => {
    renderHeader();

    const mainNav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(mainNav).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "#about");
    expect(
      screen.getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "#projects");
    expect(
      screen.getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("includes the theme toggle control", async () => {
    renderHeader();

    expect(
      await screen.findByRole("button", { name: "Toggle visual theme" }),
    ).toBeInTheDocument();
  });
});
