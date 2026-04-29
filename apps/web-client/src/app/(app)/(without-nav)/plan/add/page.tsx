"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useMealTypes } from "@/shared/lib/hooks/useMealTypes";
import { useFamilyMembers } from "@/shared/lib/hooks/useFamilyMembers";

import { AddEntryHeader } from "@/features/meal-plan/add/components/AddEntryHeader";
import { AddTabs } from "@/features/meal-plan/add/components/AddTabs";
import { SearchList } from "@/features/meal-plan/add/components/SearchList";
import { UserPickerSheet } from "@/features/meal-plan/add/components/UserPickerSheet";
import { MealTypePickerSheet } from "@/features/meal-plan/add/components/MealTypePickerSheet";
import { TabType } from "@/features/meal-plan/add/types/add-meal-plan.types";
import { SelectedItem } from "@/features/meal-plan/add/types/add-meal-plan.types";

function AddMealPageContent() {
  const [query, setQuery] = useState("");
  const params = useSearchParams();
  const debouncedQuery = useDebounce(query, 300);
  const date = params.get("date") ?? "";
  const initialMealTypeId = params.get("mealTypeId");

  const [activeTab, setActiveTab] = useState<TabType>("cookbook");

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
    <div className="min-h-screen bg-gray-50 pb-20">
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

      <AddTabs active={activeTab} onChange={setActiveTab} />

      <div className=" pt-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук страв або продуктів..."
          className="
      w-full
      rounded-xl
      border
      px-3 py-2
      text-sm
      outline-none
      focus:ring-2 focus:ring-green-500
    "
        />
      </div>
      <SearchList
        key={`${activeTab}-${debouncedQuery}`}
        activeTab={activeTab}
        query={debouncedQuery}
        selectedItems={selectedItems}
        onToggle={(item) => {
          setSelectedItems((prev) => {
            const exists = prev.some(
              (i) => i.id === item.id && i.type === item.type,
            );

            if (exists) {
              return prev.filter(
                (i) => !(i.id === item.id && i.type === item.type),
              );
            }

            return [...prev, item];
          });
        }}
      />

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
