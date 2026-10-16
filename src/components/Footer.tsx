export interface FooterProps {
  developerName: string;
  year?: number;
}

export function Footer({ developerName, year }: FooterProps) {
  const currentYear = year ?? new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p className="break-words">
          © {currentYear} {developerName}. All rights reserved.
        </p>
        <p className="break-words">
          Built with Next.js, TypeScript &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
