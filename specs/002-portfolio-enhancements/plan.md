# Implementation Plan: Portfolio Enhancements — i18n, Education & Certifications

**Branch**: `002-portfolio-enhancements` | **Date**: 2026-10-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-portfolio-enhancements/spec.md`

## Summary

Add bilingual support (Spanish/English) with client-side language switching and persistence, a new Education section displaying academic background with institution, degree, period and status, and a certification viewer with an accessible modal that displays certificate images at full size. The i18n system uses a React Context provider following the existing ThemeProvider pattern, with localized data structures and a UI translations file. No external i18n library is needed for the 2-language scope.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled), React 19, Next.js 16

**Primary Dependencies**: next 16.4.2, react 19.3.0, next-themes 0.4.6, lucide-react 1.57.0, tailwindcss 4.x (no new runtime dependencies needed)

**Storage**: localStorage for language preference persistence (mirrors next-themes `storageKey` pattern)

**Testing**: Vitest + @testing-library/react + @testing-library/user-event

**Target Platform**: Web (SSG/static site, deployed to Vercel or similar)

**Project Type**: Web application — static portfolio site (single page)

**Performance Goals**: Language switch <1s without page reload (SC-001); modal image load <2s (SC-004)

**Constraints**: No external i18n libraries; custom lightweight solution; WCAG 2.1 AA compliance required for modal

**Scale/Scope**: 2 languages (ES/EN), ~18 UI strings, 1+ education entries, 1+ certifications

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Estética Developer-First** | ✅ PASS | Language toggle and education section will follow existing visual patterns (dark mode support, coherent typography, smooth transitions) |
| **II. Separación de Contenido y Presentación** | ✅ PASS | All education/certification data in structured typed files; localized content separated from components; components consume data declaratively |
| **III. Tipado Estricto y Modularidad** | ✅ PASS | All new types defined with strict interfaces (Locale, Localized\<T\>, EducationEntry, Certification); each component single-responsibility; no `any` types |
| **IV. Mobile-First, Rendimiento y Accesibilidad** | ✅ PASS | Education section designed mobile-first; modal with focus trap, aria attributes, Escape close; images in optimized formats |
| **V. SEO, Metadatos y Presencia** | ✅ PASS | Dynamic `<html lang>` attribute; localized meta description and title; OG tags updated per language |
| **Requisitos Técnicos** | ✅ PASS | Uses existing Next.js + TypeScript + Tailwind stack; certificate images in WebP; no new runtime dependencies |
| **Flujo de Desarrollo (SDD)** | ✅ PASS | Spec → Plan → Tasks workflow followed via Spec Kit |

### Post-Design Check

| Principle | Status | Notes |
|-----------|--------|-------|
| **II. Data-Driven Architecture** | ✅ PASS | Data model defines clear Localized\<T\> wrapper; all content in `portfolioData.ts` and `translations.ts`; components never hardcode content |
| **III. Tipado Estricto** | ✅ PASS | Contracts file defines all types with strict TypeScript (see [contracts/portfolio-schema.ts](./contracts/portfolio-schema.ts)); `Locale`, `Localized<T>`, `EducationEntry`, `Certification`, `UITranslations` all typed |
| **IV. Accesibilidad** | ✅ PASS | CertificateModal contract includes `role="dialog"`, `aria-modal`, `aria-labelledby`, focus trap, Escape handling; `<html lang>` dynamically updated |

**Gate Result**: ✅ ALL PRINCIPLES PASS — No violations

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-enhancements/
├── spec.md                         # Feature specification
├── plan.md                         # This file
├── research.md                     # Phase 0: research decisions
├── data-model.md                   # Phase 1: entity definitions
├── quickstart.md                   # Phase 1: validation guide
├── contracts/
│   └── portfolio-schema.ts         # Phase 1: TypeScript type contracts
└── tasks.md                        # Phase 2 output (via /speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                  # MODIFY: wrap with LanguageProvider, dynamic lang attr
│   ├── page.tsx                    # MODIFY: add EducationSection, pass locale-aware data
│   └── globals.css                 # UNCHANGED
├── components/
│   ├── Header.tsx                  # MODIFY: add LanguageToggle, localized nav links
│   ├── LanguageToggle.tsx          # NEW: ES/EN toggle button
│   ├── HeroSection.tsx             # MODIFY: consume localized data + UI translations
│   ├── ProjectsGrid.tsx            # MODIFY: consume localized data + UI translations
│   ├── ProjectCard.tsx             # MODIFY: consume localized data
│   ├── ContactSection.tsx          # MODIFY: consume localized data + UI translations
│   ├── EmailCopyButton.tsx         # MODIFY: localized button labels
│   ├── Footer.tsx                  # MODIFY: localized footer text
│   ├── EducationSection.tsx        # NEW: education section container
│   ├── EducationCard.tsx           # NEW: single education entry card
│   ├── CertificateModal.tsx        # NEW: accessible image viewer modal
│   ├── ThemeToggle.tsx             # UNCHANGED
│   └── social-icons.tsx            # UNCHANGED
├── data/
│   ├── portfolioData.ts            # MODIFY: restructure with Localized<> fields, add education[]
│   └── translations.ts             # NEW: UITranslations for ES and EN
├── hooks/
│   ├── useLanguage.ts              # NEW: access LanguageContext
│   └── useTranslation.ts           # NEW: get t() function for UI strings
├── providers/
│   ├── ThemeProvider.tsx            # UNCHANGED
│   └── LanguageProvider.tsx         # NEW: language context + localStorage persistence
├── types/
│   └── portfolio.ts                # MODIFY: add Locale, Localized<T>, EducationEntry, Certification, UITranslations
└── lib/
    ├── assets.ts                   # UNCHANGED
    └── contact.ts                  # UNCHANGED
```

**Structure Decision**: Follows the existing single-project Next.js App Router structure. New files are organized by concern: types, data, hooks, providers, components — consistent with existing patterns. No structural changes to directory layout; only additions and modifications within existing directories.

## Complexity Tracking

> No Constitution violations — this section is intentionally empty.
