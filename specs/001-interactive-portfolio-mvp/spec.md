# Feature Specification: Portafolio Personal Interactivo MVP

**Feature Branch**: `001-interactive-portfolio-mvp`

**Created**: 2026-10-12

**Status**: Draft

**Input**: User description: "Módulo: Portafolio Personal Interactivo MVP - Diseñar y especificar la funcionalidad del portafolio personal interactivo, enfocado en mostrar el perfil profesional del desarrollador, sus proyectos destacados y enlaces directos de contacto."

## Clarifications

### Session 2026-10-12

- Q: ¿El mecanismo de contacto para este MVP consistirá exclusivamente en enlaces directos y copiado rápido de correo, o debe incluirse además un formulario interactivo de envío de mensajes? → A: Opción A: Exclusivamente enlaces directos a redes y botón de copiado de email al portapapeles con confirmación visual (100% estático, sin formulario de contacto para el MVP).
- Q: ¿El contenido del portafolio se estructurará en un único idioma predeterminado, o se requiere soporte bilingüe con selector de idioma (i18n) en esta fase MVP? → A: Opción B: Idioma único en Inglés (English) para todo el contenido de la interfaz, perfil, proyectos y enlaces, optimizado para reclutadores y el mercado tecnológico global.
- Q: ¿La sección de proyectos destacados presentará una lista fija y curada de trabajos clave, o debe incorporar un mecanismo de filtrado interactivo por tecnologías o categorías? → A: Opción A: Lista fija y curada de proyectos destacados (entre 3 y 6 proyectos clave de alto impacto sin controles de filtrado reactivo en el MVP) para maximizar la claridad visual y la velocidad de evaluación.


## User Scenarios & Testing *(mandatory)*

### User Story 1 - Evaluación Rápida del Perfil por Reclutadores / Hiring Managers (Priority: P1)

Un reclutador técnico o hiring manager aterriza en el portafolio buscando determinar en menos de 5 segundos la identidad, especialidad técnica y propuesta de valor de Agustín Beltrame. Necesita descargar de inmediato su Currículum Vitae (CV) actualizado en PDF o iniciar contacto directo, así como visualizar los proyectos de mayor impacto para evaluar su encaje en una oportunidad laboral.

**Why this priority**: Constituye el objetivo de negocio y conversión primordial del portafolio: captar oportunidades profesionales y permitir a evaluadores de talento validar el perfil sin fricción ni rodeos de navegación.

**Independent Test**: Un usuario puede ingresar a la página principal, identificar en el primer pantallazo el nombre, especialidad y propuesta de valor, presionar el botón de descarga para obtener el CV en PDF e iniciar comunicación mediante los accesos de contacto directo.

**Acceptance Scenarios**:

1. **Given** que un reclutador ingresa a la dirección web del portafolio, **When** visualiza el Hero inicial en su primer pantallazo (above the fold), **Then** distingue con claridad el nombre del desarrollador, su rol principal, una síntesis de su propuesta de valor y su fotografía/avatar profesional.
2. **Given** que el reclutador necesita revisar el currículum, **When** hace clic en el botón de llamado a la acción (CTA) "Descargar CV", **Then** el navegador descarga o abre en una nueva pestaña el documento de CV en formato PDF optimizado.
3. **Given** que el reclutador desea iniciar contacto inmediato, **When** interactúa con el botón o enlace de correo electrónico, **Then** tiene la opción de abrir su cliente de correo predeterminado o copiar la dirección con confirmación visual instantánea.

---

### User Story 2 - Exploración Técnica y Validación de Proyectos por Colegas y Visitantes (Priority: P2)

Un colega desarrollador, líder técnico o visitante especializado recorre el portafolio para auditar la solvencia técnica y calidad de ingeniería de los trabajos de Agustín. Explora la sección de proyectos destacados, analiza sus descripciones de problemas/soluciones, sus características clave (key features) y las tecnologías empleadas, accediendo al código fuente en GitHub o a la demo interactiva en vivo.

**Why this priority**: Provee la evidencia tangible de las habilidades técnicas y de ingeniería del desarrollador, permitiendo validar la experiencia práctica mediante código verificable y productos en producción.

