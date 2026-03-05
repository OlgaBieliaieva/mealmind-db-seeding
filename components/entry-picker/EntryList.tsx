"use client";

import { EntryTab } from "@/components/entry-picker/EntryTabs";
import EntryCard from "@/components/entry-picker/EntryCard";
import { SelectedEntry } from "@/types/entry-picker";
import { RecipeListItem } from "@/lib/v1/recipes.read";
import { ProductListItem } from "@/lib/v1/products.read";
import { PickerItem } from "@/types/entry-picker";

type Props = {
  activeTab: EntryTab;
  recipes: RecipeListItem[];
  products: ProductListItem[];

  selectedItems: SelectedEntry[];
  onToggle: (item: SelectedEntry) => void;

  recipeMap: Record<string, boolean>;
  productMap: Record<string, boolean>;

  toggleRecipe: (id: string) => void;
  toggleProduct: (id: string) => void;

  selectedUserId: string | null;
  familyId: string;
  planId: string;
  date: string;
  mealTypeId: number;
};

export default function EntryList({
  activeTab,
  recipes,
  products,
  productMap,
  recipeMap,
  toggleRecipe,
  toggleProduct,
  selectedUserId,
  familyId,
  selectedItems,
  onToggle,
  planId,
  date,
  mealTypeId,
}: Props) {
  let items: PickerItem[] = [];

  if (activeTab === "cookbook") {
    const familyRecipes = recipes.filter((r) => r.family_id === familyId);

    const favoritePublicRecipes = recipes.filter(
      (r) =>
        r.visibility === "public" &&
        recipeMap[r.recipe_id] &&
        r.family_id !== familyId,
    );

    const combined = [...familyRecipes, ...favoritePublicRecipes];

    // Уникнення дублікатів
    const unique = Array.from(
      new Map(combined.map((r) => [r.recipe_id, r])).values(),
    );

    items = unique.map((r) => ({
      type: "recipe",
      id: r.recipe_id,
      title: r.title,
    }));
  }

  if (activeTab === "recipes") {
    items = recipes
      .filter((r) => r.visibility === "public")
      .map((r) => ({
        type: "recipe",
        id: r.recipe_id,
        title: r.title,
      }));
  }

  if (activeTab === "products") {
    items = products.map((p) => ({
      type: "product",
      id: p.product_id,
      title: p.name_ua,
    }));
  }

  if (activeTab === "favorites") {
    items = products
      .filter((p) => productMap[p.product_id])
      .map((p) => ({
        type: "product",
        id: p.product_id,
        title: p.name_ua,
      }));
  }

  return (
    <div className="p-4 space-y-3">
      {items.length === 0 ? (
        <div className="text-sm text-gray-400">Нічого не знайдено</div>
      ) : (
        items.map((item) => (
          <EntryCard
            key={`${item.type}-${item.id}`}
            item={item}
            selectedUserId={selectedUserId}
            recipeMap={recipeMap}
            productMap={productMap}
            planId={planId}
            date={date}
            mealTypeId={mealTypeId}
            toggleRecipe={toggleRecipe}
            toggleProduct={toggleProduct}
            checked={selectedItems.some(
              (i) => i.entry_id === item.id && i.entry_type === item.type,
            )}
            onToggle={() =>
              onToggle({
                entry_type: item.type,
                entry_id: item.id,
              })
            }
          />
        ))
      )}
    </div>
  );
}
