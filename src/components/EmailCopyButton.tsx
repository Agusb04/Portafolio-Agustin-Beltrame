"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export interface EmailCopyButtonProps {
  emailAddress: string;
}

export function EmailCopyButton({ emailAddress }: EmailCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setFailed(false);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email address to clipboard"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
      >
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4 text-primary" />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" />
        )}
        <span>{copied ? "Copied!" : "Copy email"}</span>
      </button>

      <a
        href={`mailto:${emailAddress}`}
        className="text-sm font-medium text-primary underline-offset-4 transition-colors duration-200 hover:underline"
      >
        {emailAddress}
      </a>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard!" : ""}
      </span>

      {failed && (
        <p role="status" aria-live="polite" className="w-full text-sm text-muted-foreground">
          Copying is blocked by your browser — select the address manually or use
          the email link.
        </p>
      )}
    </div>
  );
}
