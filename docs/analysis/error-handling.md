# Global Error Handling & Resilience Patterns

This document describes the error handling strategies and resilience patterns implemented in the StudyNook frontend to ensure a robust user experience.

## 1. Centralized Toast Notifications

The application uses a `ToastProvider` built on `react-toastify` to provide non-intrusive, immediate feedback to users for both successes and failures.
- **Global Accessibility**: The `ToastProvider` is placed at the root of the application, making it accessible from any component via the `toast()` hook.
- **Visual Distinction**: Errors are styled with distinct colors (red/orange) and icons to ensure they are immediately recognizable.
- **Configuration**: Standardized durations (3000ms) and positioning (bottom-right) provide a consistent UX across the app.

## 2. API Error Interception

Axios interceptors are used to handle common HTTP errors globally:
- **Authentication Resilience**: A response interceptor monitors for `401 Unauthorized` errors. If detected (and not on an explicit auth-check endpoint), it automatically redirects the user to the login page, maintaining session integrity.
- **Standardized Error Extraction**: Interceptors can be expanded to parse backend error messages into user-friendly strings before they reach the component layer.

## 3. Form Validation Errors

Validation errors are handled at the source using **React Hook Form** and **Zod**:
- **Inline Feedback**: Errors are displayed directly next to the relevant input fields.
- **Pre-submission Guard**: Schemas prevent invalid data from being sent to the API, reducing unnecessary network traffic and backend load.

## 4. Loading States & Resilience

- **TanStack Query (React Query)**: Manages loading and error states for data fetching. It provides built-in mechanisms for retries and cache invalidation.
- **Loading Spinners**: Standardized `LoadingSpinner` and `PageLoading` components prevent the user from interacting with incomplete UI states.
- **Empty States**: The `EmptyState` component handles scenarios where queries return no data, preventing a "broken" appearance.

## 5. Future Resilience Enhancements

- **Error Boundaries**: Implement React Error Boundaries at the page and feature level to catch runtime exceptions and prevent the entire application from crashing.
- **Offline Support**: Integrate service workers or local storage fallbacks for critical data to improve resilience in low-connectivity environments.
