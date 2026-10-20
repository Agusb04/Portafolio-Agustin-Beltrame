# Tasks: Portfolio Enhancements — i18n, Education & Certifications

**Input**: Design documents from `specs/002-portfolio-enhancements/`

**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not explicitly requested in the feature specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new files, directories, and foundational types that all user stories depend on.

- [X] T001 Update type definitions in `src/types/portfolio.ts`: add `Locale` type (`"es" | "en"`), `Localized<T>` utility type (`Record<Locale, T>`), `EducationStatus` type (`"in-progress" | "completed"`), `EducationEntry` interface (fields: `id: string`, `institution: Localized<string>`, `degree: Localized<string>`, `startDate: string` in YYYY or YYYY-MM format, `endDate: string | null` where null means in-progress, `status: EducationStatus`, `description?: Localized<string>`, `certifications?: Certification[]`, `order: number`), `Certification` interface (fields: `id: string`, `name: Localized<string>`, `issuer: Localized<string>`, `date?: string | null` in YYYY or YYYY-MM format, `imageUrl?: string | null` path relative to public/), and `UITranslations` interface (nested object with keys: `nav.{about,projects,education,contact}`, `hero.{availableForWork,languages,downloadResume,contactMe}`, `projects.{title,subtitle,viewRepo,liveDemo}`, `education.{title,subtitle,inProgress,completed,viewCertification,certificationModalClose}`, `contact.{title,subtitle,copyEmail,emailCopied}`, `footer.{rights,builtWith}`, `lang.{toggle}`), and `LanguageContextValue` interface (`locale: Locale`, `setLocale: (locale: Locale) => void`). Also update existing interfaces to use `Localized<>` wrapper: in `Profile` change `role`, `headline`, `bio` to `Localized<string>` and `languages` to `Localized<string[]>` (keep `name`, `location`, `avatarUrl`, `cvUrl`, `availableForWork`, `coreTechnologies` unwrapped). In `Project` change `title`, `description` to `Localized<string>` and `keyFeatures` to `Localized<string[]>` (keep `id`, `tags`, `repoUrl`, `demoUrl`, `featured`, `order` unwrapped). In `ProjectLink` change `label` to `Localized<string>`. In `SocialLink` change `label` to `Localized<string>`. In `SiteMeta` change `defaultTitle`, `description` to `Localized<string>` and `keywords` to `Localized<string[]>`. Add `education: EducationEntry[]` to `PortfolioData`. Use contracts/portfolio-schema.ts as the source of truth for all type shapes.
- [X] T002 Create `src/hooks/` directory if it does not exist

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core i18n infrastructure that MUST be complete before ANY user story can be implemented. All components will depend on the LanguageProvider and translation hooks.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 Create `src/providers/LanguageProvider.tsx`: implement a `"use client"` React Context provider following the same pattern as the existing `src/providers/ThemeProvider.tsx`. It must create a `LanguageContext` using `React.createContext<LanguageContextValue | undefined>(undefined)`. The provider component must: initialize locale state from `localStorage` key `"portfolio-language"` (falling back to `"es"` as default per FR-004), persist locale changes to `localStorage` on every `setLocale` call, update the `document.documentElement.lang` attribute to match the current locale (for SEO/accessibility), and use `suppressHydrationWarning` to prevent hydration mismatches. Export both `LanguageProvider` and `LanguageContext`.
- [X] T004 Create `src/hooks/useLanguage.ts`: export a `useLanguage()` hook that calls `useContext(LanguageContext)` and throws an error if used outside `LanguageProvider`. Return type must be `LanguageContextValue` (`{ locale, setLocale }`).
- [X] T005 Create `src/data/translations.ts`: export a `translations` object of type `Record<Locale, UITranslations>` containing all UI strings for both locales. Spanish (`es`) values: `nav.about = "Sobre mí"`, `nav.projects = "Proyectos"`, `nav.education = "Educación"`, `nav.contact = "Contacto"`, `hero.availableForWork = "Disponible para trabajar"`, `hero.languages = "Idiomas:"`, `hero.downloadResume = "Descargar CV"`, `hero.contactMe = "Contáctame"`, `projects.title = "Proyectos Destacados"`, `projects.subtitle = "Una selección de trabajos clave — problema, solución, aspectos destacados y tecnologías."`, `projects.viewRepo = "Código Fuente"`, `projects.liveDemo = "Demo en Vivo"`, `education.title = "Educación"`, `education.subtitle = "Formación académica y certificaciones profesionales."`, `education.inProgress = "En curso"`, `education.completed = "Completada"`, `education.viewCertification = "Ver Certificación"`, `education.certificationModalClose = "Cerrar"`, `contact.title = "Ponete en Contacto"`, `contact.subtitle = "Abierto a nuevas oportunidades y colaboraciones interesantes — escribime directamente."`, `contact.copyEmail = "Copiar email"`, `contact.emailCopied = "¡Copiado!"`, `footer.rights = "Todos los derechos reservados."`, `footer.builtWith = "Hecho con Next.js, TypeScript & Tailwind CSS"`, `lang.toggle = "Cambiar idioma"`. English (`en`) values: `nav.about = "About"`, `nav.projects = "Projects"`, `nav.education = "Education"`, `nav.contact = "Contact"`, `hero.availableForWork = "Available for work"`, `hero.languages = "Languages:"`, `hero.downloadResume = "Download Resume / CV"`, `hero.contactMe = "Contact Me"`, `projects.title = "Featured Projects"`, `projects.subtitle = "A curated selection of key work — problem, solution, highlights and stack."`, `projects.viewRepo = "Source Code"`, `projects.liveDemo = "Live Demo"`, `education.title = "Education"`, `education.subtitle = "Academic background and professional certifications."`, `education.inProgress = "In progress"`, `education.completed = "Completed"`, `education.viewCertification = "View Certification"`, `education.certificationModalClose = "Close"`, `contact.title = "Get in Touch"`, `contact.subtitle = "Open to new opportunities and interesting collaborations — reach out directly."`, `contact.copyEmail = "Copy email"`, `contact.emailCopied = "Copied!"`, `footer.rights = "All rights reserved."`, `footer.builtWith = "Built with Next.js, TypeScript & Tailwind CSS"`, `lang.toggle = "Switch language"`.
- [X] T006 Create `src/hooks/useTranslation.ts`: export a `useTranslation()` hook that calls `useLanguage()` to get the current locale, imports `translations` from `@/data/translations`, and returns `{ t: translations[locale], locale }` where `t` is the full `UITranslations` object for the active locale.
- [X] T007 Update `src/data/portfolioData.ts`: restructure all content to use `Localized<>` wrappers on the fields specified in data-model.md. Keep the existing English content and add Spanish translations. Specifically: `profile.role` becomes `{ es: "Estudiante de Ingeniería Informática | Desarrollador de Software", en: "Computer Engineering Student | Software Developer" }`, `profile.headline` becomes `{ es: "Estudiante de Ingeniería Informática en UBA (FIUBA) interesado en desarrollo backend, programación de sistemas y diseño de software.", en: "Computer Engineering student at UBA (FIUBA) interested in backend development, systems programming, and software design." }`, `profile.bio` both languages, `profile.languages` becomes `{ es: ["Español (Nativo)", "Inglés (B2)", "Portugués (Básico)"], en: ["Spanish (Native)", "English (B2)", "Portuguese (Basic)"] }`. Each project's `title`, `description`, `keyFeatures` must have `es` and `en` variants. Each `socialLink.label` must have `es` and `en` variants. `meta.defaultTitle`, `meta.description`, `meta.keywords` must have `es` and `en` variants. Add an `education` array with at least one `EducationEntry` for FIUBA (UBA) with `status: "in-progress"`, `endDate: null`, and at least one `Certification` entry with a non-null `imageUrl` pointing to `"/certifications/sample-cert.webp"` (per SC-006). All data must satisfy the validation rules from data-model.md: if `status` is `"in-progress"` then `endDate` must be `null`; if `status` is `"completed"` then `endDate` must not be `null`; `startDate` and `endDate` must be YYYY or YYYY-MM format strings.
- [X] T008 Create placeholder certification image: add a placeholder WebP image at `public/certifications/sample-cert.webp` (can be a small placeholder image for development; the portfolio owner will replace with real certification images later).
- [X] T009 Update `src/app/layout.tsx`: import `LanguageProvider` from `@/providers/LanguageProvider` and wrap it around the existing `ThemeProvider` (or inside it — both are client-side providers). Remove the hardcoded `lang="en"` from the `<html>` tag (the `LanguageProvider` will dynamically set `document.documentElement.lang`). Keep `suppressHydrationWarning` on `<html>`. The `Header` component will be updated in the next phase to accept translation props — for now just ensure the provider wrapping compiles.

