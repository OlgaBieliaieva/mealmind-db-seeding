import { z } from "zod";

export const UnitEnum = z.enum(["g", "ml", "pcs"]);

export const ProductFormSchema = z.object({
  name_en: z.string().min(1),
  name_ua: z.string().min(1),
  type: z.enum(["generic", "branded"]),
  unit: UnitEnum,
  brand_id: z.string().optional(),

  // new brand (v1)
  new_brand_name_en: z.string().optional(),
  new_brand_name_ua: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;
