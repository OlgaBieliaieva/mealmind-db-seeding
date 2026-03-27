// ===== TYPES =====

export const PRODUCT_TYPES = {
  GENERIC: "generic",
  BRANDED: "branded",
} as const;

export type ProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];

// ===== UNITS =====

export const PRODUCT_UNITS = {
  G: "g",
  ML: "ml",
  PCS: "pcs",
} as const;

export type ProductUnit = (typeof PRODUCT_UNITS)[keyof typeof PRODUCT_UNITS];

// ===== STATES =====

export const PRODUCT_STATES = {
  RAW: "raw",
  COOKED: "cooked",
} as const;

export type ProductState = (typeof PRODUCT_STATES)[keyof typeof PRODUCT_STATES];

// ===== STATUS (ВАЖЛИВО — нове) =====

export const PRODUCT_STATUSES = {
  DRAFT: "draft",
  ACTIVE: "active",
  ARCHIVED: "archived",
} as const;

export type ProductStatus =
  (typeof PRODUCT_STATUSES)[keyof typeof PRODUCT_STATUSES];

// ===== PHOTO TYPES =====

export const PRODUCT_PHOTO_TYPES = {
  PACKAGING: "packaging",
  INGREDIENTS: "ingredients",
  OTHER: "other",
} as const;

export type ProductPhotoType =
  (typeof PRODUCT_PHOTO_TYPES)[keyof typeof PRODUCT_PHOTO_TYPES];

// ===== VALUES (для select / validation) =====

export const PRODUCT_TYPE_VALUES = Object.values(PRODUCT_TYPES);
export const PRODUCT_UNIT_VALUES = Object.values(PRODUCT_UNITS);
export const PRODUCT_STATE_VALUES = Object.values(PRODUCT_STATES);
export const PRODUCT_STATUS_VALUES = Object.values(PRODUCT_STATUSES);
export const PRODUCT_PHOTO_TYPE_VALUES = Object.values(PRODUCT_PHOTO_TYPES);
