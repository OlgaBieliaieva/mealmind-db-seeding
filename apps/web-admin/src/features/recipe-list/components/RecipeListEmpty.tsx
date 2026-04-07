"use client";

import { PageEmpty } from "@/shared/ui/page/PageEmpty";
import { RECIPE_ADMIN_LABELS } from "../constants/recipe.admin.labels";

export function RecipeListEmpty() {
  return (
    <PageEmpty
      title={RECIPE_ADMIN_LABELS.empty.title}
      description={RECIPE_ADMIN_LABELS.empty.description}
    />
  );
}
