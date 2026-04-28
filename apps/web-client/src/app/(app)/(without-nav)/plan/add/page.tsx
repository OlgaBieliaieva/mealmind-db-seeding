"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { AddEntryHeader } from "@/features/meal-plan/add/components/AddEntryHeader";
import { AddTabs } from "@/features/meal-plan/add/components/AddTabs";
import { SearchList } from "@/features/meal-plan/add/components/SearchList";
import { UserPickerSheet } from "@/features/meal-plan/add/components/UserPickerSheet";
import { MealTypePickerSheet } from "@/features/meal-plan/add/components/MealTypePickerSheet";
import { TabType } from "@/features/meal-plan/add/types/add-meal-plan.types";

export default function AddMealPage() {
  const params = useSearchParams();

  const date = params.get("date") ?? "";
  const initialMealTypeId = params.get("mealTypeId");

  const [activeTab, setActiveTab] = useState<TabType>("cookbook");

  // 🔥 CONTEXT STATE
  const [userId, setUserId] = useState<string | null>(null);
  const [mealTypeId, setMealTypeId] = useState<string | null>(
    initialMealTypeId,
  );

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [isUserSheetOpen, setUserSheetOpen] = useState(false);
  const [isMealSheetOpen, setMealSheetOpen] = useState(false);
  const canConfirm = Boolean(userId && mealTypeId && selectedItems.length > 0);

  // 🔥 MOCK (потім API)
  const users = [
    { id: "1", name: "Оля", avatarUrl: "" },
    { id: "2", name: "Іван", avatarUrl: "" },
  ];

  const mealTypes = [
    { id: "breakfast", name: "Сніданок" },
    { id: "lunch", name: "Обід" },
    { id: "dinner", name: "Вечеря" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AddEntryHeader
        users={users}
        mealTypes={mealTypes}
        selectedUserId={userId}
        selectedMealTypeId={mealTypeId}
        date={date}
        selectedCount={selectedItems.length}
        canConfirm={canConfirm}
        onUserClick={() => setUserSheetOpen(true)}
        onMealTypeClick={() => setMealSheetOpen(true)}
        onConfirm={() =>
          console.log("CONFIRM", { userId, mealTypeId, selectedItems })
        }
      />

      <AddTabs active={activeTab} onChange={setActiveTab} />

      <SearchList
        activeTab={activeTab}
        selectedItems={selectedItems}
        onToggle={(id) => {
          setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
          );
        }}
      />

      {/* 🔥 USER PICKER */}
      <UserPickerSheet
        open={isUserSheetOpen}
        users={users}
        selectedUserId={userId}
        onClose={() => setUserSheetOpen(false)}
        onSelect={(id) => {
          setUserId(id);
          setUserSheetOpen(false);
        }}
      />

      <MealTypePickerSheet
        open={isMealSheetOpen}
        mealTypes={mealTypes}
        selectedMealTypeId={mealTypeId}
        onClose={() => setMealSheetOpen(false)}
        onSelect={(id) => {
          setMealTypeId(id);
          setMealSheetOpen(false);
        }}
      />
    </div>
  );
}
