import { z } from "zod";

export const ProductSearchQuerySchema = z.object({
  query: z.string().optional(),

  type: z.enum(["generic", "branded"]).optional(),

  categoryId: z.string().uuid().optional(),

  brandId: z.string().uuid().optional(),

  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(20),
});

export type ProductSearchQueryDto = z.infer<typeof ProductSearchQuerySchema>;