**Checkpoint**: Foundation ready — i18n infrastructure (provider, hooks, translations, localized data) is in place. User story implementation can now begin.

---

## Phase 3: User Story 1 — Language Switching (Priority: P1) 🎯 MVP

**Goal**: Visitors can switch between Spanish and English; all visible content changes instantly without page reload; preference persists across sessions.

**Independent Test**: Switch language via the toggle and verify all sections display content in the selected language. Close and reopen the browser — the preference should persist.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create `src/components/LanguageToggle.tsx`: a `"use client"` component that renders a button toggling between ES and EN. Use `useLanguage()` hook to get `locale` and `setLocale`. Display the opposite language as the button label (when locale is `"es"` show `"EN"`, when `"en"` show `"ES"`). Style consistently with the existing `ThemeToggle` component (same size, border, hover effects). Include `aria-label` from `useTranslation().t.lang.toggle`. Use the `Globe` icon from `lucide-react`.
- [X] T011 [US1] Update `src/components/Header.tsx`: make it a `"use client"` component. Import `useTranslation` hook and `LanguageToggle` component. Replace the hardcoded `navLinks` array with dynamic links that read labels from `t.nav.about`, `t.nav.projects`, `t.nav.education` (new nav item for the Education section, href `"#education"`), `t.nav.contact`. Add `<LanguageToggle />` next to the existing `<ThemeToggle />` in the header actions area. The `developerName` prop remains unchanged (not localized). Add `"#education"` to the navigation links between `"#projects"` and `"#contact"`.
- [X] T012 [US1] Update `src/components/HeroSection.tsx`: make it a `"use client"` component. Import `useLanguage` and `useTranslation` hooks. Read `locale` from `useLanguage()` and `t` from `useTranslation()`. Change data access to use locale: `profile.role[locale]`, `profile.headline[locale]`, `profile.bio[locale]`, `profile.languages?.[locale]`. Replace hardcoded strings: `"Available for work"` → `t.hero.availableForWork`, `"Languages:"` → `t.hero.languages`, `"Download Resume / CV"` → `t.hero.downloadResume`, `"Contact Me"` → `t.hero.contactMe`. Keep all existing styling, layout, and accessibility attributes unchanged.
- [X] T013 [P] [US1] Update `src/components/ProjectCard.tsx`: make it a `"use client"` component. Import `useLanguage` and `useTranslation` hooks. Read `locale` and `t`. Change data access: `project.title[locale]`, `project.description[locale]`, `project.keyFeatures[locale]` (iterate over the locale-specific array). Replace `"Live Demo"` → `t.projects.liveDemo`, `"Source Code"` → `t.projects.viewRepo`. For `extraLinks`, access `link.label[locale]`. Update aria-labels to use locale-resolved title. Keep all existing styling unchanged.
- [X] T014 [US1] Update `src/components/ProjectsGrid.tsx`: make it a `"use client"` component. Import `useTranslation` hook. Replace hardcoded section title `"Featured Projects"` → `t.projects.title` and subtitle text → `t.projects.subtitle`. Keep all existing layout and filtering logic unchanged.
- [X] T015 [P] [US1] Update `src/components/ContactSection.tsx`: make it a `"use client"` component. Import `useLanguage` and `useTranslation` hooks. Replace `"Get in Touch"` → `t.contact.title` and subtitle → `t.contact.subtitle`. For social links, access `link.label[locale]` for aria-labels. Keep all existing layout unchanged.
- [X] T016 [P] [US1] Update `src/components/EmailCopyButton.tsx`: import `useTranslation` hook. Replace `"Copy email"` → `t.contact.copyEmail`, `"Copied!"` → `t.contact.emailCopied`, `"Copy email address to clipboard"` aria-label → localized equivalent, `"Email copied to clipboard!"` sr-only status → localized equivalent, and the fallback error message → localized equivalent. Keep all existing copy logic, timer, and styling unchanged.
- [X] T017 [P] [US1] Update `src/components/Footer.tsx`: make it a `"use client"` component. Import `useTranslation` hook. Replace `"All rights reserved."` → `t.footer.rights` and `"Built with Next.js, TypeScript & Tailwind CSS"` → `t.footer.builtWith`. Keep existing layout unchanged.
- [X] T018 [US1] Update `src/app/page.tsx`: import `portfolioData` which now has localized fields. The page remains a server component — it passes the full (localized) data to child components. The child components (now client components) will resolve the locale internally via `useLanguage()`. No structural changes needed beyond ensuring the localized `portfolioData` compiles. Ensure TypeScript compilation succeeds with the updated types.
- [X] T019 [US1] Verify full i18n integration: run `npm run typecheck` to confirm all type changes compile. Run `npm run lint` to confirm no lint errors. Run `npm run dev` and manually verify language switching works across all sections per quickstart.md Scenario 1.

