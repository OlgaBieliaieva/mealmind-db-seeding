"use client";

import { EntryTab } from "@/components/entry-picker/EntryTabs";
import EntryCard from "@/components/entry-picker/EntryCard";
import { SelectedEntry } from "@/types/entry-picker";
import { RecipeListItem } from "@/lib/recipes.read";
import { ProductListItem } from "@/lib/products.read";
import { PickerItem } from "@/types/entry-picker";
import { ProductFavorite } from "@/types/product-favorite.dto";

type Props = {
  activeTab: EntryTab;
  recipes: RecipeListItem[];
  products: ProductListItem[];
  favorites: ProductFavorite[];
  familyId: string;
  selectedItems: SelectedEntry[];
  onToggle: (item: SelectedEntry) => void;
};

export default function EntryList({
  activeTab,
  recipes,
  products,
  favorites,
  familyId,
  selectedItems,
  onToggle,
}: Props) {
  let items: PickerItem[] = [];

  if (activeTab === "cookbook") {
    items = recipes
      .filter((r) => r.family_id === familyId)
      .map((r) => ({
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
      .filter((p) => favorites.some((f) => f.product_id === p.product_id))
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
