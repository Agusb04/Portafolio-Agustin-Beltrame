# Tasks: Portafolio Personal Interactivo MVP

**Input**: Design documents from `/specs/001-interactive-portfolio-mvp/`
- **Plan**: [plan.md](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/plan.md)
- **Spec**: [spec.md](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/spec.md)
- **Data Model**: [data-model.md](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/data-model.md)
- **Contracts**: [contracts/portfolio-schema.ts](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/contracts/portfolio-schema.ts), [contracts/component-contracts.md](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/contracts/component-contracts.md)
- **Research**: [research.md](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/research.md)
- **Quickstart**: [quickstart.md](file:///home/ruso/Escritorio/Proyectos/Portafolio-Agustin-Beltrame/specs/001-interactive-portfolio-mvp/quickstart.md)

**Constitution Principles Alignment**:
- **I. Estética Developer-First y Pulido Visual (UI/UX)**: Dark mode sin FOUC, transiciones suaves de 60 fps.
- **II. Separación Estricta de Contenido y Presentación**: Contenido 100% tipado en `src/data/portfolioData.ts`, cero textos hardcodeados.
- **III. Tipado Estricto y Modularidad de Componentes**: TypeScript `strict: true`, componentes atómicos en `src/components/`.
- **IV. Mobile-First, Rendimiento y Accesibilidad**: WCAG 2.1 AA, marcado semántico, soporte de teclado integral.
- **V. SEO, Metadatos y Presencia Profesional Transparente**: Metadatos OpenGraph/Twitter Cards, `target="_blank"` con `rel="noopener noreferrer"`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización del proyecto Next.js con TypeScript, Tailwind CSS y configuración de compilación estática.

- [ ] T001 Initialize Next.js project configuration with TypeScript and static export (`output: 'export'`) in package.json and next.config.ts
- [ ] T002 Configure TypeScript strict mode and path alias mapping (`@/*`) in tsconfig.json
- [ ] T003 [P] Configure Tailwind CSS and PostCSS for class-based dark mode (`darkMode: 'class'`) in tailwind.config.ts and postcss.config.mjs
- [ ] T004 [P] Configure base Tailwind directives, CSS variables, and smooth-scroll behavior in src/app/globals.css
- [ ] T005 [P] Add base static placeholder assets for favicon and OpenGraph preview in public/favicon.ico and public/og-image.png
- [ ] T006 Verify initial project setup and compilation with npm run build in package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura central de contratos de datos, datasets tipados y shell de layout que DEBE estar completa antes de implementar cualquier Historia de Usuario.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T007 [P] Define TypeScript domain contracts for Profile (name [2-100 chars], role, headline [1-2 sentences], bio [50-300 chars], location, avatarUrl, cvUrl, availableForWork [boolean]), Project (id [slug], title [3-80 chars], description [20-200 chars], keyFeatures [2-4 items], tags [2-8 items], repoUrl [optional HTTPS], demoUrl [optional HTTPS], featured [boolean], order [positive integer]), SocialLink (id, platform, url, label, isEmail, emailAddress, icon), SiteMeta, and PortfolioData in src/types/portfolio.ts
- [ ] T008 [P] Create ThemeProvider client component wrapper using next-themes (`attribute="class"`, `defaultTheme="system"`, `enableSystem`) in src/providers/ThemeProvider.tsx
- [ ] T009 Create single source of truth portfolio dataset in English with 3-6 curated projects, developer profile, and social links in src/data/portfolioData.ts
- [ ] T010 Create root layout with typography, SEO metadata, OpenGraph, Twitter Cards, and ThemeProvider wrapper in src/app/layout.tsx
- [ ] T011 Initialize base page shell importing portfolio data and setting up semantic layout structure (`<main>`) in src/app/page.tsx
- [ ] T012 Verify foundational contracts and data integrity with npx tsc --noEmit in tsconfig.json

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Evaluación Rápida del Perfil por Reclutadores / Hiring Managers (Priority: P1) 🎯 MVP

**Goal**: Permitir que un reclutador técnico o hiring manager determine en menos de 5 segundos la identidad, especialidad y propuesta de valor de Agustín Beltrame, descargue de inmediato su CV en PDF o inicie contacto directo.

**Independent Test**: Cargar la aplicación en local, verificar que en el primer viewport (above the fold) se distingan nombre, rol, headline, avatar y badge de disponibilidad, hacer clic en "Download Resume / CV" descargando/abriendo `cv.pdf`, y pulsar el botón secundario de contacto navegando suavemente a `#contact`.

### Implementation for User Story 1

- [ ] T013 [P] [US1] Add professional avatar image and downloadable curriculum vitae document in public/avatar.webp and public/cv.pdf
- [ ] T014 [US1] Implement HeroSection component displaying developer identity, role, headline, availability badge, and primary/secondary CTA buttons in src/components/HeroSection.tsx
- [ ] T015 [US1] Integrate HeroSection into the main landing page shell in src/app/page.tsx
- [ ] T016 [US1] Verify User Story 1 compilation and static build with npm run build in package.json

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently as an MVP.

---

## Phase 4: User Story 2 - Exploración Técnica y Validación de Proyectos por Colegas y Visitantes (Priority: P2)

**Goal**: Permitir que un colega desarrollador o evaluador técnico audite la calidad de ingeniería explorando la galería de 3 a 6 proyectos destacados, analizando key features, tags y accediendo a código fuente o demo en vivo.

**Independent Test**: Navegar a la sección `#projects`, inspeccionar las tarjetas de proyectos con sus key features y tags, hacer clic en "Live Demo" y "Source Code" verificando apertura en nueva pestaña segura (`target="_blank"`, `rel="noopener noreferrer"`), y confirmar que proyectos sin demo omiten el botón preservando alineación y simetría.

### Implementation for User Story 2

- [ ] T017 [P] [US2] Implement ProjectCard component with conditional demo/repo actions, key features list, tags, and secure external links in src/components/ProjectCard.tsx
- [ ] T018 [US2] Implement ProjectsGrid container component with responsive CSS grid layout (supporting 3 to 6 curated projects) in src/components/ProjectsGrid.tsx
- [ ] T019 [US2] Integrate ProjectsGrid section into the main landing page assembly in src/app/page.tsx
- [ ] T020 [US2] Verify User Story 2 compilation and type-check with npx tsc --noEmit in tsconfig.json

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Navegación Accesible, Presencia Social y Personalización de Tema Visual (Priority: P3)

**Goal**: Proveer alternador de tema claro/oscuro persistente y sin FOUC, barra de navegación superior fija con smooth-scroll, canales de contacto profesionales y botón de copiado rápido de email con confirmación visual y feedback ARIA.

**Independent Test**: Conmutar el interruptor de tema verificando cambio instantáneo y persistencia en `localStorage` ('portfolio-theme') sin FOUC; recorrer la interfaz con teclado (`Tab`) verificando foco visible WCAG 2.1 AA; pulsar el botón de copiado de email confirmando copiado al portapapeles y feedback visual ("Copied!") durante 2.5 segundos con anuncio en lector de pantalla (`aria-live="polite"`).

### Implementation for User Story 3

- [ ] T021 [P] [US3] Implement ThemeToggle client component with light/dark switching, system preference detection, and accessible ARIA attributes in src/components/ThemeToggle.tsx
- [ ] T022 [US3] Implement Header navigation component with sticky positioning, smooth-scroll anchor links, and ThemeToggle integration in src/components/Header.tsx
- [ ] T023 [P] [US3] Implement EmailCopyButton client component with navigator.clipboard API, mailto fallback, 2.5s visual feedback, and ARIA live region in src/components/EmailCopyButton.tsx
- [ ] T024 [US3] Implement ContactSection component rendering direct social channels and EmailCopyButton in src/components/ContactSection.tsx
- [ ] T025 [P] [US3] Implement Footer component displaying copyright information, dynamic year, and developer credits in src/components/Footer.tsx
- [ ] T026 [US3] Integrate Header, ContactSection, and Footer components into the main landing page assembly in src/app/page.tsx
- [ ] T027 [US3] Verify User Story 3 compilation and full static build with npm run build in package.json

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Auditoría final de accesibilidad, validación de enlaces externos, optimizaciones de performance y verificación de exportación estática.

- [ ] T028 [P] Audit WCAG 2.1 AA accessibility, keyboard focus-visible rings, and color contrast across all UI components in src/components/
- [ ] T029 [P] Update project documentation with architecture summary, quickstart instructions, and build scripts in README.md
- [ ] T030 Execute end-to-end static export build and validation per quickstart.md in package.json

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T006) - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion (T007-T012).
  - User Story 1 (P1): Can start immediately after Phase 2 (MVP).
  - User Story 2 (P2): Can start after Phase 2; integrates into `src/app/page.tsx` independently.
  - User Story 3 (P3): Can start after Phase 2; integrates into `src/app/page.tsx` independently.
