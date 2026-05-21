# StudyNook Dual Authentication Integration

This document outlines the client-side authentication framework integrated within the StudyNook frontend, detailing the dual-layer strategy using standard JWT sessions and Better Auth OAuth flows.

## Architecture and Configuration

The application supports authentication through two concurrent models:
1.  **Email & Password Authentication**: Standard forms mapped to traditional JSON Web Token (JWT) cookies stored in client browsers.
2.  **Social OAuth Sign-In**: Integrated via **Better Auth** using a React client package to establish federated user sessions (primarily Google OAuth).

---

## The Authentication Service (`src/services/authService.js`)

The `authService` object abstracts endpoints and manages the local and OAuth session lifecycles:

### 1. Registration & Login
*   **`register(data)`**: Resolves a POST request to `/auth/register` passing raw credentials, returning user record metadata.
*   **`login(data)`**: Resolves a POST request to `/auth/login` validating username/password structures.

### 2. Session Recovery (`getMe`)
To verify user sessions, the service implements a dual-check fallback system:

```javascript
getMe: async () => {
  // 1. Try JWT-based auth (email/password login)
  try {
    const response = await api.get("/auth/me");
    if (response.data?.user) {
      return response.data.user;
    }
  } catch {
    // JWT auth failed, try Better Auth
  }

  // 2. Try Better Auth session (Google OAuth login)
  try {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
      return {
        _id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image || session.user.avatar || "",
        role: session.user.role || "user",
      };
    }
  } catch {
    // No session at all
  }

  throw new Error("Not authenticated");
}
```

### 3. Log Out Lifecycle
Logging out requires cleaning up both credentials-based and OAuth session markers:

```javascript
logout: async () => {
  // Try Better Auth sign out first (for Google OAuth users)
  try {
    await authClient.signOut();
  } catch {
    // Better Auth sign out may fail if no session exists
  }
  // Also clear JWT cookie via existing endpoint
  try {
    await api.post("/auth/logout");
  } catch {
    // May fail if no JWT cookie
  }
}
```

---

## Better Auth Client Instance (`src/lib/auth-client.js`)

Initialized using the official React-friendly client schema:
*   **`baseURL`**: Points to the target server API root (e.g. `http://localhost:5001`).
*   **`basePath`**: Set to `/api/auth` which routes Better Auth hooks straight to the Express Better Auth middleware interface.
*   **Exported Utilities**: Destructures `signIn`, `signUp`, `signOut`, and `useSession` for client component execution.
