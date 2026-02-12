"use client";

import { useState } from "react";
import ViewToggle from "./ViewToggle";
import ByMembersLayout from "./ByMembersLayout";
import ByMealsLayout from "./ByMealsLayout";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
};

export default function PlanLayout({ members, mealTypes }: Props) {
  const [mode, setMode] = useState<"members" | "meals">("members");

  return (
    <div className="space-y-4">
      <ViewToggle mode={mode} setMode={setMode} />

      {mode === "members" ? (
        <ByMembersLayout members={members} mealTypes={mealTypes} />
      ) : (
        <ByMealsLayout members={members} mealTypes={mealTypes} />
      )}
    </div>
  );
}
