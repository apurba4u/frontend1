# Core Dependency Impact Study

## Overview
StudyNook leverages several heavy-weight and modern libraries to accelerate development and provide a rich user experience. This study evaluates their impact on bundle size, performance, and developer experience.

## Primary Dependencies

### 1. Next.js 16 (App Router)
- **Impact**: Provides the foundational framework. App Router enables React Server Components (RSC) by default, significantly reducing client-side JS for static parts of the page.
- **Trade-off**: Higher learning curve and stricter requirements for separating client and server logic.

### 2. @heroui/react (formerly NextUI)
- **Impact**: Provides a polished, accessible UI component library. Speeds up prototyping and ensures design consistency.
- **Trade-off**: Can be heavy on bundle size if not tree-shaken correctly. Relies on Tailwind CSS for styling.

### 3. @tanstack/react-query
- **Impact**: Manages server state, caching, and synchronization. Drastically simplifies data fetching logic and improves perceived performance through caching.
- **Trade-off**: Adds complexity to state management and requires careful configuration of stale times and cache invalidation.

### 4. Framer Motion
- **Impact**: Powers high-quality animations and transitions. Enhances the UX by providing fluid feedback.
- **Trade-off**: Large bundle size (approx 30kb+ gzipped). Must be used sparingly or with lazy loading for performance-critical paths.

### 5. React Hook Form & Zod
- **Impact**: Standardized form management and schema-based validation. Ensures type safety and consistent error handling across all forms.
- **Trade-off**: Requires boilerplate for schema definitions.

## Conclusion
The dependency choices are modern and industry-standard. While they provide significant productivity gains, continuous monitoring of bundle sizes (e.g., via `@next/bundle-analyzer`) is recommended as the project scales.