**Independent Test**: Un visitante puede explorar las tarjetas individuales de proyectos destacados, leer sus key features y tags tecnológicos, e interactuar con los enlaces a demos y repositorios abriéndose en pestañas independientes seguras.

**Acceptance Scenarios**:

1. **Given** que el visitante navega a la sección de proyectos destacados, **When** examina cualquier tarjeta de proyecto, **Then** visualiza título, descripción concisa del problema/solución, lista de características clave (key features) y etiquetas con las tecnologías empleadas.
2. **Given** que un proyecto cuenta con demo en vivo y repositorio de código, **When** el usuario hace clic en "Demo en vivo" o en "Repositorio de Código", **Then** cada enlace se abre en una nueva pestaña independiente con atributos de navegación segura (`rel="noopener noreferrer"`).
3. **Given** que un proyecto no dispone de demo pública (por ejemplo, una API backend o herramienta CLI), **When** se renderiza la tarjeta del proyecto, **Then** el botón o enlace de "Demo en vivo" se omite elegantemente sin dejar espacios vacíos, botones rotos/deshabilitados confusos ni alterar la alineación con las demás tarjetas.

---

### User Story 3 - Navegación Accesible, Presencia Social y Personalización de Tema Visual (Priority: P3)

Cualquier visitante que interactúa con el sitio puede alternar entre tema oscuro (Dark mode) y tema claro (Light mode) según su preferencia visual o la de su sistema operativo, desplazarse fluidamente entre secciones mediante la barra de navegación y acceder a la presencia profesional (LinkedIn, GitHub, X/Twitter y correo electrónico).

**Why this priority**: Garantiza una experiencia de usuario ergonómica, respetuosa de los estándares de accesibilidad universal (A11y) y personalizable, facilitando el networking profesional a través de múltiples canales.

**Independent Test**: Un usuario puede alternar el selector de tema y verificar que la interfaz cambie de paleta al instante y persista en recargas; puede además navegar con teclado (Tab) por todas las secciones y enlaces sociales, confirmando que el foco sea visible y la interacción sea completa.

**Acceptance Scenarios**:

1. **Given** que el usuario prefiere navegar en modo oscuro o claro, **When** activa el interruptor de tema (Dark/Light mode toggle), **Then** la interfaz adopta el esquema de colores correspondiente de inmediato y guarda la selección de manera persistente para futuras visitas.
2. **Given** que el usuario utiliza exclusivamente el teclado o tecnologías de asistencia (lector de pantalla), **When** se desplaza por el menú de navegación y los elementos interactivos, **Then** todos los controles reciben foco visible en un orden secuencial lógico y cuentan con nombres accesibles descriptivos acorde a WCAG 2.1 AA.
3. **Given** que el visitante desea copiar el correo de contacto sin abrir un cliente de correo externo, **When** pulsa la acción de copiar email, **Then** la dirección se copia al portapapeles del sistema y se muestra un feedback visual transitorio (ej. tooltip o badge "¡Copiado!") que desaparece tras 2-3 segundos.

---

### Edge Cases

