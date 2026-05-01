"use client";

import { useState } from "react";
import { useProductDetails } from "../hooks/useProductDetails";

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
    <div className="pb-24 bg-gray-50 min-h-screen">
      <ProductHero product={data} />
      <ProductHeaderCard product={data} />

      <ProductTabs active={tab} onChange={setTab} />

      {tab === "overview" && <ProductOverview product={data} />}
      {tab === "nutrients" && <ProductNutrients product={data} />}
      {tab === "recipes" && <ProductRecipes productId={id} />}

      <FoodActionButton onClick={() => setActionOpen(true)} />

      <FoodActionSheet
        open={isActionOpen}
        onClose={() => setActionOpen(false)}
        // product={product}
      />
    </div>
  );
}
