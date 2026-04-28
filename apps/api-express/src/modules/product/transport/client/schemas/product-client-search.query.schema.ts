import { z } from "zod";

export const ProductClientSearchQuerySchema = z.object({
  query: z.string().trim().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export type ProductClientSearchQuery = z.infer<
  typeof ProductClientSearchQuerySchema
>;
