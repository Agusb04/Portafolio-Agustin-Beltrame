# Tasks: Portafolio Personal Interactivo MVP

**Input**: Design documents from `/specs/001-interactive-portfolio-mvp/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included — plan.md (`Technical Context → Testing`) explicitly requiere React Testing Library / Vitest además de `tsc --noEmit` y ESLint.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root (Next.js App Router con `output: 'export'`)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización del proyecto Next.js con TypeScript estricto, Tailwind, ESLint y tooling de testing según plan.md

- [X] T001 Initialize Next.js (App Router) project scaffold in repository root: `package.json`, `next.config.ts` (con `output: 'export'`), `tsconfig.json` (`strict: true`), `next-env.d.ts`, dependencias `next`, `react`, `react-dom`, `next-themes`, `lucide-react` según plan.md
- [X] T002 [P] Configure Tailwind CSS in `src/app/globals.css` + `tailwind.config.ts` (`darkMode: 'class'`) con tokens de paleta, tipografía y radios de borde developer-first (Constitución I/III)
- [X] T003 [P] Configure ESLint flat config in `eslint.config.*` + npm scripts in `package.json`: `typecheck` (`tsc --noEmit`), `lint`, `build`, `test` (debe satisfacer `.github/workflows/ci.yml`)
- [X] T004 [P] Configure Vitest + React Testing Library in `vitest.config.ts` and `tests/setup.ts` (jsdom, matchers de `@testing-library/jest-dom`)
- [X] T005 [P] Verify `.gitignore` contains Node/Next.js critical patterns (`node_modules/`, `.next/`, `out/`, `dist/`, `build/`, `*.log`, `.env*`) in `.gitignore`

**Checkpoint**: Toolchain instalada; `npm run typecheck`, `npm run lint` y `npm run build` ejecutan (aún sin contenido)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Capa de datos tipada y layout raíz — prerequisito bloqueante de TODAS las user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create type contracts in `src/types/portfolio.ts`: interfaces `Profile`, `Project`, `SocialLink`, `SiteMeta`, `PortfolioData` idénticas a `contracts/portfolio-schema.ts` (campos requeridos/opcionales exactos: `repoUrl?`, `demoUrl?`, `isEmail?`, `emailAddress?`)
- [X] T007 Create data source in `src/data/portfolioData.ts`: objeto `PortfolioData` (profile, projects, socialLinks, meta) con contenido REAL proporcionado por el usuario — reglas de data-model.md: 3-6 proyectos `featured: true`, `keyFeatures` 2-4 viñetas, `tags` 2-8, al menos uno de `repoUrl`/`demoUrl` presente, todo el contenido en inglés (FR-015)
- [X] T008 [P] Create `ThemeProvider` wrapper in `src/providers/ThemeProvider.tsx` using `next-themes` con `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `storageKey="portfolio-theme"` (FR-010, SC-006 sin FOUC)
- [X] T009 Create root layout in `src/app/layout.tsx`: `ThemeProvider` wrapper, metadatos SEO tipados (`Metadata`) con OpenGraph y Twitter Cards derivados de `portfolioData.meta` (Constitución V, FR-015 `lang="en"`)
- [X] T010 Create page skeleton in `src/app/page.tsx` ensamblando secciones semánticas (`<main>`, `<section id="about">`, `<section id="projects">`, `<section id="contact">`) consumiendo `portfolioData` de forma declarativa (Constitución II)
- [ ] T011 [P] Add static assets in `public/`: `cv.pdf` (CV real del usuario), `avatar.webp` (imagen de perfil optimizada), `og-image.png` (preview social) — rutas referenciadas por `profile.cvUrl`, `profile.avatarUrl`, `meta.ogImage`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Evaluación Rápida del Perfil por Reclutadores (Priority: P1) 🎯 MVP

**Goal**: Hero above-the-fold con nombre, rol, propuesta de valor, avatar, badge de disponibilidad, CTA de descarga de CV y contacto directo (FR-001, FR-002, FR-007, FR-008)

**Independent Test**: Un usuario ingresa a la página, identifica en el primer pantallazo nombre/rol/propuesta de valor, descarga el CV con 1 clic e inicia contacto mediante acceso de correo directo (quickstart Escenarios 1-2)

### Tests for User Story 1

- [X] T012 [P] [US1] Render test for `HeroSection` in `tests/hero-section.test.tsx`: verifica `<h1>` con `profile.name`, `profile.role`, `profile.headline`, badge `availableForWork`, CTA con `href` igual a `profile.cvUrl` y `<img>` del avatar con `alt` descriptivo
- [X] T013 [P] [US1] Behavior test for `EmailCopyButton` in `tests/email-copy-button.test.tsx`: mockea `navigator.clipboard.writeText`, verifica feedback visible tras clic, estado `role="status"` + `aria-live="polite"`, y retorno a normalidad tras 2.5s (SC-004)