- **Polish (Phase 6)**: Depends on completion of all user stories (T013-T027).

### User Story Dependencies

- **User Story 1 (P1)**: Independent of US2 and US3. Delivers the core professional identity, CV download, and immediate conversion.
- **User Story 2 (P2)**: Independent of US1 and US3. Consumes `Project` contract and renders project grid without depending on Hero or Contact components.
- **User Story 3 (P3)**: Integrates Header, ThemeToggle, ContactSection, and Footer. Operates independently on base data from Phase 2.

### Within Each User Story

- Assets and leaf components first.
- Container/section components next.
- Page assembly integration.
- Verification and type-check checkpoint (`npm run build` or `npx tsc --noEmit`).

### Parallel Opportunities

- **Phase 1 (Setup)**: T003, T004, and T005 can be executed in parallel.
- **Phase 2 (Foundational)**: T007 and T008 can be executed in parallel.
- **Phase 3 (User Story 1)**: T013 can be executed in parallel with component scaffolding.
- **Phase 4 (User Story 2)**: T017 can be developed in parallel before T018 container.
- **Phase 5 (User Story 3)**: T021, T023, and T025 can all be implemented in parallel across different files.
- **Phase 6 (Polish)**: T028 and T029 can be executed in parallel.

---

## Parallel Example: User Story 3

```bash
# Launch independent UI components for User Story 3 in parallel:
Task: "Implement ThemeToggle client component in src/components/ThemeToggle.tsx"
Task: "Implement EmailCopyButton client component in src/components/EmailCopyButton.tsx"
Task: "Implement Footer component in src/components/Footer.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (`T001` - `T006`).
2. Complete Phase 2: Foundational (`T007` - `T012`) -> **Foundation Ready**.
3. Complete Phase 3: User Story 1 (`T013` - `T016`).
4. **STOP and VALIDATE**: Verify User Story 1 independently in browser: Developer identity visible in <5s, CV download operative, contact CTA responsive.
5. Deploy/Demo initial MVP increment.

### Incremental Delivery

1. **Increment 1 (MVP)**: Setup + Foundation + US1 (Hero, CV download, bio).
2. **Increment 2**: US2 (Featured Projects showcase, key features, tags, demo/repo links).
3. **Increment 3**: US3 (Dark/Light theme toggle, navigation header, contact section, email copy with feedback, footer).
4. **Increment 4**: Polish & Cross-Cutting (WCAG 2.1 AA audit, README docs, static export verification).
