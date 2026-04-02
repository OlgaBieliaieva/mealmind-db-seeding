import { z } from "zod";
import { ProductUnit, ProductState, ProductPhotoType } from "@prisma/client";

/* name */

const NameSchema = z.object({
  en: z.string().min(1),
  ua: z.string().min(1),
});

/* nutrients */

const NutrientValueSchema = z.object({
  value: z.number().min(0),
  unit: z.string(),
});

const NutrientsSchema = z.record(z.string().uuid(), NutrientValueSchema);

/* photos */

const ProductPhotoUploadSchema = z.object({
  type: z.nativeEnum(ProductPhotoType),
  objectName: z.string(),
});

/* UPDATE */

export const AdminUpdateProductSchema = z.object({
  // FULLY MUTABLE
  name: NameSchema.optional(),
  unit: z.nativeEnum(ProductUnit).optional(),
  raw_or_cooked_default: z.nativeEnum(ProductState).optional(),

  // SEMI MUTABLE
  category_id: z.string().uuid().optional(),
  edible_part_pct: z.number().min(0).max(100).optional(),
  yield_factor: z.number().positive().optional(),
  cooking_loss_pct: z.number().min(0).max(100).optional(),

  notes: z.string().optional(),
  source: z.string().optional(),
  is_verified: z.boolean().optional(),

  barcode: z.string().optional(),
  brand_id: z.string().uuid().optional(),

  // SNAPSHOT REPLACE
  nutrients: NutrientsSchema.optional(),

  // ⭐ MEDIA MUTATION SET
  photos: z
    .object({
      add: z.array(ProductPhotoUploadSchema).optional(),
      remove: z.array(z.string().uuid()).optional(),
    })
    .optional(),
});

export type AdminUpdateProductInput = z.infer<typeof AdminUpdateProductSchema>;
