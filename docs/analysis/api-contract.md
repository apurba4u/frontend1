# API Contract Consistency & Model Mapping

This document analyzes how the StudyNook frontend ensures consistency with backend API contracts and maps data models for consumption in the UI.

## 1. Centralized API Client

The application uses a centralized Axios instance (`src/lib/axios.js`) to interact with the backend. This ensures:
- **Base URL Consistency**: All requests are routed through a single base URL, configurable via environment variables.
- **Global Headers**: Standard headers (e.g., `Content-Type: application/json`) and credentials are automatically included in every request.
- **Interceptors**: Response interceptors handle cross-cutting concerns like authentication expiration.

## 2. Service-Based Architecture

Interaction with specific backend entities (Rooms, Bookings, Auth) is encapsulated within service modules (`src/services/`):
- **Encapsulation**: Components do not call the API client directly; they use high-level methods like `roomService.getAll()`.
- **Mapping**: Services are responsible for extracting `response.data`, ensuring that components only receive the relevant payload.
- **Error Propagation**: Services propagate errors to the calling hook or component, allowing for context-aware error handling.

## 3. Data Synchronization with TanStack Query

**TanStack Query** acts as the bridge between the API and the UI state:
- **Query Keys**: Standardized query keys ensure consistent cache management and invalidation.
- **Stale-While-Revalidate**: Automatically keeps the frontend in sync with the backend data while providing a fast, cached experience.
- **Mutation Logic**: Handles POST/PUT/DELETE operations, including optimistic updates or cache invalidation upon success.

## 4. Model Mapping & DTOs

While the project currently uses plain JavaScript objects, consistency is maintained through:
- **Naming Conventions**: Matching backend property names (e.g., `_id`, `createdAt`, `imageUrl`) to avoid complex re-mapping logic on the client.
- **Zod Schemas**: Used to validate form data before it is sent (as a "Request DTO"), ensuring that it meets the backend's expected structure.

## 5. Future API Consistency Roadmap

- **TypeScript Interfaces**: Defining explicit interfaces for Request and Response objects to provide compile-time safety and IDE autocompletion.
- **Response Validation**: Using Zod to validate actual API responses at runtime, catching backend regressions or breaking changes before they cause UI errors.
- **Mock Service Worker (MSW)**: Implementing MSW for development and testing to simulate backend responses and ensure the frontend can handle all possible API states (loading, error, empty).
