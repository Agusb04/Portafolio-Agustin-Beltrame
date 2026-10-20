# Portafolio-Agustin-Beltrame

Portafolio personal interactivo de Agustín Beltrame — Computer Engineering Student (UBA/FIUBA) / Software Developer. Desarrollado con Spec-Driven Development (Spec Kit) para practicar manejo de Agentic IA y mostrar habilidades de ingeniería de software.

**Especificaciones de referencia**:

- [`specs/001-interactive-portfolio-mvp/`](specs/001-interactive-portfolio-mvp/) — MVP interactivo
- [`specs/002-portfolio-enhancements/`](specs/002-portfolio-enhancements/) — i18n, educación y certificaciones

## Funcionalidades

- **Bilingüe (Español / English)**: selector en el header, cambio instantáneo sin recarga y preferencia persistida en `localStorage` (español por defecto).
- **Dark mode persistente** sin FOUC.
- **Diseño responsive** mobile-first con estética developer-first.
- **Secciones data-driven**: perfil, proyectos destacados, educación y contacto.
- **Certificaciones**: visor modal accesible con la imagen del certificado (foco atrapado, cierre con Escape, clic fuera o botón).
- **Salida 100% estática** desplegable en GitHub Pages o cualquier CDN.

## Stack Tecnológico

