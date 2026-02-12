"use client";

import { useState } from "react";
import ViewToggle from "./ViewToggle";
import ByMembersLayout from "./ByMembersLayout";
import ByMealsLayout from "./ByMealsLayout";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
};

export default function PlanLayout({ members, mealTypes, entries }: Props) {
  const [mode, setMode] = useState<"members" | "meals">("members");

  return (
    <div className="space-y-4">
      <ViewToggle mode={mode} setMode={setMode} />

      {mode === "members" ? (
        <ByMembersLayout
          members={members}
          mealTypes={mealTypes}
          entries={entries}
        />
      ) : (
        <ByMealsLayout
          members={members}
          mealTypes={mealTypes}
          entries={entries}
        />
      )}
    </div>
  );
}
