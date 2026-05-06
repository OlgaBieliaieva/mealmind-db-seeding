"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToggleFavorite } from "@/features/food-picker/hooks/useToggleFavorite";

import { RecipeDetailsDTO } from "../../types/recipe-details.types";

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

// function DifficultySignal({ level }: { level: "easy" | "medium" | "hard" }) {
//   const map = {
//     easy: 2,
//     medium: 3,
//     hard: 5,
//   };

//   const activeBars = map[level];

//   return (
//     <div className="flex items-end gap-[2px] h-4">
//       {[1, 2, 3, 4, 5].map((i) => (
//         <div
//           key={i}
//           className={`w-[3px] rounded-sm ${
//             i <= activeBars ? "bg-gray-800" : "bg-gray-300"
//           }`}
//           style={{ height: `${i * 3}px` }}
//         />
//       ))}
//     </div>
//   );
// }

function getCuisineLabel(cuisines?: { name: string }[]) {
  if (!cuisines || cuisines.length === 0) return null;

  if (cuisines.length === 1) return cuisines[0].name;

  return `${cuisines[0].name} +${cuisines.length - 1}`;
}

// const difficultyLabels = {
//   easy: "Легко",
//   medium: "Середньо",
//   hard: "Складно",
// };

export function RecipeHero({ recipe }: { recipe: RecipeDetailsDTO }) {
  const router = useRouter();
  const { mutate: toggleFavorite } = useToggleFavorite();
  const cuisineLabel = getCuisineLabel(recipe.cuisines);

  return (
    <div className="relative w-full h-[45vh] shrink-0">
      {recipe.photoUrl ? (
        <Image
          src={recipe.photoUrl}
          alt={recipe.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-7xl bg-gray-100">
          {categoryIcons[recipe.categoryCode ?? "default"] ?? "🍽"}
        </div>
      )}

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-transparent" />

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
              id: recipe.id,
              type: "recipe",
            });
          }}
          className="bg-black/40 text-white rounded-full p-2"
        >
          {recipe.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* optional meta overlay */}
      {/* <div className="absolute bottom-20 left-4 right-4 text-white"> */}
      <div className="absolute bottom-20 left-4 right-4 flex gap-2 flex-wrap">
        {recipe.categoryCode && (
          <span className="backdrop-blur bg-white/70 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            {categoryIcons[recipe.categoryCode] ?? "🍽"}
            {recipe.categoryName}
          </span>
        )}
        {cuisineLabel && (
          <span className="backdrop-blur bg-white/70 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            🌍 {cuisineLabel}
          </span>
        )}
        {/* {recipe.totalTime && <span>• ⏱ {recipe.totalTime} хв</span>}
          {recipe.difficulty && <DifficultySignal level={recipe.difficulty} />} */}
        {/* {recipe.categoryName && <span>{recipe.categoryName}</span>}
          {recipe.difficulty && (
            <span>
              • {difficultyLabels[recipe.difficulty] ?? recipe.difficulty}
            </span>
          )}
          {recipe.totalTime && <span>• ⏱ {recipe.totalTime} хв</span>} */}
      </div>
      {/* </div> */}
    </div>
  );
}
