"use client";

import { useState } from "react";
import ViewToggle from "./ViewToggle";
import ByMembersLayout from "./ByMembersLayout";
import ByMealsLayout from "./ByMealsLayout";
import DaySelector from "./DaySelector";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  planId: string;
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  fullWeek: string[];
  planDaysMap: Map<string, string>;
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
};

export default function PlanLayout({
  planId,
  members,
  mealTypes,
  entries,
  fullWeek,
  planDaysMap,
  recipesMap,
  productsMap,
}: Props) {
  const firstActiveDate =
    fullWeek.find((d) => planDaysMap.has(d)) ?? fullWeek[0];

  const [activeDate, setActiveDate] = useState<string>(firstActiveDate);

  const activeDayId = planDaysMap.get(activeDate);

  const [mode, setMode] = useState<"members" | "meals">("members");

  return (
    <div className="space-y-4">
      <DaySelector
        fullWeek={fullWeek}
        planDaysMap={planDaysMap}
        activeDate={activeDate}
        onDayChange={setActiveDate}
      />

      <ViewToggle mode={mode} setMode={setMode} />

      {mode === "members" ? (
        <ByMembersLayout
          planId={planId}
          members={members}
          mealTypes={mealTypes}
          entries={entries}
          activeDayId={activeDayId}
          recipesMap={recipesMap}
          productsMap={productsMap}
        />
      ) : (
        <ByMealsLayout
          planId={planId}
          members={members}
          mealTypes={mealTypes}
          entries={entries}
          activeDayId={activeDayId}
          recipesMap={recipesMap}
          productsMap={productsMap}
        />
      )}
    </div>
  );
}
