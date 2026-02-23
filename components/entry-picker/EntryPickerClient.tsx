"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecipeFavoritesMap } from "@/lib/hooks/useRecipeFavoritesMap";
import { useProductFavoritesMap } from "@/lib/hooks/useProductFavoritesMap";
import EntryPickerHeader from "./EntryPickerHeader";
import EntryTabs, { EntryTab } from "./EntryTabs";
import EntryList from "./EntryList";
import { FamilyMember } from "@/lib/families/family-members.read";
import { RecipeListItem } from "@/lib/recipes.read";
import { ProductListItem } from "@/lib/products.read";
import { SelectedEntry } from "@/types/entry-picker";
import { saveMenuEntries } from "@/app/admin/menu-plans/[id]/add-entry/action";

type Props = {
  planId: string;
  date: string;
  mealTypeId: number;
  mealName: string;
  members: FamilyMember[];
  initialUserId: string | null;
  recipes: RecipeListItem[];
  products: ProductListItem[];
  familyId: string;
};

export default function EntryPickerClient({
  planId,
  date,
  mealTypeId,
  mealName,
  members,
  initialUserId,
  recipes,
  products,
  familyId,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<EntryTab>("cookbook");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialUserId,
  );

  const [selectedItems, setSelectedItems] = useState<SelectedEntry[]>([]);

  const { map: recipeMap, toggle: toggleRecipe } = useRecipeFavoritesMap(
    selectedUserId ?? "",
    familyId,
  );

  const { map: productMap, toggle: toggleProduct } = useProductFavoritesMap(
    selectedUserId ?? "",
    familyId,
  );

  const toggleItem = (item: SelectedEntry) => {
    setSelectedItems((prev) => {
      const exists = prev.some(
        (i) => i.entry_id === item.entry_id && i.entry_type === item.entry_type,
      );

      if (exists) {
        return prev.filter(
          (i) =>
            !(i.entry_id === item.entry_id && i.entry_type === item.entry_type),
        );
      }

      return [...prev, item];
    });
  };

  const handleConfirm = async () => {
    if (selectedItems.length === 0) {
      router.back();
      return;
    }

    if (!selectedUserId) {
      alert("Оберіть користувача");
      return;
    }

    await saveMenuEntries({
      menu_plan_id: planId,
      date: date,
      meal_type_id: mealTypeId,
      user_id: selectedUserId,
      items: selectedItems,
    });

    const params = new URLSearchParams(searchParams.toString());
    router.replace(`/plan?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryPickerHeader
        mealName={mealName}
        members={members}
        selectedUserId={selectedUserId}
        onUserChange={setSelectedUserId}
        selectedCount={selectedItems.length}
        onConfirm={handleConfirm}
      />

      <EntryTabs activeTab={activeTab} onChange={setActiveTab} />

      <EntryList
        activeTab={activeTab}
        recipes={recipes}
        products={products}
        recipeMap={recipeMap}
        productMap={productMap}
        toggleRecipe={toggleRecipe}
        toggleProduct={toggleProduct}
        selectedUserId={selectedUserId}
        familyId={familyId}
        selectedItems={selectedItems}
        onToggle={toggleItem}
      />
    </div>
  );
}
