import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { RecipeCreateInput } from "../schemas/recipe.create.schema";

type RecipeFormContextValue = {
  form: UseFormReturn<RecipeCreateInput>;
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
