# Research & Technical Decisions: Portafolio Personal Interactivo MVP

**Feature**: `001-interactive-portfolio-mvp`  
**Date**: 2026-10-12  
**Status**: Completed  

---

## 1. Framework Architecture & Rendering Strategy

- **Decision**: **Next.js (App Router)** configurado con generación de sitio estático pura (`output: 'export'`).
- **Rationale**:
  - Permite generar un artefacto estático puro (HTML/CSS/JS) sin requerir runtime de Node.js en producción, compatible con cualquier proveedor de hosting estático (Vercel, Cloudflare Pages, GitHub Pages).
  - El App Router proporciona una estructura modular (`src/app/`) con soporte nativo de metadatos tipados (`export const metadata: Metadata`) para SEO, OpenGraph y Twitter Cards sin plugins adicionales.
  - Ofrece compatibilidad total con Server Components (RSC) para renderizado estático inmediato de contenido no interactivo y Client Components (`'use client'`) aislados para interactividad (toggle de tema, copiado a portapapeles).
- **Alternatives considered**:
  - *Astro*: Excelente opción para sitios estáticos, pero Next.js App Router provee mayor flexibilidad con el ecosistema React, tipado estricto unificado y herramientas de testing basadas en el estándar de la industria.
  - *Vite + React SPA*: No genera HTML pre-renderizado por defecto para SEO ni OpenGraph estático sin configuración compleja de SSR/prerender.

---

## 2. Sistema de Estilos y Gestión de Modo Oscuro (Dark / Light Mode)

- **Decision**: **Tailwind CSS v3/v4** complementado con **`next-themes`**.
- **Rationale**:
  - `next-themes` resuelve de raíz el parpadeo de tema (Flash of Unstyled/Wrong Theme - FOUC) inyectando un script inline minúsculo previo al renderizado del DOM que lee `localStorage` o `window.matchMedia('(prefers-color-scheme: dark)')`.
  - Tailwind CSS maneja el tema mediante la estrategia de clase (`darkMode: 'class'`), permitiendo definir variantes limpias y mantenibles (`dark:bg-slate-900 dark:text-slate-100`).
  - Provee una escala de contrastes probada que cumple con los ratios de contraste WCAG 2.1 AA (4.5:1 para texto normal, 3:1 para texto grande y elementos UI).
- **Alternatives considered**:
  - *CSS Variables puro sin librería*: Requiere implementar manualmente la detección de `prefers-color-scheme`, sincronización entre pestañas y prevención de FOUC, aumentando la superficie de bugs.
  - *Styled Components / Emotion*: Penaliza el rendimiento estático al requerir runtime de CSS-in-JS y no se integra nativamente con Server Components.

---

## 3. Iconografía y Microinteracciones

- **Decision**: **`lucide-react`** para iconografía y **CSS puro con transiciones de Tailwind** para microinteracciones y estados hover.
- **Rationale**:
  - `lucide-react` es una biblioteca moderna, modular y tree-shakeable con íconos vectoriales SVG limpios y consistentes, perfectamente adaptables al tamaño y color del texto (`w-5 h-5 text-current`).
  - Las transiciones CSS nativas de Tailwind (`transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg`) proporcionan microinteracciones fluidas a 60 fps sin el peso extra en bundle (~30-50 KB) que implicaría Framer Motion para este MVP.
- **Alternatives considered**:
  - *Framer Motion*: Muy potente para animaciones complejas de layout, pero innecesario y pesado para las microinteracciones del MVP de este portafolio.
  - *FontAwesome*: Carga fuentes pesadas o SVGs menos consistentes con la estética moderna developer-first.

---

## 4. Mecanismo de Copiado al Portapapeles y Accesibilidad

- **Decision**: **`navigator.clipboard.writeText`** con fallback a selección manual y estado temporal de feedback visual (2.5 segundos) con atributos ARIA (`role="status"`, `aria-live="polite"`).
- **Rationale**:
  - Ofrece retroalimentación instantánea (< 100 ms, superando ampliamente el criterio SC-004 de < 300 ms).
  - Al anunciar el cambio de estado mediante un contenedor con `aria-live="polite"`, los lectores de pantalla informan al usuario no vidente que el correo ha sido copiado sin interrumpir la lectura.
  - Se acompaña de un enlace semántico `mailto:` directo como alternativa para usuarios que prefieran abrir su cliente de correo.
- **Alternatives considered**:
  - *Librería externa (`copy-to-clipboard`)*: Agrega una dependencia innecesaria cuando la API nativa de Clipboard es estándar en todos los navegadores modernos.

---

## 5. Estrategia de Arquitectura de Datos (Data-Driven Architecture)

- **Decision**: Módulo estático TypeScript fuertemente tipado (`src/data/portfolioData.ts`) validado contra contratos de tipos (`src/types/portfolio.ts`).
- **Rationale**:
  - Cumple estrictamente el Principio II de la Constitución (separación total de datos y presentación).
  - El uso de TypeScript asegura chequeo en tiempo de compilación (`tsc --noEmit`), garantizando que si falta un atributo requerido (ej. `keyFeatures` o `tags`), la compilación falle antes de llegar a producción.
  - No añade latencia de lectura de red ni dependencias de parsers en tiempo de ejecución.
- **Alternatives considered**:
  - *Archivos JSON*: Válidos, pero no ofrecen el tipado estricto automático con validación en el IDE que provee un archivo TypeScript con contratos de interfaces explícitos.
  - *Contentlayer / MDX*: Sobredimensionado para una colección curada de 3-6 proyectos sin blog en la fase MVP.
