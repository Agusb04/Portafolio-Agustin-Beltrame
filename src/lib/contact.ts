import type { SocialLink } from "@/types/portfolio";

export function resolveEmailAddress(socialLinks: SocialLink[]): string {
  const emailLink = socialLinks.find((link) => link.isEmail);
  return (
    emailLink?.emailAddress ?? emailLink?.url.replace(/^mailto:/, "") ?? ""
  );
}
