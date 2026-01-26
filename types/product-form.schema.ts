import { z } from "zod";

export const UnitEnum = z.enum(["g", "ml", "pcs"]);

export const ProductFormSchema = z.object({
  name_en: z.string().min(1, "Required"),
  name_ua: z.string().min(1, "Required"),
  type: z.enum(["generic", "branded"]),
  unit: UnitEnum,
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;
