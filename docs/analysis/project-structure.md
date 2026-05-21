# Project Structure & Organization Analysis

## Overview
StudyNook follows a modern Next.js 16 App Router architecture, emphasizing a hybrid approach between traditional layered architecture and feature-based organization.

## Key Directories
- `src/app`: Contains the routing layer using Next.js App Router. Each route is a folder with a `page.jsx`.
- `src/components`: Divided into `shared`, `layout`, and domain-specific folders (`rooms`, `bookings`, `home`). This promotes reuse while keeping domain logic separated.
- `src/features`: Intended for complex, encapsulated logic related to specific business domains. Currently appears to be a placeholder for future migration of logic from `components` and `services`.
- `src/services`: Handles all external API interactions using Axios. This layer abstracts the data fetching logic from the UI components.
- `src/hooks`: Custom React hooks for managing state and side effects, often wrapping React Query mutations and queries.
- `src/providers`: Global context providers (Auth, Theme, Toast, React Query).
- `src/lib`: Configuration for third-party libraries (Axios, React Query, Auth).
- `src/utils`: Pure utility functions and constants.

## Strengths
1. **Clear Separation of Concerns**: Logic is well-separated between UI (components), Data Fetching (services), and State Management (hooks/providers).
2. **Standardized Routing**: Leveraging Next.js App Router provides a predictable and scalable routing structure.
3. **Modular Components**: The use of a `shared` component library alongside domain-specific components balances flexibility and consistency.

## Areas for Improvement
- **Feature Encapsulation**: Moving more logic into the `src/features` directory would further improve scalability as the project grows.
- **Consistency in Component Placement**: Some logic in `src/components/rooms` might be better suited for `src/features/rooms` if it involves complex state or multiple services.
