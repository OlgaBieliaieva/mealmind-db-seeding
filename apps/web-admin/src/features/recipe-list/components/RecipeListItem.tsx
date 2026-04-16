"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RecipeListItemDto } from "../types/recipe-list.types";
import { Badge } from "@/shared/ui/badge/Badge";
import {
  getRecipeStatusLabel,
  getRecipeStatusVariant,
} from "../adapters/recipe-status.adapter";

type Props = {
  recipe: RecipeListItemDto;
};

export function RecipeListItem({ recipe }: Props) {
  const params = useSearchParams();

  const returnTo = `/admin/recipes?${params.toString()}`;

  return (
    <Link
      href={`/admin/recipes/${recipe.recipe_id}?returnTo=${encodeURIComponent(returnTo)}`}
    >
      <div className="flex items-center justify-between border px-4 py-3 last:border-b-0 hover:bg-gray-50 cursor-pointer">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {recipe.photo_url ? (
            <Image
              src={recipe.photo_url}
              alt={recipe.title}
              width={40}
              height={40}
              className="h-10 w-10 rounded object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded bg-gray-200" />
          )}

          <div>
            <div className="font-medium">{recipe.title}</div>

            <div className="text-xs text-gray-500">
              {recipe.recipe_type ?? "—"}
              {recipe.calories_per_100g && (
                <> • {Math.round(recipe.calories_per_100g)} kcal/100г</>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <Badge variant={getRecipeStatusVariant(recipe.status)}>
            {getRecipeStatusLabel(recipe.status)}
          </Badge>

          <div className="text-sm text-gray-500">{recipe.visibility}</div>
        </div>
      </div>
    </Link>
  );
}
