# Data Model: Portafolio Personal Interactivo MVP

**Feature**: `001-interactive-portfolio-mvp`  
**Date**: 2026-10-12  
**Status**: Completed  

---

## 1. Domain Entities & Type Definitions

La arquitectura de datos sigue un enfoque desacoplado y estrictamente tipado en TypeScript. Todas las entidades son consumidas de forma declarativa por los componentes de interfaz.

### 1.1. Perfil Profesional (`Profile`)

Representa la identidad principal del desarrollador y la información que se expone en la sección Hero y metadatos SEO.

| Campo | Tipo | Requerido | Descripción | Reglas de Validación |
|---|---|---|---|---|
| `name` | `string` | Sí | Nombre completo del profesional | No vacío, longitud entre 2 y 100 caracteres |
| `role` | `string` | Sí | Especialidad o título profesional principal | En inglés (ej. "Full-Stack Software Engineer") |
| `headline` | `string` | Sí | Propuesta de valor o lema profesional conciso | En inglés, 1 a 2 oraciones de alto impacto |
| `bio` | `string` | Sí | Breve descripción biográfica | En inglés, entre 50 y 300 caracteres |
| `location` | `string` | Sí | Ubicación geográfica base | Ej. "Buenos Aires, Argentina (Remote available)" |
| `avatarUrl` | `string` | Sí | Ruta al archivo de imagen de perfil | Ruta relativa dentro de `/public` o URL HTTPS válida |
| `cvUrl` | `string` | Sí | Ruta al documento PDF del currículum | Ruta relativa `/cv.pdf` o URL HTTPS válida |
| `availableForWork` | `boolean` | Sí | Indicador de disponibilidad para nuevas oportunidades | Valor booleano para badge de estado activo |

---

### 1.2. Proyecto Destacado (`Project`)

Representa cada trabajo expuesto en la galería curada de proyectos destacados.

| Campo | Tipo | Requerido | Descripción | Reglas de Validación |
|---|---|---|---|---|
| `id` | `string` | Sí | Identificador slug único del proyecto | Minúsculas y guiones (ej. `ecommerce-platform`) |
| `title` | `string` | Sí | Nombre comercial o técnico del proyecto | Longitud entre 3 y 80 caracteres |
| `description` | `string` | Sí | Resumen conciso del problema y solución | En inglés, entre 20 y 200 caracteres |
| `keyFeatures` | `string[]` | Sí | Lista de características o logros técnicos clave | Array no vacío, entre 2 y 4 viñetas descriptivas |
| `tags` | `string[]` | Sí | Lista de tecnologías, lenguajes o herramientas | Array no vacío, 2 a 8 etiquetas técnicas |
| `repoUrl` | `string` | No | URL pública del repositorio de código en GitHub | URL HTTPS válida si está presente |
| `demoUrl` | `string` | No | URL pública de la aplicación o demo en vivo | URL HTTPS válida si está presente |
| `featured` | `boolean` | Sí | Marca de inclusión en la selección de portada | Debe ser `true` para los 3 a 6 proyectos del MVP |
| `order` | `number` | Sí | Orden numérico de visualización | Entero positivo para ordenar el grid |

#### Reglas de Integridad y Casos Borde:
- Al menos uno de `repoUrl` o `demoUrl` debe estar presente por proyecto.
- Si `demoUrl` es `undefined` o `null`, la tarjeta omite el botón de demo sin alterar la grilla de acciones.
- La cantidad total de proyectos destacados en el MVP debe ubicarse entre 3 y 6 elementos (según aclaración Q3).

---

### 1.3. Enlace Social y Contacto Directo (`SocialLink`)

Modela los canales de presencia profesional expuestos en el Hero, la barra de contacto y el Footer.

| Campo | Tipo | Requerido | Descripción | Reglas de Validación |
|---|---|---|---|---|
| `id` | `string` | Sí | Identificador del canal | Ej. `github`, `linkedin`, `twitter`, `email` |
| `platform` | `string` | Sí | Nombre visible de la plataforma | Ej. "GitHub", "LinkedIn", "X (Twitter)", "Email" |
| `url` | `string` | Sí | Enlace directo o dirección | URL HTTPS o dirección `mailto:` |
| `label` | `string` | Sí | Etiqueta accesible para lectores de pantalla | Ej. "Visit Agustín's GitHub profile" |
| `isEmail` | `boolean` | No | Bandera indicadora de canal de correo electrónico | Si es `true`, activa la acción de copiado rápido |
| `icon` | `string` | Sí | Nombre del ícono de Lucide React correspondiente | Debe coincidir con un ícono válido (ej. `Github`, `Linkedin`, `Mail`) |

---

### 1.4. Estado de Preferencia de Tema (`ThemePreference`)

Representa la configuración visual del usuario para alternar entre tema oscuro y claro.

| Valor | Descripción |
|---|---|
| `'system'` | Adopta la preferencia definida en el sistema operativo mediante `prefers-color-scheme` |
| `'dark'` | Forzar modo oscuro (paleta oscura developer-first) |
| `'light'` | Forzar modo claro (paleta clara de alto contraste) |

#### Transición de Estados:
```
           +-----------------------------+
           |           'system'          | (Estado inicial si no hay storage)
           +-----------------------------+
                     /          \
  Selección 'dark'  /            \  Selección 'light'
                   v              v
      +-----------------+    +------------------+
      |      'dark'     |--->|      'light'     |
      | (Guardado en LS)|<---| (Guardado en LS) |
      +-----------------+    +------------------+
```
- **Persistencia**: Clave `portfolio-theme` en `localStorage`.
- **Prevención de FOUC**: Inyección de script síncrono en `<head>` para aplicar la clase `.dark` al elemento `<html>` antes de pintar el DOM.

---

## 2. Contrato de la Fuente de Datos (`PortfolioData`)

El archivo `src/data/portfolioData.ts` exporta un objeto que cumple la siguiente estructura:

```typescript
export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  socialLinks: SocialLink[];
  meta: {
    siteUrl: string;
    siteName: string;
    defaultTitle: string;
    description: string;
    keywords: string[];
    author: string;
  };
}
```
