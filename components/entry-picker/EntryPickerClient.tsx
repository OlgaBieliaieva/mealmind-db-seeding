"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EntryPickerHeader from "./EntryPickerHeader";
import EntryTabs, { EntryTab } from "./EntryTabs";
import EntryList from "./EntryList";
import { FamilyMember } from "@/lib/families/family-members.read";
import { RecipeListItem } from "@/lib/recipes.read";
import { ProductListItem } from "@/lib/products.read";
import { SelectedEntry } from "@/types/entry-picker";
import { saveMenuEntries } from "@/app/admin/menu-plans/[id]/add-entry/action";

type Props = {
  dayId: string;
  mealTypeId: number;
  mealName: string;
  members: FamilyMember[];
  initialUserId: string | null;
  recipes: RecipeListItem[];
  products: ProductListItem[];
  familyId: string;
};

export default function EntryPickerClient({
  dayId,
  mealTypeId,
  mealName,
  members,
  initialUserId,
  recipes,
  products,
  familyId,
}: Props) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<EntryTab>("cookbook");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialUserId,
  );

  const [selectedItems, setSelectedItems] = useState<SelectedEntry[]>([]);

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
      menu_day_id: dayId,
      meal_type_id: mealTypeId,
      user_id: selectedUserId,
      items: selectedItems,
    });

    router.back();
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
        familyId={familyId}
        selectedItems={selectedItems}
        onToggle={toggleItem}
      />
    </div>
  );
}
