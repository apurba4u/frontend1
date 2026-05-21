# StudyNook Global Styles and CSS Configuration

This document outlines the global styling system, Tailwind CSS custom variables, and theme tokens configured in StudyNook.

## Styling Framework

The application utilizes **Tailwind CSS v4** via the `@tailwindcss/postcss` wrapper package. The main stylesheet resides in `src/app/globals.css` and imports Tailwind styles via `@import "tailwindcss";`.

---

## The Design System (`@theme` variables)

Custom styling tokens are configured inside the `@theme` block. These variables override Tailwind's default layout properties:

### 1. Color Palette Tokens
*   **Primary System**:
    *   `--color-primary`: `#2039ba`
    *   `--color-primary-container`: `#3e54d3`
    *   `--color-primary-fixed`: `#dee0ff`
*   **Secondary System**:
    *   `--color-secondary`: `#4648d4`
    *   `--color-secondary-container`: `#6063ee`
*   **Tertiary & Error Tokens**:
    *   `--color-tertiary`: `#004f72` (For callouts or alternative controls)
    *   `--color-error`: `#ba1a1a` (For validation warnings and error toast wrappers)

### 2. Semantic Surface Containers
*   `--color-surface`: `#f8f9ff` (Default light viewport fill)
*   `--color-surface-container-lowest`: `#ffffff` (Card background styling)
*   `--color-surface-container-low`: `#eff4ff`
*   `--color-surface-container-high`: `#dce9ff`
*   `--color-outline`: `#757685` (Border configuration color)

### 3. Typography configuration
*   `--font-sans` & `--font-display`: Maps `"Geist"` as the primary layout font, with standard fallbacks (`system-ui`, `sans-serif`).

---

## Custom Layout Utility Classes (`@layer components`)

The stylesheet defines custom classes to maintain layout consistency across pages:

1.  **`.glass`**: Responsive frosted-glass background blur.
    *   **Light mode**: `rgba(255, 255, 255, 0.7)` with `backdrop-filter: blur(20px)`.
    *   **Dark mode**: `rgba(11, 28, 48, 0.7)`.
2.  **Gradients**:
    *   **`.gradient-primary`**: Blends Indigo and Royal blue (`#2039ba` to `#6063ee`).
    *   **`.gradient-hero`**: Dark theme gradient (`#0b1c30` to `#6063ee`).
    *   **`.text-gradient`**: Clips primary colors to heading typography.
3.  **`.skeleton-pulse`**: Custom shimmer background animation mapping a CSS keyframe sequence. Used for skeleton placeholder grids during lazy loads.
