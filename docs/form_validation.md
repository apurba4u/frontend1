# StudyNook Form Validation and Input Validation

This document outlines the user interface form validation architecture using **React Hook Form** and **Zod** schema modeling.

## Validation Workflow

All forms inside pages follow a declarative validation strategy:
1.  **Schema Definition**: Form constraints are modeled using `zod` schema schemas.
2.  **Resolver Binding**: React Hook Form is configured using the `@hookform/resolvers/zod` resolver.
3.  **Unified Error Propagation**: Input elements bind validation states to display interactive inline error labels.

---

## 1. Login Authentication Schema

Defined in `src/app/login/page.jsx`:

```javascript
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

### Constraints:
*   `email`: Requires a valid email structure (contains `@` and domain extensions).
*   `password`: Enforces a minimum length of 6 characters to prevent weak submission queries.

---

## 2. Register Authentication Schema

Defined in `src/app/register/page.jsx`:

```javascript
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["user", "host"], {
    required_error: "Please select a role",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

### Constraints:
*   `name`: Requires at least 2 characters.
*   `role`: Restricts registration profiles to a strict enumeration (`user` or `host`).

---

## 3. Study Room Listing Schema

Defined in `src/app/add-room/page.jsx`:

```javascript
const roomSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
  floor: z.coerce.number().min(1, "Floor must be at least 1").max(50),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1").max(100),
  hourlyPrice: z.coerce.number().min(1, "Price must be at least $1"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
});
```

### Key Techniques:
*   **Numerical Coercion**: Fields such as `floor`, `capacity`, and `hourlyPrice` utilize `z.coerce.number()` to automatically cast string inputs from standard HTML `<input type="number">` fields into native JavaScript numbers.
*   **Capacity Boundaries**: Caps room capacities to `100` and floors to `50` to safeguard listings integrity.
*   **Array Inclusion**: Enforces that at least one amenity badge is toggled on using `min(1)` on the amenities array.
