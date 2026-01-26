import { z } from "zod";

/* ---------- enums ---------- */

export const ProductTypeEnum = z.enum(["generic", "branded"]);
export const UnitEnum = z.enum(["g", "ml", "pcs"]);
export const RawCookedEnum = z.enum(["raw", "cooked"]);
export const PhotoTypeEnum = z.enum(["packaging", "ingredients", "other"]);

/* ---------- nutrients ---------- */

export const NutrientValueSchema = z.object({
  value: z.number().min(0),
  unit: z.string().optional(),
});

export const NutrientsSchema = z.record(z.string(), NutrientValueSchema);

/* ---------- photos ---------- */

export const ProductPhotoSchema = z.object({
  type: PhotoTypeEnum,
  url: z.string().url(),
});

/* ---------- brand ---------- */

export const BrandSchema = z.object({
  id: z.string(),
  name: z.object({
    en: z.string(),
    ua: z.string(),
  }),
});

/* ---------- base product ---------- */

const BaseProductSchema = z.object({
  product_id: z.string().uuid().optional(), // генерується беком
  type: ProductTypeEnum,

  name: z.object({
    en: z.string().min(1),
    ua: z.string().min(1),
  }),

  category_id: z.number(),
  subcategory_id: z.number().optional(),

  unit: UnitEnum,

  nutrients: NutrientsSchema.optional(),

  photos: z.array(ProductPhotoSchema).optional(),

  notes: z.string().optional(),
  source: z.string().optional(),
  is_verified: z.boolean().default(false),
});

/* ---------- generic-only ---------- */

const GenericProductSchema = BaseProductSchema.extend({
  type: z.literal("generic"),

  edible_part_pct: z.number().min(0).max(100).optional(),
  yield_factor: z.number().positive().optional(),
  cooking_loss_pct: z.number().min(0).max(100).optional(),

  raw_or_cooked_default: RawCookedEnum.optional(),
});

/* ---------- branded-only ---------- */

const BrandedProductSchema = BaseProductSchema.extend({
  type: z.literal("branded"),

  brand: BrandSchema,
  barcode: z.string().min(8).optional(),
  parent_product_id: z.string().uuid().optional(),
});

/* ---------- final product ---------- */

export const ProductSchema = z.discriminatedUnion("type", [
  GenericProductSchema,
  BrandedProductSchema,
]);

export type ProductInput = z.infer<typeof ProductSchema>;
