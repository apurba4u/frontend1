# StudyNook Shared Components and Layout Utilities

This document lists the reusable UI components and layout wrappers configured inside `src/components/shared/` and `src/components/layout/`.

## Shared Components (`src/components/shared/`)

### 1. `ProtectedRoute.jsx`
*   **Purpose**: Restricts access to client-side views.
*   **Workflow**: Checks if the authentication context user session is loading. If false and user session is missing, it initiates a redirect to `/login`.

### 2. `GoogleSignInButton.jsx`
*   **Purpose**: Provides standard buttons triggering Better Auth social logins.
*   **Style**: Rendered to match official brand specs, handling loading triggers internally.

### 3. `LoadingSpinner.jsx`
*   **Purpose**: Full-page loader with spinning lucide icon overlaying surface backgrounds.
*   **Style**: Centered loader using primary color highlights.

### 4. `EmptyState.jsx`
*   **Purpose**: Informs users when listing arrays are blank (e.g. no listings or active bookings matching current filter categories).
*   **Props**: Accept custom headers, descriptions, icons, and action button triggers.

### 5. `PageTitle.jsx`
*   **Purpose**: Common page banner setting font heights and margins.

---

## Layout Components (`src/components/layout/`)

### 1. The Global Navbar (`Navbar.jsx`)
*   **Responsiveness**: Uses a responsive menu container to collapse items on mobile viewports.
*   **Dynamic Authentication Links**: Toggles actions based on session states:
    *   **Unauthenticated**: Displays "Sign In" and "Get Started" triggers.
    *   **Authenticated (User)**: Renders "My Bookings" along with profiles.
    *   **Authenticated (Host)**: Renders additional "My Listings" and "Add Room" pathways.
*   **Logout Trigger**: Dispatches the context sign-out mutator cleanly.
*   **Theme Toggle**: Inline dropdown to select light, dark, or system preferences.

### 2. The Site Footer (`Footer.jsx`)
*   **Architecture**: Structured footer column layout outlining brand links, mock social icons, contact paths, and copy marks.
*   **Style**: Light/dark styling integration with clean border separators.
