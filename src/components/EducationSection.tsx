"use client";

import { EducationCard } from "@/components/EducationCard";
import { useTranslation } from "@/hooks/useTranslation";
import type { EducationEntry } from "@/types/portfolio";

export interface EducationSectionProps {
  education: EducationEntry[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const { t } = useTranslation();
  const entries = [...education].sort((a, b) => a.order - b.order);

  return (
    <section
      id="education"
      aria-label={t.education.title}
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:py-24"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold tracking-tight">
          {t.education.title}
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          {t.education.subtitle}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {entries.map((entry) => (
          <EducationCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
