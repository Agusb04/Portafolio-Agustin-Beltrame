# Quickstart Validation Guide: Portfolio Enhancements

**Feature**: `002-portfolio-enhancements`
**Date**: 2026-10-19
**Spec**: [spec.md](./spec.md) | **Data Model**: [data-model.md](./data-model.md)

## Prerequisites

- Node.js 18+ installed
- Project dependencies installed (`npm install`)
- Dev server running (`npm run dev`)

---

## Validation Scenario 1: Language Switching (FR-001 → FR-005, SC-001, SC-002)

### Steps

1. Open `http://localhost:3000` in a browser
2. Verify the page loads in **Spanish** by default (FR-004)
3. Locate the language toggle in the header (next to theme toggle)
4. Click the toggle to switch to **English**
5. Verify the following content changes without page reload (FR-002):

| Section | Spanish | English |
|---------|---------|---------|
| Nav links | Sobre mí, Proyectos, Educación, Contacto | About, Projects, Education, Contact |
| Hero badge | Disponible para trabajar | Available for work |
| Hero bio | (Spanish bio) | (English bio) |
| Hero buttons | Descargar CV, Contáctame | Download Resume / CV, Contact Me |
| Projects title | Proyectos Destacados | Featured Projects |
| Education title | Educación | Education |
| Contact title | Ponete en Contacto | Get in Touch |
| Footer | Todos los derechos reservados | All rights reserved |

6. Verify `<html lang="...">` attribute changes to `"en"`
7. Close the browser tab and reopen `http://localhost:3000`
8. Verify the page loads in **English** (preference persisted, FR-003, SC-002)
9. Switch back to Spanish and verify all content reverts

### Expected Result
- ✅ All visible text changes instantly (<1 second, SC-001)
- ✅ Preference persists across sessions (SC-002)
- ✅ No page reload occurs during switch

---

## Validation Scenario 2: Education Section Display (FR-006 → FR-009, SC-003, SC-006)

### Steps

1. Open `http://localhost:3000` and scroll to the Education section
2. Verify at least one education entry is visible (SC-006)
3. For each entry, verify the following fields are displayed:
   - Institution name
   - Degree/program name
   - Period (start date — end date or "En curso" / "In progress")
   - Status indicator
4. Switch language and verify education content translates
5. Test responsive layout:
   - Desktop (>1024px): verify layout is clean and readable
   - Tablet (~768px): resize and verify no overflow
   - Mobile (~375px): resize and verify content adapts (SC-003)

### Expected Result
- ✅ Education section visible with all required fields (FR-007)
- ✅ Content adapts to all breakpoints (FR-009, SC-003)
- ✅ Language switch applies to education section (User Story 2, scenario 2)

---

## Validation Scenario 3: Certification Viewer Modal (FR-010 → FR-015, SC-004, SC-005)

### Steps

1. Scroll to the Education section
2. Locate an entry with a "View Certification" button
3. Verify entries without certifications do NOT show the button (FR-010, acceptance scenario 3)
4. Click "View Certification":
   - Verify modal opens with the certificate image (FR-012)
   - Verify image is large and legible (SC-004: loads within 2 seconds)
5. Test close mechanisms:
   - Click the close button → modal closes (FR-013)
   - Reopen → click outside the modal → modal closes (FR-013)
   - Reopen → press Escape key → modal closes (FR-013)
6. Test accessibility:
   - Open modal → Tab through elements → focus stays trapped inside modal (FR-014, SC-005)
   - Verify `role="dialog"`, `aria-modal="true"`, `aria-labelledby` attributes
   - Verify close with Escape key works (SC-005)
7. Test responsive on mobile:
   - Open modal on mobile viewport → image adapts to screen size (acceptance scenario 4)

### Expected Result
- ✅ Modal opens and displays certificate image (FR-012)
- ✅ All three close methods work (FR-013)
- ✅ Full keyboard accessibility (FR-014, SC-005)
- ✅ Responsive image display on all viewports

---

## Validation Scenario 4: Edge Cases

### 4a: Missing certification image
1. In data file, set a certification's `imageUrl` to `null`
2. Verify no "View Certification" button appears for that entry

### 4b: Language switch with modal open
1. Open a certification modal
2. Switch language while modal is open
3. Verify modal title/label updates; image remains unchanged

### 4c: Multiple modal interactions
1. Open a certification modal
2. Close it
3. Open a different certification modal
4. Verify the correct image is shown each time

---

## Automated Validation Commands

```bash
# Type checking — verify all new types compile
npm run typecheck

# Linting — verify code style
npm run lint

# Unit tests — run all tests
npm run test

# Dev server — visual verification
npm run dev
```

---

## Checklist Summary

| Scenario | Validates | Status |
|----------|-----------|--------|
| Language Switching | FR-001–005, SC-001–002 | ⬜ |
| Education Display | FR-006–009, SC-003, SC-006 | ⬜ |
| Certificate Modal | FR-010–015, SC-004–005 | ⬜ |
| Edge Cases | Edge case handling | ⬜ |
| Type Check | Constitution III (strict types) | ⬜ |
| Lint Check | Constitution quality gates | ⬜ |
| Unit Tests | Regression safety | ⬜ |
