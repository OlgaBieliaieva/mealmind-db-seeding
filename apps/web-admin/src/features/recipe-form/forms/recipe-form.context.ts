import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { RecipeCreateSchema } from "../schemas/recipe.create.schema";


export type RecipeFormInput = z.input<typeof RecipeCreateSchema>;


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
