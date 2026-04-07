"use client";

import { RecipeListItem } from "./RecipeListItem";
import { RecipeListItemDto } from "../types/recipe-list.types";

type Props = {
  items: RecipeListItemDto[];
};

export function RecipeList({ items }: Props) {
  return (
    <div className="rounded border bg-white">
      {items.map((r) => (
        <RecipeListItem key={r.recipe_id} recipe={r} />
      ))}
    </div>
  );
}
