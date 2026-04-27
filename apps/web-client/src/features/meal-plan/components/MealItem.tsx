"use client";

import Image from "next/image";
import { useToggleMealItem } from "../hooks/useToggleMealItem";
import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";

type Props = {
  item: AggregatedMealItemDTO;
};

const categoryIcons: Record<string, string> = {
  breakfast: "🍳",
  appetizers: "🥪",
  soups: "🍲",
  main_dishes: "🍝",
  sides: "🥔",
  salads: "🥗",
  bakery: "🥖",
  desserts: "🍰",
  sauces: "🫙",
  beverages: "🥤",
  snacks: "🍫",
  preserves: "🍯",
  baby_food: "🍼",
  medical: "⚕️",
};

function DifficultySignal({ level }: { level: "easy" | "medium" | "hard" }) {
  const map = {
    easy: 2,
    medium: 3,
    hard: 5,
  };

  const activeBars = map[level];

  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`
            w-[3px] rounded-sm transition-all
            ${i <= activeBars ? "bg-gray-800" : "bg-gray-300"}
          `}
          style={{
            height: `${i * 3}px`,
          }}
        />
      ))}
    </div>
  );
}

export function MealItem({ item }: Props) {
  const { mutate } = useToggleMealItem();

  return (
    <div
      onClick={() => {
        console.log("open recipe", item.id);
        // 👉 router.push(`/recipes/${item.id}`)
      }}
      className="bg-white rounded-2xl p-3 flex gap-3 border shadow-sm active:scale-[0.98] transition hover:bg-gray-50 transition"
    >
      {/* IMAGE */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {item.photoUrl ? (
          <Image
            src={item.photoUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-lg">
            🍽
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* TITLE */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>
            {item.categoryCode ? categoryIcons[item.categoryCode] : "🍽"}
          </span>
          <span>{item.name}</span>
        </div>

        {/* META 1: TIME + DIFFICULTY */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span>⏱ {item.totalTime} хв</span>

          {item.difficulty && <DifficultySignal level={item.difficulty} />}
        </div>

        {/* META 2: PORTIONS + WEIGHT */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
          <span>🍽 {item.portions}</span>
          <span>
            ⚖ {Math.round(item.totalWeight)} {item.unit}
          </span>
        </div>

        {/* USERS */}
        <div className="flex -space-x-2 mt-2">
          {item.users.map((u) => {
            const defaultAvatar =
              u.sex === "female"
                ? "/avatars/default-female.jpg"
                : "/avatars/default-male.jpg";
            return (
              <div
                key={u.id}
                className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white"
              >
                <Image
                  src={u.avatarUrl || defaultAvatar}
                  alt={u.firstName}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* CHECK */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          mutate(item.entryIds);
        }}
        className={`
          self-center
    w-6 h-6 rounded-full border-2 flex items-center justify-center
    transition
    ${
      item.isPrepared
        ? "bg-green-500 border-green-500"
        : "border-gray-300 bg-white"
    }
  `}
      >
        {item.isPrepared && (
          <span className="text-white text-sm leading-none">✓</span>
        )}
      </div>
      {/* <input
        type="checkbox"
        checked={item.isPrepared}
        onClick={(e) => e.stopPropagation()}
        onChange={() => mutate(item.entryIds)}
        className="w-5 h-5 rounded-full accent-green-500 cursor-pointer"
      /> */}
    </div>
  );
}
