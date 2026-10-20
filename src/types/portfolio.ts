/**
 * TypeScript Data Contracts for Portfolio
 * Feature: 002-portfolio-enhancements
 * Source of truth: specs/002-portfolio-enhancements/contracts/portfolio-schema.ts
 */

// ─── Locale System ───────────────────────────────────────────────

export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";

export type Localized<T> = Record<Locale, T>;

// ─── Profile ─────────────────────────────────────────────────────

export interface Profile {
  name: string;
  role: Localized<string>;
  headline: Localized<string>;
  bio: Localized<string>;
  location: string;
  avatarUrl: string;
  cvUrl: string;
  availableForWork: boolean;
  languages?: Localized<string[]>;
  coreTechnologies?: string[];
}

// ─── Projects ────────────────────────────────────────────────────

export interface ProjectLink {
  label: Localized<string>;
  url: string;
  icon?: "Github" | "ExternalLink";
}

export interface Project {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  keyFeatures: Localized<string[]>;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  extraLinks?: ProjectLink[];
  featured: boolean;
  order: number;
}

// ─── Social Links ────────────────────────────────────────────────

export type SocialPlatform = "github" | "linkedin" | "twitter" | "email" | string;

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: Localized<string>;
  isEmail?: boolean;
  emailAddress?: string;
  icon: string;
}

// ─── Site Metadata ───────────────────────────────────────────────

export interface SiteMeta {
  siteUrl: string;
  siteName: string;
  defaultTitle: Localized<string>;
  description: Localized<string>;
  keywords: Localized<string[]>;
  author: string;
  ogImage: string;
}

// ─── Education ──────────────────────────────────────────────────

export interface Certification {
  id: string;
  name: Localized<string>;
  issuer: Localized<string>;
  date?: string | null;
  imageUrl?: string | null;
}

export type EducationStatus = "in-progress" | "completed";

export interface EducationEntry {
  id: string;
  institution: Localized<string>;
  degree: Localized<string>;
  startDate: string;
  endDate: string | null;
  status: EducationStatus;
  description?: Localized<string>;
  certifications?: Certification[];
  order: number;
}

// ─── Root Data Contract ─────────────────────────────────────────

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  socialLinks: SocialLink[];
  meta: SiteMeta;
  education: EducationEntry[];
}

// ─── UI Translations ────────────────────────────────────────────

export interface UITranslations {
  nav: {
    about: string;
    projects: string;
    education: string;
    contact: string;
  };
  hero: {
    availableForWork: string;
    languages: string;
    downloadResume: string;
    contactMe: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewRepo: string;
    liveDemo: string;
  };
  education: {
    title: string;
    subtitle: string;
    inProgress: string;
    completed: string;
    viewCertification: string;
    certificationModalClose: string;
    certificationLoadError: string;
  };
  contact: {
    title: string;
    subtitle: string;
    copyEmail: string;
    copyEmailAria: string;
    emailCopied: string;
    emailCopiedStatus: string;
    copyFailed: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
  lang: {
    toggle: string;
  };
}

// ─── Language Context ───────────────────────────────────────────

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
