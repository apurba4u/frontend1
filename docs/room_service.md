# StudyNook Room Service API Integration

This document outlines the Client API layer responsible for executing requests targeting Study Room records.

## Service Specification (`src/services/roomService.js`)

All interactions with study rooms are grouped under the `roomService` helper, forwarding transactions to Axios REST routes:

```javascript
export const roomService = {
  getAll: async (params = {}) => {
    const response = await api.get("/rooms", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/rooms", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/rooms/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  },
};
```

---

## Endpoint Details

### 1. `getAll(params)`
*   **Method**: `GET`
*   **Path**: `/api/rooms`
*   **Purpose**: Retrieves list of registered rooms.
*   **Params**: Supports URL query mapping:
    *   `search`: Filters titles, locations, or descriptions.
    *   `category`: Limits listings to specific room styles (e.g. "Silent", "Meeting").
    *   `amenities`: Filters listings by available features.
    *   `minPrice`/`maxPrice`: Restricts hourly price range.
    *   `page` and `limit`: Handles pagination parameters.

### 2. `getById(id)`
*   **Method**: `GET`
*   **Path**: `/api/rooms/:id`
*   **Purpose**: Retrieves details for a specific room listing. Used by detail page routes to render pricing, capacity, and availability calendars.

### 3. `create(data)`
*   **Method**: `POST`
*   **Path**: `/api/rooms`
*   **Purpose**: Submits a new room registration. Requires Host authenticated credentials.

### 4. `update(id, data)`
*   **Method**: `PUT`
*   **Path**: `/api/rooms/:id`
*   **Purpose**: Modifies room metadata. Requires ownership validation.

### 5. `delete(id)`
*   **Method**: `DELETE`
*   **Path**: `/api/rooms/:id`
*   **Purpose**: Removes a room listing from the database.
