// SECTION ███ PRODUCT FORM SCHEMA ███
// WHY: schema для react-hook-form та API payload validation

import { z, RefinementCtx } from "zod";

import {
  PRODUCT_UNITS,
  PRODUCT_TYPES,
  PRODUCT_STATES,
} from "@/shared/domain/constants/product.constants";
import { REQUIRED_MACRO_VALUES } from "../../product-nutrients/constants/nutrient.macros";

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
  value: z.number(),

  unit: z.string(),
});

// SECTION ━━ MAIN PRODUCT FORM ━━━━━━━━━━━━━━━━

export const ProductFormSchema = z
  .object({
    name_en: z.string().min(1),

    name_ua: z.string().min(1),

    type: TypeEnum,

    unit: UnitEnum,

    raw_or_cooked_default: StateEnum,

    // DB ━━ METADATA

    category_id: z.string(),

    notes: z.string().optional(),

    is_verified: z.boolean(),

    brand_id: z.string().optional(),

    source: z.string().optional(),

    // TODO new brand creation flow

    new_brand_name_en: z.string().optional(),

    new_brand_name_ua: z.string().optional(),

    new_brand_country: z.string().optional(),

    // GENERIC PARENT

    parent_product_id: z.string().optional(),

    nutrients: z.record(z.string(), ProductFormNutrientSchema).optional(),

    barcode: z.string().min(8).optional(),

    photos: z.array(ProductPhotoFormSchema).optional(),

    cooking_loss_pct: z.number().optional(),
    edible_part_pct: z.number().optional(),
    yield_factor: z.number().optional(),
  })
  .superRefine((data: ProductFormValues, ctx: RefinementCtx) => {
    const hasParent = !!data.parent_product_id;

    if (hasParent) return;

    const nutrients = data.nutrients ?? {};

    for (const macro of REQUIRED_MACRO_VALUES) {
      const entry = nutrients[macro];

      if (!entry || entry.value === undefined || entry.value === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required macronutrient",
          path: ["nutrients", macro, "value"],
        });
      }
    }
  });

export type ProductFormValues = z.infer<typeof ProductFormSchema>;
