# Performance Benchmarking & Rendering Strategy

## Overview
StudyNook leverages Next.js 16's App Router to implement a hybrid rendering strategy that balances SEO, initial load speed, and client-side interactivity.

## Rendering Strategy

### 1. React Server Components (RSC)
- **Usage**: Layouts and most page components are Server Components by default.
- **Benefits**: Reduced client-side JavaScript, direct database/service access (if on server), and improved Core Web Vitals (LCP, FCP).

### 2. Client Components (`'use client'`)
- **Usage**: Interactive elements like `RoomFilters.jsx`, `GoogleSignInButton.jsx`, and components using hooks (e.g., `useAuth`, `useRooms`).
- **Optimization**: The project keeps the client-side boundary as small as possible to minimize the hydrateable JS.

### 3. Data Fetching (React Query)
- **Usage**: Managed via `QueryClientProvider`.
- **Strategy**: Currently, most fetching happens on the client. For performance optimization, initial data could be prefetched on the server and dehydrated to the client.

## Performance Benchmarks (Theoretical)
- **LCP (Largest Contentful Paint)**: High, due to static rendering of the Hero section.
- **TBT (Total Blocking Time)**: Low, as heavy interactive logic is deferred to specific client components.
- **CLS (Cumulative Layout Shift)**: Minimal, assuming fixed-size placeholders for images and stable HeroUI layouts.

## Areas for Improvement
- **Streaming & Suspense**: Implement `loading.jsx` for room listings to show skeleton states while data is being fetched.
- **Selective Hydration**: Further break down large client components into smaller ones to allow React to hydrate only what's necessary.
- **Server-Side Prefetching**: Use `dehydrate(queryClient)` in Server Components for the initial room list to eliminate client-side loading spinners on first load.

## Conclusion
The architecture is well-positioned for high performance. Moving from client-side fetching to a server-prefetched React Query model would provide the most significant UX boost.
