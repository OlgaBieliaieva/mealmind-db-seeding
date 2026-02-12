"use client";

import { useState } from "react";
import Image from "next/image";
import { FamilyMember } from "@/lib/families/family-members.read";
import { MealType } from "@/lib/meal-types/meal-types.read";
import { MenuEntry } from "@/types/menu-entry";

type Props = {
  members: FamilyMember[];
  mealTypes: MealType[];
  entries: MenuEntry[];
  activeDayId?: string;
};

type AggregatedEntry = {
  entry_type: "recipe" | "product";
  entry_id: string;

  portions: number; // загальна кількість menu_entries
  totalWeight: number; // загальна вага

  users: {
    user_id: string;
    portions: number; // кількість порцій цього user
    totalWeight: number; // сума ваг цього user
  }[];
};

export default function ByMealsLayout({
  members,
  mealTypes,
  entries,
  activeDayId,
}: Props) {
  return (
    <div className="space-y-4">
      {mealTypes.map((meal) => {
        // 1️⃣ Filter entries for this meal + active day
        const mealEntries = entries.filter(
          (entry) =>
            entry.menu_day_id === activeDayId &&
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
              users: [],
            });
          }

          const group = groupedMap.get(key)!;

          // 1️⃣ Загальна кількість порцій
          group.portions += 1;

          const weight = entry.servings ?? entry.quantity ?? 0;

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
            <div className="bg-green-200 px-4 py-3">
              <span className="font-medium text-gray-800">{meal.name_ua}</span>
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
}: {
  item: AggregatedEntry;
  members: FamilyMember[];
}) {
  const [open, setOpen] = useState(false);
  console.log(item);

  const amountLabel = [
    `${item.portions} порцій`,
    item.totalWeight > 0 ? `${item.totalWeight} г` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="border-t py-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-start text-left"
      >
        <div className="flex-1">
          {/* Title */}
          <div className="text-sm font-medium text-gray-700">
            {item.entry_type} — {item.entry_id}
          </div>

          {/* Aggregated info */}
          <div className="text-xs text-gray-400 mt-1">{amountLabel}</div>

          {/* Avatars in header (ONLY when closed) */}
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
                {/* Avatar */}
                <div className="relative w-6 h-6 rounded-full overflow-hidden border bg-gray-200">
                  <Image
                    src={src}
                    alt={member.first_name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>

                {/* Name + amount */}
                <span>
                  {member.first_name} — {user.portions} порцій ·{" "}
                  {user.totalWeight} г
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
