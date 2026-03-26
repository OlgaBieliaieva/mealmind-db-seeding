import { z } from "zod";

export const AdminUpdateProductParamsSchema = z.object({
  id: z.string().uuid(),
});

export type AdminUpdateProductParams = z.infer<
  typeof AdminUpdateProductParamsSchema
>;
