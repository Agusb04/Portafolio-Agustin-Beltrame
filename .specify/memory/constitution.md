<!--
Sync Impact Report:
- Version change: 0.1.0-draft (Template) → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. Estética Developer-First y Pulido Visual (UI/UX)
  - [PRINCIPLE_2_NAME] → II. Separación Estricta de Contenido y Presentación (Data-Driven Architecture)
  - [PRINCIPLE_3_NAME] → III. Tipado Estricto y Modularidad de Componentes (TypeScript & Modularity)
  - [PRINCIPLE_4_NAME] → IV. Mobile-First, Rendimiento y Accesibilidad (A11y & Performance)
  - [PRINCIPLE_5_NAME] → V. SEO, Metadatos y Presencia Profesional Transparente
- Added sections:
  - Requisitos Técnicos y Arquitectura (en reemplazo de SECTION_2_NAME)
  - Flujo de Desarrollo y Calidad (en reemplazo de SECTION_3_NAME)
  - Governance detallada con políticas de SemVer y alineación con SDD
- Removed sections:
  - Ninguna (se completaron los placeholders del scaffold base)
- Follow-up TODOs:
  - Ninguno. Todos los placeholders han sido resueltos.
-->

# Portafolio Agustín Beltrame Constitution

## Core Principles

### I. Estética Developer-First y Pulido Visual (UI/UX)
La interfaz DEBE proyectar una estética moderna, elegante, minimalista y pulida ("developer-first").
- Se DEBE contar con soporte para Modo Oscuro (Dark Mode por defecto o alternable de manera persistente y sin parpadeos).
- La tipografía, espaciados y paleta de colores DEBEN ser visualmente coherentes en todas las vistas.
- Las microinteracciones, transiciones de estado y efectos hover/focus DEBEN ser suaves y naturales, aportando interactividad sin perjudicar la fluidez de navegación ni sobrecargar la pantalla.

### II. Separación Estricta de Contenido y Presentación (Data-Driven Architecture)
Todo el contenido editable o extensible DEBE estar completamente desacoplado de los componentes de presentación.
- Los datos de proyectos (título, descripción, key features, tech stack, links de demo y repositorio), enlaces sociales y biografía DEBEN residir en archivos estructurados (JSON, Markdown/MDX o esquemas de datos tipados).
- Los componentes de interfaz DEBEN consumir estos datos de forma declarativa y NUNCA hardcodear información de proyectos o enlaces directamente en plantillas JSX/HTML.
- Rationale: Permite actualizar, añadir o reordenar proyectos y credenciales rápidamente sin modificar la lógica de UI ni introducir regresiones visuales.

### III. Tipado Estricto y Modularidad de Componentes (TypeScript & Modularity)
La arquitectura de software DEBE basarse en componentes modulares, reutilizables y con tipado estricto.
- Se DEBE utilizar TypeScript con modo estricto habilitado (`strict: true`), evitando el uso de tipos `any` no justificados.
- Cada componente de interfaz DEBE responder a una única responsabilidad (Single Responsibility Principle) y declarar interfaces/props explícitas para sus contratos de datos.
- Los estilos DEBEN estructurarse mediante utilidades predecibles (Tailwind CSS) con una organización limpia y mantenible.

### IV. Mobile-First, Rendimiento y Accesibilidad (A11y & Performance)
La experiencia de usuario DEBE ser impecable en cualquier dispositivo y contexto de navegación.
- Todo diseño y maquetación DEBE concebirse bajo el enfoque Mobile-First y garantizar responsividad fluida en pantallas móviles, tablets y escritorios.
- El sitio DEBE cumplir con los estándares de accesibilidad WCAG 2.1 AA (contrastes cromáticos adecuados, marcado HTML semántico, etiquetas aria y soporte completo de navegación por teclado).
- Los tiempos de carga y métricas Core Web Vitals DEBEN optimizarse activamente, priorizando componentes ligeros, optimización de fuentes y compresión de imágenes.

### V. SEO, Metadatos y Presencia Profesional Transparente
El portafolio DEBE estar optimizado para visibilidad en la web y verificación rápida por parte de reclutadores y colegas.
- Cada vista DEBE contar con metadatos descriptivos, soporte de OpenGraph y Twitter Cards para previews enriquecidas en redes sociales.
- Los accesos a redes profesionales (LinkedIn, GitHub, X/Twitter, correo de contacto y descarga de CV) DEBEN ser prominentes, funcionales y utilizar atributos de seguridad (`target="_blank"` con `rel="noopener noreferrer"`).
- Los enlaces a demos en vivo y repositorios de proyectos DEBEN mantenerse verificados y operativos.

## Requisitos Técnicos y Arquitectura

- **Framework y Runtime**: Framework moderno enfocado en alto rendimiento, generación estática (SSG) o renderizado híbrido (Next.js, Astro o React) con TypeScript para garantizar estabilidad de tipos.
- **Sistema de Estilos**: Tailwind CSS como motor de estilos, definiendo tokens coherentes (paleta de colores, tipografías y radios de borde).
- **Gestión de Formularios y Contacto**: El formulario o mecanismo de contacto DEBE incluir validación en cliente/servidor, sanitización básica y mecanismos de prevención de spam (honeypot o rate limiting).
- **Optimización de Assets**: Las imágenes de proyectos, avatares y archivos descargables (ej. CV en PDF) DEBEN servirse en formatos modernos optimizados (WebP, AVIF) para minimizar consumo de ancho de banda.

## Flujo de Desarrollo y Calidad (SDD & Quality Gates)

- **Spec-Driven Development (SDD)**: Antes de codificar cualquier nueva funcionalidad o sección (Hero, Proyectos, Contacto), DEBE definirse la especificación formal y el plan de implementación mediante Spec Kit.
- **Quality Gates y Code Review**: Todo cambio en el código fuente DEBE someterse a chequeo de tipos (`tsc`), validación de linter y alinearse con las directrices de seguridad y calidad del repositorio (`.github/code-review-instructions.md`).
- **Verificación de Enlaces e Integridad**: Se DEBE validar que ningún demo, repositorio o canal social contenga enlaces rotos antes de desplegar a producción.

## Governance

Esta constitución define las directrices y estándares no negociables para el desarrollo y evolución del portafolio personal de Agustín Beltrame. Ninguna implementación de código o configuración de UI debe contradecir los principios aquí expuestos.

- **Enmiendas**: Cualquier modificación a los principios o secciones de esta constitución DEBE quedar registrada en un cambio de versión formal con su correspondiente justificación y actualización del historial de cambios.
- **Política de Versionado**:
  - **MAJOR (X.0.0)**: Modificaciones sustanciales o incompatibles en la arquitectura técnica, cambios de framework o reestructuración de principios fundacionales.
  - **MINOR (1.X.0)**: Incorporación de nuevos principios, secciones o lineamientos arquitectónicos no destructivos.
  - **PATCH (1.0.X)**: Clarificaciones de redacción, corrección de erratas o ajustes menores que no alteran las reglas existentes.
- **Revisión de Cumplimiento**: Todas las tareas de implementación y revisiones de código DEBEN verificar explícitamente el cumplimiento de los principios de diseño, accesibilidad y separación de datos.

**Version**: 1.0.0 | **Ratified**: 2026-10-11 | **Last Amended**: 2026-10-11
