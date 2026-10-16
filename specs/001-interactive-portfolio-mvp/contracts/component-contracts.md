# UI Component Contracts: Portafolio Personal Interactivo MVP

**Feature**: `001-interactive-portfolio-mvp`  
**Date**: 2026-10-12  
**Status**: Completed  

---

## 1. Arquitectura de Componentes

La interfaz se divide en componentes modulares que consumen la capa de datos tipada. Cada componente cumple con el principio de responsabilidad única (Single Responsibility Principle) y garantiza accesibilidad WCAG 2.1 AA.

```
AppLayout
├── Header (Navbar + ThemeToggle)
├── Main
│   ├── HeroSection (Profile presentation + CV CTA)
│   ├── ProjectsSection (ProjectsGrid -> ProjectCard[])
│   └── ContactSection (SocialBar + EmailCopyButton)
└── Footer (Copyright + Version)
```

---

## 2. Contratos de Componentes

### 2.1. `Header` & `ThemeToggle`

- **Propósito**: Barra de navegación fija/sticky con enlaces de anclaje suave (`#about`, `#projects`, `#contact`) y selector de tema claro/oscuro.
- **Props**:
  ```typescript
  export interface HeaderProps {
    developerName: string;
  }
  ```
- **Comportamiento**:
  - Enlaces de salto con `scroll-smooth` hacia secciones principales.
  - El botón `ThemeToggle` conmuta entre `light` y `dark`.
  - Soporte de teclado: Operable mediante tecla `Enter` y `Espacio`, con indicador visible `focus-visible:ring-2 focus-visible:ring-primary`.
  - Atributos ARIA: `aria-label="Toggle visual theme"`, `role="button"`.

---

### 2.2. `HeroSection`

- **Propósito**: Presentar la identidad, rol, síntesis de valor y llamados a la acción (CTA) prioritarios para evaluadores y reclutadores (US-1).
- **Props**:
  ```typescript
  import { Profile } from './portfolio-schema';

  export interface HeroSectionProps {
    profile: Profile;
  }
  ```
  > Nota: los canales de contacto (correo copiable y redes sociales) NO se
  > renderizan en el Hero para evitar duplicación — residen únicamente en
  > `ContactSection` (#contact), alcanzable con un clic desde el CTA "Contact Me".
- **Elementos Clave**:
  - Título principal (`<h1>`) con el nombre del profesional.
  - Subtítulo destacado con rol y propuesta de valor (`headline`).
  - Badge de disponibilidad laboral (`availableForWork`).
  - Botón primario de CTA: "Download Resume / CV" (apunta a `profile.cvUrl`, descarga directa o apertura en nueva pestaña).
  - Botón secundario de CTA: "Contact Me" (desplazamiento suave a `#contact`).

---

### 2.3. `ProjectsGrid` & `ProjectCard`

- **Propósito**: Exponer la selección curada de 3 a 6 proyectos destacados (US-2).
- **Props de `ProjectsGrid`**:
  ```typescript
  import { Project } from './portfolio-schema';

  export interface ProjectsGridProps {
    projects: Project[];
  }
  ```
- **Props de `ProjectCard`**:
  ```typescript
  import { Project } from './portfolio-schema';

  export interface ProjectCardProps {
    project: Project;
  }
  ```
- **Comportamiento y Reglas de Renderizado**:
  - Renderiza: `title`, `description`, `keyFeatures` (bullet points), y `tags` (badges tecnológicos).
  - Enlaces condicionales:
    - Botón "Live Demo": Solo se renderiza si `project.demoUrl` está definido y no es vacío.
    - Botón "Source Code": Solo se renderiza si `project.repoUrl` está definido y no es vacío.
    - Si alguno falta, el botón restante ocupa el ancho adecuado de forma simétrica sin dejar huecos rotos.
  - Seguridad en enlaces: `target="_blank"` y `rel="noopener noreferrer"`.
  - Accesibilidad: Enlaces externos identificados con `aria-label="View live demo for [project.title]"` y `aria-label="View source code repository for [project.title]"`.

---

### 2.4. `ContactSection` & `EmailCopyButton`

- **Propósito**: Facilitar la conexión profesional inmediata y el copiado rápido de correo electrónico (US-1, US-3).
- **Props**:
  ```typescript
  import { SocialLink } from './portfolio-schema';

  export interface ContactSectionProps {
    socialLinks: SocialLink[];
    emailAddress: string;
  }
  ```
- **Comportamiento del `EmailCopyButton`**:
  - Estado reactivo: `copied: boolean` (se activa en `true` por 2.5 segundos tras pulsar el botón).
  - Acción: Invoca `navigator.clipboard.writeText(emailAddress)`. Si la API falla o no está disponible, ofrece selección manual o invoca `mailto:`.
  - Feedback visual: Ícono cambia temporalmente de `Copy` a `Check` y muestra texto accesible "Email copied to clipboard!".
  - Atributos ARIA:
    - `aria-label="Copy email address to clipboard"`
    - Contenedor de estado con `role="status"` y `aria-live="polite"` para anuncio instantáneo en lectores de pantalla.

---

### 2.5. `Footer`

- **Propósito**: Cierre de página con copyright, créditos técnicos y enlaces secundarios.
- **Props**:
  ```typescript
  export interface FooterProps {
    developerName: string;
    year?: number;
  }
  ```
