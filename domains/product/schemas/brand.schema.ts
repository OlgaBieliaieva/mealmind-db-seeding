// TODO DELETE after refactor
import { z } from "zod";

/* ⭐ API CREATE DTO */

export const BrandCreateSchema = z.object({
  name: z.object({
    en: z.string().min(1),
    ua: z.string().min(1),
  }),
  country: z.string().optional(),
  website: z.string().url().optional(),
  notes: z.string().optional(),
  is_verified: z.boolean().optional(),
});

export type BrandCreateInput = z.infer<typeof BrandCreateSchema>;

export type BrandDto = {
  brand_id: string;
  name: {
    en: string;
    ua: string;
  };
  country?: string | null;
};
