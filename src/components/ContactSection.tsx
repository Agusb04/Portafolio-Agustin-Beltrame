import { EmailCopyButton } from "@/components/EmailCopyButton";
import { getSocialIcon } from "@/components/social-icons";
import type { SocialLink } from "@/types/portfolio";

export interface ContactSectionProps {
  socialLinks: SocialLink[];
  emailAddress: string;
}

export function ContactSection({
  socialLinks,
  emailAddress,
}: ContactSectionProps) {
  const externalLinks = socialLinks.filter((link) => !link.isEmail);

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto max-w-6xl px-4 py-16 sm:py-24"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
        <p className="max-w-2xl text-muted-foreground">
          Open to new opportunities and interesting collaborations — reach out
          directly.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <EmailCopyButton emailAddress={emailAddress} />

        <nav aria-label="Professional networks">
          <ul className="flex flex-wrap gap-3">
            {externalLinks.map((link) => {
              const Icon = getSocialIcon(link.icon);
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                    {link.platform}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
