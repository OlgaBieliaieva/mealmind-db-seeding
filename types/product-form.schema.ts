import { z } from "zod";

export const UnitEnum = z.enum(["g", "ml", "pcs"]);
export const TypeEnum = z.enum(["generic", "branded"]);

export const ProductPhotoFormSchema = z.object({
  type: z.enum(["packaging", "ingredients", "other"]),
  url: z.string().url(),
  objectName: z.string(),
});

export const ProductFormSchema = z.object({
  name_en: z.string().min(1),
  name_ua: z.string().min(1),
  type: TypeEnum,
  unit: UnitEnum,
  brand_id: z.string().optional(),

  // new brand (v1)
  new_brand_name_en: z.string().optional(),
  new_brand_name_ua: z.string().optional(),

  // parent product (generic)
  parent_product_id: z.string().optional(),
  barcode: z.string().min(8).optional(),
  photos: z.array(ProductPhotoFormSchema).optional(),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;
