"use client";

import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "@/hooks/useTranslation";

export interface HeaderProps {
  developerName: string;
}

export function Header({ developerName }: HeaderProps) {
  const { t } = useTranslation();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#education", label: t.nav.education },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <a
          href="#about"
          className="text-sm font-bold tracking-tight break-words text-foreground transition-colors duration-200 hover:text-primary sm:text-base"
        >
          {developerName}
        </a>

        <nav
          aria-label="Main navigation"
          className="order-3 flex items-center gap-1 sm:order-none sm:gap-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground sm:px-3"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
