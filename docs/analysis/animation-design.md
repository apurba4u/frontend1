# Animation Principles & Interaction Design

This document outlines the animation principles and interaction design patterns implemented in the StudyNook frontend using Framer Motion.

## 1. Animation Philosophy

The application uses animations to provide visual feedback, guide the user's focus, and create a "premium" feel without being distracting. Key principles include:
- **Subtlety**: Animations are quick (typically 0.3s - 0.5s) and use smooth easing functions.
- **Purpose**: Every animation serves a purpose, such as indicating a page transition, a successful action, or a hover state.
- **Consistency**: Reusable animation variants ensure a cohesive experience throughout the app.

## 2. Reusable Animation Variants

A centralized `src/styles/animations.js` file defines standard motion variants:
- **`fadeInUp`**: Used for content entry, creating a sense of growth and appearance.
- **`staggerContainer` & `staggerItem`**: Used for lists (like `RoomGrid`) to animate children sequentially, reducing visual overwhelm.
- **`scaleOnHover`**: Applied to cards and buttons to provide immediate tactile feedback on interactive elements.
- **`slideInLeft/Right`**: Used for directional entry, often in sidebars or multi-step forms.

## 3. Page Transitions

The project implements smooth transitions between routes:
- **`pageTransition`**: A standard variant that handles opacity and slight vertical movement as the user navigates between pages, smoothing out the "jumpiness" of SPA navigation.
- **`AnimatePresence`**: (Where applicable) ensures that components animate out before being removed from the DOM.

## 4. Interaction Design Patterns

- **Hover States**: Interactive elements use `whileHover` to scale or change elevation (y-axis offset), mimicking physical depth.
- **Loading States**: Animated spinners and skeleton loaders (leveraging Framer Motion or CSS) provide continuous feedback during async operations.
- **Feedback Loops**: Success and error messages (toasts) are animated to catch the user's eye without blocking their workflow.

## 5. Performance Considerations

- **Hardware Acceleration**: Framer Motion leverages GPU-accelerated CSS properties (`transform`, `opacity`) to ensure high frame rates even on mobile devices.
- **Reduced Motion**: Future iterations should respect the `prefers-reduced-motion` media query to ensure accessibility for users with vestibular sensitivities.
