"use client";

import Image from "next/image";
import { RecipeMealItem } from "./RecipeMealItem";
import { ProductMealItem } from "./ProductMealItem";
import { useToggleMealItem } from "../hooks/useToggleMealItem";
import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";
import { MoreVertical } from "lucide-react";

type Props = {
  item: AggregatedMealItemDTO;
};

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

export function MealItem({ item }: Props) {
  const { mutate } = useToggleMealItem();

  const visibleUsers = item.users.slice(0, 3);
  const extraCount = item.users.length - visibleUsers.length;

  return (
    <div className="bg-white rounded-2xl p-3 flex gap-3 border shadow-sm hover:bg-gray-50 transition">
      {/* CHECK */}
      <button
        onClick={() => {
          mutate(item.entryIds);
        }}
        className={`
          self-center
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition cursor-pointer
          active:scale-[0.9] 
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
      </button>

      <button
        className="flex flex-1 gap-3 cursor-pointer active:scale-[0.99]"
        onClick={() => console.log("open", item.id)}
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
          ) : item.type === "recipe" ? (
            <div className="flex items-center justify-center h-full text-2xl">
              {RecipeCategoryIcons[item.categoryCode ?? ""] ?? "🍳"}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-2xl">
              {productCategoryIcons[item.categoryCode ?? ""] ?? "🥕"}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col justify-between">
          {/* MAIN CONTENT */}
          <div>
            {item.type === "recipe" ? (
              <RecipeMealItem item={item} />
            ) : (
              <ProductMealItem item={item} />
            )}
          </div>

          {/* USERS */}
          {item.users.length > 0 && (
            <div className="flex items-center mt-2">
              <div className="flex -space-x-2">
                {visibleUsers.map((u) => {
                  const defaultAvatar =
                    u.sex === "female"
                      ? "/avatars/default-female.jpg"
                      : "/avatars/default-male.jpg";

                  return (
                    <div
                      key={u.id}
                      className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-100"
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

                {/* +N */}
                {extraCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-[10px] flex items-center justify-center border-2 border-white text-gray-600 font-medium">
                    +{extraCount}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </button>
      <button
        onClick={() => console.log("open menu", item.id)}
        className="
        self-start
        rounded-full
        p-1
        hover:bg-gray-100
        cursor-pointer
        active:scale-[0.9]
    "
      >
        <MoreVertical size={18} />
      </button>
    </div>
  );
}
