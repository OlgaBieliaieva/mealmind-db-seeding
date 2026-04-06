import { z } from "zod";
import {
  PRODUCT_UNIT_VALUES,
  PRODUCT_STATE_VALUES,
  PRODUCT_PHOTO_TYPE_VALUES,
} from "@/shared/domain/constants/product.constants";

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
  type: z.enum(PRODUCT_PHOTO_TYPE_VALUES),
  objectName: z.string(),
});

/* UPDATE */

export const AdminUpdateProductSchema = z.object({
  // FULLY MUTABLE
  name: NameSchema.optional(),
  unit: z.enum(PRODUCT_UNIT_VALUES).optional(),
  raw_or_cooked_default: z.enum(PRODUCT_STATE_VALUES).optional(),

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