- **[Next.js 16](https://nextjs.org/)** (App Router) con generación de sitio estático (`output: 'export'` — sin backend en runtime)
- **React 19** + **TypeScript** en modo estricto (`strict: true`)
- **Tailwind CSS v4** (tokens de tema claro/oscuro vía variables CSS)
- **[next-themes](https://github.com/pacocoursey/next-themes)** — dark mode persistente sin FOUC
- **[lucide-react](https://lucide.dev/)** + SVGs de marca propios — iconografía
- **Vitest** + **React Testing Library** — pruebas de componentes
- **i18n propio** con React Context — sin librerías externas, solo dos idiomas

## Internacionalización

El sitio soporta **español (por defecto)** e **inglés** con cambio client-side:

- `LanguageProvider` ([`src/providers/LanguageProvider.tsx`](src/providers/LanguageProvider.tsx)) expone el locale actual y lo persiste con la clave `portfolio-language`.
- `useLanguage()` y `useTranslation()` ([`src/hooks/`](src/hooks/)) dan acceso al locale y a los textos de UI.
- Los textos de interfaz viven en [`src/data/translations.ts`](src/data/translations.ts).
- El contenido del portafolio usa el wrapper `Localized<T>` (`{ es: T, en: T }`).
- El atributo `<html lang>` se actualiza automáticamente según el idioma activo.

## Arquitectura

Arquitectura **data-driven**: todo el contenido editable está desacoplado de la presentación (Constitución II del proyecto).

- **Fuente única de verdad**: [`src/data/portfolioData.ts`](src/data/portfolioData.ts) — perfil, proyectos, educación, certificaciones, canales de contacto y metadatos SEO (todo localizado ES/EN).
- **Contratos tipados**: [`src/types/portfolio.ts`](src/types/portfolio.ts) — `Locale`, `Localized<T>`, `Profile`, `Project`, `SocialLink`, `EducationEntry`, `Certification`, `SiteMeta`, `UITranslations` y `PortfolioData`.
- **Componentes de presentación**: [`src/components/`](src/components/) — consumen los datos de forma declarativa; sin contenido hardcodeado en JSX.
- **Salida 100% estática**: `npm run build` genera HTML/CSS/JS en `out/`, desplegable en cualquier CDN o GitHub Pages.

## Estructura del Proyecto

```text
src/
├── app/                      # App Router: layout (SEO/OG, providers, Header), page, globals.css
├── components/               # Header, LanguageToggle, ThemeToggle, HeroSection,
│                             # ProjectsGrid, ProjectCard, EducationSection,
│                             # EducationCard, CertificateModal, ContactSection,
│                             # EmailCopyButton, Footer, social-icons
├── data/
│   ├── portfolioData.ts      # ← Editá acá el contenido del portafolio
│   └── translations.ts       # ← Textos de interfaz en ES/EN
├── hooks/
│   ├── useLanguage.ts        # Acceso al locale y setter
│   ├── useTranslation.ts     # Textos de UI según el locale
│   └── useMounted.ts         # Render client-only (evita mismatches de hidratación)
├── lib/
│   ├── assets.ts             # Prefijo basePath para assets de public/
│   └── contact.ts            # Helper de resolución de email
├── providers/
│   ├── LanguageProvider.tsx  # Contexto i18n + persistencia
│   └── ThemeProvider.tsx     # Wrapper de next-themes
└── types/
    └── portfolio.ts          # Contratos TypeScript

public/
├── avatar.webp
├── cv.pdf
├── og-image.png
└── certifications/           # Imágenes de certificaciones (+ PDF original opcional)
tests/                        # Vitest + RTL (30 tests)
specs/                        # Especificaciones SDD de las features 001 y 002
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

Todo el contenido visible del sitio se edita en **dos archivos**:

- [`src/data/portfolioData.ts`](src/data/portfolioData.ts) — contenido del portafolio
- [`src/data/translations.ts`](src/data/translations.ts) — textos de la interfaz

> Los campos localizados usan la forma `{ es: "...", en: "..." }`. Completá **ambos idiomas**; `npm run typecheck` valida que no falte ninguno.

1. **Perfil**: nombre, `role`, `headline`, `bio`, ubicación, `languages`, `coreTechnologies`, `availableForWork` y metadatos SEO.
2. **Proyectos**: entre 3 y 6 con `featured: true`; cada uno con `keyFeatures` (2-4), `tags` (2-8) y al menos un `repoUrl` o `demoUrl`. Ordenalos con `order`.
3. **Educación**: agregá entradas en `education[]` con `institution`, `degree`, `startDate`, `endDate` (`null` si está en curso), `status` (`"in-progress"` | `"completed"`) y `order`.
4. **Certificaciones**: dentro de una entrada educativa, agregá objetos en `certifications[]` con `name`, `issuer`, `date` e `imageUrl`. Si `imageUrl` es `null`, no se muestra el botón "Ver Certificación".
5. **Redes**: agregá o quitá entradas en `socialLinks` (el ícono se resuelve por `icon` en [`src/components/social-icons.tsx`](src/components/social-icons.tsx)).
6. **Textos de UI**: títulos de secciones, botones, estados y labels en [`src/data/translations.ts`](src/data/translations.ts).

Las imágenes de certificaciones se guardan en `public/certifications/` y conviene usar **WebP** para optimizar la carga. El visor muestra la imagen en un modal ampliado.

## Accesibilidad

- El visor de certificaciones usa `role="dialog"`, `aria-modal` y `aria-labelledby`, con trampa de foco y restauración del foco al cerrar.
- Se puede cerrar con el botón de cierre, con Escape o haciendo clic fuera del modal.
- El cambio de idioma actualiza `<html lang>` para lectores de pantalla y SEO.

## Quality Gates

Antes de cada PR, ejecutá localmente:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

La CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) ejecuta type check, lint y build; además existe un workflow de despliegue ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

## Despliegue (GitHub Pages)

La build es 100% estática (`out/`). Para publicar en GitHub Pages:

1. En el repo: **Settings → Pages → Source: GitHub Actions**.
2. El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compila y publica `out/`.

El build usa `NEXT_PUBLIC_BASE_PATH` para servir el sitio bajo el prefijo del repositorio (`https://<usuario>.github.io/Portafolio-Agustin-Beltrame/`). Ese valor se pasa tanto a `basePath` de Next.js como al helper `asset()` que resuelve las imágenes y el CV de `public/`.

## Licencia

Proyecto personal. Todos los derechos reservados.
