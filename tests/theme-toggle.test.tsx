import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "@/providers/ThemeProvider";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders an accessible theme switch control", async () => {
    renderToggle();

    expect(
      await screen.findByRole("button", { name: "Toggle visual theme" }),
    ).toBeInTheDocument();
  });

  it("switches the theme and persists the choice in localStorage (FR-010, SC-006)", async () => {
    const user = userEvent.setup();
    renderToggle();

    const toggle = await screen.findByRole("button", {
      name: "Toggle visual theme",
    });
    await user.click(toggle);

    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("toggles back to light on a second click", async () => {
    const user = userEvent.setup();
    renderToggle();

    const toggle = await screen.findByRole("button", {
      name: "Toggle visual theme",
    });
    await user.click(toggle);
    await user.click(toggle);

    expect(window.localStorage.getItem("portfolio-theme")).toBe("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });
});
