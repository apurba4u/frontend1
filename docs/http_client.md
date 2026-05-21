# StudyNook HTTP Client Engine

This document details the configuration of the HTTP client layer implemented using **Axios** in StudyNook.

## Base Configuration

The Axios client instance is initialized in `src/lib/axios.js`. It establishes a unified connection structure to the backend APIs:

```javascript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Config Breakdown:
*   **`baseURL`**: Pulls the endpoint URL from `process.env.NEXT_PUBLIC_API_URL`. If missing, it defaults to a local fallback of `http://localhost:5001/api` matching the standard development backend configuration.
*   **`withCredentials`**: Explicitly set to `true`. This instructs the browser to include HTTP cookies (such as JWT session tokens) with every cross-origin request.
*   **`Content-Type`**: Standardized to `application/json` to match the REST endpoints expected by the Express controllers.

---

## Response Interceptors

The Axios instance incorporates a response interceptor that acts as a gatekeeper for session freshness and security exceptions:

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect on auth check endpoints
      if (!error.config.url.includes("/auth/me")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
```

### Flow Mechanics:
1.  **Success Handler**: Pass-through that propagates the response object directly to the initiating service.
2.  **Error Handler**: Analyzes HTTP error status code codes.
3.  **401 Exception Redirect**: If the status is `401 Unauthorized`, it indicates that the session token is missing, expired, or rejected.
4.  **Bypass Rule**: It checks `error.config.url`. If the query is an active check-in call to `/auth/me`, the redirect is bypassed. This prevents infinite redirection loops when checking session statuses at initial page load.
5.  **Page Hijack**: For all other endpoints, the browser is forced to navigate to the `/login` route using `window.location.href`.
6.  **Promise Propagation**: The error is rejected so that service callers can log or render specific form feedback.
