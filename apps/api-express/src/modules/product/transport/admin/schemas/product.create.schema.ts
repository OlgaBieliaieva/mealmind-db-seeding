// SECTION ███ PRODUCT API SCHEMA ███
// WHY: validation для API layer

import { z } from "zod";
import {
  ProductType,
  ProductUnit,
  ProductState,
  ProductPhotoType,
} from "@prisma/client";

/* ---------- constants ---------- */

const PRODUCT_TYPE_VALUES = Object.values(ProductType) as [string, ...string[]];

const PRODUCT_UNIT_VALUES = Object.values(ProductUnit) as [string, ...string[]];

const PRODUCT_STATE_VALUES = Object.values(ProductState) as [
  string,
  ...string[],
];

const PRODUCT_PHOTO_TYPE_VALUES = Object.values(ProductPhotoType) as [
  string,
  ...string[],
];

/* ---------- nutrients ---------- */

export const NutrientValueSchema = z.object({
  value: z.number().min(0),
  unit: z.string(),
});

export const NutrientsSchema = z.record(z.string().uuid(), NutrientValueSchema);

/* ---------- photos ---------- */

export const ProductPhotoSchema = z.object({
  type: z.enum(PRODUCT_PHOTO_TYPE_VALUES),
  // url: z.string().url(),
  objectName: z.string(),
});

/* ---------- brand ---------- */

export const BrandSchema = z.object({
  product_id: z.string().uuid().optional(),
  name: z.object({
    en: z.string(),
    ua: z.string(),
  }),
});

/* ---------- base product ---------- */

const BaseProductSchema = z.object({
  product_id: z.string().uuid().optional(),

  type: z.enum(PRODUCT_TYPE_VALUES),

  raw_or_cooked_default: z.enum(PRODUCT_STATE_VALUES).optional(),

  unit: z.enum(PRODUCT_UNIT_VALUES),

  name: z.object({
    en: z.string().min(1),
    ua: z.string().min(1),
  }),

  category_id: z.string().uuid(),

  nutrients: NutrientsSchema.optional(),

  edible_part_pct: z.number().min(0).max(100).optional(),
  yield_factor: z.number().positive().optional(),
  cooking_loss_pct: z.number().min(0).max(100).optional(),

  photos: z.array(ProductPhotoSchema).optional(),

  notes: z.string().optional(),
  source: z.string().optional(),
  is_verified: z.boolean().default(false),
});

/* ---------- generic-only ---------- */

const GenericProductSchema = BaseProductSchema.extend({
  type: z.literal("generic"),
});

/* ---------- branded-only ---------- */

const BrandedProductSchema = BaseProductSchema.extend({
  type: z.literal("branded"),

  brand_id: z.string().uuid(),
  barcode: z.string().min(8).optional(),
  parent_product_id: z.string().uuid().optional(),
});

/* ---------- final product ---------- */

export const AdminCreateProductSchema = z.discriminatedUnion("type", [
  GenericProductSchema,
  BrandedProductSchema,
]);

export type AdminCreateProductInput = z.infer<typeof AdminCreateProductSchema>;
