import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

/**
 * Integration guard for the single-source-of-contact rule:
 * email copy and social links must appear exactly once (in #contact).
 */
describe("Home page contact channels", () => {
  it("renders the email copy button exactly once", () => {
    render(<Home />);

    const copyButtons = screen.getAllByRole("button", {
      name: "Copy email address to clipboard",
    });
    expect(copyButtons).toHaveLength(1);
  });

  it("renders GitHub and LinkedIn links exactly once with secure attributes", () => {
    render(<Home />);

    const githubLinks = screen.getAllByRole("link", {
      name: "Visit Agustín's GitHub profile",
    });
    expect(githubLinks).toHaveLength(1);
    expect(githubLinks[0]).toHaveAttribute("target", "_blank");
    expect(githubLinks[0]).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLinks = screen.getAllByRole("link", {
      name: "Connect with Agustín on LinkedIn",
    });
    expect(linkedinLinks).toHaveLength(1);
    expect(linkedinLinks[0]).toHaveAttribute("target", "_blank");
    expect(linkedinLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
  });
});
