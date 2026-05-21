# StudyNook Next.js Routing and Navigation

This document explains the Next.js App Router setup and client-side page navigation implemented in StudyNook.

## Next.js App Router Structure

The routing hierarchy uses file-based directory structures inside `src/app/` where folders define route paths and `page.jsx` represents the terminal view:

| Route Path | File Location | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.jsx` | Public | StudyNook Landing and Hub Dashboard |
| `/login` | `src/app/login/page.jsx` | Public (Unauth) | User sign-in screen supporting credentials and OAuth |
| `/register` | `src/app/register/page.jsx` | Public (Unauth) | New user sign-up screen |
| `/rooms` | `src/app/rooms/page.jsx` | Public | Search directory grid containing filters for study rooms |
| `/rooms/:id` | `src/app/rooms/[id]/page.jsx` | Public / Protected | Detailed room specification, reviews, and booking date picker |
| `/add-room` | `src/app/add-room/page.jsx` | Host / Protected | Study room registration form (Host authorization required) |
| `/my-bookings` | `src/app/my-bookings/page.jsx` | User / Protected | Personal active and archived booking listings |
| `/my-listings` | `src/app/my-listings/page.jsx` | Host / Protected | List of rooms posted by the current host user |

---

## Route Protection

To restrict route views based on user authentication status, the frontend uses a client-side wrapper: `src/components/shared/ProtectedRoute.jsx`.

### Structure of `ProtectedRoute`
The wrapper checks the current user session:
1.  **Loading State**: Displays a spinning progress indicator if the auth request is pending.
2.  **Redirect Rule**: If the session query completes and the user is null, it utilizes Next.js's `useRouter()` to redirect the client to `/login`.
3.  **Role Verification**: Future updates plan to evaluate host-specific access (e.g. for `/add-room` and `/my-listings`).

```jsx
// Concept pattern of ProtectedRoute.jsx usage:
export default function AddRoomPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <AddRoomForm />
    </ProtectedRoute>
  );
}
```

---

## Shared Layouts

The application implements nested layout wrappers:
*   **Root Layout (`src/app/layout.jsx`)**: Declares the primary document setup (`<html>`, `<body>`), injects Geist typography, suppresses hydration anomalies (`suppressHydrationWarning`), and mounts the global state context providers wrapper.
*   **Persistent Navigation**: Individual views explicitly render the shared `<Navbar />` and `<Footer />` components to preserve header/footer layout state.
