
// SECTION ███ PRODUCT API SCHEMA ███
// WHY: validation для API layer

import { z } from "zod";

import {
  PRODUCT_TYPES,
  PRODUCT_UNITS,
  PRODUCT_STATES,
  PRODUCT_PHOTO_TYPES,
} from "@/shared/domain/constants/product.constants";

/* ---------- nutrients ---------- */

export const NutrientValueSchema = z.object({
  value: z.number().min(0),
  unit: z.string(),
});

export const NutrientsSchema = z.record(z.string(), NutrientValueSchema);

/* ---------- photos ---------- */

export const ProductPhotoSchema = z.object({
  type: z.enum([
    PRODUCT_PHOTO_TYPES.INGREDIENTS,
    PRODUCT_PHOTO_TYPES.OTHER,
    PRODUCT_PHOTO_TYPES.PACKAGING,
  ]),
  url: z.string().url(),
  objectName: z.string().optional(),
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
  // NOTE:
  // product_id is a string for now due to legacy Google Sheets IDs.
  // Will be migrated to UUID in SQL phase.
  product_id: z.string().uuid().optional(),

  type: z.enum([PRODUCT_TYPES.GENERIC, PRODUCT_TYPES.BRANDED]),

  raw_or_cooked_default: z
    .enum([PRODUCT_STATES.RAW, PRODUCT_STATES.COOKED])
    .optional(),

  unit: z.enum([PRODUCT_UNITS.G, PRODUCT_UNITS.ML, PRODUCT_UNITS.PCS]),

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
  parent_product_id: z.string().min(1).optional(),
});

/* ---------- final product ---------- */

export const ProductSchema = z.discriminatedUnion("type", [
  GenericProductSchema,
  BrandedProductSchema,
]);

export type ProductInput = z.infer<typeof ProductSchema>;
