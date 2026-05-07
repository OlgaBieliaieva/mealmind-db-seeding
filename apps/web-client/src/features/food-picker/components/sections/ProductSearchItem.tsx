"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import {
  normalizeCountryCode,
  getFlagEmoji,
} from "@/shared/lib/normalizeCountryCode";

export const productCategoryIcons: Record<string, string> = {
  // 🍎 FRUITS
  fruits: "🍎",
  citrus_fruits: "🍊",
  berries: "🍓",
  stone_fruits: "🍑",
  apples_pears: "🍏",
  tropical_fruits: "🥭",
  dried_fruits: "🍇",

  // 🥦 VEGETABLES
  vegetables: "🥦",
  leafy_greens: "🥬",
  cruciferous: "🥦",
  root_vegetables: "🥕",
  alliums: "🧄",
  nightshades: "🍅",
  squash_gourds: "🎃",

  // 🌾 GRAINS
  grains_cereals: "🌾",
  rice: "🍚",
  wheat_pasta: "🍝",
  oats_cereals: "🥣",
  quinoa_others: "🌾",

  // 🫘 LEGUMES
  legumes: "🫘",
  beans: "🫘",
  lentils: "🫘",
  peas: "🟢",

  // 🍗 MEAT
  meat_poultry: "🍗",
  beef: "🥩",
  pork: "🍖",
  chicken: "🍗",
  turkey: "🦃",
  lamb_goat: "🍖",

  // 🐟 FISH
  fish_seafood: "🐟",
  fatty_fish: "🐟",
  lean_fish: "🐟",
  shellfish: "🦐",

  // 🥛 DAIRY
  dairy_eggs: "🥛",
  milk: "🥛",
  cheese: "🧀",
  yogurt: "🥣",
  eggs: "🥚",

  // 🧈 FATS
  fats_oils: "🧈",
  butter_margarine: "🧈",
  vegetable_oils: "🛢️",
  nuts_seeds: "🥜",

  // 🍫 SWEETS
  snacks_sweets: "🍫",
  chocolate: "🍫",
  confectionery: "🍬",
  chips_crisps: "🍟",
  cookies_biscuits: "🍪",

  // 🥤 BEVERAGES
  beverages: "🥤",
  water: "💧",
  tea_coffee: "☕",
  juice: "🧃",
  soft_drinks: "🥤",
  alcohol: "🍷",

  // 🌿 SPICES
  herbs_spices: "🌿",
  fresh_herbs: "🌱",
  dried_herbs_spices: "🧂",

  // 📦 OTHER
  miscellaneous: "📦",
  default: "🍽",
};

type Props = {
  item: {
    id: string;
    type: "product";

    name: string;
    photoUrl?: string;

    categoryName?: string;
    categoryCode?: string;

    brand?: {
      name: string;
      country: string;
    } | null;

    calories?: number;
    proteins?: number;
    fats?: number;
    carbs?: number;

    isFavorite?: boolean;
  };

  selected: boolean;
  onToggle: () => void;
  onFavoriteToggle?: () => void;
  onOpen: () => void;
};

export function ProductSearchItem({
  item,
  selected,
  onToggle,
  onFavoriteToggle,
  onOpen,
}: Props) {
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
            {productCategoryIcons[item.categoryCode ?? "default"] ?? "🥑"}
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
              <Heart
                size={20}
                className={
                  item.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-300"
                }
              />
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

        {/* BRAND */}
        {item.brand?.name && (
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <span
              style={{
                fontFamily: "Apple Color Emoji, Segoe UI Emoji, sans-serif",
              }}
            >
              {getFlagEmoji(normalizeCountryCode(item.brand.country))}
            </span>
            <span>{item.brand.name}</span>
          </div>
        )}

        {/* CATEGORY */}
        {item.categoryName && (
          <div className="text-xs text-gray-400 mt-1">
            {productCategoryIcons[item.categoryCode ?? "default"] ?? "🍽"}
            {item.categoryName}
          </div>
        )}
      </div>

      {/* SELECT */}
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
        {selected && <span className="text-white text-sm leading-none">✓</span>}
      </div>
    </div>
  );
}
