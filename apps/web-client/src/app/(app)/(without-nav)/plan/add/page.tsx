"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { useMealTypes } from "@/shared/lib/hooks/useMealTypes";
import { useFamilyMembers } from "@/shared/lib/hooks/useFamilyMembers";

import { AddEntryHeader } from "@/features/meal-plan/add/components/AddEntryHeader";
import { FoodPicker } from "@/features/food-picker/components/FoodPicker";

import { UserPickerSheet } from "@/features/meal-plan/add/components/UserPickerSheet";
import { MealTypePickerSheet } from "@/features/meal-plan/add/components/MealTypePickerSheet";
import { SelectedItem } from "@/features/meal-plan/add/types/add-meal-plan.types";

function AddMealPageContent() {
  const params = useSearchParams();

  const date = params.get("date") ?? "";
  const initialMealTypeId = params.get("mealTypeId");

  // 🔥 CONTEXT STATE
  const [userId, setUserId] = useState<string | null>(null);
  const [mealTypeId, setMealTypeId] = useState<string | null>(
    initialMealTypeId,
  );

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const [isUserSheetOpen, setUserSheetOpen] = useState(false);
  const [isMealSheetOpen, setMealSheetOpen] = useState(false);
  const canConfirm = Boolean(userId && mealTypeId && selectedItems.length > 0);

  const { data: mealTypes } = useMealTypes();
  const mappedMealTypes =
    mealTypes?.map((m) => ({
      id: m.id,
      name: m.name,
    })) ?? [];

  const { data: users } = useFamilyMembers();
  const mappedUsers =
    users?.map((u) => ({
      id: u.id,
      name: u.name,
      avatarUrl: u.avatarUrl ?? "",
    })) ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-50">
      <AddEntryHeader
        users={mappedUsers}
        mealTypes={mappedMealTypes}
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

      <div className="flex-1 min-h-0 overflow-hidden">
        <FoodPicker selectedItems={selectedItems} onChange={setSelectedItems} />
      </div>

      <UserPickerSheet
        open={isUserSheetOpen}
        users={mappedUsers}
        selectedUserId={userId}
        onClose={() => setUserSheetOpen(false)}
        onSelect={(id) => {
          setUserId(id);
          setUserSheetOpen(false);
        }}
      />

      <MealTypePickerSheet
        open={isMealSheetOpen}
        mealTypes={mappedMealTypes}
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

export default function AddMealPage() {
  return (
    <Suspense fallback={null}>
      <AddMealPageContent />
    </Suspense>
  );
}
