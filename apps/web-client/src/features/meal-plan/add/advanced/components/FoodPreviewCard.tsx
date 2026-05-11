"use client";

import Image from "next/image";
import { useFoodData } from "@/features/meal-plan/add/advanced/hooks/useFoodData";

type Props = {
  recipeId?: string | null;
  productId?: string | null;
};

// =========================
// ICONS
// =========================

const RecipeCategoryIcons: Record<string, string> = {
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

const productCategoryIcons: Record<string, string> = {
  fruits: "🍎",
  citrus_fruits: "🍊",
  berries: "🍓",
  stone_fruits: "🍑",
  apples_pears: "🍏",
  tropical_fruits: "🥭",
  dried_fruits: "🍇",

  vegetables: "🥦",
  leafy_greens: "🥬",
  cruciferous: "🥦",
  root_vegetables: "🥕",
  alliums: "🧄",
  nightshades: "🍅",
  squash_gourds: "🎃",

  grains_cereals: "🌾",
  rice: "🍚",
  wheat_pasta: "🍝",
  oats_cereals: "🥣",
  quinoa_others: "🌾",

  legumes: "🫘",
  beans: "🫘",
  lentils: "🫘",
  peas: "🟢",

  meat_poultry: "🍗",
  beef: "🥩",
  pork: "🍖",
  chicken: "🍗",
  turkey: "🦃",
  lamb_goat: "🍖",

  fish_seafood: "🐟",
  fatty_fish: "🐟",
  lean_fish: "🐟",
  shellfish: "🦐",

  dairy_eggs: "🥛",
  milk: "🥛",
  cheese: "🧀",
  yogurt: "🥣",
  eggs: "🥚",

  fats_oils: "🧈",
  butter_margarine: "🧈",
  vegetable_oils: "🛢️",
  nuts_seeds: "🥜",

  snacks_sweets: "🍫",
  chocolate: "🍫",
  confectionery: "🍬",
  chips_crisps: "🍟",
  cookies_biscuits: "🍪",

  beverages: "🥤",
  water: "💧",
  tea_coffee: "☕",
  juice: "🧃",
  soft_drinks: "🥤",
  alcohol: "🍷",

  herbs_spices: "🌿",
  fresh_herbs: "🌱",
  dried_herbs_spices: "🧂",

  miscellaneous: "📦",
  default: "🍽",
};

// =========================
// COMPONENT
// =========================

export function FoodPreviewCard({ recipeId, productId }: Props) {
  const { data: item } = useFoodData(recipeId, productId);

  if (!item) {
    return (
      <div className="bg-white p-4 rounded-2xl text-sm text-gray-400">
        Завантаження...
      </div>
    );
  }

  const { name, photoUrl, macros, categoryName, categoryCode, type } = item;

  return (
    <div className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
      {/* IMAGE */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill className="object-cover" />
        ) : type === "recipe" ? (
          <div className="flex items-center justify-center h-full text-2xl">
            {RecipeCategoryIcons[categoryCode ?? ""] ?? "🍳"}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-2xl">
            {productCategoryIcons[categoryCode ?? "default"] ?? "🥕"}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 text-left">
        <div className="text-sm font-semibold text-gray-900 line-clamp-2">
          {name}
        </div>

        <div className="text-xs text-gray-400 mt-0.5">{categoryName}</div>

        {macros && (
          <div className="text-xs text-gray-600 mt-1">
            🔥 {Math.round(macros.calories)} ккал
            <span className="text-gray-400"> /100г</span>
            <span className="text-gray-400">
              {" "}
              • Б{Math.round(macros.proteins)}
            </span>
            <span className="text-gray-400"> • Ж{Math.round(macros.fats)}</span>
            <span className="text-gray-400">
              {" "}
              • В{Math.round(macros.carbs)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
