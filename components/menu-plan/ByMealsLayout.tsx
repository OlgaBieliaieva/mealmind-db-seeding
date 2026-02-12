"use client";

import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";
import MealBlock from "./MealBlock";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
};

export default function ByMealsLayout({
  members,
  mealTypes,
  entries,
  activeDayId,
}: Props) {
  return (
    <div className="space-y-4">
      {mealTypes.map((meal) => (
        <div
          key={meal.meal_type_id}
          className="rounded-2xl overflow-hidden border bg-white"
        >
          {/* Meal header */}
          <div className="bg-green-200 px-4 py-3">
            <span className="font-medium text-gray-800">{meal.name_ua}</span>
          </div>

          {/* Members inside meal */}
          <div className="px-4">
            {members.map((member) => {
              const filteredEntries = entries.filter(
                (entry) =>
                  entry.menu_day_id === activeDayId &&
                  entry.user_id === member.user_id &&
                  entry.meal_type_id === meal.meal_type_id,
              );

              return (
                <MealBlock
                  key={member.user_id}
                  title={member.first_name}
                  entries={filteredEntries}
                  onAdd={() => {
                    console.log("Add entry:", {
                      menu_day_id: activeDayId,
                      user_id: member.user_id,
                      meal_type_id: meal.meal_type_id,
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