- **Ausencia de enlace a demo o repositorio**: Si un proyecto no posee enlace a demo en vivo o repositorio de código, la tarjeta adapta su grilla de acciones omitiendo el botón faltante de manera simétrica, sin romper la altura ni el layout del grid de proyectos.
- **Entorno sin permisos de portapapeles**: Si el navegador del usuario bloquea el acceso a la API del portapapeles al intentar copiar el correo, la interfaz debe ofrecer un mecanismo de respaldo (fallback) que permita seleccionar el texto manualmente o activar el enlace directo `mailto:`.
- **Preferencia del sistema operativo vs. preferencia guardada**: Si el usuario nunca ha seleccionado manualmente un tema, el sitio detecta y aplica automáticamente la preferencia del sistema operativo (`prefers-color-scheme`). Si el usuario seleccionó un tema manual en el sitio, esta preferencia tiene precedencia estricta sobre la configuración del sistema.
- **Carga en conexiones de baja velocidad**: Los textos críticos del perfil (nombre, rol, propuesta de valor, enlaces de contacto) deben ser legibles inmediatamente antes de que carguen imágenes pesadas o recursos secundarios.
- **Nombres y textos de proyectos extensos**: Los contenedores de texto, títulos y etiquetas de tecnologías deben admitir saltos de línea suaves (wrapping) sin truncar contenido crítico ni romper el diseño en pantallas móviles estrechas (320px de ancho).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hero & Identidad Profesional - El sistema DEBE presentar en el área superior inicial (above the fold) el nombre completo del desarrollador, su rol o especialidad técnica principal, una síntesis de su propuesta de valor profesional y su fotografía o avatar.
- **FR-002**: Llamada a la Acción Principal (CTA) - El Hero DEBE incluir botones de acción prominentes para descargar el currículum vitae (CV) en formato descargable y para desplazarse directamente hacia la sección de contacto o iniciar comunicación.
- **FR-003**: Showcase de Proyectos Curados - El sistema DEBE exponer una galería de proyectos destacados fija y curada (de 3 a 6 proyectos clave de alto impacto) organizados en tarjetas individuales modulares, sin requerir filtros reactivos ni paginación en esta fase MVP.
- **FR-004**: Metadatos del Proyecto - Cada tarjeta de proyecto DEBE incluir: título del proyecto, descripción concisa del problema y solución, listado de características clave (key features) y etiquetas identificadoras de las tecnologías empleadas.
- **FR-005**: Enlaces Dinámicos de Proyectos - Cada tarjeta de proyecto DEBE soportar enlaces independientes para "Demo en vivo" y "Repositorio de Código", adaptándose dinámicamente según la disponibilidad de cada recurso.
- **FR-006**: Manejo de Ausencia de Recursos en Proyectos - Si un proyecto no dispone de enlace a demo o a repositorio, la interfaz DEBE omitir el botón ausente manteniendo la armonía, simetría y alineación de la tarjeta con el resto de la cuadrícula.
- **FR-007**: Presencia Profesional y Canales de Contacto Directo - El sistema DEBE proveer accesos directos y visibles a los canales profesionales principales (LinkedIn, GitHub, X/Twitter y correo electrónico) mediante enlaces estáticos directos sin requerir formularios de envío intermedios en esta fase MVP.
- **FR-008**: Copiado de Correo con Confirmación Visual - El sistema DEBE permitir copiar la dirección de correo electrónico profesional al portapapeles del dispositivo mediante un solo clic o pulsación, ofreciendo retroalimentación visual clara y temporal (confirmación de éxito).
- **FR-009**: Seguridad en Enlaces Externos - Todos los hipervínculos que apunten a dominios externos (redes sociales, demos, repositorios) DEBEN abrirse en una pestaña nueva con protección de seguridad y privacidad (`target="_blank"` y `rel="noopener noreferrer"`).
- **FR-010**: Selector y Persistencia de Tema Visual - El sistema DEBE incluir un selector interactivo para alternar entre Modo Claro (Light) y Modo Oscuro (Dark). La selección DEBE persistir localmente en el navegador del usuario y respetar inicialmente la preferencia del sistema operativo si no existe selección previa.
- **FR-011**: Navegación Fluida - El sistema DEBE contar con una barra o menú de navegación con desplazamiento suave (smooth scroll) que conduzca a las secciones principales (Inicio/Hero, Proyectos, Contacto).
- **FR-012**: Responsividad Integral (Mobile-First) - La interfaz DEBE ser completamente responsiva, adaptándose con fluidez a dispositivos móviles (a partir de 320px de ancho), tablets y pantallas de escritorio de alta resolución.
- **FR-013**: Accesibilidad Universal y Teclado - Todos los elementos interactivos (botones, enlaces, selectores) DEBEN ser operables mediante teclado, poseer indicadores de foco visibles y contar con textos descriptivos para lectores de pantalla acorde a WCAG 2.1 AA.
- **FR-014**: Desacoplamiento de Datos (Data-Driven Architecture) - La información del perfil profesional, lista de proyectos y enlaces sociales DEBE provenir de fuentes de datos estructuradas, desacopladas de los componentes visuales de presentación.
- **FR-015**: Idioma y Redacción en Inglés - Todo el contenido visible del sitio (textos de interfaz, llamados a la acción, descripciones de perfil y proyectos, etiquetas y metadatos) DEBE estar redactado íntegramente en idioma Inglés (English) para el MVP, maximizando el alcance hacia reclutadores y empresas a nivel global.

