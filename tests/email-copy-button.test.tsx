import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmailCopyButton } from "@/components/EmailCopyButton";
import { LanguageProvider } from "@/providers/LanguageProvider";

const EMAIL = "hello@example.com";

const BUTTON_NAME = "Copiar dirección de email al portapapeles";

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

function renderButton() {
  return render(
    <LanguageProvider>
      <EmailCopyButton emailAddress={EMAIL} />
    </LanguageProvider>,
  );
}

describe("EmailCopyButton", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("copies the email address to the clipboard on click", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard();
    renderButton();

    await user.click(screen.getByRole("button", { name: BUTTON_NAME }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
  });

  it("shows visible feedback and announces the copy politely (SC-004)", async () => {
    const user = userEvent.setup();
    mockClipboard();
    renderButton();

    await user.click(screen.getByRole("button", { name: BUTTON_NAME }));

    expect(screen.getByText("¡Copiado!")).toBeInTheDocument();
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("¡Email copiado al portapapeles!");
  });

  it("resets the feedback after 2.5 seconds", async () => {
    vi.useFakeTimers();
    mockClipboard();
    renderButton();

    fireEvent.click(screen.getByRole("button", { name: BUTTON_NAME }));
    await act(async () => {});

    expect(screen.getByText("¡Copiado!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.queryByText("¡Copiado!")).not.toBeInTheDocument();
    expect(screen.getByText("Copiar email")).toBeInTheDocument();
  });

  it("offers a fallback when the clipboard API is blocked", async () => {
    const user = userEvent.setup();
    mockClipboard(() => Promise.reject(new Error("blocked")));
    renderButton();

    await user.click(screen.getByRole("button", { name: BUTTON_NAME }));

    expect(
      screen.getByText(/tu navegador bloqueó la copia/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute(
      "href",
      `mailto:${EMAIL}`,
    );
  });
});
