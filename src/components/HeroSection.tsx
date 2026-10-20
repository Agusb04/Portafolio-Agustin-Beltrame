"use client";

import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
import { asset } from "@/lib/assets";
import type { Profile } from "@/types/portfolio";

export interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const {
    name,
    role,
    headline,
    bio,
    location,
    avatarUrl,
    cvUrl,
    availableForWork,
    languages,
    coreTechnologies,
  } = profile;
  const localizedLanguages = languages?.[locale];

  return (
    <section
      id="about"
      aria-label="Introduction"
      className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-6xl scroll-mt-24 flex-col justify-center gap-10 px-4 py-16 sm:min-h-[calc(100svh-4rem)] sm:py-24 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex flex-col gap-5">
        {availableForWork && (
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-green-500 motion-safe:animate-pulse"
            />
            {t.hero.availableForWork}
          </p>
        )}

        <h1 className="text-4xl font-bold tracking-tight break-words sm:text-5xl">
          {name}
        </h1>

        <p className="text-lg font-semibold text-primary break-words">
          {role[locale]}
        </p>

        <p className="max-w-2xl text-balance text-xl text-muted-foreground">
          {headline[locale]}
        </p>

        <p className="max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
          {bio[locale]}
        </p>

        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
          {location}
        </p>

        {localizedLanguages && localizedLanguages.length > 0 && (
          <p className="text-sm text-muted-foreground break-words">
            <span className="font-medium text-foreground">
              {t.hero.languages}
            </span>{" "}
            {localizedLanguages.join(" · ")}
          </p>
        )}

        {coreTechnologies && coreTechnologies.length > 0 && (
          <ul aria-label="Core technologies" className="flex flex-wrap gap-2">
            {coreTechnologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground break-words"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={asset(cvUrl)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${name}'s resume as PDF`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {t.hero.downloadResume}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
          >
            {t.hero.contactMe}
          </a>
        </div>
      </div>

      <div className="relative mx-auto shrink-0 md:mx-0">
        <Image
          src={asset(avatarUrl)}
          alt={`Portrait of ${name}`}
          width={224}
          height={224}
          priority
          className="h-40 w-40 rounded-full border-4 border-border object-cover shadow-lg sm:h-56 sm:w-56"
        />
      </div>
    </section>
  );
}
