# StudyNook State Management and Providers

This document details the global state management architecture and provider configuration wrapper in the StudyNook frontend application.

## Provider Composition (`src/providers/Providers.jsx`)

The frontend groups context providers into a single unified container around the root application tree:

```jsx
export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

### Components of the Provider Stack:
1.  **`QueryClientProvider`**: Injects server-state caching capabilities via TanStack React Query.
2.  **`ThemeProvider`**: Manages light/dark/system styling attributes using `next-themes`.
3.  **`AuthProvider`**: Controls user session contexts.
4.  **`ToastProvider`**: Mounts the toast alert system from `react-toastify`.

---

## TanStack React Query Config (`src/lib/queryClient.js`)

Initialized with standard caching constraints:
```javascript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```
*   **`refetchOnWindowFocus: false`**: Avoids duplicate request triggers when users switch browser tabs.
*   **`staleTime`**: Retains fetched datasets for 5 minutes before considering them outdated, reducing overhead.

---

## Authentication Context (`src/providers/AuthProvider.jsx`)

User credentials and session actions are managed in React Context, allowing widgets to access authentication flags:

*   **`user`**: Evaluates active profiles using React Query's `useQuery` targeting `authService.getMe`.
*   **Mutations**: Handles form processing via React Query's `useMutation` hooks:
    *   **`loginMutation`**: Sends user details to the backend login API and updates client states upon validation.
    *   **`registerMutation`**: Registers a new user.
    *   **`logoutMutation`**: Handles session termination, clears local caches using `queryClient.clear()`, and triggers homepage redirection.
*   **Context API hook (`useAuth()`)**: Synthesizes credentials, pending request indicators (`isLoggingIn`, `isRegistering`), and validation flags.
