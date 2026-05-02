"use client";

import Image from "next/image";

type Props = {
  item: {
    id: string;
    type: "recipe";

    name: string;
    photoUrl?: string;

    totalTime?: number;
    difficulty?: "easy" | "medium" | "hard";

    categoryCode?: string;
    categoryName?: string;

    calories?: number;
    proteins?: number;
    fats?: number;
    carbs?: number;

    cuisines?: {
      id: string;
      name: string;
    }[];

    author?: {
      name: string;
      avatarUrl?: string;
    };

    isFavorite?: boolean;
  };

  selected?: boolean;
  onToggle?: () => void;
  onFavoriteToggle?: () => void;
  onOpen: () => void;
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
          className={`w-[3px] rounded-sm ${
            i <= activeBars ? "bg-gray-800" : "bg-gray-300"
          }`}
          style={{ height: `${i * 3}px` }}
        />
      ))}
    </div>
  );
}

function getCuisineLabel(cuisines?: { name: string }[]) {
  if (!cuisines || cuisines.length === 0) return null;

  if (cuisines.length === 1) return cuisines[0].name;

  return `${cuisines[0].name} +${cuisines.length - 1}`;
}

export function RecipeSearchItem({
  item,
  selected,
  onToggle,
  onFavoriteToggle,
  onOpen,
}: Props) {
  const cuisineLabel = getCuisineLabel(item.cuisines);

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl p-3 flex gap-3 border shadow-sm hover:bg-gray-50 active:scale-[0.98] transition"
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
      <div className="flex-1 min-w-0">
        {/* TITLE + FAVORITE */}
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm font-medium text-gray-900 line-clamp-2">
            {item.name}
          </div>

          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
              className="text-lg"
            >
              {item.isFavorite ? "❤️" : "🤍"}
            </button>
          )}
        </div>

        {/* CALORIES + MACROS */}
        {item.calories !== undefined && (
          <div className="text-xs text-gray-700 mt-1">
            🔥 {Math.round(item.calories)} ккал
            <span className="text-gray-400"> /100г</span>
            {item.proteins !== undefined && (
              <span className="text-gray-500">
                {" "}
                • Б{Math.round(item.proteins)}
              </span>
            )}
            {item.fats !== undefined && (
              <span className="text-gray-500"> • Ж{Math.round(item.fats)}</span>
            )}
            {item.carbs !== undefined && (
              <span className="text-gray-500">
                {" "}
                • В{Math.round(item.carbs)}
              </span>
            )}
          </div>
        )}

        {/* TIME + DIFFICULTY */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          {item.totalTime && <span>⏱ {item.totalTime} хв</span>}
          {item.difficulty && <DifficultySignal level={item.difficulty} />}
        </div>

        {/* CATEGORY + CUISINE + AUTHOR */}
        <div className="mt-1 space-y-1 text-xs">
          <div className="flex gap-2 flex-wrap">
            {item.categoryCode && (
              <span className="px-2 py-[2px] rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                {categoryIcons[item.categoryCode] ?? "🍽"}
                {item.categoryName}
              </span>
            )}

            {cuisineLabel && (
              <span className="px-2 py-[2px] rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                🌍 {cuisineLabel}
              </span>
            )}
          </div>

          {item.author?.name && (
            <div className="flex items-center gap-2 text-gray-500">
              👤 {item.author.name}
            </div>
          )}
        </div>
      </div>

      {/* SELECT BUTTON */}
      {onToggle && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`self-center w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
            selected
              ? "bg-green-500 border-green-500"
              : "border-gray-300 bg-white"
          }`}
        >
          {selected && (
            <span className="text-white text-sm leading-none">✓</span>
          )}
        </div>
      )}
    </div>
  );
}
