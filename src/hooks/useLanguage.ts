"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/LanguageProvider";
import type { LanguageContextValue } from "@/types/portfolio";

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