**Checkpoint**: User Story 1 complete — the entire portfolio is bilingual with instant language switching and persistent preference.

---

## Phase 4: User Story 2 — Education Section (Priority: P2)

**Goal**: Display academic background in a new "Education" section on the main page with institution, degree, period, and status.

**Independent Test**: Scroll to the Education section and verify education entries display all required fields. Switch language and verify translation. Check responsive layout on mobile/tablet/desktop.

### Implementation for User Story 2

- [X] T020 [P] [US2] Create `src/components/EducationCard.tsx`: a `"use client"` component that receives an `EducationEntry` as prop. Import `useLanguage` and `useTranslation` hooks. Display: institution name (`entry.institution[locale]`), degree (`entry.degree[locale]`), date range formatted as `"startDate — endDate"` or `"startDate — {t.education.inProgress}"` when `endDate` is null, status badge showing `t.education.inProgress` or `t.education.completed` based on `entry.status`. If `entry.description` exists, show `entry.description[locale]`. Style as a card consistent with the existing `ProjectCard` design (rounded border, bg-card, hover effect). Use mobile-first responsive layout. Do NOT render certifications in this component — that belongs to US3.
- [X] T021 [US2] Create `src/components/EducationSection.tsx`: a `"use client"` component that receives `education: EducationEntry[]` as prop. Import `useTranslation` hook. Render a `<section id="education" aria-label="Education">` with the same max-width and padding pattern as `ProjectsGrid` (`mx-auto max-w-6xl px-4 py-16 sm:py-24`). Display section title from `t.education.title` and subtitle from `t.education.subtitle` using the same heading styles as other sections (`text-3xl font-bold tracking-tight`). Sort education entries by `order` ascending. Map each entry to an `<EducationCard>`. Use a vertical stack layout (`flex flex-col gap-6`).
- [X] T022 [US2] Update `src/app/page.tsx`: import `EducationSection` component. Add `<EducationSection education={portfolioData.education} />` between `<ProjectsGrid>` and `<ContactSection>` in the page layout. Extract `education` from `portfolioData` destructuring.
- [X] T023 [US2] Verify Education section: run `npm run typecheck` and `npm run dev`. Verify the Education section renders correctly with at least one entry (the FIUBA entry from T007). Test responsive layout at mobile (375px), tablet (768px), and desktop (1024px+) viewports per quickstart.md Scenario 2.

