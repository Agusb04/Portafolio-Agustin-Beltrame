# Portafolio-Agustin-Beltrame

Portafolio personal interactivo de Agustín Beltrame — Computer Engineering Student (UBA/FIUBA) / Software Developer. Desarrollado con Spec-Driven Development (Spec Kit) para practicar manejo de Agentic IA y mostrar habilidades de ingeniería de software.

**Especificación de referencia**: [`specs/001-interactive-portfolio-mvp/`](specs/001-interactive-portfolio-mvp/)

## Stack Tecnológico

- **[Next.js 16](https://nextjs.org/)** (App Router) con generación de sitio estático (`output: 'export'` — sin backend en runtime)
- **React 19** + **TypeScript** en modo estricto (`strict: true`)
- **Tailwind CSS v4** (tokens de tema claro/oscuro vía variables CSS)
- **[next-themes](https://github.com/pacocoursey/next-themes)** — dark mode persistente sin FOUC (Flash of Unstyled Content)
- **[lucide-react](https://lucide.dev/)** + SVGs de marca propios — iconografía
- **Vitest** + **React Testing Library** — pruebas de componentes

## Arquitectura

Arquitectura **data-driven**: todo el contenido editable está desacoplado de la presentación (Constitución II del proyecto).

- **Fuente única de verdad**: [`src/data/portfolioData.ts`](src/data/portfolioData.ts) — perfil profesional, proyectos destacados, canales de contacto y metadatos SEO
- **Contratos tipados**: [`src/types/portfolio.ts`](src/types/portfolio.ts) — `Profile`, `Project`, `SocialLink`, `SiteMeta`, `PortfolioData`
- **Componentes de presentación**: [`src/components/`](src/components/) — consumen los datos de forma declarativa; cero textos hardcodeados en JSX
- **Salida 100% estática**: `npm run build` genera HTML/CSS/JS en `out/`, desplegable en cualquier CDN o GitHub Pages

## Estructura del Proyecto

```text
src/
├── app/                  # App Router: layout (SEO/OG, ThemeProvider, Header), page, globals.css
├── components/           # Header, ThemeToggle, HeroSection, ProjectsGrid, ProjectCard,
│                         # ContactSection, EmailCopyButton, Footer, social-icons
├── data/
│   └── portfolioData.ts  # ← Editá acá el contenido del portafolio
├── lib/
│   └── contact.ts        # Helpers de resolución de email
├── providers/
│   └── ThemeProvider.tsx # Wrapper de next-themes (dark/light)
└── types/
    └── portfolio.ts      # Contratos TypeScript

public/                   # cv.pdf, avatar.webp, og-image.png (estáticos)
tests/                    # Vitest + RTL (28 tests)
specs/                    # Especificación SDD de la feature 001
```

## Puesta en Marcha

**Requisitos**: Node.js 20+ LTS, npm 11+

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo → http://localhost:3000
```

## Scripts Disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build de producción estática → `out/` |
| `npm run lint` | Análisis estático con ESLint |
| `npm run typecheck` | Chequeo estricto de tipos (`tsc --noEmit`) |
| `npm test` | Suite de tests (Vitest + RTL) |
| `npm run test:watch` | Tests en modo watch |

## Cómo Actualizar el Contenido

Todo el contenido visible del sitio se edita en **un solo archivo**: [`src/data/portfolioData.ts`](src/data/portfolioData.ts).

1. **Perfil**: nombre, rol, headline, bio, ubicación, `languages`, `coreTechnologies`, `availableForWork`
2. **Proyectos**: entre 3 y 6 con `featured: true`; cada uno con `keyFeatures` (2-4), `tags` (2-8), al menos un `repoUrl` o `demoUrl`; ordenar con `order`
3. **Redes**: agregar/quitar entradas en `socialLinks` (el ícono se resuelve por el campo `icon` en `src/components/social-icons.tsx`)

Todo el contenido visible debe redactarse **en inglés** (FR-015 de la spec) para alcance global con reclutadores. La compilación valida los contratos: si falta un campo requerido, `npm run typecheck` falla antes de llegar a producción.

## Quality Gates

Antes de cada PR, la CI (`.github/workflows/ci.yml`) y el flujo local deben pasar:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

## Despliegue (GitHub Pages)

La build es 100% estática (`out/`). Para publicar en GitHub Pages:

1. En el repo: **Settings → Pages → Source: GitHub Actions**
2. Workflow de ejemplo (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

> **Nota**: al usar rutas relativas, el sitio funciona bajo el prefijo de proyecto de GitHub Pages (`https://<usuario>.github.io/<repo>/`) sin configuración extra.

## Licencia

Proyecto personal. Todos los derechos reservados.
