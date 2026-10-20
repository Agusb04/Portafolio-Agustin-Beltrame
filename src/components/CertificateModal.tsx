"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { asset } from "@/lib/assets";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  closeLabel?: string;
  errorLabel?: string;
}

export function CertificateModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  closeLabel = "Close",
  errorLabel = "The certification image could not be loaded.",
}: CertificateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const imageFailed = failedUrl === imageUrl;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => onCloseRef.current()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label={closeLabel}
          title={closeLabel}
          className="absolute right-0 top-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors duration-200 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {imageFailed ? (
          <p
            role="alert"
            className="max-w-md rounded-lg bg-background px-6 py-4 text-center text-sm text-muted-foreground"
          >
            {errorLabel}
          </p>
        ) : (
          <div className="relative h-[80vh] w-full">
            <Image
              src={asset(imageUrl)}
              alt={title}
              fill
              sizes="(max-width: 768px) 95vw, 90vw"
              className="object-contain"
              onError={() => setFailedUrl(imageUrl)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
