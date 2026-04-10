import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { RecipeCreateSchema } from "../schemas/recipe.create.schema";

// 🔥 RHF працює з INPUT типом (де можливі undefined)
export type RecipeFormInput = z.input<typeof RecipeCreateSchema>;

// (опціонально, але корисно мати)
export type RecipeFormOutput = z.output<typeof RecipeCreateSchema>;

type RecipeFormContextValue = {
  form: UseFormReturn<RecipeFormInput>;
  mode: "create" | "edit";
};

export const RecipeFormContext = createContext<RecipeFormContextValue | null>(
  null,
);

export function useRecipeFormContext() {
  const ctx = useContext(RecipeFormContext);

  if (!ctx) {
    throw new Error("useRecipeFormContext must be used inside RecipeForm");
  }

  return ctx;
}
