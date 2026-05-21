# Runtime Configuration & Environment Management

## Overview
StudyNook manages configuration through environment variables and a centralized constant file. This ensures that the application can be easily configured for different environments (development, staging, production) without code changes.

## Configuration Strategy

### 1. Environment Variables
The application expects several environment variables (typically defined in `.env.local` or CI/CD settings):
- `NEXT_PUBLIC_API_URL`: The base URL for the backend API (used by Axios).
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Required for Google OAuth integration.

### 2. Centralized Constants (`src/utils/constants.js`)
Application-wide constants that are not environment-specific are stored here. This includes:
- Default pagination limits.
- Status codes or labels.
- Theme configuration keys.

### 3. Axios Configuration (`src/lib/axios.js`)
Axios is configured with the `NEXT_PUBLIC_API_URL` as its base, ensuring all service calls are routed correctly based on the environment.

## Security Considerations
- **Prefixing**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client-side. This is correctly applied for the API URL and Client ID.
- **Sensitive Keys**: Any secret keys (like API secrets or private OAuth keys) must NEVER be prefixed with `NEXT_PUBLIC_` and should only be accessed in Server Components or API routes.

## Recommendations
- **Validation**: Implement a validation step for environment variables (e.g., using Zod) during the build process to catch missing configuration early.
- **Type Safety**: Use a typed configuration object rather than direct calls to `process.env` throughout the codebase.
