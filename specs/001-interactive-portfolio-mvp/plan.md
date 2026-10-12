# Implementation Plan: Portafolio Personal Interactivo MVP

**Branch**: `001-interactive-portfolio-mvp` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-interactive-portfolio-mvp/spec.md`

---

## Summary

Desarrollo y arquitectura del portafolio personal interactivo para Agustín Beltrame. La solución implementa un enfoque orientado a datos (*Data-Driven Architecture*) y estética *developer-first*, utilizando **Next.js (App Router) con generación de sitio estático (SSG)**, **Tailwind CSS**, **`next-themes`** y **`lucide-react`**. Todo el contenido editable (perfil profesional, selección curada de 3 a 6 proyectos destacados y canales de contacto directo) reside en contratos y esquemas fuertemente tipados en TypeScript, completamente desacoplados de los componentes de presentación.

---

## Technical Context

**Language/Version**: TypeScript 5+ con modo estricto habilitado (`strict: true`), Node.js 20+ LTS (entorno verificado: Node `v24.14.0`).

**Primary Dependencies**: Next.js (App Router con exportación estática `output: 'export'`), React 19/18, Tailwind CSS, `next-themes` (manejo de modo oscuro sin parpadeo FOUC), `lucide-react` (iconografía ligera y tree-shakeable).

**Storage**: Archivo de datos estructurado en TypeScript (`src/data/portfolioData.ts`), 100% estático en tiempo de compilación. Sin base de datos ni backend dinámico en producción.

**Testing**: Chequeo estricto del compilador TypeScript (`tsc --noEmit`), análisis estático con ESLint, y pruebas de componentes con React Testing Library / Vitest.

**Target Platform**: Navegadores web modernos (Chrome, Firefox, Safari, Edge), compatible con cualquier CDN o hosting estático (Vercel, Cloudflare Pages, GitHub Pages, Netlify).

**Project Type**: Single-page Web Application / Static Site Generation (SSG).

**Performance Goals**: First Contentful Paint (FCP) < 1.0s, textos críticos legibles en < 1.5s en conexiones móviles (SC-007), puntaje Lighthouse > 95 en Performance, Accessibility, Best Practices y SEO.

**Constraints**: Salida 100% estática (cero servidor en runtime), cero parpadeos de tema visual (SC-006), conformidad estricta WCAG 2.1 AA (SC-005), copiado al portapapeles con feedback < 300 ms (SC-004).

**Scale/Scope**: Portafolio MVP con 3 a 6 proyectos destacados curados, Hero de presentación profesional, enlaces de redes y copiado de email, navegación fluida y selector de tema claro/oscuro.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio Constitucional | Estado | Justificación / Evidencia |
|---|---|---|
| **I. Estética Developer-First y Pulido Visual (UI/UX)** | **PASS** | Soporte de Modo Oscuro nativo con `next-themes` y Tailwind CSS sin FOUC; microinteracciones suaves mediante transiciones CSS de 60 fps; paleta sobria de alto contraste. |
| **II. Separación Estricta de Contenido y Presentación** | **PASS** | Los datos residen exclusivamente en `src/data/portfolioData.ts` tipados por `src/types/portfolio.ts`. Cero textos de perfil o proyectos hardcodeados en plantillas JSX. |
| **III. Tipado Estricto y Modularidad de Componentes** | **PASS** | TypeScript en modo `strict: true`. Componentes modulares con interfaces y props explícitas (`Header`, `HeroSection`, `ProjectsGrid`, `ProjectCard`, `ContactSection`, `Footer`). |
| **IV. Mobile-First, Rendimiento y Accesibilidad (A11y)** | **PASS** | Diseño Mobile-First fluido desde 320px; marcado semántico HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`); soporte de teclado integral con `focus-visible`; contraste WCAG 2.1 AA. |
| **V. SEO, Metadatos y Presencia Profesional Transparente** | **PASS** | Metadatos tipados de Next.js (`Metadata`) para OpenGraph y Twitter Cards; todos los enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`; descarga directa de CV en PDF. |

*Resultado del Gate*: **APROBADO (5/5 Principios Cumplidos Sin Violaciones).**

---

## Project Structure

### Documentation (this feature)

```text
specs/001-interactive-portfolio-mvp/
├── spec.md                     # Especificación funcional validada
├── plan.md                     # Este archivo de arquitectura y diseño técnico
├── research.md                 # Fase 0: Decisiones técnicas y justificaciones
├── data-model.md               # Fase 1: Modelo de datos y entidades
├── quickstart.md               # Fase 1: Guía de ejecución y validación
├── contracts/                  # Fase 1: Contratos e interfaces
│   ├── portfolio-schema.ts     # Interfaces TypeScript de la capa de datos
│   └── component-contracts.md  # Contratos y props de componentes UI
└── checklists/
    └── requirements.md         # Checklist de validación de requisitos
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx              # Root Layout con fuentes, metadatos y ThemeProvider
│   ├── page.tsx                # Página principal ensamblando las secciones del MVP
│   ├── globals.css             # Directivas de Tailwind y estilos base
│   └── favicon.ico             # Favicon del portafolio
├── components/
│   ├── Header.tsx              # Barra de navegación fija con smooth-scroll
│   ├── ThemeToggle.tsx         # Botón selector de tema claro/oscuro
│   ├── HeroSection.tsx         # Presentación, badge de disponibilidad y CTA para CV
│   ├── ProjectsGrid.tsx        # Contenedor responsivo de la galería de proyectos
│   ├── ProjectCard.tsx         # Tarjeta individual con key features, tags y links
│   ├── ContactSection.tsx      # Enlaces sociales y área de contacto
│   ├── EmailCopyButton.tsx     # Botón interactivo de copiado con feedback visual y ARIA
│   └── Footer.tsx              # Pie de página con copyright y créditos técnicos
├── data/
│   └── portfolioData.ts        # Fuente única de verdad con datos en inglés
├── types/
│   └── portfolio.ts            # Contratos de tipos TypeScript (Profile, Project, SocialLink)
└── providers/
    └── ThemeProvider.tsx       # Wrapper de next-themes para soporte de Dark/Light mode
public/
├── cv.pdf                      # Documento del currículum vitae descargable
├── avatar.webp                 # Imagen optimizada del perfil profesional
└── og-image.png                # Imagen para previsualizaciones en redes sociales (OpenGraph)
```

**Structure Decision**: Estructura de proyecto único con Next.js App Router y TypeScript. Agrupa componentes de presentación modulares en `src/components/`, la capa de datos en `src/data/`, tipos en `src/types/` y assets estáticos en `public/`.

---

## Complexity Tracking

> *No existen violaciones a la constitución ni patrones de sobreingeniería. Todos los principios se satisfacen con la arquitectura más simple y directa posible.*

| Regla / Principio | Solución Adoptada | Justificación de Simplicidad |
|---|---|---|
| Cero Backend en MVP | Exportación estática `output: 'export'` | Elimina costos de servidor, latencia y complejidad de mantenimiento. |
| Gestión de Tema | `next-themes` + Tailwind | Resuelve FOUC y persistencia en ~1.5 KB de código estándar sin reinventar scripts en DOM. |
| Animaciones | Clases CSS nativas de Tailwind | Evita sumar bibliotecas de animación pesadas para microinteracciones estándar. |
