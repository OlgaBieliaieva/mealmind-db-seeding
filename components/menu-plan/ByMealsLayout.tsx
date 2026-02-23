"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  planId: string;
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
  recipeWeightMap: Record<string, number>;
  productUnitMap: Record<string, string>;
};

type AggregatedEntry = {
  entry_type: "recipe" | "product";
  entry_id: string;

  portions: number; // загальна кількість menu_entries
  totalWeight: number; // загальна вага
  unit?: string;
  users: {
    user_id: string;
    portions: number; // кількість порцій цього user
    totalWeight: number; // сума ваг цього user
  }[];
};

export default function ByMealsLayout({
  planId,
  members,
  mealTypes,
  entries,
  activeDayId,
  recipesMap,
  productsMap,
  recipeWeightMap,
  productUnitMap,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "members";
  return (
    <div className="space-y-4">
      {mealTypes.map((meal) => {
        // 1️⃣ Filter entries for this meal + active day
        const mealEntries = entries.filter(
          (entry) =>
            entry.date === activeDayId &&
            entry.meal_type_id === meal.meal_type_id,
        );

        // 2️⃣ Group by entry_id + entry_type
        const groupedMap = new Map<string, AggregatedEntry>();

        mealEntries.forEach((entry) => {
          const key = `${entry.entry_type}-${entry.entry_id}`;

          if (!groupedMap.has(key)) {
            groupedMap.set(key, {
              entry_type: entry.entry_type,
              entry_id: entry.entry_id,
              portions: 0,
              totalWeight: 0,
              unit:
                entry.entry_type === "product"
                  ? (productUnitMap[entry.entry_id] ?? "г")
                  : "г",
              users: [],
            });
          }

          const group = groupedMap.get(key)!;

          // 1️⃣ Загальна кількість порцій
          group.portions += 1;

          let weight = 0;

          if (entry.entry_type === "recipe") {
            const weightPerServing = recipeWeightMap[entry.entry_id] ?? 0;

            weight = (entry.servings ?? 0) * weightPerServing;
          }

          if (entry.entry_type === "product") {
            weight = entry.quantity ?? 0;
          }

          group.totalWeight += weight;

          // 2️⃣ Групування по користувачу
          const existingUser = group.users.find(
            (u) => u.user_id === entry.user_id,
          );

          if (existingUser) {
            existingUser.portions += 1;
            existingUser.totalWeight += weight;
          } else {
            group.users.push({
              user_id: entry.user_id,
              portions: 1,
              totalWeight: weight,
            });
          }
        });

        const aggregatedEntries = Array.from(groupedMap.values());

        return (
          <div
            key={meal.meal_type_id}
            className="rounded-2xl overflow-hidden border bg-white"
          >
            {/* Meal header */}
            <div className="w-full flex justify-between items-center bg-green-200 px-4 py-3">
              <span className="font-medium text-gray-800">{meal.name_ua}</span>
              <button
                onClick={() => {
                  if (!activeDayId) return;

                  router.push(
                    `/admin/menu-plans/${planId}/add-entry?date=${activeDayId}&mealTypeId=${meal.meal_type_id}&view=${view}`,
                  );
                }}
                className="text-green-700 font-medium"
              >
                +
              </button>
            </div>

            <div className="px-4">
              {aggregatedEntries.length === 0 ? (
                <div className="border-t py-3 text-sm text-gray-400">
                  No meals planned
                </div>
              ) : (
                aggregatedEntries.map((item) => (
                  <AggregatedEntryBlock
                    key={`${item.entry_type}-${item.entry_id}`}
                    item={item}
                    members={members}
                    recipesMap={recipesMap}
                    productsMap={productsMap}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AggregatedEntryBlock({
  item,
  members,
  recipesMap,
  productsMap,
}: {
  item: AggregatedEntry;
  members: FamilyMember[];
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);

  const unit = item.unit ?? "г";

  const amountLabel = [
    `${item.portions} порцій`,
    item.totalWeight > 0 ? `${Math.round(item.totalWeight)} ${unit}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const title =
    item.entry_type === "recipe"
      ? recipesMap[item.entry_id]
      : productsMap[item.entry_id];

  const icon = item.entry_type === "recipe" ? "🍳" : "🛒";

  return (
    <div className="border-t py-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-start text-left"
      >
        <div className="flex-1">
          {/* Title row with icon */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span>{icon}</span>
            <span>{title ?? item.entry_id}</span>
          </div>

          {/* Aggregated info */}
          <div className="text-xs text-gray-400 mt-1">{amountLabel}</div>

          {/* Avatars (only when closed) */}
          {!open && (
            <div className="flex -space-x-2 mt-2">
              {item.users.map((user) => {
                const member = members.find((m) => m.user_id === user.user_id);
                if (!member) return null;

                const defaultAvatar =
                  member.sex === "female"
                    ? "/avatars/default-female.jpg"
                    : "/avatars/default-male.jpg";

                const src = member.avatar_url || defaultAvatar;

                return (
                  <div
                    key={user.user_id}
                    className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-200"
                    title={member.first_name}
                  >
                    <Image
                      src={src}
                      alt={member.first_name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <span className="text-gray-400 ml-3">{open ? "▴" : "▾"}</span>
      </button>

      {/* Detailed per user */}
      {open && (
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          {item.users.map((user) => {
            const member = members.find((m) => m.user_id === user.user_id);
            if (!member) return null;

            const defaultAvatar =
              member.sex === "female"
                ? "/avatars/default-female.jpg"
                : "/avatars/default-male.jpg";

            const src = member.avatar_url || defaultAvatar;

            return (
              <div key={user.user_id} className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border bg-gray-200">
                  <Image
                    src={src}
                    alt={member.first_name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>

                <span>
                  {member.first_name} — {user.portions} порцій ·{" "}
                  {Math.round(user.totalWeight)} {item.unit ?? "г"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
