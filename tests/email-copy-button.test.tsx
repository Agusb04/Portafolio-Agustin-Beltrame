import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmailCopyButton } from "@/components/EmailCopyButton";

const EMAIL = "hello@example.com";

const BUTTON_NAME = "Copy email address to clipboard";

function mockClipboard(
  implementation?: (text: string) => Promise<void>,
): ReturnType<typeof vi.fn> {
  const writeText =
    implementation !== undefined
      ? vi.fn(implementation)
      : vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
  return writeText;
}

describe("EmailCopyButton", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("copies the email address to the clipboard on click", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    render(<EmailCopyButton emailAddress={EMAIL} />);

    await user.click(screen.getByRole("button", { name: BUTTON_NAME }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
  });

  it("shows visible feedback and announces the copy politely (SC-004)", async () => {
    const user = userEvent.setup();
    mockClipboard();
    render(<EmailCopyButton emailAddress={EMAIL} />);

    await user.click(screen.getByRole("button", { name: BUTTON_NAME }));

    expect(screen.getByText("Copied!")).toBeInTheDocument();
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Email copied to clipboard!");
  });

  it("resets the feedback after 2.5 seconds", async () => {
    vi.useFakeTimers();
    mockClipboard();
    render(<EmailCopyButton emailAddress={EMAIL} />);

    fireEvent.click(screen.getByRole("button", { name: BUTTON_NAME }));
    await act(async () => {});

    expect(screen.getByText("Copied!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    expect(screen.getByText("Copy email")).toBeInTheDocument();
  });

  it("offers a fallback when the clipboard API is blocked", async () => {
    const user = userEvent.setup();
    mockClipboard(() => Promise.reject(new Error("blocked")));
    render(<EmailCopyButton emailAddress={EMAIL} />);

    await user.click(screen.getByRole("button", { name: BUTTON_NAME }));

    expect(
      screen.getByText(/copying is blocked by your browser/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute(
      "href",
      `mailto:${EMAIL}`,
    );
  });
});
