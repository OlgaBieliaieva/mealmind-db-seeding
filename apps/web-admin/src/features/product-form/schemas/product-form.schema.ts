// SECTION ███ PRODUCT FORM SCHEMA ███
// WHY: schema для react-hook-form та API payload validation

import { z } from "zod";
import { addFieldError } from "@/shared/lib/validation/addFieldError";
import {
  PRODUCT_UNITS,
  PRODUCT_TYPES,
  PRODUCT_STATES,
} from "@/shared/domain/constants/product.constants";

import { NUTRIENT_META } from "@/features/product-nutrients/constants/nutrient.meta";

// SECTION ━━ ENUMS ━━━━━━━━━━━━━━━━━━━━━━━━━━━

const UnitEnum = z.enum([PRODUCT_UNITS.G, PRODUCT_UNITS.ML, PRODUCT_UNITS.PCS]);

export const TypeEnum = z.enum([PRODUCT_TYPES.GENERIC, PRODUCT_TYPES.BRANDED]);
export const StateEnum = z.enum([PRODUCT_STATES.RAW, PRODUCT_STATES.COOKED]);

// SECTION ━━ PHOTO ━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ProductPhotoFormSchema = z.object({
  type: z.enum(["packaging", "ingredients", "other"]),

  url: z.string().url(),

  objectName: z.string(),
});

// SECTION ━━ NUTRIENT ━━━━━━━━━━━━━━━━━━━━━━━━━

export const ProductFormNutrientSchema = z.object({
  value: z
    .string()
    .min(1, "Обовʼязкове поле")
    .refine((val) => !isNaN(Number(val)), {
      message: "Має бути числом",
    })
    .transform((val) => Number(val)),

  unit: z.string(),
});

// SECTION ━━ MAIN PRODUCT FORM ━━━━━━━━━━━━━━━━

// product-form.schema.ts

export const ProductFormSchema = z.object({
  name_en: z.string().min(1, "Введіть назву англійською"),
  name_ua: z.string().min(1, "Введіть назву українською"),

  type: TypeEnum,
  unit: UnitEnum,
  raw_or_cooked_default: StateEnum,

  category_id: z.string().min(1, "Оберіть категорію"),

  notes: z.string().optional(),
  is_verified: z.boolean(),

  brand_id: z.string().optional(),
  source: z.string().optional(),

  new_brand_name_en: z.string().optional(),
  new_brand_name_ua: z.string().optional(),
  new_brand_country: z.string().optional(),

  parent_product_id: z.string().optional(),

  barcode: z.string().min(8).optional(),
  photos: z.array(ProductPhotoFormSchema).optional(),

  cooking_loss_pct: z.string().min(1, "Введіть втрати"),
  edible_part_pct: z.string().min(1, "Введіть їстівну частину"),
  yield_factor: z.string().min(1, "Введіть коефіцієнт"),

  nutrients: z.record(
    z.string(),
    z.object({
      value: z
        .string()
        .min(1, "Обовʼязкове поле")
        .refine((v) => !isNaN(Number(v)), {
          message: "Має бути числом",
        }),
      unit: z.string(),
    }),
  ),
});

export type ProductFormInput = z.infer<typeof ProductFormSchema>;
