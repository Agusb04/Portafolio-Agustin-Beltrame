# Quickstart & Validation Guide: Portafolio Personal Interactivo MVP

**Feature**: `001-interactive-portfolio-mvp`  
**Date**: 2026-10-12  
**Status**: Completed  

---

## 1. Requisitos Previos

- **Node.js**: Versión 20+ LTS (entorno verificado: Node `v24.14.0`).
- **Gestor de Paquetes**: `npm` (versión `11.9.0`+).
- **Navegador**: Cualquier navegador moderno con soporte de CSS Grid y Clipboard API (Chrome, Firefox, Safari, Edge).

---

## 2. Instalación y Puesta en Marcha

### 2.1. Instalación de dependencias del proyecto
```bash
npm install
```

### 2.2. Ejecutar servidor de desarrollo local
```bash
npm run dev
```
- Acceder en el navegador a: `http://localhost:3000`

---

## 3. Escenarios de Validación End-to-End

### Escenario 1: Verificación de Carga y Regla de 5 Segundos (US-1 / SC-001)
1. Abrir `http://localhost:3000` en ventana de incógnito.
2. Comprobar que en el primer viewport (above the fold) se visualizan:
   - Nombre de Agustín Beltrame.
   - Rol principal y propuesta de valor en inglés.
   - Botón visible "Download Resume / CV".
   - Indicador de estado de disponibilidad ("Available for work").
3. **Criterio de éxito**: Todos los elementos críticos son identificables de inmediato sin necesidad de hacer scroll.

---

### Escenario 2: Descarga de Currículum (US-1 / SC-002)
1. Hacer clic en el botón "Download Resume / CV".
2. **Criterio de éxito**: El archivo PDF se abre en una nueva pestaña o inicia la descarga directa sin errores 404.

---

### Escenario 3: Showcase de Proyectos y Enlaces Dinámicos (US-2 / SC-003)
1. Desplazarse a la sección `#projects`.
2. Verificar que se desplieguen entre 3 y 6 tarjetas de proyectos destacados.
3. Para un proyecto con demo y repositorio:
   - Hacer clic en "Live Demo": Se abre la URL en una nueva pestaña con `rel="noopener noreferrer"`.
   - Hacer clic en "Source Code": Se abre el repositorio en GitHub en nueva pestaña.
4. Para un proyecto sin demo:
   - Verificar que el botón de demo se omite y la tarjeta mantiene simetría y alineación perfecta con las demás.

---

### Escenario 4: Copiado de Correo con Feedback Visual (US-3 / SC-004)
1. Navegar a la sección `#contact`.
2. Hacer clic en el botón de copiado de email.
3. **Criterio de éxito**:
   - El portapapeles contiene la dirección de correo electrónico correcta.
   - Se despliega la confirmación visual ("Copied!") en menos de 300 ms.
   - El estado regresa a la normalidad tras 2.5 segundos.

---

### Escenario 5: Alternador de Tema Oscuro/Claro y Persistencia (US-3 / SC-006)
1. Hacer clic en el interruptor de tema (`ThemeToggle`).
2. Comprobar que la interfaz cambia inmediatamente entre tema oscuro y claro.
3. Recargar la página (`F5` / `Cmd+R`).
4. **Criterio de éxito**: La preferencia seleccionada se mantiene sin ningún parpadeo visual previo (cero FOUC).

---

### Escenario 6: Accesibilidad por Teclado (US-3 / SC-005)
1. Navegar por toda la página utilizando exclusivamente la tecla `Tab` y `Shift+Tab`.
2. **Criterio de éxito**:
   - Todos los enlaces, botones y toggles reciben foco con indicador visible de anillo (`focus-visible`).
   - Los botones se pueden activar con las teclas `Enter` o `Espacio`.

---

## 4. Comandos de Calidad y Verificación

```bash
# 1. Chequeo estricto de tipos TypeScript
npm run typecheck   # o npx tsc --noEmit

# 2. Análisis estático con Linter
npm run lint

# 3. Compilación y exportación estática para producción (SSG)
npm run build
```
- La carpeta de salida generada (`out/` o `dist/`) debe ser 100% estática y ejecutable en cualquier servidor HTTP o CDN.
