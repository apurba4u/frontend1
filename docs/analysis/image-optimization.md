# Image Optimization & Asset Management

This document analyzes the strategy for image optimization and static asset management in the StudyNook frontend.

## 1. Next.js Image Component Usage

The application leverages the `next/image` component for all dynamic and remote images. This provides:
- **Automatic WebP/AVIF Conversion**: Images are served in modern formats based on browser support.
- **Lazy Loading**: Images are loaded only when they enter the viewport, improving initial page load performance.
- **Layout Shift Prevention**: Mandatory `width`/`height` or `fill` properties ensure that the browser reserves space for images, maintaining a stable Cumulative Layout Shift (CLS) score.
- **Responsive Sizing**: Usage of the `sizes` attribute in components like `RoomCard` and `RoomGrid` to serve appropriate resolutions for different breakpoints.

## 2. Remote Pattern Configuration

To securely handle images from external providers, the `next.config.mjs` is configured with strict remote patterns:
- **Unsplash**: Primary source for room and property images.
  - `images.unsplash.com`
  - `plus.unsplash.com`

This prevents unauthorized domains from using the Next.js image optimization API through the application.

## 3. Static Assets & Icons

- **Local Assets**: SVGs and static branding assets (e.g., `globe.svg`, `window.svg`) are stored in the `public/` directory.
- **Iconography**: The project uses `lucide-react` for consistent, lightweight, and accessible SVG icons throughout the interface.
- **Placeholder Strategy**: While currently relying on Unsplash, future iterations should include a fallback mechanism for broken image links or slow network conditions.

## 4. Performance Metrics

By offloading image optimization to the Next.js server/edge, the frontend achieves:
- Lower LCP (Largest Contentful Paint) times.
- Reduced bandwidth consumption for mobile users.
- Automated cache management for optimized assets.
