import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/HeroSection";
import type { Profile, SocialLink } from "@/types/portfolio";

const profile: Profile = {
  name: "Agustín Beltrame",
  role: "Computer Engineering Student / Software Developer",
  headline: "Computer Engineering Student at UBA (FIUBA) | Backend Development",
  bio: "Computer Engineering student at UBA interested in software engineering.",
  location: "Buenos Aires, Argentina",
  avatarUrl: "/avatar.webp",
  cvUrl: "/cv.pdf",
  availableForWork: true,
  languages: ["Spanish (Native)", "English (B2)"],
  coreTechnologies: ["C++", "Go", "TypeScript"],
};

const socialLinks: SocialLink[] = [
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com/agustinbeltrame",
    label: "Visit Agustín's GitHub profile",
    icon: "Github",
  },
  {
    id: "email",
    platform: "Email",
    url: "mailto:hello@example.com",
    label: "Email directly",
    isEmail: true,
    emailAddress: "hello@example.com",
    icon: "Mail",
  },
];

describe("HeroSection", () => {
  it("renders the developer name as the main heading", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);
    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
  });

  it("renders role, headline and availability badge", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(profile.headline)).toBeInTheDocument();
    expect(screen.getByText("Available for work")).toBeInTheDocument();
  });

  it("links the CV call to action to profile.cvUrl in a new secure tab", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);
    const cvLink = screen.getByRole("link", {
      name: new RegExp(`Download ${profile.name}'s resume as PDF`, "i"),
    });
    expect(cvLink).toHaveAttribute("href", profile.cvUrl);
    expect(cvLink).toHaveAttribute("target", "_blank");
    expect(cvLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links the contact call to action to the #contact section", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);
    expect(
      screen.getByRole("link", { name: "Contact Me" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("renders the avatar with a descriptive alt text", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);
    expect(
      screen.getByRole("img", { name: `Portrait of ${profile.name}` }),
    ).toBeInTheDocument();
  });

  it("renders external social links with secure navigation attributes", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);
    const githubLink = screen.getByRole("link", {
      name: "Visit Agustín's GitHub profile",
    });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides the availability badge when the developer is unavailable", () => {
    render(
      <HeroSection
        profile={{ ...profile, availableForWork: false }}
        socialLinks={socialLinks}
      />,
    );
    expect(screen.queryByText("Available for work")).not.toBeInTheDocument();
  });

  it("renders languages and core technologies when provided", () => {
    render(<HeroSection profile={profile} socialLinks={socialLinks} />);

    const languagesLabel = screen.getByText("Languages:");
    expect(languagesLabel.parentElement).toHaveTextContent(
      "Spanish (Native) · English (B2)",
    );

    const techList = screen.getByLabelText("Core technologies");
    expect(techList).toHaveTextContent("C++");
    expect(techList).toHaveTextContent("Go");
    expect(techList).toHaveTextContent("TypeScript");
  });

  it("omits languages and technology chips when the fields are absent", () => {
    const minimal: Profile = { ...profile };
    delete minimal.languages;
    delete minimal.coreTechnologies;
    render(<HeroSection profile={minimal} socialLinks={socialLinks} />);

    expect(screen.queryByText(/Languages:/)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("Core technologies"),
    ).not.toBeInTheDocument();
  });
});
