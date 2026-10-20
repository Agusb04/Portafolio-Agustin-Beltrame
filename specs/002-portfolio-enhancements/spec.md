# Feature Specification: Portfolio Enhancements — i18n, Education & Certifications

**Feature Branch**: `002-portfolio-enhancements`

**Created**: 2026-10-19

**Status**: Draft

**Input**: User description: "Vamos a realizarle mejoras al portafolio: Quiero agregar que se pueda elegir idioma entre esp y ingles, una seccion de educacion con la posibilidad de subir certificaciones (una imagen con la certificacion al dar click en ver certificacion)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Cambio de idioma del portafolio (Priority: P1)

Un visitante abre el portafolio y ve todo el contenido en el idioma por defecto (español). Quiere consultar la versión en inglés, hace clic en el selector de idioma ubicado en el header del sitio y todo el contenido visible (textos de perfil, títulos de secciones, descripciones de proyectos, etiquetas de botones y metadatos) cambia a inglés de forma inmediata sin recargar la página. Si el visitante cierra y vuelve a abrir el sitio, su preferencia de idioma persiste.

**Why this priority**: La internacionalización afecta a todas las secciones del sitio y define la arquitectura de datos de contenido. Es la base sobre la que se construyen las demás funcionalidades, ya que todo nuevo contenido (educación, certificaciones) debe soportar ambos idiomas desde el inicio.

**Independent Test**: Se puede verificar cambiando el idioma y comprobando que cada sección visible muestra su contenido traducido correctamente, y que la preferencia persiste al recargar.

**Acceptance Scenarios**:

1. **Given** el portafolio está cargado en español, **When** el visitante hace clic en el selector de idioma y elige "EN", **Then** todo el contenido del sitio se muestra en inglés sin recarga de página.
2. **Given** el visitante seleccionó inglés como idioma, **When** cierra el navegador y vuelve a abrir el sitio, **Then** el portafolio se muestra en inglés (persistencia de preferencia).
3. **Given** el visitante está navegando en inglés, **When** hace clic en el selector y elige "ES", **Then** todo el contenido cambia de vuelta a español inmediatamente.
4. **Given** un visitante nuevo accede al sitio por primera vez, **When** el sitio carga, **Then** se muestra en el idioma por defecto (español).

---

### User Story 2 — Consulta de la sección de Educación (Priority: P2)

Un reclutador o visitante navega por el portafolio y llega a la sección "Educación". Allí ve la formación académica del titular del portafolio: institución, título/carrera, período de estudio y estado actual (en curso, finalizada). La información se muestra de forma clara y visualmente atractiva, siguiendo la estética del resto del sitio.

**Why this priority**: La sección de educación es un bloque de contenido nuevo fundamental que complementa la información profesional del portafolio y es frecuentemente consultada por reclutadores.

**Independent Test**: Se puede verificar navegando a la sección de Educación y confirmando que muestra correctamente la información académica con los campos esperados.

**Acceptance Scenarios**:

1. **Given** el visitante está en la página principal, **When** navega/hace scroll hasta la sección "Educación", **Then** ve al menos una entrada educativa con institución, carrera, período y estado.
2. **Given** la sección de educación está visible, **When** el visitante cambia el idioma del sitio, **Then** los contenidos de la sección se muestran en el idioma seleccionado.
3. **Given** el visitante accede desde un dispositivo móvil, **When** visualiza la sección de Educación, **Then** la información se muestra correctamente adaptada al tamaño de pantalla.

---

### User Story 3 — Visualización de certificaciones (Priority: P3)

Un visitante quiere ver las certificaciones del titular del portafolio. Dentro de la sección de Educación, cada certificación cuenta con un botón o enlace "Ver Certificación". Al hacer clic, se abre un visor (modal/overlay) que muestra la imagen de la certificación en tamaño grande y legible. El visitante puede cerrar el visor para volver a la sección de Educación.

**Why this priority**: Las certificaciones añaden credibilidad verificable al perfil educativo, pero dependen de que la sección de Educación y el sistema i18n estén implementados primero.

**Independent Test**: Se puede verificar haciendo clic en "Ver Certificación" en cualquier entrada que tenga una y comprobando que la imagen se muestra en un visor ampliado y que se puede cerrar.

**Acceptance Scenarios**:

1. **Given** la sección de Educación muestra una entrada con certificación disponible, **When** el visitante hace clic en "Ver Certificación", **Then** se abre un visor modal que muestra la imagen de la certificación a tamaño ampliado.
2. **Given** el visor de certificación está abierto, **When** el visitante hace clic fuera del visor, presiona Escape o hace clic en el botón de cerrar, **Then** el visor se cierra y el visitante vuelve a la sección de Educación.
3. **Given** una entrada educativa no tiene certificación asociada, **When** la sección se muestra, **Then** no aparece ningún botón "Ver Certificación" para esa entrada.
4. **Given** el visor de certificación está abierto en un dispositivo móvil, **When** el visitante lo visualiza, **Then** la imagen se adapta al tamaño de la pantalla permitiendo zoom o scroll si es necesario.
5. **Given** el visor está abierto, **When** el visitante navega con teclado, **Then** el foco queda atrapado dentro del modal y puede cerrar con la tecla Escape (accesibilidad).

---

### Edge Cases

