"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useFamilyMembers } from "@/shared/lib/hooks/useFamilyMembers";
import { useMealTypes } from "@/shared/lib/hooks/useMealTypes";
import { useFoodData } from "@/features/meal-plan/add/advanced/hooks/useFoodData";
import { useCreateMealEntries } from "@/features/meal-plan/add/hooks/useCreateMealEntries";

import { FoodPreviewCard } from "./FoodPreviewCard";
import { DaysSelector } from "./DaysSelector";
import { MealTypeSelector } from "./MealTypeSelector";
import { UserPortionSelector } from "./UserPortionSelector";
import { SummaryPreview } from "./SummaryPreview";

import { AdvancedAddHeader } from "./AdvancedAddHeader";
import { AdvancedAddFooter } from "./AdvancedAddFooter";

export type PortionItem = {
  userId: string;
  name: string;
  sex?: string;
  avatarUrl?: string;
  grams: number;
};

export default function AdvancedAddPage() {
  const router = useRouter();
  const params = useSearchParams();

  const date = params.get("date") ?? "";
  const recipeId = params.get("recipeId");
  const productId = params.get("productId");

  const { data: usersData } = useFamilyMembers();
  const users = usersData ?? [];

  const { data: mealTypesData } = useMealTypes();

  const mealTypes =
    mealTypesData?.map((m) => ({
      id: m.id,
      name: m.name,
    })) ?? [];

  const [selectedDays, setSelectedDays] = useState<string[]>([date]);
  const [portions, setPortions] = useState<PortionItem[]>([]);
  const [mealTypeId, setMealTypeId] = useState<string | null>(null);

  const { data: food } = useFoodData(recipeId, productId);
  const macros = food?.macros;

  const { mutate: createEntries, isPending } = useCreateMealEntries();

  function handleConfirm() {
    if (!mealTypeId) return;

    const entries = selectedDays.flatMap((day) =>
      portions.map((p) => ({
        date: day,
        userId: p.userId,
        mealTypeId,
        recipeId: recipeId ?? undefined,
        productId: productId ?? undefined,
        amount: p.grams,
        unit: "g" as const,
      })),
    );

    createEntries(
      { entries },
      {
        onSuccess: () => router.back(),
      },
    );
  }

  const entriesCount = selectedDays.length * portions.length;
  const totalGrams = portions.reduce((sum, p) => sum + p.grams, 0);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* HEADER */}
      <AdvancedAddHeader
        onBack={() => router.back()}
        title="Додати в план"
        subtitle="Оберіть дні, користувачів та порції"
      />

      {/* CONTENT */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        <FoodPreviewCard recipeId={recipeId} productId={productId} />

        <DaysSelector
          selectedDays={selectedDays}
          onChange={setSelectedDays}
          baseDate={date}
        />

        <MealTypeSelector
          mealTypes={mealTypes}
          selected={mealTypeId}
          onChange={setMealTypeId}
        />

        <UserPortionSelector
          users={users.map((u) => ({
            ...u,
            avatarUrl: u.avatarUrl ?? undefined,
          }))}
          portions={portions}
          onChange={setPortions}
          macrosPer100g={macros}
        />

        <SummaryPreview
          entriesCount={entriesCount}
          totalGrams={totalGrams}
          macrosPer100g={macros}
        />
      </div>

      {/* FOOTER */}
      <AdvancedAddFooter
        entriesCount={entriesCount}
        disabled={!entriesCount || !mealTypeId}
        loading={isPending}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
