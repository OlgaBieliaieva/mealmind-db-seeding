"use client";

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
  const map = { easy: 2, medium: 4, hard: 5 };

  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm ${
            i <= map[level] ? "bg-gray-800" : "bg-gray-300"
          }`}
          style={{ height: `${i * 3}px` }}
        />
      ))}
    </div>
  );
}

export function RecipeMealItem({ item }: Props) {
  return (
    <div className="flex gap-3">
      {/* CONTENT */}
      <div className="flex-1">
        {/* TITLE */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>{categoryIcons[item.categoryCode ?? ""] ?? "🍽"}</span>
          <span>{item.name}</span>
        </div>

        {/* TIME + DIFFICULTY */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          {item.totalTime != null && <span>⏱ {item.totalTime} хв</span>}
          {item.difficulty && <DifficultySignal level={item.difficulty} />}
        </div>

        {/* PORTIONS + WEIGHT */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
          <span>🍽 {item.portions}</span>
          <span>
            ⚖ {Math.round(item.totalWeight)} {item.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