- ¿Qué ocurre si un contenido no tiene traducción disponible en uno de los dos idiomas? → Se muestra en el idioma por defecto (español) con un indicador visual sutil.
- ¿Qué ocurre si la imagen de una certificación no carga o está corrupta? → Se muestra un mensaje de fallback indicando que la certificación no pudo cargarse, con texto alternativo descriptivo.
- ¿Qué ocurre si el visitante intenta abrir el visor de certificación mientras otra modal está abierta? → Solo puede haber un visor abierto a la vez; el anterior se cierra.
- ¿Qué ocurre si el visitante cambia de idioma mientras el visor de certificación está abierto? → El título/descripción del visor se actualiza al nuevo idioma; la imagen permanece igual.

## Requirements *(mandatory)*

### Functional Requirements

**Internacionalización (i18n)**

- **FR-001**: El sistema DEBE ofrecer un selector de idioma visible y accesible en el encabezado del sitio con las opciones "Español" y "English".
- **FR-002**: El sistema DEBE cambiar todo el contenido visible del sitio al idioma seleccionado sin recargar la página.
- **FR-003**: El sistema DEBE persistir la preferencia de idioma del visitante entre sesiones (almacenamiento local del navegador).
- **FR-004**: El sistema DEBE cargar el sitio en español como idioma por defecto para visitantes nuevos.
- **FR-005**: Todo el contenido textual del portafolio (perfil, proyectos, secciones, botones, metadatos) DEBE estar disponible en ambos idiomas.

**Sección de Educación**

- **FR-006**: El sistema DEBE mostrar una sección de "Educación" en la página principal del portafolio.
- **FR-007**: Cada entrada educativa DEBE mostrar: nombre de la institución, título o carrera, período de estudio (fecha de inicio y fin o "en curso"), y estado (en curso / completada).
- **FR-008**: La sección de Educación DEBE respetar la arquitectura data-driven del portafolio: los datos educativos DEBEN residir en archivos de datos estructurados, separados de la presentación.
- **FR-009**: La sección DEBE ser responsive y adaptarse correctamente a dispositivos móviles, tablets y escritorio.

**Certificaciones**

- **FR-010**: El sistema DEBE permitir asociar cero o más certificaciones a cada entrada educativa o como entradas independientes dentro de la sección de Educación.
- **FR-011**: Cada certificación DEBE mostrar: nombre de la certificación, institución emisora y un botón/enlace "Ver Certificación" (si tiene imagen asociada).
- **FR-012**: Al hacer clic en "Ver Certificación", el sistema DEBE abrir un visor modal/overlay que muestre la imagen de la certificación a tamaño ampliado y legible.
- **FR-013**: El visor de certificación DEBE poder cerrarse mediante: clic en botón de cerrar, clic fuera del modal, o tecla Escape.
- **FR-014**: El visor de certificación DEBE ser accesible: trampa de foco dentro del modal, atributos aria descriptivos y soporte completo de navegación por teclado.
- **FR-015**: Las imágenes de certificaciones DEBEN servirse en formatos optimizados para minimizar tiempos de carga.

### Key Entities

- **Education Entry (Entrada Educativa)**: Representa una formación académica con institución, carrera/título, período, estado y lista opcional de certificaciones asociadas. Puede tener traducciones en ambos idiomas.
- **Certification (Certificación)**: Representa un certificado obtenido, con nombre, emisor, fecha de obtención opcional e imagen del certificado. Asociada opcionalmente a una entrada educativa.
- **Language Preference (Preferencia de Idioma)**: Almacena la selección de idioma del visitante (español o inglés) con persistencia entre sesiones.
- **Localized Content (Contenido Localizado)**: Estructura que contiene las versiones en español e inglés de cada pieza de contenido textual del portafolio.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% del contenido textual visible del portafolio está disponible en español e inglés, y el cambio de idioma se refleja en menos de 1 segundo sin recarga de página.
- **SC-002**: La preferencia de idioma del visitante persiste entre sesiones el 100% de las veces.
- **SC-003**: La sección de Educación se visualiza correctamente en los 3 breakpoints principales (móvil, tablet, escritorio) sin elementos cortados ni desbordados.
- **SC-004**: El visor de certificación se abre en menos de 2 segundos tras hacer clic en "Ver Certificación", incluyendo la carga de la imagen.
- **SC-005**: El visor de certificación pasa todas las verificaciones de accesibilidad: navegación por teclado, trampa de foco y cierre con Escape.
- **SC-006**: Al menos 1 entrada educativa y 1 certificación están cargadas y visibles en el portafolio al completar la implementación.

## Assumptions

- El portafolio es un sitio estático de página única; no se requiere enrutamiento basado en idioma (e.g., `/en/`, `/es/`) sino un cambio de idioma client-side.
- El idioma por defecto es español, dado que el titular es hispanohablante y su audiencia principal inicial es local.
- Las imágenes de certificaciones serán añadidas manualmente por el titular del portafolio al directorio público del proyecto (no se requiere un sistema de carga/upload dinámico en producción).
- Los datos de educación y certificaciones seguirán el patrón existente de la arquitectura data-driven: archivos de datos tipados consumidos por componentes de presentación.
- Solo se soportan dos idiomas (español e inglés); no se contempla la adición de idiomas adicionales en este alcance.
- La sección de Educación se ubicará en la página principal, entre las secciones de Proyectos y Contacto (posición por determinar en la fase de planificación).
