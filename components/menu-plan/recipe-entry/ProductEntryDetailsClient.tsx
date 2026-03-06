"use client";

import { useState } from "react";
import { useProductFavoritesMap } from "@/lib/v1/hooks/useProductFavoritesMap";
import { ProductInput } from "@/domains/product/schemas/product.schema";
import { MenuEntry } from "@/types/menu-entry";
import EntryHeader from "./EntryHeader";
import ProductInfoBlock from "./ProductInfoBlock";
import PlanningForm from "../recipe-entry/PlanningForm";

type Props = {
  formMode: "create" | "edit";
  planId: string;
  product: ProductInput;
  date: string;
  mealTypes: { meal_type_id: number; name_ua: string }[];
  initialMealTypeId: number;
  weekLabel: string;
  members: { user_id: string; first_name: string }[];
  fullWeek: string[];
  existingEntry?: MenuEntry;
};

const ADMIN_USER_ID = "9f3c2d44-6a91-4e5e-b8f3-2a1d7c0b5e11";
const ADMIN_FAMILY_ID = "c1d8e7f4-3b29-4a6c-8e15-7f0a2b9d6e33";

export default function ProductEntryDetailsClient({
  formMode,
  planId,
  product,
  date,
  mealTypes,
  initialMealTypeId,
  weekLabel,
  members,
  fullWeek,
  existingEntry,
}: Props) {
  const [selectedMealTypeId, setSelectedMealTypeId] =
    useState(initialMealTypeId);

  const { map, toggle } = useProductFavoritesMap(
    ADMIN_USER_ID,
    ADMIN_FAMILY_ID,
  );
  const isFavorite = product.product_id
    ? Boolean(map[product.product_id])
    : false;

  const baseWeight = product.unit === "pcs" ? 1 : 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryHeader
        weekLabel={weekLabel}
        mealTypes={mealTypes}
        selectedMealTypeId={selectedMealTypeId}
        onMealTypeChange={setSelectedMealTypeId}
      />
      <ProductInfoBlock
        product={product}
        isFavorite={isFavorite}
        onToggleFavorite={() => toggle(product.product_id ?? "")}
      />
      <PlanningForm
        formMode={formMode}
        planId={planId}
        entryType="product"
        entryId={product.product_id!}
        mealTypeId={selectedMealTypeId}
        members={members}
        defaultWeight={baseWeight}
        baseWeight={baseWeight}
        unit={product.unit}
        nutrients={product.nutrients ?? {}}
        fullWeek={fullWeek}
        date={date}
        existingEntry={existingEntry}
      />
    </div>
  );
}
