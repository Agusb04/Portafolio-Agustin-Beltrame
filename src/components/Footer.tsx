"use client";

import { useTranslation } from "@/hooks/useTranslation";

export interface FooterProps {
  developerName: string;
  year?: number;
}

export function Footer({ developerName, year }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = year ?? new Date().getFullYear();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#education", label: t.nav.education },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground">
        <nav aria-label={t.footer.navigation}>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 sm:flex-row">
          <p className="break-words">
            © {currentYear} {developerName}. {t.footer.rights}
          </p>
          <p className="break-words">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
