// SECTION ━━━━━━━━━━━ CONSTANTS ━━━━━━━━━━━

export const PRODUCT_TYPES = {
  GENERIC: "generic",
  BRANDED: "branded",
} as const;

export const PRODUCT_UNITS = {
  G: "g",
  ML: "ml",
  PCS: "pcs",
} as const;

export const PRODUCT_STATES = {
  RAW: "raw",
  COOKED: "cooked",
} as const;

export const PRODUCT_PHOTO_TYPES = {  
  PACKAGING: "packaging",
  INGREDIENTS: "ingredients",
  OTHER: "other"
} as const;