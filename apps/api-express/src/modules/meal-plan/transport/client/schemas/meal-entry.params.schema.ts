import { z } from "zod";

export const MealEntryParamsSchema = z.object({
  id: z.string().uuid(),
});
