"use client";

import { useState } from "react";
import { useProductDetails } from "../hooks/useProductDetails";
import { ProductContentSheet } from "./sections/ProductContentSheet";
import { ProductHero } from "./sections/ProductHero";
import { ProductHeaderCard } from "./sections/ProductHeaderCard";
import { ProductTabs } from "./sections/ProductTabs";
import { ProductOverview } from "./sections/ProductOverview";
import { ProductNutrients } from "./sections/ProductNutrients";
import { ProductRecipes } from "./sections/ProductRecipes";
import { FoodActionButton } from "./actions/FoodActionButton";
import { FoodActionSheet } from "./actions/FoodActionSheet";

export function ProductDetailsPage({ id }: { id: string }) {
  const { data, isLoading } = useProductDetails(id);
  const [tab, setTab] = useState("overview");
  const [isActionOpen, setActionOpen] = useState(false);

  if (isLoading || !data) {
    return <div className="p-4">Завантаження...</div>;
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gray-50">
      <ProductHero product={data} />
      <ProductContentSheet>
        <ProductHeaderCard product={data} />

        <div className="sticky top-0 bg-white z-10">
          <ProductTabs active={tab} onChange={setTab} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto pb-16">
          {tab === "overview" && <ProductOverview product={data} />}
          {tab === "nutrients" && <ProductNutrients product={data} />}
          {tab === "recipes" && <ProductRecipes productId={id} />}
        </div>
      </ProductContentSheet>

      <FoodActionButton onClick={() => setActionOpen(true)} />

      <FoodActionSheet
        open={isActionOpen}
        onClose={() => setActionOpen(false)}
        productId={data.id}
      />
    </div>
  );
}
