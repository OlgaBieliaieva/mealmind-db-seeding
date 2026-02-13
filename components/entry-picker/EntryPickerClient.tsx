"use client";

import { useState } from "react";
import EntryPickerHeader from "./EntryPickerHeader";
import EntryTabs, { EntryTab } from "./EntryTabs";
import EntryList from "./EntryList";
import { FamilyMember } from "@/lib/families/family-members.read";
import { RecipeListItem } from "@/lib/recipes.read";
import { ProductListItem } from "@/lib/products.read";

type Props = {
  mealName: string;
  members: FamilyMember[];
  initialUserId: string | null;
  recipes: RecipeListItem[];
  products: ProductListItem[];
  familyId: string;
};

export default function EntryPickerClient({
  mealName,
  members,
  initialUserId,
  recipes,
  products,
  familyId,
}: Props) {
  const [activeTab, setActiveTab] = useState<EntryTab>("cookbook");

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryPickerHeader
        mealName={mealName}
        members={members}
        initialUserId={initialUserId}
      />

      <EntryTabs activeTab={activeTab} onChange={setActiveTab} />

      <EntryList
        activeTab={activeTab}
        recipes={recipes}
        products={products}
        familyId={familyId}
      />
    </div>
  );
}
