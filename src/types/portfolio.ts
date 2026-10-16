/**
 * TypeScript Data Contracts for Portfolio MVP
 * Feature: 001-interactive-portfolio-mvp
 * Source of truth: specs/001-interactive-portfolio-mvp/contracts/portfolio-schema.ts
 */

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  cvUrl: string;
  availableForWork: boolean;
  languages?: string[];
  coreTechnologies?: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
  icon?: "Github" | "ExternalLink";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  keyFeatures: string[];
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  extraLinks?: ProjectLink[];
  featured: boolean;
  order: number;
}

export type SocialPlatform = "github" | "linkedin" | "twitter" | "email" | string;

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string;
  isEmail?: boolean;
  emailAddress?: string;
  icon: string;
}

export interface SiteMeta {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  description: string;
  keywords: string[];
  author: string;
  ogImage: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  socialLinks: SocialLink[];
  meta: SiteMeta;
}