### Implementation for User Story 1

- [X] T014 [P] [US1] Create `EmailCopyButton` in `src/components/EmailCopyButton.tsx`: `navigator.clipboard.writeText(emailAddress)` con fallback a `mailto:` si la API falla (edge case portapapeles), feedback visual temporal 2.5s con ícono `Copy`→`Check`, `aria-label="Copy email address to clipboard"`, `role="status"` + `aria-live="polite"` (FR-008, contrato 2.4)
- [X] T015 [US1] Create `HeroSection` in `src/components/HeroSection.tsx` con props `{ profile: Profile; socialLinks: SocialLink[] }`: `<h1>` nombre, rol, headline, bio, ubicación, avatar, badge de disponibilidad, CTA primario "Download Resume / CV" (`target="_blank"` + `rel="noopener noreferrer"` hacia `profile.cvUrl`), CTA secundario "Contact Me" con smooth scroll a `#contact`, y acceso rápido de correo vía `EmailCopyButton` (FR-001, FR-002, FR-009, contrato 2.2)
- [X] T016 [US1] Integrate `HeroSection` into `src/app/page.tsx` consumiendo `portfolioData.profile` y `portfolioData.socialLinks`
- [X] T017 [US1] Run tests for US1: `npx vitest run tests/hero-section.test.tsx tests/email-copy-button.test.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Exploración Técnica y Validación de Proyectos (Priority: P2)

**Goal**: Galería curada de 3-6 proyectos con metadatos completos y enlaces dinámicos condicionales seguros (FR-003, FR-004, FR-005, FR-006, FR-009)

**Independent Test**: Un visitante explora las tarjetas, lee key features y tags, y hace clic en "Live Demo"/"Source Code" abriéndose en pestañas independientes seguras; en proyectos sin demo el botón se omite sin romper el grid (quickstart Escenario 3)

### Tests for User Story 2

- [X] T018 [P] [US2] Render test for `ProjectCard` in `tests/project-card.test.tsx`: verifica `title`, `description`, `keyFeatures` (viñetas), `tags`, y que ambos enlaces tienen `target="_blank"` y `rel="noopener noreferrer"` con `aria-label` correctos (SC-003)
- [X] T019 [P] [US2] Conditional rendering test for `ProjectCard` in `tests/project-card.test.tsx`: con `demoUrl` ausente NO renderiza botón "Live Demo" pero sí "Source Code" y viceversa; sin espacios ni botones rotos (FR-006)

### Implementation for User Story 2

- [X] T020 [P] [US2] Create `ProjectCard` in `src/components/ProjectCard.tsx` con props `{ project: Project }`: título, descripción, `keyFeatures` como lista, `tags` como badges, enlaces condicionales "Live Demo" (solo si `demoUrl` definido y no vacío) y "Source Code" (solo si `repoUrl` definido y no vacío), ambos `target="_blank"` + `rel="noopener noreferrer"` + `aria-label` descriptivos, grilla de acciones simétrica sin huecos (FR-004, FR-005, FR-006, contrato 2.3)
- [X] T021 [P] [US2] Create `ProjectsGrid` in `src/components/ProjectsGrid.tsx` con props `{ projects: Project[] }`: sección `<section id="projects">` con encabezado, grid responsivo mobile-first (320px+), filtra `featured === true` y ordena por `order`, renderiza `ProjectCard[]` (FR-003, FR-012)
- [X] T022 [US2] Integrate `ProjectsGrid` into `src/app/page.tsx` consumiendo `portfolioData.projects`
- [X] T023 [US2] Run tests for US2: `npx vitest run tests/project-card.test.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Navegación Accesible, Presencia Social y Tema Visual (Priority: P3)

**Goal**: Navbar con smooth scroll, toggle de tema persistente sin FOUC, canales sociales con seguridad, copiado de correo con feedback y footer (FR-007, FR-008, FR-009, FR-010, FR-011, FR-013)

**Independent Test**: Un usuario alterna el tema y verifica cambio instantáneo persistente en recargas; navega con Tab por todas las secciones y enlaces sociales con foco visible; copia el email y ve el feedback transitorio (quickstart Escenarios 4-6)

### Tests for User Story 3

- [X] T024 [P] [US3] Behavior test for `ThemeToggle` in `tests/theme-toggle.test.tsx`: verifica `aria-label="Toggle visual theme"`, `role="button"`, y que al hacer clic invoca el cambio de tema de `next-themes` (SC-006)
- [X] T025 [P] [US3] Render test for `Header` in `tests/header.test.tsx`: verifica enlaces de anclaje `#about`, `#projects`, `#contact` con clase de smooth scroll y presencia de `ThemeToggle` (FR-011)