### Key Entities

- **Perfil Profesional**: Entidad que agrupa los datos de identidad y biografía del desarrollador (nombre completo, rol o título profesional, propuesta de valor resumida, ubicación o base, URL/ruta de avatar o fotografía, URL del CV descargable y canales de contacto prioritarios).
- **Proyecto Destacado**: Entidad que describe un trabajo realizado (identificador único, título, descripción breve de la solución, lista de características clave o key features, lista de tecnologías/herramientas empleadas, URL opcional de demo en vivo, URL opcional de repositorio de código, orden de visualización o prioridad de destaque).
- **Canal de Presencia Profesional / Red Social**: Entidad que modela un punto de contacto o presencia digital (nombre de la plataforma, identificador/etiqueta pública, URL de destino, tipo de acción como enlace externo o copiado al portapapeles, identificador de ícono asociado).
- **Preferencia de Tema (Visual Preference)**: Entidad que almacena el estado visual elegido por el usuario (modo claro, modo oscuro o automático según sistema), persistido en el cliente.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Evaluación de perfil en menos de 5 segundos - Al menos el 90% de los reclutadores y evaluadores técnicos en pruebas de usabilidad pueden identificar el nombre, rol y propuesta de valor del profesional dentro de los primeros 5 segundos de interacción.
- **SC-002**: Acceso directo al CV en 1 clic - El botón de descarga de CV es visible en el primer viewport y permite completar la descarga o apertura del documento con una única acción de clic para el 100% de los visitantes.
- **SC-003**: Integridad y seguridad de enlaces de proyectos - El 100% de los proyectos destacados con enlaces a repositorio y demo permiten navegar al recurso externo en una pestaña segura independiente; en proyectos sin demo, el 100% de las tarjetas mantienen el alineamiento estético sin botones rotos o huecos visuales.
- **SC-004**: Confirmación inmediata de copiado de contacto - La acción de copiado de correo al portapapeles despliega la confirmación visual de éxito en menos de 300 ms en el 98% de los navegadores compatibles.
- **SC-005**: Conformidad de Accesibilidad WCAG 2.1 AA - El 100% de los controles interactivos y secciones son navegables exclusivamente mediante teclado con indicador de foco visible y contraste cromático conforme a WCAG 2.1 AA.
- **SC-006**: Persistencia de tema visual sin parpadeos - Al alternar entre modo oscuro y claro, el cambio se aplica de inmediato y en el 100% de las recargas posteriores la preferencia seleccionada se preserva sin parpadeo de color previo (flash of unstyled/wrong theme).
- **SC-007**: Velocidad de despliegue de contenido crítico - En conexiones móviles típicas (4G/3G rápida), los textos esenciales del perfil profesional y el Hero son legibles en menos de 1.5 segundos.

## Assumptions

- El currículum vitae estará disponible como un archivo PDF estático descargable y accesible desde el repositorio/sitio.
- La información de proyectos destacados, biografía y canales sociales será provista por el desarrollador en archivos de datos estructurados (JSON o esquemas tipados).
- La arquitectura inicial corresponde a una aplicación web estática o renderizada en el cliente sin backend dinámico ni base de datos remota para visitantes.
- El soporte de navegadores contempla las versiones estándar de Chrome, Firefox, Safari, Edge y navegadores móviles basados en WebKit y Chromium.
- El idioma base y único del portafolio para esta versión MVP es el Inglés (English); el soporte multilingüe (i18n con selector dinámico de idioma) queda diferido para iteraciones futuras.
- **Fuera de Alcance (Out of Scope)**:
  - Sistema de filtrado interactivo o buscador en vivo para los proyectos (se prioriza una selección curada fija para el MVP).
  - Formulario interactivo de envío de mensajes con backend/servicio de correo externo (se resuelve mediante enlaces directos y copiado al portapapeles en el MVP).
  - Panel de administración (CMS) para gestión interactiva de proyectos desde el navegador.
  - Sección de Blog o artículos técnicos para esta fase MVP.
  - Servidor o sistema de comentarios de visitantes.
  - Pasarelas de pago o cotizadores de servicios.
