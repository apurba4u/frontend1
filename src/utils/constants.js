export const AMENITIES = [
  "WiFi",
  "Projector",
  "Whiteboard",
  "Power Outlets",
  "Air Conditioning",
  "Natural Light",
  "Coffee Machine",
  "Sound System",
  "Printer",
  "Meeting Display",
];

export const FLOORS = [1, 2, 3, 4, 5];

export const PRICE_RANGES = [
  { label: "Under $10", min: 0, max: 10 },
  { label: "$10 - $20", min: 10, max: 20 },
  { label: "$20 - $30", min: 20, max: 30 },
  { label: "$30 - $50", min: 30, max: 50 },
  { label: "$50+", min: 50, max: 999 },
];

export const BOOKING_STATUS = {
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
};

export const AMENITY_ICONS = {
  WiFi: "wifi",
  Projector: "projector",
  Whiteboard: "pen-tool",
  "Power Outlets": "zap",
  "Air Conditioning": "snowflake",
  "Natural Light": "sun",
  "Coffee Machine": "coffee",
  "Sound System": "volume-2",
  Printer: "printer",
  "Meeting Display": "monitor",
};

export const TIME_SLOTS = [];
for (let h = 8; h <= 22; h++) {
  TIME_SLOTS.push(`${h.toString().padStart(2, "0")}:00`);
  if (h < 22) {
    TIME_SLOTS.push(`${h.toString().padStart(2, "0")}:30`);
  }
}
