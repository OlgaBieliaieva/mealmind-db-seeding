"use server";

import { revalidatePath } from "next/cache";
import { createMenuEntry } from "@/lib/v1/menu-entries/menu-entries.write";

type Input = {
  planId: string;
  recipeId: string;
  date: string;
  mealTypeId: number;
  userId: string;
  plannedWeight: number;
};

export async function createRecipeEntry(input: Input) {
  await createMenuEntry({
    menu_plan_id: input.planId,
    date: input.date,
    user_id: input.userId,
    meal_type_id: input.mealTypeId,
    entry_type: "recipe",
    entry_id: input.recipeId,
    planned_weight_g: input.plannedWeight,
    quantity_g: null,
  });

  revalidatePath("/plan");
}
