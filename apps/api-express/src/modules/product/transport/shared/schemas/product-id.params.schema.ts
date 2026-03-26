import { z } from "zod";

export const ProductIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export type ProductIdParams = z.infer<typeof ProductIdParamsSchema>;
