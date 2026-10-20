# Research: Portfolio Enhancements — i18n, Education & Certifications

**Feature**: `002-portfolio-enhancements`
**Date**: 2026-10-19

## Research Area 1: i18n Strategy for a Next.js Static Portfolio

### Decision: Client-side i18n via React Context + localized data files

### Rationale
- The portfolio is a single-page static site (SSG). Route-based i18n (`/en/`, `/es/`) would add unnecessary complexity and break the single-page architecture.
- The project already uses the Provider pattern successfully (ThemeProvider). A `LanguageProvider` following the same pattern is consistent and familiar.
- Only 2 languages are needed (ES/EN) — a lightweight custom approach avoids the overhead of full i18n libraries (next-intl, react-i18next) which are designed for multi-locale, multi-route scenarios.
- Client-side switching without page reload matches the spec requirement (FR-002).
- Persistence via `localStorage` matches the existing pattern used by next-themes (`storageKey`).

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|-------------|
| next-intl (route-based) | Adds routing complexity (`/en/`, `/es/`), breaks single-page SPA feel, over-engineered for 2 languages |
| react-i18next | Heavy dependency for just 2 languages; JSON key-based translation adds indirection |
| Next.js built-in i18n (pages router) | Deprecated approach; project uses App Router |
| Static file per language | Would require page reload; doesn't meet FR-002 |

### Implementation Approach
1. **Localized data structure**: Transform `portfolioData` into `portfolioData: { es: PortfolioData, en: PortfolioData }` — keeps Constitution Principle II (data-driven) intact.
2. **UI string translations**: Create a `translations` object with all hardcoded UI strings (labels, buttons, section titles) keyed by language.
3. **LanguageProvider**: React Context that stores current language (`"es" | "en"`), persists to `localStorage`, exposes `language` and `setLanguage`.
4. **Custom hook**: `useLanguage()` returns current language + setter; `useTranslation()` returns the translation function `t(key)`.
5. **LanguageToggle component**: Simple toggle/dropdown in Header, next to ThemeToggle.

---

## Research Area 2: Education Section Data Architecture

### Decision: Extend PortfolioData with `education` array following existing data-driven pattern

### Rationale
- Constitution Principle II mandates all editable content in structured data files, consumed declaratively.
- The existing pattern (`Profile`, `Project`, `SocialLink` → consumed by section components) works well and should be extended.
- Education entries and certifications are content that the portfolio owner updates infrequently — static data file is appropriate.

### Data Structure Design
- `EducationEntry`: institution, degree, period (start/end), status (in-progress/completed), optional certifications array
- `Certification`: name, issuer, date (optional), image path (optional)
- Both entities carry localized fields (name in ES/EN) via the localized data structure
- Images stored in `/public/certifications/` as optimized WebP files

---

## Research Area 3: Certificate Image Viewer (Modal)

### Decision: Custom accessible modal component (no external library)

### Rationale
- The project has zero UI library dependencies (no shadcn, no Radix, no Headless UI). Adding a library just for one modal would violate the minimal dependency philosophy.
- A custom modal with focus trap, Escape handling, and backdrop click-to-close is straightforward to implement.
- Constitution Principle IV (Accessibility WCAG 2.1 AA) requires: focus trap, aria-modal, aria-labelledby, role="dialog", Escape to close, scroll lock on body.

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|-------------|
| @headlessui/react Dialog | Adds new dependency for single use case |
| Radix UI Dialog | Same — unnecessary dependency |
| HTML `<dialog>` element | Native but inconsistent browser support for focus trapping; needs polyfill work |
| Next.js Image modal with lightbox library | Over-engineered; adds dependency |

### Implementation Approach
1. `CertificateModal` component: renders portal-based overlay with image
2. Focus management: trap focus within modal, return focus on close
3. Close triggers: Escape key, backdrop click, close button
4. Responsive: image scales with `object-contain`, max-width/max-height constrained to viewport
5. Lazy loading: image loads when modal opens to keep page performant

---

## Research Area 4: Existing Hardcoded Strings Inventory

### Findings
Components with hardcoded English strings that need localization:

| Component | Strings | Count |
|-----------|---------|-------|
| Header | "About", "Projects", "Contact" (navLinks) | 3 |
| HeroSection | "Available for work", "Languages:", "Download Resume / CV", "Contact Me" | 4 |
| ProjectsGrid | "Featured Projects", subtitle text | 2 |
| ProjectCard | "View Repository", "Live Demo" (assumed from ProjectLink) | 2 |
| ContactSection | "Get in Touch", subtitle text | 2 |
| EmailCopyButton | "Copy", "Copied!" (assumed) | 2 |
| Footer | "All rights reserved.", "Built with Next.js, TypeScript & Tailwind CSS" | 2 |
| layout.tsx | `lang="en"` attribute on `<html>` | 1 |

**Total UI strings to localize**: ~18 strings across 7 components + layout

---

## Summary of All Decisions

| Area | Decision | Key Justification |
|------|----------|-------------------|
| i18n approach | Client-side Context + localized data | Matches existing provider pattern; no page reload |
| i18n library | Custom (no library) | Only 2 languages; keeps dependencies minimal |
| Language persistence | localStorage | Matches next-themes pattern |
| Default language | Spanish (ES) | Target audience is local (Buenos Aires) |
| Education data | Extend PortfolioData with `education[]` | Follows Constitution Principle II |
| Certification images | Static files in `/public/certifications/` | No upload system needed; manual addition |
| Modal component | Custom accessible modal | No external dependencies; full a11y control |
| HTML lang attribute | Dynamic based on selected language | SEO + accessibility requirement |
