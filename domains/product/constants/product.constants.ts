// SECTION ███ PRODUCT DOMAIN CONSTANTS ███
// WHY: системні значення, що використовуються у формах, схемах та UI

// SECTION ━━ PRODUCT TYPES ━━━━━━━━━━━━━━━━━

export const PRODUCT_TYPES = {
  GENERIC: "generic",

  BRANDED: "branded",
} as const;

// SECTION ━━ PRODUCT UNITS ━━━━━━━━━━━━━━━━━

export const PRODUCT_UNITS = {
  G: "g",

  ML: "ml",

  PCS: "pcs",
} as const;

// SECTION ━━ PRODUCT STATES ━━━━━━━━━━━━━━━━

export const PRODUCT_STATES = {
  RAW: "raw",

  COOKED: "cooked",
} as const;

// SECTION ━━ PRODUCT PHOTO TYPES ━━━━━━━━━━━

export const PRODUCT_PHOTO_TYPES = {
  PACKAGING: "packaging",

  INGREDIENTS: "ingredients",

  OTHER: "other",
} as const;

// SECTION ━━ TYPESCRIPT TYPES ━━━━━━━━━━━━━━
// NOTE: дозволяє використовувати як union type

export type ProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];

export type ProductUnit = (typeof PRODUCT_UNITS)[keyof typeof PRODUCT_UNITS];

export type ProductState = (typeof PRODUCT_STATES)[keyof typeof PRODUCT_STATES];

export type ProductPhotoType =
  (typeof PRODUCT_PHOTO_TYPES)[keyof typeof PRODUCT_PHOTO_TYPES];
