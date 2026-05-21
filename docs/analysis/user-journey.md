# User Journey & Experience Flow Audit

## Overview
The primary user journey in StudyNook revolves around discovering, viewing, and booking study rooms. This audit maps the flow from discovery to conversion.

## Core Journeys

### 1. Room Discovery
- **Entry Point**: Landing Page (`/`) or Direct Search (`/rooms`).
- **Flow**: User lands on the home page -> Browses Featured Rooms -> Clicks "Search Rooms" -> Filters results by date, capacity, or price -> views `RoomCard` components.
- **UX Touchpoints**: Hero section with clear CTA, responsive `RoomGrid`, and real-time filtering.

### 2. Room Booking (Authorized)
- **Flow**: User selects a room -> views details (`/rooms/[id]`) -> Clicks "Book Now" -> selects date/time -> confirms booking.
- **UX Touchpoints**: Clear availability calendar (future enhancement), summary of booking details, and instant feedback via `react-toastify`.

### 3. Authentication & Onboarding
- **Flow**: User clicks "Login" or "Register" -> chooses Google OAuth or Email/Password -> Redirected back to previous page or Dashboard.
- **UX Touchpoints**: `GoogleSignInButton` for low-friction entry, `ProtectedRoute` wrapper for sensitive pages.

### 4. Management (Post-Booking)
- **Flow**: User navigates to "My Bookings" (`/my-bookings`) -> Views status of current and past bookings.
- **UX Touchpoints**: `EmptyState` component for new users, clear status indicators.

## UX Friction Points
- **Unauthorized Booking**: If a guest tries to book, they are redirected to login. The redirect should ideally return them to the specific room page after login.
- **Empty States**: Currently handled via `EmptyState.jsx`, which is good for guidance.

## Recommendations
- **Breadcrumbs**: Implement breadcrumbs for deeper navigation (e.g., Home > Rooms > [Room Name]).
- **Skeleton Screens**: Use HeroUI skeletons during data fetching to reduce perceived latency.
