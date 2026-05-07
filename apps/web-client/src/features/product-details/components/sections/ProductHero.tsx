"use client";

import Image from "next/image";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToggleFavorite } from "@/features/food-picker/hooks/useToggleFavorite";

import { ProductDetailsDTO } from "../../types/product-details.types";

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

export function ProductHero({ product }: { product: ProductDetailsDTO }) {
  const router = useRouter();
  const { mutate: toggleFavorite } = useToggleFavorite();

  return (
    <div className="relative w-full h-[45vh] shrink-0">
      {product.photoUrl ? (
        <Image
          src={product.photoUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-8xl bg-gray-100">
          {productCategoryIcons[product.categoryCode ?? "default"] ?? "🥑"}
        </div>
      )}

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />

      {/* top nav */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <button
          onClick={() => router.back()}
          className="bg-black/40 text-white rounded-full p-2"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite({
              id: product.id,
              type: "product",
            });
          }}
          className="bg-black/40 text-white rounded-full p-2"
        >
          <Heart
            size={18}
            className={
              product.isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }
          />
        </button>
      </div>
    </div>
  );
}
