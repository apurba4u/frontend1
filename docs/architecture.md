# StudyNook Frontend Architecture Overview

This document provides a comprehensive overview of the StudyNook frontend codebase. The application is built on top of **Next.js** using the **App Router** paradigm and utilizes **React 19**.

## Core Technology Stack

*   **Framework**: Next.js (version 16.2.6) with React 19.
*   **Routing**: Next.js App Router (`src/app/` directory).
*   **Styling**: Tailwind CSS (v4) with vanilla CSS utility hooks.
*   **Animations**: Framer Motion for premium and smooth micro-animations.
*   **State Management**: React Query (TanStack Query v5) for server-state caching, combined with React Context (`AuthProvider.jsx`) for client-side authentication session state.
*   **HTTP Client**: Axios with interceptor integration.
*   **Authentication**: Integrated Better Auth client along with traditional JWT email/password credential services.

---

## Directory Structure

The codebase is organized modularly under the `src/` directory to separate pages, components, business logic, and UI styling:

```
src/
├── app/                  # Next.js App Router pages, layouts, and route groups
│   ├── add-room/         # Add study room page (Host listing submission)
│   ├── login/            # Login form and social auth landing
│   ├── register/         # Signup form
│   ├── rooms/            # Room directory browsing & single room details dynamic routing
│   ├── my-bookings/      # User booking history
│   ├── my-listings/      # Host listed study rooms management
│   ├── globals.css       # Global stylesheet & Tailwind CSS configurations
│   ├── layout.jsx        # Root Layout setup
│   └── page.jsx          # Homepage container
├── components/           # UI Components
│   ├── home/             # Homepage feature components (Hero, Featured, Why, Testimonials)
│   ├── layout/           # Shared layout containers (Navbar, Footer)
│   ├── rooms/            # Room cards, filtering panels, grids, and search forms
│   └── shared/           # Generic reusable components (LoadingSpinner, EmptyState, ProtectedRoute)
├── hooks/                # Custom React hooks (useAuth, useBookings, useRooms)
├── lib/                  # Library initializations (axios, authClient, queryClient)
├── providers/            # React Context providers (Providers wrapper, Theme, Toast, Auth)
├── services/             # Core API service handlers (authService, roomService, bookingService)
├── styles/               # Extensible style modules
└── utils/                # General helpers & static config constants (constants, formatters)
```

---

## Build and Developer Scripts

Available commands defined in `package.json`:
*   `npm run dev`: Runs the local development server utilizing Next.js Hot Module Replacement.
*   `npm run build`: Compiles optimized production builds of all routes.
*   `npm run start`: Launches the compiled production application server.
*   `npm run lint`: Performs lint checks using ESLint rules.
