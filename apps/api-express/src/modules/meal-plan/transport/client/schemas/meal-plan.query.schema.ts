import { z } from "zod";

export const MealPlanQuerySchema = z.object({
  date: z.string().min(1),
});
