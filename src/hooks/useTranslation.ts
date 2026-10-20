"use client";

import { translations } from "@/data/translations";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale, UITranslations } from "@/types/portfolio";

export function useTranslation(): { t: UITranslations; locale: Locale } {
  const { locale } = useLanguage();

  return { t: translations[locale], locale };
}
