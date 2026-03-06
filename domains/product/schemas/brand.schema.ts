import { z } from "zod";

export const BrandSchema = z.object({
  brand_id: z.string().uuid().optional(), // генерується беком
  name: z.object({
    en: z.string().min(1),
    ua: z.string().min(1),
  }),
  country: z.string().optional(),
  website: z.string().url().optional(),
  notes: z.string().optional(),
  is_verified: z.boolean().default(false),
});

export type BrandInput = z.infer<typeof BrandSchema>;
