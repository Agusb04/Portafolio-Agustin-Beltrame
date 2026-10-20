"use client";

import { useState } from "react";
import { Award, Calendar } from "lucide-react";
import { CertificateModal } from "@/components/CertificateModal";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import type { Certification, EducationEntry } from "@/types/portfolio";

export interface EducationCardProps {
  entry: EducationEntry;
}

export function EducationCard({ entry }: EducationCardProps) {
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const period = entry.endDate
    ? `${entry.startDate} — ${entry.endDate}`
    : `${entry.startDate} — ${t.education.inProgress}`;
  const statusLabel =
    entry.status === "in-progress"
      ? t.education.inProgress
      : t.education.completed;
  const statusStyles =
    entry.status === "in-progress"
      ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      : "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300";
  const certifications = entry.certifications ?? [];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold break-words">
            {entry.degree[locale]}
          </h3>
          <p className="text-sm font-medium text-primary break-words">
            {entry.institution[locale]}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles}`}
        >
          {statusLabel}
        </span>
      </div>

      <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
        {period}
      </p>

      {entry.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-words">
          {entry.description[locale]}
        </p>
      )}

      {certifications.length > 0 && (
        <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-4">
          {certifications.map((certification) => (
            <li
              key={certification.id}
              className="flex flex-wrap items-start justify-between gap-3"
            >
              <div className="flex items-start gap-2">
                <Award
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium break-words">
                    {certification.name[locale]}
                  </span>
                  <span className="text-xs text-muted-foreground break-words">
                    {certification.issuer[locale]}
                    {certification.date ? ` · ${certification.date}` : ""}
                  </span>
                </div>
              </div>

              {certification.imageUrl && (
                <button
                  type="button"
                  onClick={() => setSelectedCert(certification)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                >
                  {t.education.viewCertification}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        imageUrl={selectedCert?.imageUrl ?? ""}
        title={selectedCert ? selectedCert.name[locale] : ""}
        closeLabel={t.education.certificationModalClose}
        errorLabel={t.education.certificationLoadError}
      />
    </article>
  );
}
