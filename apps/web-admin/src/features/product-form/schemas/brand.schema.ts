import { z } from "zod";

export const BrandCreateInput = z.object({
  name: z.object({
    en: z.string().min(1),
    ua: z.string().min(1),
  }),
  country: z.string().optional(),
  website: z.string().url().optional(),
  notes: z.string().optional(),
  is_verified: z.boolean().optional(),
});

export type BrandCreateInput = z.infer<typeof BrandCreateInput>;

export type BrandDto = {
  id: string;
  nameEn: string;
  nameUa: string;
  country?: string | null;
};
