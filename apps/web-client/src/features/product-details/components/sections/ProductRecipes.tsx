"use client";

import { useState } from "react";
import { useProductRecipes } from "../../hooks/useProductRecipes";
import { RecipeSearchItem } from "@/features/food-picker/components/sections/RecipeSearchItem";
import { Pagination } from "@/shared/ui/table/Pagination";

export function ProductRecipes({ productId }: { productId: string }) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useProductRecipes(productId, page);

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Завантаження...</div>;
  }

  if (!data || data.items.length === 0) {
    return <div className="p-4 text-sm text-gray-400">Немає рецептів</div>;
  }

  const totalPages = Math.ceil(data.total / data.limit);

  return (
    <div className="px-4 mt-4 space-y-3">
      {data.items.map((recipe) => (
        <RecipeSearchItem
          key={recipe.id}
          item={recipe}
          selected={false}
          onToggle={() => {}}
          onOpen={() => console.log("open", recipe.id)}
        />
      ))}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
