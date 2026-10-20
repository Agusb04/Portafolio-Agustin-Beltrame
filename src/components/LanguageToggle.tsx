"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const mounted = useMounted();

  const nextLocale = locale === "es" ? "en" : "es";
  const label = nextLocale.toUpperCase();

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      aria-label={t.lang.toggle}
      title={t.lang.toggle}
      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-semibold text-muted-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:text-primary"
    >
      {mounted ? (
        <Globe aria-hidden="true" className="h-5 w-5" />
      ) : (
        <span aria-hidden="true" className="h-5 w-5" />
      )}
      <span>{label}</span>
    </button>
  );
}
