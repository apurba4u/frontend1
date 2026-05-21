# StudyNook Booking Service API Integration

This document outlines the API layer handling room booking operations in the StudyNook frontend.

## Service Specification (`src/services/bookingService.js`)

The `bookingService` communicates with the backend endpoints to schedule and cancel bookings:

```javascript
export const bookingService = {
  create: async (data) => {
    const response = await api.post("/bookings", data);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};
```

---

## Endpoint Details

### 1. `create(data)`
*   **Method**: `POST`
*   **Path**: `/api/bookings`
*   **Payload Requirements**:
    *   `roomId`: Unique ID of the study room.
    *   `startTime`: ISO String representing the start of the booking period.
    *   `endTime`: ISO String representing the end of the booking period.
    *   `totalPrice`: Calculated fee based on duration and hourly rate.
*   **Response**: Returns the created booking document with status markers (default: `pending` or `confirmed`).

### 2. `getMyBookings()`
*   **Method**: `GET`
*   **Path**: `/api/bookings/my-bookings`
*   **Purpose**: Retrieves list of bookings made by the current user. Used to populate the "My Bookings" page.
*   **Access**: Requires an authenticated user session (handled via JWT or Better Auth).

### 3. `cancel(id)`
*   **Method**: `PATCH`
*   **Path**: `/api/bookings/:id/cancel`
*   **Purpose**: Cancels an active or pending booking. 
*   **Access**: Only the user who created the booking (or the room owner) can initiate cancellation.
*   **Result**: Updates status to `cancelled` and releases the reserved slot.
