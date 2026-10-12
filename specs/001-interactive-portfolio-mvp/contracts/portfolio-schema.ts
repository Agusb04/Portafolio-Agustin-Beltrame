/**
 * TypeScript Data Contracts for Portfolio MVP
 * Feature: 001-interactive-portfolio-mvp
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
}

export interface Project {
  id: string;
  title: string;
  description: string;
  keyFeatures: string[];
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
}

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email' | string;

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string;
  isEmail?: boolean;
  emailAddress?: string; // Solo requerido si isEmail es true para copiado
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
