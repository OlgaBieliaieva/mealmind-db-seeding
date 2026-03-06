// SECTION ███ PRODUCT DOMAIN CONSTANTS ███
// WHY: системні значення, що використовуються у формах, схемах та UI

// SECTION ━━ PRODUCT TYPES ━━━━━━━━━━━━━━━━━

export const PRODUCT_TYPES = {

  GENERIC: "generic",

  BRANDED: "branded"

} as const;


// SECTION ━━ PRODUCT UNITS ━━━━━━━━━━━━━━━━━

export const PRODUCT_UNITS = {

  G: "g",

  ML: "ml",

  PCS: "pcs"

} as const;


// SECTION ━━ PRODUCT STATES ━━━━━━━━━━━━━━━━

export const PRODUCT_STATES = {

  RAW: "raw",

  COOKED: "cooked"

} as const;


// SECTION ━━ PRODUCT PHOTO TYPES ━━━━━━━━━━━

export const PRODUCT_PHOTO_TYPES = {

  PACKAGING: "packaging",

  INGREDIENTS: "ingredients",

  OTHER: "other"

} as const;


// SECTION ━━ OPTIONS FOR SELECTS ━━━━━━━━━━━

export const PRODUCT_TYPE_OPTIONS = [

  { value: PRODUCT_TYPES.GENERIC, label: "Базовий продукт" },

  { value: PRODUCT_TYPES.BRANDED, label: "Брендований продукт" }

];


export const PRODUCT_UNIT_OPTIONS = [

  { value: PRODUCT_UNITS.G, label: "г" },

  { value: PRODUCT_UNITS.ML, label: "мл" },

  { value: PRODUCT_UNITS.PCS, label: "шт" }

];

export const PRODUCT_PHOTO_TYPE_OPTIONS = [

  { value: PRODUCT_PHOTO_TYPES.PACKAGING, label: "Пакування" },

  { value: PRODUCT_PHOTO_TYPES.INGREDIENTS, label: "Склад" },

  { value: PRODUCT_PHOTO_TYPES.OTHER, label: "Інше" }

];


// SECTION ━━ TYPESCRIPT TYPES ━━━━━━━━━━━━━━
// NOTE: дозволяє використовувати як union type

export type ProductType =
  typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];

export type ProductUnit =
  typeof PRODUCT_UNITS[keyof typeof PRODUCT_UNITS];

export type ProductState =
  typeof PRODUCT_STATES[keyof typeof PRODUCT_STATES];

export type ProductPhotoType =
  typeof PRODUCT_PHOTO_TYPES[keyof typeof PRODUCT_PHOTO_TYPES];