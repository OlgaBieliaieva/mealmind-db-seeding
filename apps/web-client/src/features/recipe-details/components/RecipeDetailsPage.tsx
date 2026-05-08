"use client";

import { useState } from "react";
import { useRecipeDetails } from "../hooks/useRecipeDetails";

import { RecipeHero } from "./sections/RecipeHero";
import { ProductContentSheet } from "@/features/product-details/components/sections/ProductContentSheet";
import { RecipeHeaderCard } from "./sections/RecipeHeaderCard";
import { RecipeTabs } from "./sections/RecipeTabs";

import { RecipeOverview } from "./sections/RecipeOverview/RecipeOverview";
import { RecipeVideoSection } from "./sections/RecipeVideoSection/RecipeVideoSection";
import { RecipeSourceSection } from "./sections/RecipeSourceSection/RecipeSourceSection";
import { RecipeIngredients } from "./sections/RecipeIngredients/RecipeIngredients";
import { RecipeSteps } from "./sections/RecipeSteps/RecipeSteps";
import { RecipeNutrients } from "./sections/RecipeNutrients/RecipeNutrients";
import { FoodActionButton } from "@/features/product-details/components/actions/FoodActionButton";
import { FoodActionSheet } from "@/features/product-details/components/actions/FoodActionSheet";

export function RecipeDetailsPage({ id }: { id: string }) {
  const { data, isLoading } = useRecipeDetails(id);
  const [tab, setTab] = useState("overview");
  const [isActionOpen, setActionOpen] = useState(false);

  if (isLoading || !data) {
    return <div className="p-4">Завантаження...</div>;
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gray-50">
      <RecipeHero recipe={data} />

      <ProductContentSheet>
        <RecipeHeaderCard recipe={data} />

        <div className="sticky top-0 bg-white z-10">
          <RecipeTabs active={tab} onChange={setTab} />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {tab === "overview" && (
            <div className="pb-16">
              <RecipeOverview recipe={data} />
              <RecipeVideoSection videos={data.videos} />
              <RecipeSourceSection
                sources={data.sources ? data.sources : undefined}
                originalRecipe={data.originalRecipe}
              />
            </div>
          )}
          {tab === "ingredients" && <RecipeIngredients recipe={data} />}
          {tab === "steps" && <RecipeSteps recipe={data} />}
          {tab === "nutrients" && <RecipeNutrients recipe={data} />}
        </div>
      </ProductContentSheet>

      <FoodActionButton onClick={() => setActionOpen(true)} />

      <FoodActionSheet
        open={isActionOpen}
        onClose={() => setActionOpen(false)}
        // recipe={data}
      />
    </div>
  );
}