### Implementation for User Story 3

- [X] T026 [P] [US3] Create `ThemeToggle` in `src/components/ThemeToggle.tsx`: alterna `light`/`dark` vía `next-themes`, íconos `lucide-react` (`Sun`/`Moon`), `aria-label="Toggle visual theme"`, `role="button"`, foco visible `focus-visible:ring-2` (FR-010, FR-013, contrato 2.1)
- [X] T027 [US3] Create `Header` in `src/components/Header.tsx` con props `{ developerName: string }`: barra sticky, enlaces de anclaje smooth-scroll a `#about`, `#projects`, `#contact`, `ThemeToggle`, operable por teclado con indicador de foco visible (FR-011, FR-013, contrato 2.1)
- [X] T028 [P] [US3] Create `ContactSection` in `src/components/ContactSection.tsx` con props `{ socialLinks: SocialLink[]; emailAddress: string }`: sección `<section id="contact">`, barra de redes (LinkedIn, GitHub, X/Twitter, Email) con íconos `lucide-react`, todos los enlaces externos `target="_blank"` + `rel="noopener noreferrer"` + `label` accesible, y `EmailCopyButton` para el canal de correo (FR-007, FR-008, FR-009, contrato 2.4)
- [X] T029 [P] [US3] Create `Footer` in `src/components/Footer.tsx` con props `{ developerName: string; year?: number }`: copyright, créditos técnicos, marcado semántico `<footer>` (contrato 2.5)
- [X] T030 [US3] Integrate `Header` (en `src/app/layout.tsx`), `ContactSection` y `Footer` into `src/app/page.tsx` consumiendo `portfolioData`
- [X] T031 [US3] Run tests for US3: `npx vitest run tests/theme-toggle.test.tsx tests/header.test.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mejoras transversales, quality gates y validación end-to-end

- [X] T032 [P] A11y audit pass across `src/components/*` and `src/app/*`: marcado HTML5 semántico, `focus-visible` en todos los controles, nombres accesibles, contraste WCAG 2.1 AA (FR-013, SC-005, Constitución IV)
- [ ] T033 [P] Responsive audit pass 320px → desktop en `src/app/globals.css` y componentes: wrapping de textos extensos sin truncar, sin overflow horizontal (FR-012, edge cases)
- [X] T034 [P] Performance pass: textos críticos legibles antes de imágenes (`priority` en avatar, `next/image` o `<img>` optimizado), metadatos OG/Twitter completos desde `portfolioData.meta` (SC-007, Constitución V)
- [X] T035 Run quality gates: `npm run typecheck` && `npm run lint` && `npm run build` — salida `out/` 100% estática (CI parity)
- [X] T036 Run full test suite: `npx vitest run`
- [ ] T037 Execute `quickstart.md` validation scenarios 1-6 end-to-end against `npm run dev` and record results

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories (T006 → T007; T008-T011 paralelos tras T006)
- **User Story 1 (Phase 3)**: Depends on Foundational — MVP scope
- **User Story 2 (Phase 4)**: Depends on Foundational — independent of US1
- **User Story 3 (Phase 5)**: Depends on Foundational — independent; `ContactSection` reutiliza `EmailCopyButton` de US1 (reimplementado en Fase 3, solo import — no bloquea)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Tests written before their implementation tasks (T012-T013 antes de T014-T016, etc.)
- Independent components [P] before integration tasks
- Story complete before moving to next priority (or run in parallel)

### Parallel Opportunities

- Phase 1: T002, T003, T004, T005 en paralelo (archivos distintos)
- Phase 2: T008, T011 en paralelo
- Phase 3: T012, T013 (tests) en paralelo; T014 en paralelo con los tests
- Phase 4: T018, T019 en paralelo; T020, T021 en paralelo
- Phase 5: T024, T025 en paralelo; T026, T028, T029 en paralelo
- Phase 6: T032, T033, T034 en paralelo
- Entre user stories: Fases 3, 4 y 5 son independientes entre sí

---

## Parallel Example: User Story 2

```bash
# Launch tests together:
Task: "Render test for ProjectCard in tests/project-card.test.tsx"
Task: "Conditional rendering test for ProjectCard in tests/project-card.test.tsx"

# Launch components together (different files):
Task: "Create ProjectCard in src/components/ProjectCard.tsx"
Task: "Create ProjectsGrid in src/components/ProjectsGrid.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: quickstart Escenarios 1, 2, 4 y 6
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Polish → Quality gates (CI parity) → quickstart completo

### Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Commit after each phase or logical group
- All user-visible content in English (FR-015)
- Data content in T007 and assets in T011 are provided by the user before Phase 2 completion