**Checkpoint**: User Story 2 complete — Education section is visible, responsive, and bilingual.

---

## Phase 5: User Story 3 — Certification Viewer (Priority: P3)

**Goal**: Each education entry can have certifications with a "View Certification" button that opens an accessible image modal.

**Independent Test**: Click "View Certification" on an entry with a certificate image. Verify the modal opens with the image, can be closed via button/Escape/backdrop click, and is keyboard-accessible.

### Implementation for User Story 3

- [X] T024 [P] [US3] Create `src/components/CertificateModal.tsx`: a `"use client"` component that renders an accessible modal overlay. Props: `isOpen: boolean`, `onClose: () => void`, `imageUrl: string`, `title: string`. When `isOpen` is true, render a full-screen overlay with `position: fixed`, `inset: 0`, `z-50`, semi-transparent dark backdrop (`bg-black/70`). Center the image using flexbox. Use Next.js `<Image>` component with `fill` and `object-contain` or set `max-w-[90vw] max-h-[90vh]` for responsive sizing. Include a close button (top-right corner) using `X` icon from `lucide-react` with `aria-label` from the `title` or a generic "Close" label. Implement accessibility per FR-014: set `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to a visually-hidden title element. Implement focus trap: on mount, save `document.activeElement`, find all focusable elements inside modal, trap Tab/Shift+Tab cycling. On unmount, restore focus to the previously focused element. Add `keydown` event listener for Escape key → call `onClose` (FR-013). Add click handler on backdrop (the overlay behind the image) → call `onClose` (FR-013). Prevent body scroll when modal is open by adding `overflow-hidden` to `document.body` on mount and removing on unmount. Add smooth fade-in transition using Tailwind `animate-` classes or CSS transitions.
- [X] T025 [US3] Update `src/components/EducationCard.tsx`: import `CertificateModal` and `useTranslation`. Add local state `const [selectedCert, setSelectedCert] = useState<Certification | null>(null)`. After the education entry details, if `entry.certifications` exists and has items, render a list of certifications. For each certification: display `cert.name[locale]` and `cert.issuer[locale]`. If `cert.imageUrl` is not null/undefined, render a button with text `t.education.viewCertification` that sets `selectedCert` to that certification on click. If `cert.imageUrl` is null/undefined, do NOT show the button (FR-010, acceptance scenario 3). Render `<CertificateModal isOpen={selectedCert !== null} onClose={() => setSelectedCert(null)} imageUrl={selectedCert?.imageUrl ?? ""} title={selectedCert?.name[locale] ?? ""} />` at the end of the component.
- [X] T026 [US3] Verify certification viewer: run `npm run typecheck` and `npm run dev`. Test all modal interactions per quickstart.md Scenario 3: open modal via "View Certification" button, close via close button, close via Escape key, close via backdrop click. Verify focus trap (Tab should cycle within modal). Verify responsive image display on mobile viewport. Verify entries without `imageUrl` do not show the button.

**Checkpoint**: User Story 3 complete — certifications are viewable in an accessible modal.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks and improvements that affect multiple user stories.

- [X] T027 [P] Run full type check with `npm run typecheck` — fix any remaining TypeScript errors across all modified files
- [X] T028 [P] Run linter with `npm run lint` — fix any lint warnings or errors
- [X] T029 Verify edge cases per quickstart.md Scenario 4: test missing certification image (no button shown), language switch with modal open (title updates, image stays), multiple modal open/close cycles (correct image each time)
- [X] T030 Run `npm run build` to verify production build succeeds with no errors
- [X] T031 Run quickstart.md full validation: execute all 4 scenarios end-to-end and mark each checklist item as pass/fail

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (T001) — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion; can run in parallel with US1 but practically benefits from US1 being done first (i18n in components)
- **User Story 3 (Phase 5)**: Depends on Phase 4 (US2) — builds on EducationCard component
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Independent of US1 but uses same i18n hooks
- **User Story 3 (P3)**: Depends on US2 — extends the EducationCard component created in Phase 4

### Within Each User Story

- Parallel tasks (marked [P]) can run simultaneously (they touch different files)
- Sequential tasks depend on previous tasks within the same phase
- Each story ends with a verification checkpoint

### Parallel Opportunities

**Within Phase 3 (US1)** — after T011 is done:
- T012, T013, T015, T016, T017 can all run in parallel (different component files)

**Within Phase 4 (US2)**:
- T020 can run in parallel with any remaining US1 tasks

**Within Phase 5 (US3)**:
- T024 can run in parallel with any remaining US2 tasks

---

## Parallel Example: User Story 1

```bash
# After T011 (Header) is complete, launch these in parallel:
Task T012: "Update HeroSection.tsx for i18n"
Task T013: "Update ProjectCard.tsx for i18n"
Task T015: "Update ContactSection.tsx for i18n"
Task T016: "Update EmailCopyButton.tsx for i18n"
Task T017: "Update Footer.tsx for i18n"
```

## Parallel Example: User Story 2

```bash
# T020 and T024 can start as soon as Phase 2 is done:
Task T020: "Create EducationCard.tsx"
Task T024: "Create CertificateModal.tsx" (US3 but no dependency on US2 output)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T009)
3. Complete Phase 3: User Story 1 (T010-T019)
4. **STOP and VALIDATE**: Test language switching independently
5. Deploy/demo if ready — portfolio is now fully bilingual

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (MVP! Bilingual portfolio)
3. Add User Story 2 → Test independently → Deploy (Education section added)
4. Add User Story 3 → Test independently → Deploy (Certification viewer added)
5. Polish → Final validation → Production deployment

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable (except US3 which extends US2)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All new components must be `"use client"` since they use React hooks (useLanguage, useTranslation)
- No new npm dependencies are needed — everything uses the existing stack
